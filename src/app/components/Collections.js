"use-client";
import React from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const Collections = ({ collections }) => {
  return (
    <div className="flex gap-4 my-5  overflow-x-scroll scrollbar-hidden">
      {collections?.length > 0 &&
        collections.map((collection) => (
          <div
            key={uuidv4()}
            className={`flex-shrink-0 bg-gray-100 rounded-lg `}
          >
            <div className="p-4">
              <Image
                src={collection?.imageUrl}
                width="0"
                height="0"
                sizes="100vw"
                alt="Image Collection"
                className={`object-cover w-40 h-40 rounded-lg`}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Collections;
