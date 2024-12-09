import React from "react";
import Image from "next/image";
import Link from "next/link";

const Category = ({ title, categoryCollection, layoutType, shape }) => {
  const bool = shape === "Rectangle" ? false : true;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {/* GRID Layout */}
      {layoutType === "GRID" && (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(130px,_1fr))] gap-4">
          {categoryCollection?.map(({ category }) => (
            <div
              key={category?.id || `grid-item-${Math.random()}`}
              className="flex flex-col items-center overflow-hidden"
            >
              <Link href={`/category/${category.slug}`}>
                {category?.image && (
                  <Image
                    src={category.image}
                    width={100}
                    height={100}
                    className="object-cover w-full h-40"
                    alt={category?.name || "Category Image"}
                  />
                )}
                {category?.name && (
                  <div className="p-2 text-center">
                    <h3 className="text-md font-semibold">{category.name}</h3>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* SCROLLER Layout */}
      {layoutType === "SCROLLER" && categoryCollection && (
        <div className="flex gap-4 my-5 overflow-x-scroll scrollbar-hidden">
          {categoryCollection.length > 0 &&
            categoryCollection.map(({ category }) => (
              <div
                key={category?.id || `scroller-item-${Math.random()}`}
                className={`flex-shrink-0 ${bool ? "w-40" : "w-1/3"}`}
              >
                <Link href={`/category/${category.slug}`}>
                  <div
                    className={`relative w-full ${
                      bool ? "aspect-w-1 aspect-h-1" : "h-auto"
                    }`}
                  >
                    {category?.image && (
                      <Image
                        src={category.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt={category?.name || "Category Image"}
                        className={`object-cover w-full ${
                          bool ? "h-40 rounded-lg" : "h-full"
                        }`}
                      />
                    )}
                  </div>
                  {category?.name && (
                    <h1 className="text-lg font-medium mt-3 text-center">
                      {category.name}
                    </h1>
                  )}
                </Link>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Category;
