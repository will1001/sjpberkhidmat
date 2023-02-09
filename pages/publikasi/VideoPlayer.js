import React from "react";

const VideoPlayer = ({ file }) => {
  return (
    <video className=" rounded-md" controls>
      <source src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + file} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
