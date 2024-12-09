"use client"
import React, { useState, useEffect, use, useContext } from 'react';
import { v4 as uuidv4 } from "uuid";

import { URL } from '../../../../config';
import CardItems from '@/app/components/CardItems';


const Categories = ({ params }) => {
    const { categoryName } = use(params)
    const [category, setCategory] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${URL}/api/layout/category?url=${categoryName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (result.status === "SUCCESS") {
                setCategory(result.data.page.layouts)
            } else if (result.status === "ERROR") {
                console.error(result.message);
                alert(result.message);
            }
        } catch (error) {
            console.error(`Error fetching category  data:`, error);
        }
    };
    useEffect(() => {

        fetchData();

    }, [])
    console.log(category);
    return (
        <div className="min-w-[320px] md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto mt-28">
            {category.length > 0 &&
                category.map((layout) => {
                    const key = uuidv4(); // Generate a unique key for each layout
                    switch (layout.name) {
                        case "ProductCollection":
                            return (
                                <CardItems
                                    key={layout.value.title}
                                    data={layout.data}
                                    title={layout.data.title}
                                    collection={layout.value.collection}
                                />
                            );
                        default:
                            return null;
                    }
                })}
        </div>
    )
}

export default Categories;