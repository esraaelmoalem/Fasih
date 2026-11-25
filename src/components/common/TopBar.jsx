import {useNavigate} from 'react-router-dom';import {auth} from '../../services/index.js';
const TopBar=({title})=>{const nav=useNavigate();return <div style={{display:'flex',justifyContent:'space-between'}}><h1>{title}</h1><button className="btn o" onClick={()=>{auth.logout();nav('/')}}>خروج</button></div>};
export default TopBar;
