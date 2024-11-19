"use-client";
//eslint-disable @next/next/no-img-element
import React from "react";
import Image from "next/image";

const Carousel = ({ value }) => {
  const imgaeUrl = value?.src || "";
  return (
    <>
      <div className="h-32 lg:h-60 shadow-lg  mt-5 relative object-cover">
        <Image
          src={imgaeUrl}
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          alt="Banner With Text"
        />
      </div>
    </>
  );
};

export default Carousel;
