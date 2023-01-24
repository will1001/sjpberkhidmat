import React, { useState } from "react";
import ReactImageUploading from "react-images-uploading";
import axiosFetch from "../../../API/axiosFetch";
import useFetch from "../../../API/useFetch";
import uploadIcon from "../../../utility/icon/upload_putih.png";
import deleteIcon from "../../../utility/icon/delet_icon.png";
import instruksi from "../../../utility/img/intruksi.png";

const SetingSlider = () => {
  const [popup, setPopup] = useState(false);
  const maxNumber = 30;
  const [image, setImage] = useState([]);
  const getSlider = useFetch("get", "user/slider");
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex, "isdasds");
    setImage(imageList);
  };

  const postSlider = async () => {
    const a = new FormData();
    a.append("image", image[0].file);

    {
      await axiosFetch("post", `user/slider`, a)
        .then((res) => {
          console.log(res);
          setImage([]);
          //   window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(getSlider.data);
  return (
    <>
      <div className={`fixed left-0 h-screen w-screen bg-slate-600 bg-opacity-30 ${popup === false ? "hidden" : "visible"}`}>
        <div className="absolute h-[400px] w-[600px] bg-white shadow-xl top-[20%] left-[30%] rounded-md">
          <p onClick={() => setPopup(false)} className="absolute right-0 px-2 text-[24px] cursor-pointer">
            X
          </p>
          <ReactImageUploading multiple onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
              <>
                <div className="flex flex-col px-[40px] pt-[38px]">
                  <div className="flex flex-col gap-4">
                    {image.map((image, index) => (
                      <div key={index} className=" flex items-end">
                        <img className="flex h-[250px]" src={image["data_url"]} alt="" width="400" />
                      </div>
                    ))}

                    {image.length === 0 ? (
                      <p className="cursor-pointer" onClick={onImageUpload}>
                        Upload Gambar
                      </p>
                    ) : (
                      <>
                        {" "}
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            onImageRemove(imageList);
                          }}
                        >
                          Upload Ulang
                        </p>
                        <div onClick={postSlider} className="flex cursor-pointer items-center text-[18px] text-white font-semibold px-[21px] bg-[#E44700] rounded-md h-[43px]">
                          Simpan Gambar
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </ReactImageUploading>
        </div>
      </div>
      <div className="pt-[67px] pl-[60px]">
        <p className="text-[32px] text-[#374151] font-bold mb-[42px]">Seting Slider</p>
        <div className="flex">
          <div>
            <button className="h-[43px] bg-[#FF5001] rounded-md px-[21px] text-[18px] text-white font-semibold mb-[46px]" onClick={() => setPopup(true)}>
              Tambah Slider
            </button>
            {getSlider?.data?.map((res) => (
              <div className="flex items-center gap-3 mb-4 border-b-2 pb-4">
                <img className="w-[192px] h-[111px] rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image} alt="image_slider.png" />
                <p className="text-[16px] w-[300px] text-[#374151]">{res.image.toString()}</p>
                <div className="flex h-[42px] w-[42px] justify-center items-center rounded-md cursor-pointer bg-[#FF5001]">
                  <img className="h-[24px] w-[24px]" src={uploadIcon.src} alt="icon_upload.png" />
                </div>
                <div className="flex h-[42px] w-[42px] justify-center items-center rounded-md cursor-pointer bg-white border border-[#B91C1C]">
                  <img className="h-[24px] w-[24px]" src={deleteIcon.src} alt="icon_upload.png" />
                </div>
              </div>
            ))}
          </div>
          <div className="pr-[42px] pl-[50px]">
            <img src={instruksi.src} alt="instruksi.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SetingSlider;
