import { useState, useEffect, useRef } from "react";
import Link from 'next/link'

const Navigation = () => {
    const navRef = useRef(null);

    const [navItems, setNavItems] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Loading state
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Dropdown visibility state

    // Fetch navigation items from the API
    useEffect(() => {
        const fetchNavItems = async () => {
            try {
                const response = await fetch("https://modernbazar.zopping.com/api/nav");
                const result = await response.json();

                if (result.code === 200 && result.data.length > 0) {
                    setNavItems(result.data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch navigation items:", error);
                setNavItems([]); // Handle error gracefully
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchNavItems();
    }, []);

    // Split items into visible and hidden
    const visibleItems = navItems.slice(0, 9);
    const hiddenItems = navItems.slice(9);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (navItems.length === 0) {
        return <div>No navigation items available.</div>; // Handle no items case
    }

    return (
        <div className="w-full  fixed top-24 bg-gray-100 border-b z-20">
            <nav
                ref={navRef}
                className=" max-w-screen-2xl mx-auto flex items-center gap-4 px-4 py-4 overflow-visible"
            >
                {visibleItems.map((item, index) => (
                    <Link
                        key={item.id || `visible-${index}`}
                        href={item.url}
                        className=" text-gray-700 hover:text-blue-500 whitespace-nowrap text-center"
                    >
                        {item.name}
                    </Link>
                ))}

                {hiddenItems.length > 0 && (
                    <div className="relative">
                        <button
                            className="w-[80px] text-gray-700 hover:text-blue-500"
                            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                        >
                            More
                        </button>

                        {isDropdownVisible && (
                            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border rounded-lg z-10">
                                {hiddenItems.map((item, index) => (
                                    <Link
                                        key={item.id || `hidden-${index}`}
                                        href={item.url}
                                        className="block px-4 py-2 text-gray-700 hover:text-blue-500 whitespace-nowrap z-20"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navigation;
