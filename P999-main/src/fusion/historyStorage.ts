import type { FusionResult } from './types';

type HistoryStorage = Pick<Storage, 'getItem' | 'setItem'>;
export const HISTORY_KEY = 'fusion_history';
export const RECOVERY_KEY = 'fusion_history_recovery';

/** Validate the entire collection before accepting any entry; retain unknown save fields. */
export function validateHistory(value: unknown): FusionResult[] {
  if (!Array.isArray(value)) throw new Error('Sổ dung hợp phải là danh sách thẻ.');
  const ids = new Set<string>();
  return value.map((entry, index) => {
    const fail = () => { throw new Error(`Thẻ thứ ${index + 1} không đúng định dạng. Dữ liệu cũ được giữ nguyên.`); };
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return fail();
    const card = entry as Record<string, any>;
    if (typeof card.name !== 'string' || !card.name.trim()) return fail();
    for (const key of ['id', 'rank', 'description', 'quote', 'imageUrl', 'personality', 'power_comparison']) {
      if (card[key] !== undefined && typeof card[key] !== 'string') return fail();
    }
    for (const key of ['level', 'powerLevel', 'compatibility_score']) {
      if (card[key] !== undefined && (card[key] === null || card[key] === '' || !Number.isFinite(Number(card[key])) || Number(card[key]) < 0)) return fail();
    }
    for (const key of ['baseCharacters', 'dna_components']) {
      if (card[key] !== undefined && (!Array.isArray(card[key]) || card[key].some((item: unknown) => !item || typeof item !== 'object' || Array.isArray(item)))) return fail();
    }
    const id = card.id || crypto.randomUUID();
    if (ids.has(id)) return fail();
    ids.add(id);
    const rank = card.rank || '';
    const chaos = /hỗn độn|chaos/i.test(rank);
    let level = Number(card.level) || 1;
    if (chaos) level = Math.max(1, Math.round(level));
    else if (level <= 1) level = Math.max(1, Math.round((Number(card.powerLevel) || 0) / 100));
    if (!Number.isFinite(level * 100)) return fail();
    return {
      ...card, id, rank, level, powerLevel: chaos ? 0 : level * 100,
      description: card.description || '', quote: card.quote || '', imageUrl: card.imageUrl || '',
      baseCharacters: card.baseCharacters || [], dna_components: card.dna_components || [],
      compatibility_score: Number(card.compatibility_score ?? 100),
      compatibility_status: card.compatibility_status || 'Stable',
    } as FusionResult;
  });
}

export function readHistory(storage: HistoryStorage): { cards: FusionResult[]; error: string | null } {
  try {
    const raw = storage.getItem(HISTORY_KEY);
    return { cards: raw === null ? [] : validateHistory(JSON.parse(raw)), error: null };
  } catch (error) {
    return { cards: [], error: `Không mở được sổ dung hợp. Bản gốc chưa bị ghi đè; hãy xuất bản sao lưu để khôi phục. ${error instanceof Error ? error.message : ''}` };
  }
}

/** Never replace a corrupt persisted collection with the empty fallback UI state. */
export function persistHistory(storage: HistoryStorage, cards: FusionResult[]): void {
  const previous = storage.getItem(HISTORY_KEY);
  if (previous !== null) validateHistory(JSON.parse(previous));
  const validated = validateHistory(cards);
  storage.setItem(HISTORY_KEY, JSON.stringify(validated));
}

export function parseBackup(text: string) {
  const data = JSON.parse(text);
  if (!Array.isArray(data) && (!data || typeof data !== 'object' || !Object.hasOwn(data, 'fusions'))) {
    throw new Error('Bản sao lưu không có danh sách thẻ dung hợp.');
  }
  const cards = validateHistory(Array.isArray(data) ? data : data.fusions);
  const quotaUsed = Array.isArray(data) ? undefined : data.quotaUsed;
  const quotaDate = Array.isArray(data) ? undefined : data.quotaDate;
  if (quotaUsed !== undefined && (!Number.isSafeInteger(quotaUsed) || quotaUsed < 0)) throw new Error('Số lượt trong bản sao lưu không hợp lệ.');
  if (quotaDate !== undefined && quotaDate !== null && typeof quotaDate !== 'string') throw new Error('Ngày trong bản sao lưu không hợp lệ.');
  return { cards, quotaUsed: quotaUsed as number | undefined, quotaDate: quotaDate as string | undefined };
}

/** Commit the collection before publishing it to React. Preserve damaged bytes for recovery. */
export function importHistory(storage: HistoryStorage, text: string) {
  const backup = parseBackup(text);
  const previous = storage.getItem(HISTORY_KEY);
  if (previous !== null) {
    let damaged = false;
    try { validateHistory(JSON.parse(previous)); } catch { damaged = true; }
    if (damaged) storage.setItem(RECOVERY_KEY, previous);
  }
  storage.setItem(HISTORY_KEY, JSON.stringify(backup.cards));
  return backup;
}
