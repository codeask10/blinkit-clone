"use-client";
import React from "react";
import Image from "next/image";

const Collections = ({ collections }) => {
  return (
    <div className="sm:max-w-screen-md md:max-w-screen-xl lg:max-w-screen-2xl mx-auto my-10">
      <h1 className="text-2xl font-medium">Top Collections</h1>
      <div className="flex gap-2 h-60 my-5">
        {collections.length > 0 &&
          collections.map(({ category }) => (
            <div key={category.id} className="w-1/3">
              <div className=" h-40">
                <Image
                  src={category.image}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt={category.name}
                  className="w-full h-full "
                />
              </div>
              <h1 className="text-xl font-base p-5 text-center">
                {category.name}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Collections;
