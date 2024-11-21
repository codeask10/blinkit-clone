import React, { useEffect, useState } from "react";
import Image from "next/image";

const ImageSlider = ({ images, image }) => {

    console.log(images)
    useEffect(() => {
        for (let i = 0; i < 2; i++) {
            images.push("https://thumbs.dreamstime.com/b/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app-236105298.jpg");
        }
    }, [images, image])

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full h-full flex justify-center items-center">
            {/* Slider Image */}
            <Image
                className="object-cover p-8"
                src={
                    images[currentIndex] ||
                    "https://thumbs.dreamstime.com/b/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app-236105298.jpg"
                }
                alt="Product Image"
                width={500}
                height={500}
                sizes="50vw"
            />

            {/* Navigation Controls */}
            <button
                className="absolute left-8 top-1/2 transform -translate-y-1/2  text-2xl text-slate p-2 rounded-full"
                onClick={handlePrev}
            >
                &lt; {/* Left Arrow */}
            </button>
            <button
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-2xl  text-slate p-2 rounded-full"
                onClick={handleNext}
            >
                &gt; {/* Right Arrow */}
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 flex gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-gray-700" : "bg-gray-300"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
