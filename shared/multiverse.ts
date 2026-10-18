import type { GameSession, GameStats, FusionTemplate, WorldSettings, Turn } from '../story/types';
export interface PowerState { level: number; chaos: boolean; }
export interface PowerBand { minLevel: number; label: string; }
export interface PowerRules { bands: PowerBand[]; chaosLabel: string; }
export interface JourneyRecord { world: string; genre: string; summary: string; departedAt: number; }
export interface TravelContext { stats: GameStats; memories: string; visited: JourneyRecord[]; }
export const defaultRules = (): PowerRules => ({bands:[{minLevel:1,label:'Phàm nhân'},{minLevel:100,label:'Tinh anh'},{minLevel:350,label:'Siêu phàm'},{minLevel:1000,label:'Huyền thoại'},{minLevel:50000,label:'Bán thần'},{minLevel:100000,label:'Thần'},{minLevel:10000000,label:'Thiên sứ'},{minLevel:30000000000,label:'Đại thiên sứ'},{minLevel:3000000000000,label:'Đa vũ trụ'},{minLevel:3e18,label:'Khởi nguyên'}],chaosLabel:'Hỗn Độn Thần'});

export const CULTIVATION_TIEN_NGHICH_RULES: PowerRules = {
  bands: [
    { minLevel: 1, label: 'Phàm nhân' },
    { minLevel: 20, label: 'Ngưng Khí sơ kỳ' },
    { minLevel: 50, label: 'Ngưng Khí trung kỳ' },
    { minLevel: 70, label: 'Ngưng Khí hậu kỳ' },
    { minLevel: 100, label: 'Trúc Cơ sơ kỳ' },
    { minLevel: 200, label: 'Trúc Cơ trung kỳ' },
    { minLevel: 280, label: 'Trúc Cơ hậu kỳ' },
    { minLevel: 350, label: 'Kết Đan sơ kỳ' },
    { minLevel: 420, label: 'Kết Đan trung kỳ' },
    { minLevel: 500, label: 'Kết Đan viên mãn' },
    { minLevel: 600, label: 'Nguyên Anh sơ kỳ' },
    { minLevel: 800, label: 'Nguyên Anh hậu kỳ' },
    { minLevel: 1000, label: 'Hóa Thần sơ kỳ' },
    { minLevel: 2000, label: 'Hóa Thần hậu kỳ' },
    { minLevel: 5000, label: 'Anh Biến Kỳ' },
    { minLevel: 10000, label: 'Vấn Đỉnh Kỳ' },
    { minLevel: 25000, label: 'Khuy Niết Kỳ' },
    { minLevel: 40000, label: 'Tịnh Niết Kỳ' },
    { minLevel: 50000, label: 'Toái Niết Kỳ' },
    { minLevel: 100000, label: 'Không Niết / Cổ Thần' },
    { minLevel: 1000000, label: 'Không Linh Kỳ' },
    { minLevel: 10000000, label: 'Không Huyền Kỳ' },
    { minLevel: 100000000, label: 'Không Kiếp Kỳ' },
    { minLevel: 30000000000, label: 'Đại Thiên Tôn' },
    { minLevel: 3000000000000, label: 'Đạp Thiên Cảnh' },
    { minLevel: 3e18, label: 'Khởi Nguyên Đạp Thiên' }
  ],
  chaosLabel: 'Hỗn Độn Đạp Thiên Chí Tôn'
};

export const CULTIVATION_PHAM_NHAN_RULES: PowerRules = {
  bands: [
    { minLevel: 1, label: 'Phàm nhân' },
    { minLevel: 20, label: 'Luyện Khí sơ kỳ' },
    { minLevel: 50, label: 'Luyện Khí trung kỳ' },
    { minLevel: 70, label: 'Luyện Khí hậu kỳ' },
    { minLevel: 100, label: 'Trúc Cơ sơ kỳ' },
    { minLevel: 250, label: 'Trúc Cơ hậu kỳ' },
    { minLevel: 350, label: 'Kết Đan sơ kỳ' },
    { minLevel: 500, label: 'Kết Đan hậu kỳ' },
    { minLevel: 600, label: 'Nguyên Anh sơ kỳ' },
    { minLevel: 800, label: 'Nguyên Anh hậu kỳ' },
    { minLevel: 1000, label: 'Hóa Thần Kỳ' },
    { minLevel: 5000, label: 'Luyện Hư Kỳ' },
    { minLevel: 50000, label: 'Hợp Thể Kỳ' },
    { minLevel: 100000, label: 'Đại Thừa Kỳ' },
    { minLevel: 1000000, label: 'Độ Kiếp Kỳ' },
    { minLevel: 10000000, label: 'Chân Tiên Giới' },
    { minLevel: 100000000, label: 'Kim Tiên' },
    { minLevel: 30000000000, label: 'Thái Ất Ngọc Tiên' },
    { minLevel: 3000000000000, label: 'Đại La Đạo Tổ' },
    { minLevel: 3e18, label: 'Khởi Nguyên Tiên Tổ' }
  ],
  chaosLabel: 'Hỗn Độn Chí Tôn'
};

