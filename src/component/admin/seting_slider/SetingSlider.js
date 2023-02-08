import React, { useEffect, useState } from "react";
import ReactImageUploading from "react-images-uploading";
import axiosFetch from "../../../API/axiosFetch";
import uploadIcon from "../../../utility/icon/upload_putih.png";
import deleteIcon from "../../../utility/icon/delet_icon.png";
import instruksi from "../../../utility/img/intruksi.png";
import instruksiSidebar from "../../../utility/img/sidebar_poster.png";

const SetingSlider = () => {
  const [popup, setPopup] = useState(false);
  const [slider, setSlider] = useState([]);
  const [background, setBackground] = useState();
  const [banner, setBanner] = useState();
  const [popupType, setPopupTyope] = useState();
  const [idSlider, setIdSlider] = useState();
  const [type, setType] = useState();
  const maxNumber = 30;
  const [image, setImage] = useState([]);
  const [imageEdit, setImageEdit] = useState();

  //   const getSlider = useFetch("get", "user/slider");
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex, "isdasds");
    setImage(imageList);
  };

  const postSlider = async () => {
    const a = new FormData();
    a.append("image", image[0].file);
    a.append("type", type);

    {
      await axiosFetch("post", `user/slider`, a)
        .then((res) => {
          console.log(res);
          setPopup(false);
          setImage([]);
          //   window.location.reload(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const deleteSlider = (id) => {
    const res = axiosFetch("delete", `user/slider/${id}`)
      .then((res) => setPopup(false))
      .catch((err) => console.log(err));
  };

  const editSlider = async (id) => {
    const a = new FormData();
    a.append("image", image[0].file);

    {
      await axiosFetch("put", `user/slider/${id}`, a)
        .then((res) => {
          console.log(res);
          setPopup(false);
          setImage([]);
          window.location.reload(false);
        })
        .catch((error) => {
          alert("image tidak boleh kosong");
        });
    }
  };

  useEffect(() => {
    axiosFetch("get", "user/slider?type=slider")
      .then((res) => setSlider(res.data))
      .catch((err) => console.log(err));
    axiosFetch("get", "user/slider?type=background")
      .then((res) => setBackground(res.data))
      .catch((err) => console.log(err));
    axiosFetch("get", "user/slider?type=banner")
      .then((res) => setBanner(res.data))
      .catch((err) => console.log(err));
  }, [popup]);

  console.log(background);

  return (
    <>
      <div className={`fixed left-0 h-screen w-screen bg-slate-600 bg-opacity-30 ${popup === false ? "hidden" : "visible"}`}>
        <div className="absolute py-[50px] px-[50px] bg-white shadow-xl top-[20%] left-[30%] rounded-md">
          <p onClick={() => setPopup(false)} className="absolute right-0 top-0 px-2 text-[24px] cursor-pointer">
            X
          </p>
          {popupType === "upload_image" && (
            <ReactImageUploading multiple onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
              {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                <>
                  <div className="flex flex-col px-[40px] ">
                    <div className="flex flex-col gap-4">
                      {image.length !== 0 && (
                        <>
                          {image.map((image, index) => (
                            <div key={index} className=" flex justify-center items-center mb-4">
                              <img className="flex rounded-md h-[250px]" src={image["data_url"]} alt="" width="400" />
                            </div>
                          ))}
                        </>
                      )}

                      {image.length === 0 ? (
                        <p className=" flex items-center justify-center" onClick={onImageUpload}>
                          <span className="cursor-pointer border border-[#FF5001] text-[#FF5001] font-semibold h-[42px] flex items-center px-4 rounded-md">
                            {type === "slider" && <>Upload Slider</>}
                            {type === "background" && <>Upload background</>}
                            {type === "banner" && <>Upload Poster</>}
                          </span>
                        </p>
                      ) : (
                        <>
                          <div className="flex justify-center gap-2">
                            <p
                              className=" flex items-center justify-center"
                              onClick={() => {
                                onImageRemove(imageList);
                              }}
                            >
                              <span className="cursor-pointer border border-[#FF5001] text-[#FF5001] font-semibold h-[42px] flex items-center px-4 rounded-md">ReUpload</span>
                            </p>
                            <div onClick={postSlider} className="flex cursor-pointer items-center text-[18px] text-white font-semibold px-[21px] bg-[#E44700] rounded-md h-[43px]">
                              Simpan Gambar
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </ReactImageUploading>
          )}
          {popupType === "edit_image" && (
            <ReactImageUploading multiple onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
              {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                <>
                  <div className="flex flex-col px-[40px] ">
                    <div className="flex flex-col gap-4">
                      {imageEdit === undefined ? (
                        <>
                          {image?.map((image, index) => (
                            <div key={index} className=" flex justify-center items-center mb-4">
                              <img className="flex rounded-md h-[250px]" src={image["data_url"]} alt="" width="400" />
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className=" flex justify-center items-center mb-4">
                          <img className="flex rounded-md h-[250px]" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + imageEdit} alt="" width="400" />
                        </div>
                      )}

                      {imageEdit === undefined ? (
                        <div className="flex justify-center gap-3">
                          <p className=" flex items-center justify-center" onClick={onImageUpload}>
                            <span className="cursor-pointer border border-[#FF5001] text-[#FF5001] font-semibold h-[42px] flex items-center px-4 rounded-md">Upload Gambar</span>
                          </p>
                          <div
                            style={image.length === 0 ? { visibility: "hidden" } : { visibility: "visible" }}
                            onClick={() => editSlider(idSlider)}
                            className="flex cursor-pointer items-center text-[18px] text-white font-semibold px-[21px] bg-[#E44700] rounded-md h-[43px]"
                          >
                            Simpan Gambar
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-center gap-2">
                            <p
                              className=" flex items-center justify-center"
                              onClick={() => {
                                onImageRemove(imageList);
                                setImageEdit();
                              }}
                            >
                              <span className="cursor-pointer border border-[#FF5001] text-[#FF5001] font-semibold h-[42px] flex items-center px-4 rounded-md">ReUpload</span>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </ReactImageUploading>
          )}
          {popupType === "hapus_image" && (
            <>
              <p className="flex w-full justify-center text-[21px] text-[#374151] ">
                Klik Tombol
                <span className="font-bold text-[#FF5001]">&nbsp;Hapus&nbsp;</span> jika Ingin Lanjut Menghapus
              </p>
              <div onClick={() => deleteSlider(idSlider)} className="flex justify-center items-center cursor-pointer">
                <p className="bg-[#FF5001] h-[42px] w-[100px] flex justify-center items-center text-[18px] text-white font-bold rounded-md mt-[20px]">Hapus</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="pt-[67px] pl-[60px]">
        <p className="text-[32px] text-[#374151] font-bold mb-[42px]">Seting Slider</p>
        <div className="flex justify-between mb-4">
          <div>
            <button
              style={slider?.data?.length === 3 ? { visibility: "hidden" } : { visibility: "visible" }}
              className="h-[43px] bg-[#FF5001] rounded-md px-[21px] text-[18px] text-white font-semibold mb-[46px]"
              onClick={() => {
                setPopup(true);
                setPopupTyope("upload_image");
                setType("slider");
              }}
            >
              Tambah Slider
            </button>
            {slider?.data?.map((res) => (
              <div key={res._id} className="flex items-center gap-3 mb-4 border-b-2 pb-4">
                <img className="w-[192px] h-[111px] rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image} alt="image_slider.png" />
                <p className="text-[16px] w-[300px] text-[#374151]">{res.image.toString()}</p>
                <div
                  onClick={() => {
                    setPopup(true);
                    setPopupTyope("edit_image");
                    setIdSlider(res._id);
                    setImageEdit(res.image);
                  }}
                  className="flex h-[42px] w-[42px] justify-center items-center rounded-md cursor-pointer bg-[#FF5001]"
                >
                  <img className="h-[24px] w-[24px]" src={uploadIcon.src} alt="icon_upload.png" />
                </div>
                <div
                  onClick={() => {
                    setPopup(true);
                    setPopupTyope("hapus_image");
                    setIdSlider(res._id);
                  }}
                  className="flex h-[42px] w-[42px] justify-center items-center rounded-md cursor-pointer bg-white border border-[#B91C1C]"
                >
                  <img className="h-[24px] w-[24px]" src={deleteIcon.src} alt="icon_upload.png" />
                </div>
              </div>
            ))}
          </div>
          <div className="pr-[42px] pl-[50px]">
            <img src={instruksi.src} alt="instruksi.png" />
          </div>
        </div>
        <p className="text-[32px] text-[#374151] font-bold">Seting Background Slider</p>
        <div className="flex justify-between pt-[50px]">
          <div>
            <button
              style={background?.data?.length === 1 ? { visibility: "hidden" } : { visibility: "visible" }}
              className="h-[43px] bg-[#FF5001] rounded-md px-[21px] text-[18px] text-white font-semibold mb-[46px]"
              onClick={() => {
                setPopup(true);
                setPopupTyope("upload_image");
                setType("background");
              }}
            >
              Tambah Background Slider
            </button>
            {background?.data?.map((res) => (
              <div key={res._id} className="flex items-center gap-3 mb-4 border-b-2 pb-4">
                <img className="w-[192px] h-[111px] rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image} alt="image_slider.png" />
                <p className="text-[16px] w-[300px] text-[#374151]">{res.image.toString()}</p>
                <div
                  onClick={() => {
                    setPopup(true);
                    setPopupTyope("edit_image");
                    setIdSlider(res._id);
                    setImageEdit(res.image);
                  }}
                  className="flex h-[42px] w-[42px] justify-center items-center rounded-md cursor-pointer bg-[#FF5001]"
                >
                  <img className="h-[24px] w-[24px]" src={uploadIcon.src} alt="icon_upload.png" />
                </div>
                <div
                  onClick={() => {
                    setPopup(true);
                    setPopupTyope("hapus_image");
                    setIdSlider(res._id);
                  }}
                  className="flex h-[42px] w-[42px] justify-center items-center rounded-md cursor-pointer bg-white border border-[#B91C1C]"
                >
                  <img className="h-[24px] w-[24px]" src={deleteIcon.src} alt="icon_upload.png" />
                </div>
              </div>
            ))}
          </div>
          <div className="pr-[42px] pl-[50px]">
            <img src={instruksiSidebar.src} alt="instruksi.png" />
          </div>
        </div>
        <p className="text-[32px] text-[#374151] font-bold">Seting Banner</p>
        <div className="flex justify-between items-center">
          <div>
            <button
              style={banner?.data?.length === 1 ? { visibility: "hidden" } : { visibility: "visible" }}
              className="h-[43px] bg-[#FF5001] rounded-md px-[21px] text-[18px] text-white font-semibold mb-[46px]"
              onClick={() => {
                setPopup(true);
                setPopupTyope("upload_image");
                setType("banner");
              }}
            >
              Tambah Banner
            </button>
            {banner?.data?.map((res) => (
              <div key={res._id} className="flex items-center gap-3 mb-4 border-b-2 pb-4">
                <img className="w-[192px] h-[111px] rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image} alt="image_slider.png" />
                <p className="text-[16px] w-[300px] text-[#374151]">{res.image.toString()}</p>
                <div
                  onClick={() => {
                    setPopup(true);
                    setPopupTyope("edit_image");
                    setIdSlider(res._id);
                    setImageEdit(res.image);
                  }}
                  className="flex h-[42px] w-[42px] justify-center items-center rounded-md cursor-pointer bg-[#FF5001]"
                >
                  <img className="h-[24px] w-[24px]" src={uploadIcon.src} alt="icon_upload.png" />
                </div>
                <div
                  onClick={() => {
                    setPopup(true);
                    setPopupTyope("hapus_image");
                    setIdSlider(res._id);
                  }}
                  className="flex h-[42px] w-[42px] justify-center items-center rounded-md cursor-pointer bg-white border border-[#B91C1C]"
                >
                  <img className="h-[24px] w-[24px]" src={deleteIcon.src} alt="icon_upload.png" />
                </div>
              </div>
            ))}
          </div>
          {/* <div className="pr-[42px] pl-[50px]">
            <img src={instruksiSidebar.src} alt="instruksi.png" />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SetingSlider;
