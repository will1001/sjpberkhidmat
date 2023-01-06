import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import imageSlide from "../../utility/img/gambarSlide1.png";

const slideImages = [
  {
    url: imageSlide.src,
    caption: "Slide 1",
  },
  {
    url: imageSlide.src,
    caption: "Slide 2",
  },
  {
    url: imageSlide.src,
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
