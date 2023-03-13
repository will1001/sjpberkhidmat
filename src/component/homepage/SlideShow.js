import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import useFetch from "../../API/useFetch";

const Slideshow = ({ data, mobile }) => {
  // const getSlider = useFetch("get", "user/slider");
  const [image, setImage] = useState();
  // useEffect(() => {
  //   if (getSlider === undefined) {
  //     return <p>Loading........</p>;
  //   } else {
  //     setImage(getSlider.data);
  //   }
  // }, []);

  // console.log(data);
  if (data === null) {
    return <p>Loading....</p>;
  } else {
    return (
      <>
        {mobile !== undefined ? (
          <Slide>
            {data?.map((res) => (
              <div className="rounded-md flex bg-contain bg-no-repeat bg-center mx-auto mt-[23px]  h-[94px] w-[340px]" key={res._id} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image})` }}></div>
            ))}
          </Slide>
        ) : (
          <>
            <Slide>
              {data?.map((res) => (
                <div className="rounded-md flex bg-contain bg-no-repeat bg-center mx-auto mt-10  h-[260px] w-[1083px]" key={res._id} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image})` }}></div>
              ))}
            </Slide>
          </>
        )}
      </>
    );
  }
};

export default Slideshow;
