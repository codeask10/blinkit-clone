import React from 'react'

const Footer = ({ categories }) => {
    const quckLinks = ["Home", "About Us", "Offer", "Contact Us", "Stores"];
    const helpAndSupports = ["Contact Support", "Privacy Policy", "Stores Location", "Terms & Conditions", "Refund & Policy"]
    return (
        <div className='max-w-screen-2xl mx-auto flex gap-2 my-5'>
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
                    {categories.map(({ category }) => (
                        <li key={category.id} className='text-sm my-1'>{category.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Footer