import { Link } from 'react-router-dom'
import { useState } from 'react';
import { setUserCradencial } from '../../store/authSlice';
import {useSelector,useDispatch} from 'react-redux'
import './header.scss'

export default function Header(){
    const authData = useSelector(state=>state.auth);
    const [isDark , setIsDark] = useState(false);
    const dispatch = useDispatch()
    function handleClick(){
        setIsDark(pre=>!pre);
    }
    function handlelogout(){
        localStorage.removeItem('data');
        dispatch(setUserCradencial({username:null,email:null,role:null,token:null}));
    }
    return(
        <nav className={isDark ? 'dark':undefined}>
            <div className='nav-left'>
                <h3>Hotelzz</h3>
                <div className='nav-icons'>
                <i id='user' className='bx bxs-user-circle'></i>
                <button onClick={handleClick}><i id='moon' className='bx bx-moon'></i></button>
                </div>
            </div>
            <div className='nav-right'>
                <Link to={'home'}>Home</Link>
                <Link to={'Rooms'}>Rooms</Link>
                <Link to={'Contact'}>Contact</Link>
                {authData.username === null ?
                    <Link to='login'>Login</Link> :
                    <button onClick={handlelogout}>Logout</button>
                }
            </div>
        </nav>
    );
}