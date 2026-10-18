import type {GameSession,Turn,RegistryEntry,FusionTemplate} from '../story/types';
import type {TravelContext} from './multiverse';
export interface MemoryCheckpoint { summary:string; wiki:RegistryEntry[]; }
const words=(s:string)=>new Set(s.toLocaleLowerCase().match(/[\p{L}\p{N}]{3,}/gu)||[]);
function score(text:string,query:string){const q=words(query),t=words(text);let n=0;for(const x of q)if(t.has(x))n++;return n;}
export function relevant<T>(items:T[],text:(x:T)=>string,query:string,limit:number):T[]{
 return items.map((x,i)=>({x,i,s:score(text(x),query)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s||b.i-a.i).slice(0,limit).map(x=>x.x);
}
export function localMemory(history:Turn[],wiki:RegistryEntry[],query:string,depth=10){
 const older=history.slice(0,Math.max(0,history.length-depth)).filter(t=>t.narrative);
 return {context:relevant(older,t=>t.narrative||'',query,4).map(t=>`[Lượt ${t.turnIndex}] ${(t.narrative||'').slice(0,600)}`).join('\n').slice(0,2600),wiki:relevant(wiki,e=>e.name+' '+e.description,query,5).map(e=>`${e.type}: ${e.name} — ${e.description.slice(0,650)}`).join('\n').slice(0,3500)};
}
export function travelMemory(travel:TravelContext|undefined,query:string):string{
 if(!travel)return '';
 const recent=travel.visited.at(-1);
 const selected=relevant(travel.visited.slice(0,-1),v=>v.world+' '+v.summary,query,2);
 return JSON.stringify({memories:travel.memories.slice(-1800),visited:[...selected,...(recent?[recent]:[])].map(v=>({world:v.world.slice(0,160),summary:v.summary.slice(-900)}))}).slice(0,5200);
}
export function profileForPrompt(p:FusionTemplate){
 return {name:p.name,personality:p.personality,description:p.description.slice(0,2400),rank:p.rank,level:p.level,powerLevel:p.powerLevel,dna_analysis:p.dna_analysis?.slice(0,1200),dna_components:p.dna_components,quote:p.quote,baseCharacters:p.baseCharacters?.slice(0,20),fusion_logic:p.fusion_logic?.slice(0,1600)};
}
export function rollbackCheckpoint(session:GameSession,kept:Turn[],removed:Turn[],currentWiki:RegistryEntry[]):MemoryCheckpoint{
 const exact=removed.find(t=>t.memoryBefore)?.memoryBefore;
 if(exact)return structuredClone(exact);
 // Legacy saves have no snapshots: replay recorded wiki, preserving entries that were never AI-generated.
 const entries=(t:Turn):RegistryEntry[]=>{try{return JSON.parse(t.rawResponseJSON||'{}').newRegistry||[]}catch{return []}};
 const generated=new Set([...kept,...removed].flatMap(entries).map(e=>e.name.toLowerCase()));
 const map=new Map(currentWiki.filter(e=>!generated.has(e.name.toLowerCase())).map(e=>[e.name.toLowerCase(),e]));
 for(const t of kept)for(const e of entries(t)){const key=e.name.toLowerCase();map.set(key,{...map.get(key),...e,sessionId:session.id!});}
 return {summary:[session.worldSettings.travelContext?.memories,...kept.filter(t=>t.role==='model').slice(-8).map(t=>t.narrative)].filter(Boolean).join('\n').slice(-6000),wiki:[...map.values()]};
}
