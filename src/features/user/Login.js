import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PocketBase from 'pocketbase';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';

const pb = new PocketBase('http://127.0.0.1:8090');

function Login() {
    const INITIAL_LOGIN_OBJ = {
        password: "",
        email: "", // Change to 'email' to match your backend expectations
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");
    
        if (loginObj.email.trim() === "") return setErrorMessage("Email is required!");
        if (loginObj.password.trim() === "") return setErrorMessage("Password is required!");
    
        try {
            setLoading(true);
    
            // Authenticate user using PocketBase
            const authData = await pb.collection('users').authWithPassword(
                loginObj.email,
                loginObj.password,
            );
    
            // Check if authentication was successful
            if (authData && authData.token) {
                // Authentication successful
                localStorage.setItem("token", authData.token);
                localStorage.setItem("user", JSON.stringify(authData.record));
                setLoading(false);
                window.location.href = '/app/dashboard';
            } else {
                // Authentication failed
                setErrorMessage("User doesn't exist, please register.");
                setLoading(false);
            }
        } catch (error) {
            console.error('Error during login:', error);
    
            // Log specific error details
            setErrorMessage(`User doesn't exist, please register.`);
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-1/3 max-w-5xl shadow-xl">
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                    <form onSubmit={(e) => submitForm(e)}>
                        <div className="mb-4">
                            <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />
                            <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                        </div>
                        <div className='text-right text-primary'>
                            <Link to="/forgot-password">
                                <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span>
                            </Link>
                        </div>
                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>
                        <div className='text-center mt-4'>
                            Don't have an account yet? <Link to="/register">
                                <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
