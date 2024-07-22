import React, { useEffect, useState } from 'react';
import axiosAuthInstance from '../../../API/axiosAuthInstance';
import Form from '../../components/AccountCreation/Form';
import Form2 from '../../components/AccountCreation/Form2';
import { useNavigate } from "react-router-dom";

function AccountCreationPage() {
    const [step, setStep] = useState(1);
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        passConfirmation: '',
    });

    const handleNext = () => {
        if (!formData.name || !formData.email || !formData.username) {
            setError1('Please fill in all fields.');
        }
        else{
            setError1('');
            setError2('');
            setStep(step + 1);
        }
    };
    
    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();        
        if (!formData.password || !formData.passConfirmation) {
            setError2('Please fill in both password fields.');
        } 
        else if (formData.password.length < 8){
            setError2('Your password is less than 8 characters long');
        }
        else if (formData.password !== formData.passConfirmation) {
            setError2('Passwords do not match.');
        }
        else {
            setError2('');
            // Handle form submission (e.g., send data to the server)
        }
        try {
            const user = await axiosAuthInstance.post(
                `/user/register`,
                {
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,   
                    password: formData.password
                }
            );
    
            const response = await axiosAuthInstance.post(`/user/login`, { username:user.data.username, password:user.data.password });
            if (response.data ) { 
                localStorage.setItem('token', response.data.token);
                navigate(`/user/${response.data.loggedId}/conversation`) 
            }
        }
        catch(error){
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex w-full h-screen bg-gradient-to-t from-blue-950 to-blue-200">
            <div className="w-full flex items-center justify-center">
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <Form formData={formData} handleChange={handleChange} handleNext={handleNext} error1={error1}/>
                    )}
                    {step === 2 && (
                        <Form2 formData={formData} handleChange={handleChange} handlePrev={handlePrev} handleSubmit={handleSubmit} error2={error2} />
                    )}
                </form>
            </div>
        </div>
    );
}

export default AccountCreationPage;