"use client";
import { useState, useEffect } from "react";
import Carousel from "./components/Carousel";
import Category from "./components/Category";
import Collections from "./components/Collections";
import CardItems from "./components/CardItems";
import ImageSlider from "./components/ImageSlider";
import { URL } from "../../config";

const Home = () => {
  const [homeData, setHomeData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/api/layout/home`);
      const res = await response.json();
      setHomeData(res.data.page.layouts);
    } catch (error) {
      console.error("Error Occured", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="sm:max-w-screen-md md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto mt-28">
        {homeData.length > 0 &&
          homeData.map((layout, index) => {
            let cases = layout.name;
            switch (cases) {
              case "BannerWithText":
                return <Carousel key={layout.name} value={layout.value} />;
              case "CategoryCollection":
                return (
                  <Category
                    key={`Category-Collection-${index}`}
                    title={layout.value.title}
                    categoryCollection={layout.value.collection}
                    layoutType={layout.data.layoutType}
                    shape={layout.data.shape}
                  />
                );
              case "ProductCollection":
                return (
                  <CardItems
                    key={layout.value.title}
                    data={layout.data}
                    title={layout.data.title}
                    collection={layout.value.collection}
                  />
                );
              case "ImageCollection":
                return (
                  layout.value.images && (
                    <Collections
                      key={`Image-Collection-${index}`}
                      collections={layout.value.images}
                      imageCollection={true}
                      pageIndex={index}
                    />
                  )
                );
              case "ImageSlideShow":
                return (
                  layout.data.images?.length > 0 && (
                    <ImageSlider
                      key={`Image-Slider-${index}`}
                      images={layout.data.images}
                      slideShow={true}
                    />
                  )
                );
              default:
                return null;
            }
          })}
      </div>
    </>
  );
};

export default Home;
