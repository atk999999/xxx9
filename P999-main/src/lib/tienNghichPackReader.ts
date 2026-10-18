/** Load one original chapter from the 500-pack Tiên Nghịch knowledge base. */
export async function loadTienNghichChapter(chapterId: number) {
  if (!Number.isInteger(chapterId) || chapterId < 1 || chapterId > 2095) throw new Error('Invalid chapter ID');
  const root = '/knowledge/tien-nghich/';
  const indexRes = await fetch(root + 'package-index.json');
  if (!indexRes.ok) throw new Error('Knowledge index unavailable');
  const index = await indexRes.json();
  const loc = index.chapter_map[String(chapterId)];
  if (!loc) throw new Error('Chapter missing from index');
  const response = await fetch(root + loc.file);
  if (!response.ok) throw new Error('Chapter package unavailable');
  const data = await response.json();
  const chapter = data.chapters[loc.offset];
  if (!chapter || chapter.id !== chapterId) throw new Error('Chapter index mismatch');
  return chapter;
}
