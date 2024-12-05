"use client";
import React, { useState, useEffect, use } from "react";
import { v4 as uuidv4 } from "uuid";

import { URL } from "../../../../config";
import Carousel from "@/app/components/Carousel";
import Category from "@/app/components/Category";
import CardItems from "@/app/components/CardItems";
import Collections from "@/app/components/Collections";
import ImageSlider from "@/app/components/ImageSlider";

const Page = ({ params }) => {
  const [data, setData] = useState([]);
  const { pages } = use(params);

  const fetchData = async (pages) => {
    try {
      const response = await fetch(`${URL}/api/layout/page?url=${pages}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status === "SUCCESS") {
        setData(result.data.page.layouts);
      } else if (result.status === "ERROR") {
        console.error(result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error(`Error fetching ${pages} data:`, error);
    }
  };

  useEffect(() => {
    if (pages) {
      fetchData(pages);
    }
  }, [pages]);

  return (
    <div className="min-w-[320px] md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto mt-28">
      {data.length > 0 &&
        data.map((layout) => {
          const key = uuidv4(); // Generate a unique key for each layout
          switch (layout.name) {
            case "BannerWithText":
              return <Carousel key={key} value={layout.value} />;
            case "ContentBlock":
              return (
                layout.value && (
                  <div
                    key={key}
                    dangerouslySetInnerHTML={{ __html: layout.value.text }}
                  />
                )
              );
            case "Image":
              return (
                layout.value && (
                  <ImageSlider
                    key={key}
                    images={[layout.value]}
                    slideShow={true}
                  />
                )
              );
            case "ImageCollection":
              console.log(layout.value);
              return (
                layout.value.images && (
                  <Collections
                    key={key}
                    collections={layout.value.images}
                    imageCollection={true}
                  />
                )
              );
            default:
              return null;
          }
        })}
    </div>
  );
};

export default Page;
