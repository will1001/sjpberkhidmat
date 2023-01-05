import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  {
    url: "https://i.ibb.co/FWFR1R3/gambar-Slide1.png",
    caption: "Slide 1",
  },
  {
    url: "https://i.ibb.co/FWFR1R3/gambar-Slide1.png",
    caption: "Slide 2",
  },
  {
    url: "https://i.ibb.co/FWFR1R3/gambar-Slide1.png",
    caption: "Slide 3",
  },
];

const Slideshow = () => {
  return (
    <Slide>
      {slideImages.map((slideImage, index) => (
        <div className="bg-contain bg-no-repeat bg-center mx-auto mt-10  h-[260px] w-[1083px]" key={index} style={{ backgroundImage: `url(${slideImage.url})` }}></div>
      ))}
    </Slide>
  );
};

export default Slideshow;
