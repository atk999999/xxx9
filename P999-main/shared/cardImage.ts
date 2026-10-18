import type {GoogleGenAI} from '@google/genai';
export const missingPortrait='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="#141c30"/><text x="256" y="256" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="28">Chưa có ảnh nhân vật</text></svg>');
export async function requestCardImage(client:GoogleGenAI,model:string,prompt:string):Promise<string>{
 const response=await client.models.generateContent({model,contents:{parts:[{text:prompt}]},config:{imageConfig:{aspectRatio:'1:1'}}});
 const part=response.candidates?.[0]?.content?.parts?.find(p=>p.inlineData?.data&&p.inlineData.mimeType?.startsWith('image/'));
 if(!part?.inlineData?.data)throw Error('AI không trả ảnh. Thẻ đã giữ nguyên dữ liệu; bạn có thể thử tạo lại ảnh.');
 return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
}
export function imageFailure(e:unknown):string{
 const message=e instanceof Error?e.message:String(e);
 return message.slice(0,600);
}
