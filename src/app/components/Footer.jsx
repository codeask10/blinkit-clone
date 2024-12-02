import React from 'react'

const Footer = () => {

    const categories = ["Beverages", "Non Alcoholic Drinks", "Ice Cream", "Snacks & Chips", "Oils & Spices", "Hair Care",
        "Detergents", "Chocolates & Candies", "Home Care", "Fish & Cold Cuts", "Body Lotion & Moisturizer", "Milk Shake & Smoothies", "Meat & Chicken", "MB Biscuit & Cookies", "Condensed & Powdered Milk", "Chocolate & Candies World", "Sugar & Honey", "Snacks & Cereals", "Healthy Cooking Oils", "Soaps & Shower Gels", "Yogurt & Smoothie", "Biryani Rice", "Noodles & Soup", "Dairy & Vegan"];
    const quckLinks = ["Home", "About Us", "Offer", "Contact Us", "Stores"];
    const helpAndSupports = ["Contact Support", "Privacy Policy", "Stores Location", "Terms & Conditions", "Refund & Policy"]

    return (
        <>
            <hr className="h-px my-8 bg-gray-300 border-0 " />
            <div className='max-w-screen-xl mx-auto flex gap-2'>
                <div className='w-1/3 flex  justify-around p-2'>
                    <ul>
                        <li className="text-xs md:text-xl font-medium mb-2">Quick Links</li>
                        {
                            quckLinks.map((list, index) => (
                                <li key={index} className='text-sm my-1'>{list}</li>
                            ))
                        }
                    </ul>
                    <ul>
                        <li className="text-xs md:text-xl font-medium mb-2">Help & Support</li>
                        {
                            helpAndSupports.map((list, index) => (
                                <li key={index} className='text-sm my-1'>{list}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-2/3 flex flex-col p-2 ">
                    <h3 className=" text-xs md:text-xl font-medium  mb-2">Categories</h3>
                    <ul className="grid grid-cols-2  md:grid-cols-3   ">
                        {categories?.map((category, index) => (
                            <li key={`category-${index}`} className='text-sm my-1'>{category}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer