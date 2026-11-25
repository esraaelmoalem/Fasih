// طبقة الخدمات: حاليًا Mock على LocalStorage. استبدل المحتوى بـ fetch(`${import.meta.env.VITE_API_URL}/...`) لاحقًا.
import {load,save,uid} from './db.js';import {SPECIALISTS} from '../data/mock.js';import {botReply} from './chatbot.js';
const wait=(v,ms=250)=>new Promise(r=>setTimeout(()=>r(v),ms));
export const auth={current:()=>load('user',null),
async register(u){const us=load('users',[]);if(us.find(x=>x.email===u.email))throw new Error('exists');const {password,...rest}=u;const n={...rest,id:uid(),status:u.role==='therapist'?'pending':'active'};save('users',[...us,n]);save('user',n);return wait(n)},
async login(email){let u=load('users',[]).find(x=>x.email===email);if(!u&&email==='admin@fasih.com')u={id:'admin',name:'Admin',email,role:'admin',status:'active'};if(!u)throw new Error('none');save('user',u);return wait(u)},
logout:()=>save('user',null)};
const me=()=>auth.current();
export const children={list:()=>wait(load('children',[]).filter(c=>c.parentId===me().id)),
add:c=>{save('children',[...load('children',[]),{...c,id:uid(),parentId:me().id}]);return wait(true)},
remove:id=>{save('children',load('children',[]).filter(c=>c.id!==id));return wait(true)}};
export const audio={upload:b=>wait({ok:true,size:b?.size},300)};
export const assessments={list:()=>wait(load('assess',[]).filter(a=>a.parentId===me().id)),
async analyze(childId){await wait(0,2800);const R=()=>1+Math.floor(Math.random()*9);
const r={id:uid(),childId,parentId:me().id,date:new Date().toISOString(),severity:['mild','moderate','severe'][Math.floor(Math.random()*3)],repetitions:R(),prolongations:R(),blocks:R()};
save('assess',[...load('assess',[]),r]);return r}};
const base=()=>{const rv=load('reviews',[]);const avg=id=>{const l=rv.filter(r=>r.specId===id);return l.length?+(l.reduce((a,r)=>a+r.rating,0)/l.length).toFixed(1):null};
const reg=load('users',[]).filter(u=>u.role==='therapist'&&u.status==='active').map(u=>({id:u.id,name:u.name,spec:u.spec,exp:+u.exp||0,gov:u.gov,online:true,inperson:true,rating:0,price:u.price||'',ages:u.ages||'—',verified:true,slots:load('avail:'+u.id,['10:00','13:00']),qual:u.qual,photo:u.photo,bio:u.bio}));
return [...SPECIALISTS,...reg].map(s=>({...s,rating:avg(s.id)??s.rating}))};
export const specialists={list:({q='',gov='',mode='',minRating=0}={})=>wait(base().filter(s=>s.verified&&(!q||s.name.includes(q)||s.spec.includes(q))&&(!gov||s.gov===gov)&&(!mode||s[mode])&&s.rating>=minRating),150)};
export const appointments={list:all=>wait(load('appts',[]).filter(a=>all||a.parentId===me().id)),
book:a=>{save('appts',[...load('appts',[]),{...a,id:uid(),parentId:me().id,parentName:me().name,status:'pending'}]);return wait(true)},
setStatus:(id,s)=>{save('appts',load('appts',[]).map(a=>a.id===id?{...a,status:s}:a));return wait(true)}};
export const admin={users:()=>wait(load('users',[])),setStatus:(id,s)=>{save('users',load('users',[]).map(u=>u.id===id?{...u,status:s}:u));return wait(true)},
counts:()=>({children:load('children',[]).length,appts:load('appts',[]).length})};
export const chat={reply:botReply};

export const availability={get:()=>wait(load('avail:'+me().id,['10:00','13:00'])),set:s=>{save('avail:'+me().id,s);return wait(true)}};
export const profile={update(p){const u={...me(),...p};save('user',u);save('users',load('users',[]).map(x=>x.id===u.id?u:x));return wait(u)}};
export const notifications={list:()=>{const ST={pending:'قيد الانتظار',accepted:'تم قبوله',rejected:'تم رفضه'};
return wait([...load('appts',[]).filter(x=>x.parentId===me().id).map(x=>({id:x.id,text:`حجزك مع ${x.specName} يوم ${x.date}: ${ST[x.status]}`})),...load('assess',[]).filter(x=>x.parentId===me().id).map(x=>({id:x.id,text:'اكتمل تقييم جديد'}))])}};

export const reviews={list:id=>wait(load('reviews',[]).filter(r=>r.specId===id)),all:()=>wait(load('reviews',[])),
add:r=>{save('reviews',[...load('reviews',[]),{...r,id:uid(),parentId:me().id,reported:false}]);return wait(true)},
report:id=>{save('reviews',load('reviews',[]).map(r=>r.id===id?{...r,reported:true}:r));return wait(true)},
dismiss:id=>{save('reviews',load('reviews',[]).map(r=>r.id===id?{...r,reported:false}:r));return wait(true)},
remove:id=>{save('reviews',load('reviews',[]).filter(r=>r.id!==id));return wait(true)}};