export const DRAGON_BALL_RULES: PowerRules = {
  bands: [
    { minLevel: 1, label: 'Chiến Binh Phàm Nhân' },
    { minLevel: 50, label: 'Cao Thủ Võ Thuật' },
    { minLevel: 100, label: 'Võ Thần Trái Đất' },
    { minLevel: 350, label: 'Chiến Binh Z (Siêu Phàm)' },
    { minLevel: 1000, label: 'Siêu Saiyan' },
    { minLevel: 1200, label: 'Siêu Saiyan Thần / Blue' },
    { minLevel: 50000, label: 'Bản Năng Vô Cực' },
    { minLevel: 100000, label: 'Thần Hủy Diệt' },
    { minLevel: 10000000, label: 'Thiên Sứ' },
    { minLevel: 30000000000, label: 'Đại Thiên Sứ' },
    { minLevel: 3000000000000, label: 'Vua Vạn Vật Zeno' },
    { minLevel: 3e18, label: 'Khởi Nguyên Thần' }
  ],
  chaosLabel: 'Hỗn Độn Thần'
};

export function getWorldPowerRules(targetWorldName?: string, genre?: string): PowerRules {
  const name = (targetWorldName || '').toLowerCase();
  const g = (genre || '').toLowerCase();
  if (name.includes('tiên nghịch') || name.includes('tien nghich') || name.includes('renegade') || name.includes('vương lâm') || name.includes('vuong lam')) {
    return CULTIVATION_TIEN_NGHICH_RULES;
  }
  if (name.includes('phàm nhân') || name.includes('pham nhan') || name.includes('hàn lập') || name.includes('han lap')) {
    return CULTIVATION_PHAM_NHAN_RULES;
  }
  if (g.includes('tu tiên') || g.includes('cultivation') || name.includes('đấu phá') || name.includes('già thiên') || name.includes('vũ động')) {
    return CULTIVATION_TIEN_NGHICH_RULES;
  }
  if (name.includes('dragon ball') || name.includes('ngọc rồng') || name.includes('saiyan')) {
    return DRAGON_BALL_RULES;
  }
  return defaultRules();
}

export function getDbzEquivalent(minLevel: number, chaos?: boolean): string {
  if (chaos) return 'Hỗn Độn Thần (Vô Hạn ⭐)';
  if (minLevel >= 3e18) return 'Khởi Nguyên Thần (1 Ý nghĩ xóa vạn thế giới)';
  if (minLevel >= 3e12) return 'Vua Vạn Vật Zeno (Xóa sổ Đa Vũ Trụ)';
  if (minLevel >= 3e10) return 'Đại Thiên Sứ Daishinkan (Gấp 3.000 lần Whis)';
  if (minLevel >= 1e7) return 'Thiên Sứ Whis / Vados (Bản Năng Hoàn Hảo)';
  if (minLevel >= 1e5) return 'Thần Hủy Diệt Beerus (Khí Hakai)';
  if (minLevel >= 5e4) return 'Goku Bản Năng Vô Cực (Ultra Instinct)';
  if (minLevel >= 25000) return 'Vegeta Bản Ngã Tối Thượng (Ultra Ego)';
  if (minLevel >= 10000) return 'Goku Siêu Saiyan 3 / Thần Ki';
  if (minLevel >= 5000) return 'Goku Siêu Saiyan 2';
  if (minLevel >= 1000) return 'Goku Siêu Saiyan Blue';
  if (minLevel >= 600) return 'Frieza dạng 1 / Raditz';
  if (minLevel >= 420) return 'Piccolunks / Chiến Binh Z';
  if (minLevel >= 350) return 'Goku DBS Base (35,000 BP)';
  if (minLevel >= 200) return 'Piccolo Đại Ma Vương';
  if (minLevel >= 100) return 'Goku Kid (Đại hội võ thuật)';
  if (minLevel >= 50) return 'Quy Lão Kame (Kamehameha)';
  if (minLevel >= 20) return 'Goku Sơ Sinh / Võ Sĩ Trái Đất';
  return 'Phàm nhân bình thường';
}

