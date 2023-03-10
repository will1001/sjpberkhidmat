import React, { useEffect, useState } from "react";
import uploadImg from "../../../utility/icon/uploadFoto.png";
import listImg from "../../../utility/icon/centerIcon.png";
import closeImg from "../../../utility/icon/closeForm.png";
import openImg from "../../../utility/icon/SelectIcon.png";
import deletImg from "../../../utility/icon/delet_icon.png";
import ReactImageUploading from "react-images-uploading";
import axiosFetch from "../../../API/axiosFetch";
import { useSelector } from "react-redux";

const ListPartai = ({ title, logo, id, nomor, editHandler, setEditData, editData }) => {
  const [detailForm, setDetailForm] = useState(false);
  const [imageChange, setImageChange] = useState();
  const token = useSelector((state) => state.user.token);
  const [formPartai, setFormPartai] = useState({
    logo: [logo],
    nama: title,
  });
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, "image lis");
    setFormPartai({ ...formPartai, logo: imageList[0] });
  };

  const deletePartai = async (id) => {
    {
      await axiosFetch("delete", `user/real_count/partai/${id}`, {}, token)
        .then((res) => {
          //   console.log(res);
          console.log(res);
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [editImage, setEditImage] = useState();

  const editPartai = async (id) => {
    const a = new FormData();
    imageChange !== undefined && a.append("logo", imageChange);
    a.append("name", formPartai.nama);

    {
      await axiosFetch("put", `user/real_count/partai/${id}`, a, token)
        .then((res) => {
          console.log(res);
          window.location.reload(false);
          // console.log(a);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  console.log(imageChange);
  return (
    <>
      <div className="flex pl-[41px] h-[72px] bg-white border border-[#D1D5DB] rounded-t-md">
        <div className="flex items-center gap-2">
          <img src={listImg.src} alt="listImg.png" />
          <p className="text-[21px] text-[#374151] font-semibold">{nomor}.</p>
        </div>
        <div className="w-full ml-[13px] flex items-center text-[18px] text-[#374151] font-medium">{title}</div>
        <div onClick={() => setDetailForm(!detailForm)} className="flex items-center mr-[16px] cursor-pointer">
          {detailForm === false ? <img src={openImg.src} alt="open_detail.png" /> : <img src={closeImg.src} alt="close_detail.png" />}
        </div>
      </div>

      <>
        <div className={` bg-white border border-[#D1D5DB] px-[41px] ${detailForm === false ? "hidden" : "visible"}`}>
          <div className="flex mt-[38px]">
            <p className="text-[16px] text-[#6B7280] flex items-end mr-[142px]">Logo Partai</p>
            <div className="flex  items-end">
              <div className="mr-2 flex items-end">
                <>
                  {imageChange === undefined ? (
                    <img className="flex" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + formPartai.logo[0]} alt="" width="137" />
                  ) : (
                    imageChange !== undefined && <img className="flex" src={URL.createObjectURL(imageChange)} alt="" width="137" />
                  )}
                </>
              </div>

              <div className="flex items-center gap-1 pl-[18px] pr-[24px] h-[43px] border border-[#E44700] rounded-md text-[18px] text-[#E44700] font-semibold">
                <div className="">
                  <img src={uploadImg.src} alt="upload.png" />
                </div>

                <>
                  {formPartai?.logo?.length === 0 ? (
                    <label className="cursor-pointer">
                      Upload Logo
                      <input onChange={(e) => setImageChange(e.target.files[0])} className="hidden" type={"file"} />
                    </label>
                  ) : (
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        setFormPartai({ ...formPartai, logo: [] });
                      }}
                    >
                      ReUpload
                    </p>
                  )}
                </>
              </div>
            </div>
          </div>
          <div className="flex mt-[18px]">
            <p className="text-[16px] text-[#6B7280] w-[160px] flex items-end mr-[100px]">Nama Partai</p>
            <input
              value={formPartai?.nama}
              onChange={(e) => setFormPartai({ ...formPartai, nama: e.target.value })}
              className="h-[43px] outline-0 w-full border border-[#D1D5DB] rounded-md text-[#374151] px-[14px]"
              placeholder="Input Nama Partai"
              type={"text"}
            />
          </div>
          <div className="flex justify-end mt-[29px] mb-[49px]">
            <div onClick={() => editPartai(id)} className="flex cursor-pointer items-center text-[18px] text-white font-semibold px-[21px] bg-[#E44700] rounded-md h-[43px]">
              Simpan Data
            </div>
            <div onClick={() => deletePartai(id)} className="h-[42px] w-[42px] flex items-center justify-center ml-2 rounded-md border border-[#B91C1C] cursor-pointer">
              <img src={deletImg.src} alt="delet.png" />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ListPartai;
