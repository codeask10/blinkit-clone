"use client"

import React, { useState, useEffect } from "react";
import { GiWallet } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";

import { URL } from "../../../config";

const Wallet = () => {
    const [wallet, setWallet] = useState([]);
    const [walletMoney, setWalletMoney] = useState([]);

    const fetchWallet = async () => {
        try {
            const response = await fetch(`${URL}/api/wallet`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const result = await response.json();
            if (result.status === "SUCCESS") {
                setWallet(result.data);
            }
            else if (result.status === "ERROR") {
                alert(result.message);
            }

        } catch (error) {
            console.error("Error Occured", error);
            alert("Error fetching wallet data:", error);
        }
    }

    const fetchWalletTransaction = async () => {
        try {
            const response = await fetch(`${URL}/api/wallet-transactions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const result = await response.json();
            if (result.status === "SUCCESS") {
                setWalletMoney(result.data);
            }
            else if (result.status === "ERROR") {
                alert(result.message);
            }

        } catch (error) {
            console.error("Error Occured", error);
            alert("Error fetching wallet-transaction data:", error);
        }
    }
    useEffect(() => {
        fetchWallet();
        fetchWalletTransaction();
    }, []);
    return (
        <div className="bg-white h-full shadow-md rounded-md px-8 pt-6 pb-8">
            <h2 className="text-lg font-bold mb-4">Wallet</h2>
            <div className="flex flex-col gap-4">
                {/* Wallet Cashback Section */}
                <div className="w-full h-auto rounded-lg bg-gradient-to-r from-red-500 to-rose-500 flex justify-between text-white py-6 px-4">
                    <div className="flex flex-col gap-4 justify-between">
                        <div className="text-lg font-normal">Wallet Cashback</div>
                        <div>
                            <div className="text-md font-light">Amount</div>
                            <div className="text-2xl font-bold">₹ {wallet?.[0]?.credits === 0 ? "0.00" : wallet?.[0]?.credits}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaMoneyCheckDollar className="h-16 w-16 text-rose-900" />
                    </div>
                </div>

                {/* Wallet Money Section */}
                <div className="w-full h-auto rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex justify-between text-white py-6 px-4">
                    <div className="flex flex-col gap-4 justify-between">
                        <div className="text-lg font-normal">Wallet Money</div>
                        <div>
                            <div className="text-md font-light">Amount</div>
                            <div className="text-2xl font-bold">₹ {wallet?.[0]?.balance === 0 ? "0.00" : wallet?.[0]?.balance}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <GiWallet className="h-16 w-16 text-cyan-900" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
