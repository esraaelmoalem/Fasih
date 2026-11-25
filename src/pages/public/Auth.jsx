import {useState} from 'react';import {useNavigate,useSearchParams} from 'react-router-dom';import {auth} from '../../services/index.js';import {useLang} from '../../lang.jsx';import {GOVS} from '../../data/mock.js';
export default function Auth(){const {t}=useLang();const nav=useNavigate();const [sp]=useSearchParams();const [reg,setReg]=useState(sp.get('m')==='register');const [role,setRole]=useState('parent');
const [f,setF]=useState({});const [e,setE]=useState({});const set=k=>x=>setF({...f,[k]:x.target.value});
async function submit(ev){ev.preventDefault();const er={};if(!/^\S+@\S+\.\S+$/.test(f.email||''))er.email=1;if((f.password||'').length<6)er.password=1;
if(reg){if(!f.name)er.name=1;if(role==='therapist')['spec','qual','card','exp','gov','phone'].forEach(k=>!f[k]&&(er[k]=1))}setE(er);if(Object.keys(er).length)return;
try{const u=reg?await auth.register({...f,role}):await auth.login(f.email);nav(u.role==='parent'?'/app':'/'+u.role)}catch{setE({form:reg?'البريد مسجّل مسبقًا':'الحساب غير موجود'})}}
const I=(k,l,p={})=><label>{l}<input {...p} value={f[k]||''} onChange={set(k)}/>{e[k]&&<span className="err">{t('حقل غير صحيح','Invalid')}</span>}</label>;
return <div style={{maxWidth:460,margin:'3rem auto',padding:'0 1rem'}}><form className="card" onSubmit={submit}><h2>{reg?t('إنشاء حساب','Register'):t('تسجيل الدخول','Login')}</h2>
{reg&&<div className="chips" style={{margin:'8px 0'}}>{[['parent','ولي أمر'],['therapist','أخصائي تخاطب']].map(([r,l])=><button type="button" key={r} className={role===r?'on':''} onClick={()=>setRole(r)}>{l}</button>)}</div>}
{reg&&I('name',t('الاسم','Name'))}{I('email',t('البريد','Email'),{type:'email'})}{I('password',t('كلمة المرور (6+)','Password (6+)'),{type:'password'})}
{reg&&role==='therapist'&&<>{I('spec','التخصص')}{I('qual','المؤهل')}{I('card','رقم كارنيه النقابة')}{I('exp','سنوات الخبرة',{type:'number'})}
<label>المحافظة<select value={f.gov||''} onChange={set('gov')}><option value="">—</option>{GOVS.map(g=><option key={g}>{g}</option>)}</select></label>{I('phone','بيانات التواصل')}<label>الصورة الشخصية<input type="file" accept="image/*" onChange={x=>{const fl=x.target.files[0];if(fl&&fl.size<300000){const r=new FileReader();r.onload=()=>setF({...f,photo:r.result});r.readAsDataURL(fl)}}}/></label><p className="badge">الحالة بعد التسجيل: Pending Verification</p></>}
{e.form&&<p className="err">{e.form}</p>}<button className="btn" style={{width:'100%'}}>{reg?t('تسجيل','Sign up'):t('دخول','Login')}</button>
<p><a href="#/auth" onClick={x=>{x.preventDefault();setReg(!reg)}} style={{color:'#176653'}}>{reg?t('لدي حساب','I have an account'):t('إنشاء حساب جديد','Create account')}</a></p></form></div>}
