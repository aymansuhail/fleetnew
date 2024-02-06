import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';

function Register() {
    const INITIAL_REGISTER_OBJ = {
        username: "",
        name: "",
        password: "",
        passwordConfirm: "",
        emailId: ""
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        // Check if any required field is missing
        const requiredFields = ['username', 'name', 'emailId', 'password', 'passwordConfirm'];
        for (const field of requiredFields) {
            if (!registerObj[field].trim()) {
                return setErrorMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} is required!`);
            }
        }

        try {
            setLoading(true);

            // Make a POST request to the API endpoint to create a new user
            const response = await fetch('http://127.0.0.1:8090/api/collections/users/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: registerObj.username,
                    name: registerObj.name,
                    email: registerObj.emailId,
                    emailVisibility: true,
                    password: registerObj.password,
                    passwordConfirm: registerObj.passwordConfirm,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                const accessToken = data.token;
                localStorage.setItem("token", accessToken);
                setLoading(false);
                window.location.href = '/';
            } else {
                setErrorMessage(data.message || "Registration failed");
                setLoading(false);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage("An unexpected error occurred");
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setRegisterObj({ ...registerObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-4">
                            <InputText defaultValue={registerObj.username} type="text" updateType="username" containerStyle="mt-4" labelTitle="Username" updateFormValue={updateFormValue} />


                                <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.passwordConfirm} type="password" updateType="passwordConfirm" containerStyle="mt-4" labelTitle="Confirm Password" updateFormValue={updateFormValue} />
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button>

                            <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
