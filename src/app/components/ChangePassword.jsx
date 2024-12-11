import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { URL } from "../../../config";
import { UserContext } from "../context/UserContext";
import { changePassword } from "../api/userApi";

const ChangePassword = () => {
    const { user, token } = useContext(UserContext);
    const { id } = user || {}

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const toggleShowPassword = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (newPassword !== confirmPassword) {
                alert("New password and confirm password do not match.");
                return;
            }
            if (newPassword.length < 8) {
                alert("New password must be at least 8 characters long.");
                return;
            }
            const response = await changePassword(token, id, oldPassword, newPassword);
            if (response.status === "SUCCESS") {
                alert("Successfully Changed Password");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                console.error("API Error:", result.message);
                alert(result.message);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("An error occurred while updating the password. Please try again.");
        };
    }
    const handleCancle = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white h-full shadow-md rounded  px-8 pt-6 pb-8"
        >
            <h2 className="text-lg font-bold mb-4 ">Change Password</h2>

            {/* Old Password */}
            <div className="mb-4 relative w-1/2">
                <input
                    type={showPassword.old ? "text" : "password"}
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                    className="shadow appearance-none border  border-slate-400 rounded w-full h-12 py-2 px-3 text-gray-700"
                    required
                />
                <button
                    type="button"
                    onClick={() => toggleShowPassword("old")}
                    className="absolute right-2 top-4 text-gray-500"
                >
                    {showPassword.old ? <FaEye /> : <FaEyeSlash />}
                </button>
            </div>

            {/* New Password */}
            <div className="mb-4 relative w-1/2">
                <input
                    type={showPassword.new ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className=" shadow appearance-none border border-slate-400 rounded w-full h-12 py-2 px-3 text-gray-700"
                    required
                />
                <button
                    type="button"
                    onClick={() => toggleShowPassword("new")}
                    className="absolute right-2 top-4 text-gray-500"
                >
                    {showPassword.new ? <FaEye /> : <FaEyeSlash />}
                </button>
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative w-1/2">
                <input
                    type={showPassword.confirm ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="shadow appearance-none border border-slate-400 rounded w-full h-12 py-2 px-3 text-gray-700"
                    required
                />
                <button
                    type="button"
                    onClick={() => toggleShowPassword("confirm")}
                    className="absolute right-2 top-4 text-gray-500"
                >
                    {showPassword.confirm ? <FaEye /> : <FaEyeSlash />}
                </button>
            </div>
            <div className="w-1/3 flex gap-3">

                <button
                    type="button"
                    onClick={handleCancle}
                    className="w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className=" w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Password
                </button>
            </div>
        </form>
    );
};


export default ChangePassword;