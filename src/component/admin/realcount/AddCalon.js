import React, { useEffect, useState } from "react";
import uploadImg from "../../../utility/icon/uploadFoto.png";
import listImg from "../../../utility/icon/centerIcon.png";
import closeImg from "../../../utility/icon/closeForm.png";
import openImg from "../../../utility/icon/SelectIcon.png";
import deletImg from "../../../utility/icon/delet_icon.png";
import ReactImageUploading from "react-images-uploading";
import axiosFetch from "../../../API/axiosFetch";
import useFetch from "../../../API/useFetch";
import { useRouter } from "next/router";

const AddCalon = ({ nama, logo, partai, nomor }) => {
  const [detailForm, setDetailForm] = useState();
  const router = useRouter();

  const [formPartai, setFormPartai] = useState({
    logo: "",
    name: "",
    id_partai: "",
  });
  const [formEdit, setFormEdit] = useState({
    logo: logo,
    name: nama,
    id_partai: partai,
  });
  const [image, setImage] = useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, "image lis");
    setFormPartai({ ...formPartai, logo: imageList });
  };
  const ubahLogo = () => {
    setFormPartai({ ...formPartai, logo: imageList });
  };

  const postPartai = async () => {
    const a = new FormData();
    a.append("name", formPartai.name);
    a.append("logo", formPartai.logo[0].file);
    a.append("id_partai", formPartai.id_partai);

    {
      await axiosFetch("post", `user/real_count/calon`, a)
        .then((res) => {
          console.log(res);
          console.log(a);
          setFormPartai({ id_partai: "", logo: "", name: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (nama === undefined) {
      setDetailForm(true);
    } else {
      setDetailForm(false);
    }
  }, []);

  const getPartai = useFetch("get", "user/real_count/partai");

  console.log(nomor);
  return (
    <>
      <div className="flex pl-[41px] h-[72px] bg-white border border-[#D1D5DB] rounded-t-md">
        <div className="flex items-center gap-2">
          <img src={listImg.src} alt="listImg.png" />
          {nomor === undefined ? <p className="text-[21px] text-[#374151] font-semibold"></p> : <p className="text-[21px] text-[#374151] font-semibold">{nomor}</p>}
        </div>
        {nama === undefined ? <div className="w-full ml-[13px] flex items-center text-[21px] text-[#374151] font-medium"></div> : <div className="w-full ml-[13px] flex items-center text-[21px] text-[#374151] font-medium">{nama}</div>}

        <div onClick={() => setDetailForm(!detailForm)} className="flex items-center mr-[16px] cursor-pointer">
          {detailForm === false ? <img src={openImg.src} alt="open_detail.png" /> : <img src={closeImg.src} alt="close_detail.png" />}
        </div>
      </div>
      {/*  */}

      <ReactImageUploading multiple value={formPartai.logo} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          <>
            <div className={` bg-white border border-[#D1D5DB] px-[41px] ${detailForm === false ? "hidden" : "visible"}`}>
              <div className="flex mt-[38px]">
                <p className="text-[16px] text-[#6B7280] flex items-end mr-[142px]">Foto Calon</p>
                <div className="flex  items-end">
                  {imageList.map((image, index) => (
                    <div key={index} className="mr-2 flex items-end">
                      <img className="flex" src={image["data_url"]} alt="" width="137" />
                    </div>
                  ))}
                  <div className="flex items-center gap-1 pl-[18px] pr-[24px] h-[43px] border border-[#E44700] rounded-md text-[18px] text-[#E44700] font-semibold">
                    <div>
                      <img src={uploadImg.src} alt="upload.png" />
                    </div>
                    {logo === undefined ? (
                      <>
                        {imageList.length === 0 ? (
                          <p className="cursor-pointer" onClick={onImageUpload}>
                            Upload Foto
                          </p>
                        ) : (
                          <p
                            className="cursor-pointer"
                            onClick={() => {
                              onImageRemove(imageList);
                              ubahLogo;
                            }}
                          >
                            ReUpload
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        {logo === undefined ? (
                          <p className="cursor-pointer" onClick={onImageUpload}>
                            Upload Foto
                          </p>
                        ) : (
                          <p
                            className="cursor-pointer"
                            onClick={() => {
                              onImageRemove(imageList);
                              ubahLogo;
                            }}
                          >
                            ReUpload
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex mt-[18px]">
                <p className="text-[16px] text-[#6B7280] w-[160px] flex items-end mr-[100px]">Nama Calon</p>
                <input
                  value={nama === undefined ? formPartai?.name : formEdit?.name}
                  onChange={(e) => {
                    nama === undefined ? setFormPartai({ ...formPartai, name: e.target.value }) : setFormEdit({ ...formEdit, name: e.target.value });
                  }}
                  className="h-[43px] outline-0 w-full border border-[#D1D5DB] rounded-md text-[#374151] px-[14px]"
                  placeholder="Input Nama Calon"
                  type={"text"}
                />
              </div>
              <div className="flex mt-[18px]">
                <p className="text-[16px] text-[#6B7280] w-[160px] flex items-end mr-[100px]">Faksi Partai</p>
                <select
                  value={partai === undefined ? formPartai.id_partai : formEdit.id_partai}
                  onChange={(e) => (partai === undefined ? setFormPartai({ ...formPartai, id_partai: e.target.value }) : setFormEdit({ ...formEdit, id_partai: e.target.value }))}
                  className="h-[43px] outline-0 w-full border border-[#D1D5DB] rounded-md text-[#374151] px-[14px]"
                  type={"text"}
                >
                  {getPartai?.data?.map((res) => (
                    <option className="text-[#374151] font-bold" key={res._id}>
                      {res?.name}
                    </option>
                  ))}
                </select>
              </div>
              {nama === undefined ? (
                <>
                  {" "}
                  <div className="flex justify-end mt-[29px] mb-[49px]">
                    <div onClick={postPartai} className="flex cursor-pointer items-center text-[18px] text-white font-semibold px-[21px] bg-[#E44700] rounded-md h-[43px]">
                      Simpan Data
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-end mt-[29px] mb-[49px]">
                    <div onClick={postPartai} className="flex cursor-pointer items-center text-[18px] text-white font-semibold px-[21px] bg-[#E44700] rounded-md h-[43px]">
                      Simpan Data
                    </div>
                    <div onClick={() => console.log(id)} className="h-[42px] w-[42px] flex items-center justify-center ml-2 rounded-md border border-[#B91C1C] cursor-pointer">
                      <img src={deletImg.src} alt="delet.png" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </ReactImageUploading>
    </>
  );
};

export default AddCalon;
