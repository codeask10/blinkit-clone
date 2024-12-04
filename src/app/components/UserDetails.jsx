import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Image from "next/image";
import { useRouter } from 'next/navigation'

import { menuItems } from "../utils/constant";

const UserDetails = ({ toggleDropdown, modalRef }) => {
    const { user, logout } = useContext(UserContext);
    const router = useRouter();

    const handleMenuClick = (item) => {
        if (item.id === 5) {
            logout();
        } else {
            // Update hash in the URL
            const newUrl = `/account${item.url}`;
            router.push(newUrl);
        }
        toggleDropdown();
    };
    return (
        <div className="absolute w-80  mt-2 bg-white shadow-lg border rounded-lg z-20  transform -translate-x-1/2 " ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-8 px-4 py-2">
                <Image
                    src={user.image}
                    alt="user profile image"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-14 w-14 mt-2 rounded-full"
                />
                <div className="flex flex-col justify-between  gap-4">
                    <p className="font-semibold">{user.name}</p>
                    <p>{user.defaultPhone.phone}</p>
                </div>
            </div>
            <hr className="h-px my-2 bg-gray-300 border-0 " />
            <div className="p-4 my-4 font-light">
                {menuItems.map((item, index) => (
                    <div key={item.id}  >
                        <div onClick={() => handleMenuClick(item)} className="flex gap-4 cursor-pointer hover:text-red-300 ">
                            {item.icon}
                            <div className="mt-1">{item.label}</div>
                        </div>
                        {index < menuItems.length - 1 && (
                            <hr className="h-px my-2 bg-gray-300 border-0" />
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default UserDetails;
