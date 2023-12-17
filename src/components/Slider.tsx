"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "Savor top-notch coffee with friends in the area",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "Awaken your senses with our freshly brewed delights",
    image: "/slide2.avif",
  },
  {
    id: 3,
    title: "Indulge in the perfect blend of taste and ambiance",
    image: "/slide3.avif",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-gray-50">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-gray-700 font-bold">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button className=" bg-amber-700 text-white py-4 px-8 rounded-lg">
          Order Now
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
