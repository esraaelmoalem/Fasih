import {Routes,Route,Navigate} from 'react-router-dom';
import {LangProvider} from './lang.jsx';import Landing from './pages/public/Landing.jsx';import Auth from './pages/public/Auth.jsx';
import {ParentLayout,Overview,Children,Assess,Results,History,Appointments,Notifications,Profile} from './pages/parent/index.js';
import Specialists from './pages/parent/Specialists.jsx';import Chat from './components/chatbot/Chat.jsx';import {Therapist} from './pages/therapist/Therapist.jsx';import {Admin} from './pages/admin/Admin.jsx';
import {auth} from './services/index.js';
const Guard=({role,children})=>{const u=auth.current();if(!u)return <Navigate to="/auth"/>;if(u.role!==role)return <Navigate to={u.role==='parent'?'/app':'/'+u.role}/>;return children};
export default function App(){return <LangProvider><Routes>
<Route path="/" element={<Landing/>}/><Route path="/auth" element={<Auth/>}/>
<Route path="/app" element={<Guard role="parent"><ParentLayout/></Guard>}>
<Route index element={<Overview/>}/><Route path="children" element={<Children/>}/><Route path="assess" element={<Assess/>}/><Route path="history" element={<History/>}/>
<Route path="results/:id" element={<Results/>}/><Route path="specialists" element={<Specialists/>}/><Route path="appointments" element={<Appointments/>}/>
<Route path="notifications" element={<Notifications/>}/><Route path="settings" element={<Profile/>}/><Route path="assistant" element={<div className="card"><Chat full/></div>}/></Route>
<Route path="/therapist" element={<Guard role="therapist"><Therapist/></Guard>}/><Route path="/admin" element={<Guard role="admin"><Admin/></Guard>}/>
<Route path="*" element={<Navigate to="/"/>}/></Routes></LangProvider>}
