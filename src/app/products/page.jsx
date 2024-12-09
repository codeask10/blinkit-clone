"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Navigation from "../components/Navigation";
import Card from "../components/Card";
import { URL } from "../../../config";

const Categories = () => {

  const [product, setProduct] = useState([]);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const layoutType = searchParams.get('layoutType');
  const loadMoreType = searchParams.get('loadMoreType');


  // Fetch data with error handling
  const fetchData = async (category) => {
    try {
      const params = [];
      if (category) {
        params.push(`category=${category}`);
      }
      if (tag) {
        params.push(`tag=${tag}`);
      }
      if (layoutType) {
        params.push(`layoutType=${layoutType}`);
      }
      if (loadMoreType) {
        params.push(`loadMoreType=${loadMoreType}`);
      }
      const queryString = params.join('&');
      const response = await fetch(`${URL}/api/product?${queryString}`);
      const result = await response.json();
      setProduct(result.data.product);
    } catch (err) {
      console.error(err); // Set error if fetch fails
    }
  };

  useEffect(() => {
    fetchData(category);
  }, [category, tag, layoutType, loadMoreType]);


  if (product?.length === 0) {
    return <div>No products available in this category.</div>; // Show message if no products
  }

  return (
    <div >
      <Navigation />
      <div className="max-w-[450px] max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-xxl mx-auto grid gap-4 items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-44">
        {product?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
};

export default Categories;
