"use client";

import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../../../config";

const Login = ({ setLoginModalOpen }) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [signIn, setSignIn] = useState({ email: "", password: "", "remember": false });
    const [signUp, setSignUp] = useState({ name: "", lastName: "", email: "", password: "" });
    const { login } = useContext(UserContext);

    const handleSignInChange = (e) => {
        setSignIn({ ...signIn, [e.target.name]: e.target.value });
    };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: signIn.email, password: signIn.password, remember: signIn.remember }),
            });
            const result = await response.json();

            if (result.status === "SUCCESS") {
                const userDetails = {
                    token: result.data.customer.accessToken,
                    name: result.data.customer.name,
                    email: result.data.customer.defaultEmail.email,
                    id: result.data.customer.defaultEmail.customerId
                }
                login(userDetails);
                setSignIn({ email: "", password: "", "remember": false });
                alert("Account logged in successfully");
                setLoginModalOpen(false);
            }
            else if (result.status === "ERROR") {
                alert(result.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleSignUpChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    };
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        console.log(signUp);
        try {
            const response = await fetch(`${URL}api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: signUp.name, email: signUp.email, password: signUp.password, lastName: signUp.lastName }),
            });
            const result = await response.json();
            console.log(result);

            if (result.status === "SUCCESS") {
                setSignUp({ name: "", lastName: "", email: "", password: "" });
                alert("Account logged in successfully", "success");
                setIsSignIn(true);
            }
            else if (result.status === "ERROR") {
                alert(result.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            {/* Modal Content */}
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                <div className="relative p-6 max-w-md w-full mx-auto">
                    <div className="bg-white rounded-lg shadow-md">
                        {/* Header with Title and Close Button */}
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {isSignIn ? "Sign In" : "Sign Up"}
                            </h3>
                            <button
                                onClick={() => setLoginModalOpen(false)}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                                <span className="sr-only">Close</span>
                                &#x2715;
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className="p-6">
                            {isSignIn ? (
                                // Sign In Form
                                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={signIn.email}
                                            onChange={handleSignInChange}
                                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter email... "
                                            required
                                        />

                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                            required
                                            onChange={handleSignInChange}
                                            value={signIn.password}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Sign In
                                    </button>
                                    <p className="text-sm text-center text-gray-600">
                                        Don&apos;t have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setIsSignIn(false)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Sign up
                                        </button>
                                    </p>
                                </form>
                            ) : (
                                // Register Form
                                <form className="space-y-4" onSubmit={handleSignUpSubmit}>
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={signUp.name}
                                            onChange={handleSignUpChange}
                                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="eg. Jhon.. "
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={signUp.lastName}
                                            onChange={handleSignUpChange}
                                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="eg. Doe.."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={signUp.email}
                                            onChange={handleSignUpChange}
                                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Enter email or phone number"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="••••••••"
                                            required
                                            onChange={handleSignUpChange}
                                            value={signUp.password}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Sign Up
                                    </button>
                                    <p className="text-sm text-center text-gray-600">
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setIsSignIn(true)}
                                            className="text-green-600 hover:underline"
                                        >
                                            Sign In
                                        </button>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
