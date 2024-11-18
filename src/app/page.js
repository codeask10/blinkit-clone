"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Category from "./components/Category";
import Collections from "./components/Collections";

const Home = () => {
  const [homeData, setHomeData] = useState([]);

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
      <Navbar />
      {homeData.length > 0 &&
        homeData.map((layout) => {
          let cases = layout.value.title ? layout.value.title : layout.name;
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
              return (
                <Category
                  key={layout.value.title}
                  categoryCollection={layout.value.collection}
                />
              );
            default:
              return null;
          }
        })}
    </>
  );
};

export default Home;
