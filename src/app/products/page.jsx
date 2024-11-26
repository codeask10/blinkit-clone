"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Navigation from "../components/Navigation";
import Card from "../components/Card";

const Categories = () => {

  const [product, setProduct] = useState([]);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // Fetch data with error handling
  const fetchData = async () => {
    try {
      const response = await fetch(`https://modernbazar.zopping.com/api/product?category=${category}`);
      const result = await response.json();
      setProduct(result.data.product);
    } catch (err) {
      console.error(err); // Set error if fetch fails
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);


  if (product.length === 0) {
    return <div>No products available in this category.</div>; // Show message if no products
  }

  return (
    <div >
      <Navigation />
      <div className="max-w-[450px] md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-2xl mx-auto grid gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]  max-w-full scrollbar-hidden mt-44">
        {product?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
