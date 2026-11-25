export const load=(k,d)=>{try{return JSON.parse(localStorage.getItem('fasih:'+k))??d}catch{return d}};
export const save=(k,v)=>localStorage.setItem('fasih:'+k,JSON.stringify(v));
export const uid=()=>Math.random().toString(36).slice(2,9);
