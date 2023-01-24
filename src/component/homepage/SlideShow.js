import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import useFetch from "../../API/useFetch";
import Image from "next/image";

const Slideshow = () => {
  const getSlider = useFetch("get", "user/slider");

  console.log(getSlider);
  return (
    <Slide>
      {getSlider?.data?.map((res) => (
        <>
          <div
            className="bg-contain bg-no-repeat bg-center mx-auto mt-10  h-[260px] w-[1083px]"
            key={res._id}
            style={res.image === undefined ? <p>Loading....</p> : { backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image})` }}
          ></div>
        </>
      ))}
    </Slide>
  );
};

export default Slideshow;