export interface RealmComparisonRow {
  minLevel: number;
  bp: number;
  bpFormatted: string;
  worldRealm: string;
  dbzBenchmark: string;
  isCurrent: boolean;
}

export function formatPowerBP(level: number, chaos?: boolean): string {
  if (chaos) return `${level} ⭐ Hỗn Độn`;
  const bp = level * 100;
  if (bp >= 1e18) return `${(bp / 1e18).toLocaleString('vi-VN')} Tỷ Tỷ BP`;
  if (bp >= 1e14) return `${(bp / 1e14).toLocaleString('vi-VN')} Triệu Tỷ BP`;
  if (bp >= 1e12) return `${(bp / 1e12).toLocaleString('vi-VN')} Nghìn Tỷ BP`;
  if (bp >= 1e9) return `${(bp / 1e9).toLocaleString('vi-VN')} Tỷ BP`;
  if (bp >= 1e6) return `${(bp / 1e6).toLocaleString('vi-VN')} Triệu BP`;
  return `${bp.toLocaleString('vi-VN')} BP`;
}

export function getComparisonLadder(
  rules: PowerRules,
  currentLevel: number = 1,
  chaos: boolean = false
): RealmComparisonRow[] {
  return rules.bands.map((band, idx) => {
    const nextBand = rules.bands[idx + 1];
    const isCurrent = !chaos && currentLevel >= band.minLevel && (!nextBand || currentLevel < nextBand.minLevel);
    return {
      minLevel: band.minLevel,
      bp: band.minLevel * 100,
      bpFormatted: formatPowerBP(band.minLevel, false),
      worldRealm: band.label,
      dbzBenchmark: getDbzEquivalent(band.minLevel, false),
      isCurrent
    };
  });
}

