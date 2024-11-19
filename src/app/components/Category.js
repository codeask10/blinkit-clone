import React from "react";
import Image from "next/image";

const Category = ({ categoryCollection }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(130px,_1fr))] gap-4">
        {categoryCollection.map(({ category }) => (
          <div
            key={category.id}
            className="flex flex-col items-center  overflow-hidden"
          >
            <Image
              src={category.image}
              width={100}
              height={100}
              className="object-cover w-full h-40"
              alt={category.name}
            />
            <div className="p-2 text-center">
              <h3 className="text-md font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
