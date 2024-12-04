"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { UserContext } from "../context/UserContext";
import { menuItems } from "../utils/constant";
import Order from "../components/Order";
import Address from "../components/Address";
import Wallet from "../components/Wallet";
import ChangePassword from "../components/ChangePassword";
import Link from "next/link";

const Account = () => {

    const [hash, setHash] = useState("");
    const { user, logout } = useContext(UserContext);
    const router = useRouter();
    const pathname = usePathname();
    const handleMenuClick = (item) => {
        if (item.id === 5) {
            logout();
        } else {
            // Update hash in the URL
            const newUrl = `/account${item.url}`;
            router.push(newUrl);
            setHash(item.url);
        }
    };

    useEffect(() => {
        // Set the hash when the component mounts
        setHash(window.location.hash);

        // Prevent default scroll to the hash element
        const preventScroll = (event) => {
            event.preventDefault();
        };

        window.addEventListener("hashchange", preventScroll);

        // Cleanup listener
        return () => {
            window.removeEventListener("hashchange", preventScroll);
        };
    }, []);
    const getActiveComponent = () => {
        switch (hash) {
            case "#my-orders":
                return <Order />;
            case "#my-address":
                return <Address />;
            case "#wallet":
                return <Wallet />;
            case "#change-password":
                return <ChangePassword />;
            default:
                return <Order />
        }
    };

    return (
        <div className="min-w-[320px] md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto mt-32 h-full bg-gray-100 p-4 rounded-lg">
            <h1 className="text-xl font-bold w-80 text-center">My Account </h1>
            <div className="w-full flex gap-4 ">
                <div className=" w-full lg:w-80 flex flex-col p-4 gap-8">
                    <div className=" w-full h-24 lg:h-56  flex lg:flex-col lg:justify-between  md:flex-row  items-center bg-white rounded-lg " >
                        <Image
                            src={user?.image || "https://pixabay.com/vectors/avatar-icon-placeholder-profile-3814049/"}
                            alt="user profile image"
                            width="0"
                            height="0"
                            sizes="100vw"
                            className=" h-18 w-18 md:h-8 w-8 lg:h-24 lg:w-24  mt-2 mx-4 rounded-full"
                        />
                        <div className="lg:py-4" >
                            <p className="font-semibold">{user?.name}</p>
                            <p className="font-light">{user?.defaultPhone?.phone}</p>
                        </div>
                    </div>
                    <ul className="font-light flex flex-col md:flex-row lg:flex-col gap-2 lg:gap-4 ">
                        {menuItems.map((item) => (

                            <li key={item.id} onClick={() => handleMenuClick(item)} className="w-full h-12 bg-white rounded-md flex gap-1 lg:gap-4 cursor-pointer p-2 lg:px-4 lg:py-2 text-center  ">
                                {item.icon}
                                <div className="mt-1 hover:font-bold">{item.label}</div>
                            </li>

                        ))}
                    </ul>
                </div>
                <div className=" hidden lg:block grow py-4">
                    {getActiveComponent()}
                </div>

            </div>
        </div>
    );
};

export default Account;
