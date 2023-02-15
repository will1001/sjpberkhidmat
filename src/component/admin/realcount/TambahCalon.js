import React from "react";
import { useState } from "react";
import closeImg from "../../../utility/icon/closeForm.png";
import listImg from "../../../utility/icon/centerIcon.png";
import openImg from "../../../utility/icon/SelectIcon.png";
import uploadImg from "../../../utility/icon/uploadFoto.png";
import useFetch from "../../../API/useFetch";
import { useEffect } from "react";
import axiosFetch from "../../../API/axiosFetch";
import { useSelector } from "react-redux";

const TambahCalon = () => {
  const idPeriode = useSelector((state) => state.panel.idPeriode);
  const token = useSelector((state) => state.user.token);
  const [detailForm, setDetailForm] = useState();
  const getPartai = useFetch("get", "user/real_count/partai");
  const [Upload, setUpload] = useState();
  const [formData, setFormData] = useState({
    logo: undefined,
    name: "",
    id_partai: "",
    id_periode: "",
  });

  const postPartai = async () => {
    const a = new FormData();
    a.append("name", formData.name);
    a.append("id_periode", idPeriode);
    a.append("logo", formData.logo);
    a.append("id_partai", formData.id_partai);

    {
      await axiosFetch("post", `user/real_count/calon`, a, token)
        .then((res) => {
          console.log(res);

          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const uploadImage = (e) => setFormData({ ...formData, logo: e });

  console.log(formData);
  return (
    <>
      <div className="flex pl-[41px] h-[72px] bg-white border border-[#D1D5DB] rounded-t-md">
        <div className="flex items-center gap-2">
          <img src={listImg.src} alt="listImg.png" />
          <p className="text-[21px] text-[#374151] font-semibold"></p>
        </div>
        <div className="w-full ml-[13px] flex items-center text-[21px] text-[#374151] font-medium">-</div>

        <div onClick={() => setDetailForm(!detailForm)} className="flex items-center mr-[16px] cursor-pointer">
          {detailForm === false ? <img src={openImg.src} alt="open_detail.png" /> : <img src={closeImg.src} alt="close_detail.png" />}
        </div>
      </div>
      <div className={` bg-white border border-[#D1D5DB] px-[41px] ${detailForm === false ? "hidden" : "visible"}`}>
        <div className="flex mt-[38px]">
          <p className="text-[16px] text-[#6B7280] flex items-end mr-[142px]">Foto Calon</p>
          <div className="flex items-end gap-2">
            <div>{formData.logo !== undefined && <img className="w-[150px] h-[100px]" src={URL.createObjectURL(formData.logo)} />}</div>
            <div className="flex items-center gap-1 pl-[18px] pr-[24px] h-[43px] border border-[#E44700] rounded-md text-[18px] text-[#E44700] font-semibold">
              <div>
                <img src={uploadImg.src} alt="upload.png" />
              </div>

              {formData.logo === undefined ? (
                <label className="cursor-pointer" htmlFor="upload">
                  Upload
                  <input onChange={(e) => uploadImage(e.target.files[0])} className="hidden" type={"file"} id="upload" />
                </label>
              ) : (
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    setFormData({ ...formData, logo: undefined });
                  }}
                >
                  ReUpload
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex mt-[18px]">
          <p className="text-[16px] text-[#6B7280] w-[160px] flex items-end mr-[100px]">Nama Calon</p>
          <input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            className="h-[43px] outline-0 w-full border border-[#D1D5DB] rounded-md text-[#374151] px-[14px]"
            placeholder="Input Nama Calon"
            type={"text"}
          />
        </div>
        <div className="flex mt-[18px]">
          <p className="text-[16px] text-[#6B7280] w-[160px] flex items-end mr-[100px]">Faksi Partai</p>
          <select
            onChange={(e) =>
              setFormData({
                ...formData,
                id_partai: e.target.value,
              })
            }
            className="h-[43px] outline-0 w-full border border-[#D1D5DB] rounded-md text-[#374151] px-[14px]"
            type={"text"}
          >
            <option value="" disabled selected>
              Pilih Partai
            </option>
            {getPartai?.data?.map((res) => (
              <option className="text-[#374151] font-bold" key={res._id}>
                {res?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-[29px] mb-[49px]">
          <div onClick={postPartai} className="flex cursor-pointer items-center text-[18px] text-white font-semibold px-[21px] bg-[#E44700] rounded-md h-[43px]">
            Simpan Data
          </div>
        </div>
      </div>
    </>
  );
};

export default TambahCalon;
