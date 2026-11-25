import {useState,useRef} from 'react';import {NavLink,Outlet,useNavigate,useParams,useLocation,Link} from 'react-router-dom';
import {Home,Baby,Mic,History as H,Users,CalendarDays,Bot,LogOut,MessageCircle,Languages,Square,Printer,Bell,Settings as Cog} from 'lucide-react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import {useLang} from '../../lang.jsx';import {useAsync} from '../../hooks.js';import {auth,children,assessments,audio,appointments,specialists,notifications,profile} from '../../services/index.js';import Chat from '../../components/chatbot/Chat.jsx';
import {SEV,AI_CONNECTED,fmt,age,TIPS} from '../../utils/format.js';
export function Appointments(){const [a]=useAsync(()=>appointments.list());const ST={pending:'قيد الانتظار',accepted:'مقبول',rejected:'مرفوض'};
return <div><h1>مواعيدي</h1>{!a?<div className="skel"/>:a.length===0?<p>لا توجد حجوزات.</p>:a.map(x=><div className="card" key={x.id} style={{marginBottom:8}}>{x.specName} · {x.date} {x.time} · {x.type==='online'?'أونلاين':'حضوري'} · <span className="badge">{ST[x.status]}</span></div>)}</div>}

