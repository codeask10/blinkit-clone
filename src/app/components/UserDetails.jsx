import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserDetails = ({ modalRef }) => {
    const { user, logout } = useContext(UserContext);


    return (
        <div className="absolute w-52 top-full left-0 mt-2 bg-white shadow-lg border rounded-lg z-20 p-4 ">
            {user ? (
                <div>
                    <p className="font-semibold">{user.name}</p>
                    <p>{user.defaultPhone.phone}</p>
                    <button
                        ref={modalRef}
                        onClick={logout}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>No user is logged in.</p>
            )}
        </div>
    );
};

export default UserDetails;
