import React, { useState, useRef } from "react";
import { useEffect } from "react";

function Camera({ screenSize, setOpenCamera, setUploadPlano }) {
  const [imageSrc, setImageSrc] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: "environment" } } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => console.log(error));
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    setImageSrc(canvasRef.current.toDataURL("image/png"));
  };

  useEffect(() => {
    startCamera();
  }, []);

  const [image, setImage] = useState();
  const convert = (data) =>
    fetch(data)
      .then((res) => res.blob())
      .then((res) => {
        setUploadPlano(res);
        setOpenCamera(false);
      });
  console.log(image);
  return (
    <div>
      <video className="flex justify-center w-screen h-screen" ref={videoRef} />
      <div className={`${screenSize.width >= 350 && screenSize.width <= 450 ? "absolute bottom-0 w-screen flex justify-center items-center gap-4 pb-[32px]" : "absolute top-0 h-screen items-center pl-[32px] flex justify-center"} `}>
        {/* <p onClick={stop}>Batal</p> */}
        <button className="h-[46px] flex justify-center items-center w-[46px] border-[3px] border-[#D1D5DB] rounded-full" onClick={takePhoto}>
          <div className="h-[32px] w-[32px] bg-[#D1D5DB] rounded-full" />
        </button>
      </div>

      {imageSrc && (
        <div className="flex flex-col absolute bg-[#374151] top-0 h-screen w-screen">
          <img className={`${screenSize.width >= 350 && screenSize.width <= 450 ? "h-[800px]" : "h-[80%]"}`} src={imageSrc} />
          <div className={"flex gap-4 justify-center items-center h-[80px]"}>
            <div onClick={() => setImageSrc("")} className="text-[18px] text-[#374151 font-semibold bg-white p-2 rounded-sm">
              Foto Ulang
            </div>
            <div onClick={() => convert(imageSrc)} className="text-[18px] text-white font-semibold bg-[#E44700] p-2 rounded-sm">
              Gunakan Foto
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default Camera;
