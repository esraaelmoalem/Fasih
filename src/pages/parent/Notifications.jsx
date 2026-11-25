import {useState,useRef} from 'react';import {NavLink,Outlet,useNavigate,useParams,useLocation,Link} from 'react-router-dom';
import {Home,Baby,Mic,History as H,Users,CalendarDays,Bot,LogOut,MessageCircle,Languages,Square,Printer,Bell,Settings as Cog} from 'lucide-react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import {useLang} from '../../lang.jsx';import {useAsync} from '../../hooks.js';import {auth,children,assessments,audio,appointments,specialists,notifications,profile} from '../../services/index.js';import Chat from '../../components/chatbot/Chat.jsx';
import {SEV,AI_CONNECTED,fmt,age,TIPS} from '../../utils/format.js';
export function Notifications(){const [n]=useAsync(notifications.list);
return <div><h1>الإشعارات</h1>{!n?<div className="skel"/>:n.length===0?<p>لا توجد إشعارات.</p>:n.map(x=><div className="card" key={x.id} style={{marginBottom:8}}>{x.text}</div>)}</div>}
