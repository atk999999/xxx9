import {db} from '../story/db';
import type {MemoryCheckpoint} from './storyMemory';
export async function restoreMemory(sessionId:number,memory:MemoryCheckpoint){
 await db.encyclopedia.where('sessionId').equals(sessionId).delete();
 if(memory.wiki.length)await db.encyclopedia.bulkAdd(memory.wiki.map(({id,...e})=>({...e,sessionId})));
 await db.sessions.update(sessionId,{summary:memory.summary});
}
