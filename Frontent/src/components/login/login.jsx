import {redirect} from 'react-router-dom'
import './login.scss'



export default function Login() {
    return (
        <div className="signin register-form">
            <h1>Sign In</h1>
            <div className="icon">
                <i className='bx bxl-google'></i>
                <i className='bx bxl-github'></i>
                <i className='bx bxl-facebook'></i>
                <i className='bx bxl-instagram'></i>
            </div>
            <p>or use your email password</p>
            <input type="text" name="username" required placeholder="Username" />
            <input type="password" name="password" required placeholder="Password" />
            <a className="forget">Forget your password</a>
            <button >Sign In</button>
        </div>
    );
}

export const LoginAction = async function loginUser({ request, params }) {
    const data = await request.formData();
    const bodyData = {
        username: data.get('username'),
        password: data.get('password')
    };
    const response = await fetch('http://127.0.0.1:8000/auth', {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    });
    const returnData = {
        error: true,
        info : {}
    }
    if(!response.ok) {
        console.error("Invalid username or password");
        return redirect('login')
    }else {
        const responseData = await response.json();
        // Assuming your server returns some data upon successful login
        // Redirect the user to the home page or perform any other necessary action
        // return responseData/
        returnData.error = false
        returnData.info = responseData;
        localStorage.removeItem('data');
        localStorage.setItem('data',JSON.stringify(returnData))
    }
    // return redirect('/login');
    return redirect('/')

};