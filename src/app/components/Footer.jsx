import React, { useContext } from 'react';
import { v4 as uuidv4 } from "uuid";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaApple, FaGooglePlay } from "react-icons/fa";

import { CommonContext } from '../context/CommonContext';
import Link from 'next/link';

const Footer = () => {

    const { common } = useContext(CommonContext);
    const { footer } = common?.navigation;
    const { navigation } = footer || [];
    const categories = ["Beverages", "Non Alcoholic Drinks", "Ice Cream", "Snacks & Chips", "Oils & Spices", "Hair Care",
        "Detergents", "Chocolates & Candies", "Home Care", "Fish & Cold Cuts", "Body Lotion & Moisturizer", "Milk Shake & Smoothies", "Meat & Chicken", "MB Biscuit & Cookies", "Condensed & Powdered Milk", "Chocolate & Candies World", "Sugar & Honey", "Snacks & Cereals", "Healthy Cooking Oils", "Soaps & Shower Gels", "Yogurt & Smoothie", "Biryani Rice", "Noodles & Soup", "Dairy & Vegan"];


    return (
        <>
            <hr className="h-px my-8 bg-gray-300 border-0 " />
            <div className='w-full md:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-xl mx-auto flex gap-2'>
                <div className="w-1/3 flex justify-around p-2">
                    {navigation?.map(({ items, text }) => (
                        <ul key={uuidv4()}>
                            <li className="text-xs md:text-md lg:text-xl font-medium mb-2">{text}</li>
                            {items.map((list, index) => (
                                <li key={`item-${index}`} className="text-sm my-1">
                                    <Link href={list.url} className="hover:underline">
                                        {list.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className="w-2/3 flex grow flex-col p-2 ">
                    <h3 className=" text-sm md:text-md lg:text-xl font-medium  mb-2">Categories</h3>
                    <ul className="grid grid-cols-2  md:grid-cols-3   ">
                        {categories?.map((category, index) => (
                            <li key={`category-${index}`} className='text-sm my-1'>{category}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className=" w-full md:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-xl mx-auto  flex flex-col lg:flex-row justify-between gap-4 items-center py-4 ">
                <div className="text-md font-normal mb-2">{footer?.copyright}</div>
                {/* App Download Section */}
                <div className="flex items-center gap-4">
                    <h3 className="text-md font-normal">Download Our App</h3>
                    <Link
                        href="https://play.google.com/store/apps/details?id=io.MBapp.tekshapersnew&pli=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        <FaGooglePlay size={20} />
                        <span>Google Play</span>
                    </Link>
                    <Link
                        href="https://apps.apple.com/a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        <FaApple size={20} />
                        <span>App Store</span>
                    </Link>
                </div>

                {/* Social Media Section */}

                <div className="flex items-center gap-4">
                    <h3 className="text-md  font-normal ">Follow Us</h3>
                    <Link
                        href="https://www.facebook.com/ModernBazaar?mibextid=ZbWKwL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black text-white hover:bg-blue-500"
                    >
                        <FaFacebookF size={20} />
                    </Link>
                    <Link
                        href="https://x.com/modernbazaar_in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black text-white hover:bg-blue-300"
                    >
                        <FaTwitter size={20} />
                    </Link>
                    <Link
                        href="https://www.youtube.com/@modernbazaar6173"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black text-white hover:bg-red-500"
                    >
                        <FaYoutube size={20} />
                    </Link>
                    <Link
                        href="https://www.instagram.com/modernbazaar.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black text-white hover:bg-pink-500"
                    >
                        <FaInstagram size={20} />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Footer