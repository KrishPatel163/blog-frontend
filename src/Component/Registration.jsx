import React, { useState } from 'react';
import api from "../Api/axios.js";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../Auth/AuthContext.jsx';


const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {setUser}= useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await api.post("/api/v1/users/register", {
                username,
                email,
                password,
            });

            const data = response.data.data.user;
            setUser({
                id: data._id,
                email: data.email,
                username: data.username,
                role: data.role,
                isLoggedIn: true,
            });

            toast.success(`Welcome, ${response.data.data.user.username}!`);
            navigate("/");
        } catch (error) {
            console.error("There was an error registering!", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-md relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-500 to-yellow-500 rounded-lg pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0 20%, 20% 20%, 20% 0)' }}></div>
                <div className="relative z-10 p-8 bg-gray-800 rounded-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center text-white">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-400">Username</label>
                            <div className="flex items-center border-b border-gray-400 py-2">
                                <span className="material-icons text-gray-400 mr-2">person</span>
                                <input
                                    type="text"
                                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-400">Email</label>
                            <div className="flex items-center border-b border-gray-400 py-2">
                                <span className="material-icons text-gray-400 mr-2">email</span>
                                <input
                                    type="email"
                                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-400">Password</label>
                            <div className="flex items-center border-b border-gray-400 py-2">
                                <span className="material-icons text-gray-400 mr-2">lock</span>
                                <input
                                    type="password"
                                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-gray-400">Confirm Password</label>
                            <div className="flex items-center border-b border-gray-400 py-2">
                                <span className="material-icons text-gray-400 mr-2">lock</span>
                                <input
                                    type="password"
                                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-600">Register</button>
                            <a href="#" className="text-teal-500 hover:text-teal-400 text-sm">Forgot Password?</a>
                            <Link to="/login" className="text-teal-500 hover:text-teal-400 text-sm">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
