import Login from "../components/login/login";
import Register from "../components/register/register";
import { useState } from "react";
import style from 'styled-components'
import { Form, Link,useLocation, useActionData,redirect } from "react-router-dom";

const Div = style.div`
    display: flex;
    align-items: center;
    padding: 15px 55px;
    margin: 5% auto;
    height: 530px;
    width: 865px;
    background-color: rebeccapurple;
    border-radius: 45px;
    box-shadow: 2px 5px 50px rgb(113, 110, 110);
    background-color: #fff;
    overflow: hidden;
    position: relative;

    h1 {
        font-size: 35px;
        font-weight: 550;
        text-transform: capitalize;
    }

    .icon {
        font-size: 25px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;

        i {
            margin: 8px;
            background-color: #ccc;
            width: 35px;
            height: 28px;
            border-radius: 10px;
            text-align: center;
        }
    }

    #hidden {
        display: none;
    }

    .form-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        height: 100%;

        form {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin: auto 0;
        }

        .signin,
        .signup {
            display: flex;
            justify-content: start;
            flex-direction: column;
            gap: 5px;

            h1 {
                margin: 10px 0;
            }

            input {
                outline: none;
                padding: 5px 15px;
                font-size: 18px;
                font-weight: 450;
                border-radius: 5px;
                border: none;
                margin: 8px 0;

                &:focus {
                    box-shadow: 1px 1px 2px grey;
                }
            }

            p {
                text-transform: capitalize;
            }

            .forget {
                text-decoration: none;
                text-transform: capitalize;
                font-size: 20px;
                margin: 15px 0;
                text-align: center;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }

            button {
                width: fit-content;
                padding: 15px;
                border: none;
                background-color: rgb(158, 35, 240);
                color: white;
                font-size: 20px;
                font-weight: 550;
                text-transform: capitalize;
                border-radius: 8px;
                margin: 0 auto;
            }
        }

        .toggle {
            display: flex;
            justify-content: space-between;
            flex-direction: row-reverse;
            padding: 55px 0;
            background-color: royalblue;
            width: 120%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 50%;
            transition: all 0.3s ease-in-out;

            &.register-toggle {
                transform: translateX(-100%);
            }

            &.register-form {
                transform: translateX(150%);
            }

            .left,
            .right {
                display: flex;
                flex-direction: column;
                align-items: center;
                transform: translateY(25px);
                gap: 15px;
                font-size: 25px;
                color: white;

                p {
                    color: white;
                    font-size: 18px;
                    line-height: 1.5;
                    font-weight: 50;
                    margin: 15px;
                }

                a {
                    width: fit-content;
                    padding: 15px;
                    border: none;
                    background-color: transparent;
                    color: white;
                    font-size: 20px;
                    font-weight: 550;
                    text-transform: capitalize;
                    border-radius: 8px;
                    margin: 0 auto;
                    border: 2px solid white;
                    cursor: pointer;
                }
            }
        }
    }

`

export default function LoginRegister() {
    const url = useLocation()
    const absolute = url.pathname.toLowerCase() === '/login';
    const [register, setRegister] = useState(absolute);
    const userCredencial = useActionData();
    if(userCredencial !== undefined){
        if(!userCredencial.error){
            console.log("here")
            console.log(userCredencial)
            redirect('home')
        }
    }
    const content = (
        <>
            <div className='left' id={register ? 'hidden':undefined}>
                <h2>Hello, Friend!</h2>
                <p>Register with your personal details to use all of site features</p>
                <Link onClick={() => setRegister(pre => !pre)} to='/login' className="signinbtn">Sign In</Link>
            </div>
            <div className="right toggle-left" id={!register ? 'hidden': undefined}>
                <h2>Welcome Back!</h2>
                <p>Enter your personal details to use all of site features</p>
                <Link onClick={() => setRegister(pre => !pre)} to='/register' className="signupbtn" >Sign Up</Link>
            </div>
        </>
    )

    return (
        <Div>
            <div className="form-wrapper">
                <Form method="POST">
                    {register ? <Login /> : <Register />}
                </Form>
                <div className="toggle">
                    {content}
                </div>
            </div>
        </Div>
    );
}

export const RegisterAction = async function createCustomer({ request, params }) {
    const data = await request.formData();
    const userData = {
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password')
    };

    const response = await fetch('http://127.0.0.1:8000/auth/create/customer', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const responseData = await response.json();
        console.error(responseData.error);
        return redirect('/register')
    } else {
        const responseData = await response.json();
        console.log(responseData); // Assuming your server returns a message upon successful registration
        // Redirect the user to the home page using React Router's history object or <Redirect> component
    }

    return redirect('/login');
};

