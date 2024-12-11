"use client"
import React, { useState, useEffect, useContext } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import Link from 'next/link';

import { UserContext } from '../context/UserContext';
import { Filter } from '../utils/constant';
import { getUserOrder } from '../api/userApi';

const Order = () => {
    const { token } = useContext(UserContext);
    const [order, setOrder] = useState([]);

    const fetchOrder = async () => {
        try {
            const response = await getUserOrder(token);
            if (response.status === "SUCCESS") {
                setOrder(response.data.order);
            }
            else if (response.status === "ERROR") {
                alert(response.message);
            }

        } catch (error) {
            console.error("Error Occured", error);
            alert("Error fetching order data:", error);
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [])
    return (
        <div className="bg-white h-full shadow-md rounded-md px-8 pt-6 pb-8">
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold">My Orders</div>
                <div className="flex gap-4">
                    {Filter.map((filter, index) => (
                        <div
                            key={`Filter-${index}`}
                            className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-1 cursor-pointer shadow-md"
                        >
                            <span className="mr-1">{filter}</span>
                            <RiArrowDropDownLine />
                        </div>
                    ))}
                </div>
            </div>
            {
                !order && (
                    <div className="flex justify-center items-center w-full h-full"> {/* Adjusted to h-screen */}
                        <div className="text-center"> {/* Added text-center */}
                            <IoCartOutline className="h-20 w-20 mx-auto mb-4" /> {/* Centered and added spacing */}
                            <h2 className="text-lg font-normal mb-4">There are no orders found</h2>
                            <Link
                                href="/"
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                            >
                                CONTINUE SHOPPING
                            </Link>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Order