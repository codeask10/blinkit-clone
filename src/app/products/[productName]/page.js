"use client";

import Card from "@/app/components/Card";
import Details from "@/app/components/Details";
import { useState, useEffect, use } from "react";
import { URL } from "../../../../config";

const Page = ({ params }) => {
  const [details, setDetails] = useState(null);
  const { productName } = use(params);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URL}/api/layout/product?url=${productName}`
      );
      const res = await response.json();
      if (res.status === "SUCCESS") {
        setDetails(res.data.page.layouts);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const product = details?.[1]?.value?.collection?.product || [];
  return (
    <div className="mt-24 max-w-screen-2xl mx-auto">
      <Details detail={details} />
      <div className="py-8 text-2xl font-base">You may also like</div>
      <div
        className="grid gap-2 grid-flow-col md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] sm:grid-cols-2 xs:grid-cols-3 overflow-x-auto h-96
    max-w-full scrollbar-hidden"
      >
        {product.length > 0 &&
          product.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Page;
