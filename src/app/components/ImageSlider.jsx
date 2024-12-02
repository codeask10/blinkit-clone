import React, { useEffect, useState } from "react";
import Image from "next/image";

const ImageSlider = ({ images, slideShow = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, images.length]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className={`relative w-full h-full flex justify-center items-center ${slideShow ? "py-8 my-4" : "w-96 h-96"}`}>
            {/* Slider Image */}
            <Image
                className={`object-cover  ${slideShow ? "w-full" : "w-96 h-96"}`}
                src={
                    images[currentIndex]?.imageUrl ? images[currentIndex].imageUrl : images[currentIndex] ||
                        "https://thumbs.dreamstime.com/b/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app-236105298.jpg"
                }
                alt="Product Image"
                width="0"
                height="0"
                sizes="100vw"
            />

            {/* Navigation Controls */}
            {images.length > 1 && <><button
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

            </>}

            {/* Indicators */}
            <div className="absolute bottom-4 flex gap-2">
                {images?.length > 1 && images.map((_, index) => (
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
