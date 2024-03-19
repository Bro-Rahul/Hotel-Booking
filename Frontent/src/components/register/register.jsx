import {useSelector} from 'react-redux'
import "./register.scss"

export default function Register() {
    const state = useSelector(state=>state.auth);
    console.log(state);
    

    return (
        <div className="signup" >
            <h1>Create Account</h1>
            <div className="icon">
                <i className='bx bxl-google'></i>
                <i className='bx bxl-github'></i>
                <i className='bx bxl-facebook'></i>
                <i className='bx bxl-instagram'></i>
            </div>
            <p>or use your email for registration</p>
            <input type="text" name="username" required placeholder="Name" />
            <input type="email" name="email" required placeholder="Email" />
            <input type="password" name="password" required placeholder="Password" />
            <button >Sign Up</button>
        </div>
    );
}

