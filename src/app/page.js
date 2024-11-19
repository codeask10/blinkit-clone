"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Category from "./components/Category";
import Collections from "./components/Collections";
import CardItems from "./components/CardItems";
import Footer from "./components/Footer";

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  let categories = "";

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://modernbazar.zopping.com/api/layout/home"
      );
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
      <div className="sm:max-w-screen-md md:max-w-screen-xl lg:max-w-screen-2xl mx-auto mt-28">
        {homeData.length > 0 &&
          homeData.map((layout) => {
            let cases = layout.value.title ? layout.value.title : layout.name;
            cases = layout.name === "ProductCollection" ? layout.name : cases;
            switch (cases) {
              case "BannerWithText":
                return <Carousel key={layout.name} value={layout.value} />;
              case "Top Collections":
                return (
                  <Collections
                    key={layout.value.title}
                    collections={layout.value.collection}
                  />
                );
              case "Shop by Categories":
                categories = layout.value.collection;
                return (
                  <Category
                    key={layout.value.title}
                    categoryCollection={layout.value.collection}
                  />
                );
              case "ProductCollection":
                return (
                  <CardItems
                    key={layout.value.title}
                    title={layout.data.title}
                    collection={layout.value.collection}
                  />
                );
              default:
                return null;
            }
          })}
      </div>
      {categories.length > 0 && <Footer categories={categories} />}
    </>
  );
};

export default Home;
