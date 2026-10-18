import { GoogleGenAI } from '@google/genai';
export function getApiKey():string {
 return (typeof sessionStorage!=='undefined'?sessionStorage.getItem('multiverse_api_key'):'') || process.env.GEMINI_API_KEY || '';
}
export function getTextModel(requestedModel?: string): string {
  // Respect the exact model chosen for this session; never silently substitute it.
  const requested = requestedModel?.trim();
  if (requested) return requested;
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('multiverse_text_model')?.trim() : '';
  return saved || 'gemini-3.8-flash';
}
export function getClient():GoogleGenAI {
 const apiKey=getApiKey();if(!apiKey)throw Error('Chưa có API key. Mở Kết nối Gemini để nhập key.');
 return new GoogleGenAI({apiKey});
}
export async function generatePersonality(profile:Record<string,unknown>):Promise<string> {
 const {imageUrl,storyProgress,...data}=profile;
 const r=await getClient().models.generateContent({model:getTextModel(),contents:'Viết hồ sơ tính cách tiếng Việt 100–180 từ cho nhân vật sau. Nêu khí chất, giá trị, giọng nói, phản ứng khi nguy hiểm, mâu thuẫn và ảnh hưởng của từng nhân vật nguồn. Đây là sáng tác gợi ý để người chơi chỉnh, không ép quyết định của người chơi. Chỉ trả văn bản, không JSON. Dữ liệu: '+JSON.stringify(data)});
 const text=r.text?.trim();if(!text)throw Error('AI chưa trả tính cách. Vui lòng thử lại.');return text;
}