export function validatePower(p: PowerState): PowerState {
 if (!Number.isFinite(p.level) || p.level < 1 || p.level > 1e30 || !Number.isInteger(p.level)) throw Error('Cấp sức mạnh phải là số nguyên từ 1 đến 1e30.');
 return {level:p.level,chaos:!!p.chaos};
}
export function powerOf(card?: Partial<FusionTemplate>): PowerState {
 return validatePower({level:Number(card?.level)||1,chaos:/hỗn độn|chaos/i.test(card?.rank||'')});
}
export function validateRules(r:PowerRules):PowerRules {
 if(!r.bands.length || r.bands.length>30 || !r.chaosLabel.trim()) throw Error('Cần 1–30 cảnh giới và tên cảnh giới Hỗn Độn.');
 const bands=r.bands.map(b=>({minLevel:validatePower({level:Number(b.minLevel),chaos:false}).level,label:b.label.trim()})).sort((a,b)=>a.minLevel-b.minLevel);
 if(bands[0].minLevel!==1 || bands.some((b,i)=>!b.label || (i>0 && b.minLevel===bands[i-1].minLevel))) throw Error('Mốc đầu phải là 1; tên không trống và các mốc không trùng nhau.');
 return {bands,chaosLabel:r.chaosLabel.trim()};
}
export function realmOf(p:PowerState,r:PowerRules):string {
 validatePower(p);const rules=validateRules(r);
 return p.chaos?`${rules.chaosLabel} · ${p.level} ⭐`:[...rules.bands].reverse().find(b=>p.level>=b.minLevel)!.label;
}
export function canonicalStats(stats:GameStats,p:PowerState,r:PowerRules):GameStats {
 return {...stats,realm:realmOf(p,r),attributes:[...(stats.attributes||[]).filter(a=>!['Cấp gốc','BP gốc','Sao Hỗn Độn'].includes(a.key)),{key:p.chaos?'Sao Hỗn Độn':'Cấp gốc',value:p.level},...(p.chaos?[]:[{key:'BP gốc',value:p.level*100}])]};
}
export function makeTravel(s:GameSession,stats:GameStats,turns:Turn[]):TravelContext {
 const last=turns.filter(t=>t.role==='model').slice(-3).map(t=>t.narrative||'').join('\n');
 const entry={world:s.worldSettings.worldContext.slice(0,160)||s.genre,genre:s.genre,summary:[s.summary,last].filter(Boolean).join('\n').slice(-10000),departedAt:Date.now()};
 return {stats:structuredClone(stats),memories:entry.summary,visited:[...(s.worldSettings.travelContext?.visited||[]),entry]};
}
export function arrivalStats(aiStats:GameStats,travel?:TravelContext):GameStats {
 if(!travel)return aiStats;
 // Only location/time/realm are new; carried possessions and condition remain exact at arrival.
 const {currentLocation,nearbyLocations,mapData,visitedLocations,currentTime,realm}=aiStats;
 return {...travel.stats,currentLocation,nearbyLocations,mapData,visitedLocations,currentTime,realm};
}
export function makeStoryCard(s:GameSession,stats:GameStats):FusionTemplate & Record<string,any> {
 const p=validatePower(s.power||powerOf(s.worldSettings.fusionTemplate));
 const old=s.worldSettings.fusionTemplate;
 const journeyId=s.journeyId||`legacy-${s.id}`;
 const personality=s.characterTraits?.personality||old?.personality||'Bình thường';
 const name=stats.name||s.heroName;
 const rank=p.chaos?'HỖN ĐỘN THẦN':p.level>=3e18?'KHỞI NGUYÊN THẦN':p.level>=3e12?'VUA VẠN VẬT ZENO':p.level>=3e10?'ĐẠI THIÊN SỨ':p.level>=1e7?'THIÊN SỨ':p.level>=1e5?'THẦN HỦY DIỆT':p.level>=5e4?'BẢN NĂNG VÔ CỰC':p.level>=1000?'SIÊU SAIYAN':'CHIẾN BINH PHÀM NHÂN';
 return {...old,id:`traveler-${journeyId}`,name,description:[old?.description,`Lữ khách: ${stats.realm}. Trạng thái: ${stats.status}.`,[...new Set([...(s.characterTraits?.talents||[]),...(stats.talents||[])])].join('; ')].filter(Boolean).join('\n'),personality,level:p.level,powerLevel:p.chaos?0:p.level*100,rank,imageUrl:s.avatarUrl||old?.imageUrl||portrait(name),quote:old?.quote||personality,baseCharacters:old?.baseCharacters||[],dna_analysis:old?.dna_analysis||s.characterTraits?.spiritualRoot||'',fusion_logic:old?.fusion_logic||'Nhân vật trưởng thành qua hành trình xuyên thế giới.',userId:'local',createdAt:Date.now(),compatibility_score:100,compatibility_status:'Stable',storyProgress:{journeyId,stats:structuredClone(stats),traits:{spiritualRoot:'',personality,...structuredClone(s.characterTraits),talents:[...new Set([...(s.characterTraits?.talents||[]),...(stats.talents||[])])]},summary:s.summary||'',travel:structuredClone(s.worldSettings.travelContext),genre:s.genre},power_comparison:`Sức mạnh gốc ${p.chaos?p.level+' sao':p.level+' cấp / '+p.level*100+' BP'}`};
}
function portrait(name:string):string {
 const initials=Array.from(name).filter(c=>/[\p{L}\p{N}]/u.test(c)).slice(0,2).join('').toUpperCase();
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560"><rect width="400" height="560" fill="#17132f"/><circle cx="200" cy="220" r="120" fill="#6d28d9"/><text x="200" y="250" text-anchor="middle" font-size="80" fill="white">${initials}</text></svg>`);
}
export function upsertCard(storage:Pick<Storage,'getItem'|'setItem'>,card:ReturnType<typeof makeStoryCard>):void {
 const raw=storage.getItem('fusion_history');let cards:any[];
 try { cards=raw?JSON.parse(raw):[]; } catch { throw Error('Sổ dung hợp không đọc được. Hãy xuất bản sao lưu trước khi sửa.'); }
 if(!Array.isArray(cards))throw Error('Sổ dung hợp không đúng định dạng.');
 const next=cards.filter(c=>c.id!==card.id);next.unshift(card);
 try{storage.setItem('fusion_history',JSON.stringify(next));}catch{throw Error('Bộ nhớ sổ dung hợp đã đầy. Hãy xuất bản sao lưu và giải phóng dung lượng.');}
}
export function worldForTurn(s:GameSession,stats:GameStats|null):WorldSettings {
 return {...s.worldSettings,powerContext:{power:s.power||powerOf(s.worldSettings.fusionTemplate),rules:s.worldSettings.powerRules||defaultRules()},currentCharacter:stats||undefined};
}
