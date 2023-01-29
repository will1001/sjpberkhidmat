import React from "react";
import SideBar from "../src/component/sidebar/SideBar";
import AdminContent from "../src/component/sidebar/AdminContent";
import { withRouter } from "next/router";
import { logoSidebar } from "../src/utility/icon/LogoSidebar";
import { BackIcon } from "../src/utility/icon/icon";
import CloseButton from "../src/utility/icon/close.png";
import { useDispatch, useSelector } from "react-redux";
import FormInputItem from "../src/component/FormInputItem";
import { showPopUpDashRelawan } from "../src/redux/panelReducer";
import FormSelect from "../src/component/FormSelect";
import FormDatePlaceBirth from "../src/component/admin/FormDatePlaceBirth";
import useFetch from "../src/API/useFetch";
import { useState } from "react";
import FormInputPassword from "../src/component/FormInputPassword";

const gender = {
  data: [
    {
      id: "L",
      name: "L",
    },
    {
      id: "P",
      name: "P",
    },
  ],
};

function Admin({ router }) {
  const kabupaten = useFetch("get", "user/kabupaten");
  const pekerjaan = useFetch("get", "user/jobs");

  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");

  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    email: "",
    role: "relawan",
    phone: "",
    pekerjaan: "",
    id_kabupaten: "",
    id_kecamatan: "",
    target_desa: "",
    password: "",
    date_birth: "",
    place_birth: "",
    gender: "",
    address: "",
  });

  const changeKabupaten = async (idKabupaten) => {
    setFormData({ ...formData, id_kabupaten: idKabupaten });
    const res = await axiosFetch("get", `user/kecamatan/${idKabupaten}`);
    setKecamatan(res.data);
  };

  const changeKecamatan = async (idKecamatan) => {
    setFormData({ ...formData, id_kecamatan: idKecamatan });
    const res = await axiosFetch("get", `user/kelurahan/${idKecamatan}`);
    setKelurahan(res.data);
  };

  const popUpDashRelawan = useSelector((state) => state.panel.popUpDashRelawan);
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex ">
        <div className="basis-3/12 h-full ">
          <div className="flex cursor-pointer justify-end"></div>
          <SideBar content={<AdminContent />} />
        </div>
        <div className="basis-9/12">
          {logoSidebar.map((res, i) => {
            if (router.query.component === res.path) {
              return <div key={i}>{res.component}</div>;
            }
          })}
        </div>
        {popUpDashRelawan && (
          <div className="w-full h-[200vh] absolute top-0">
            <div className="bg-black opacity-50 w-full h-[200vh] absolute top-0"></div>
            <div className="bg-white h-[900px] w-[690px] absolute top-[5%] left-[33%] p-5">
              <div className="flex justify-end cursor-pointer">
                <img
                  onClick={() => {
                    dispatch(showPopUpDashRelawan());
                  }}
                  src={CloseButton.src}
                />
              </div>
              <div className="font-bold text-4xl">Tambah Akun Relawan</div>
              <FormInputItem
                label={"Nama Akun"}
                type="text"
                onChange={() => {}}
              />
              <FormInputItem label={"Email"} type="text" onChange={() => {}} />
              <FormInputItem
                label={"No Hp Relawan"}
                type="text"
                onChange={() => {}}
              />
              <FormInputItem label={"NIK"} type="text" onChange={() => {}} />
              <FormSelect
                label={"Jenis Kelamin"}
                type="text"
                onChange={() => {}}
                options={gender}
              />
              <FormDatePlaceBirth
                onChangePlace={() => {}}
                onChangeDate={() => {}}
              />
              <FormSelect
                label={"Pekerjaan"}
                type="text"
                onChange={() => {}}
                options={pekerjaan}
              />
              <h1>ALAMAT RELAWAN</h1>
              <FormSelect
                label={"Kabupaten Kota"}
                type="text"
                onChange={(e) => changeKabupaten(e.target.value)}
                options={kabupaten}
              />
              <FormSelect
                label={"Kecamatan"}
                type="text"
                onChange={(e) => changeKecamatan(e.target.value)}
                options={kecamatan}
              />
              <FormSelect
                label={"Target Desa"}
                type="text"
                onChange={() => {}}
                options={kelurahan}
              />
              <FormInputItem label={"Alamat"} type="text" onChange={() => {}} />
              <div className="border-b-2 my-[30px]" />

              <FormInputPassword
                label={"Set Password"}
                type={passwordType}
                onclickShow={() => setPasswordType("text")}
                onClickHide={() => setPasswordType("password")}
                onChange={() => {}}
              />
              <FormInputPassword
                label={"Tulis Ulang Password"}
                type={passwordType2}
                onclickShow={() => setPasswordType2("text")}
                onClickHide={() => setPasswordType2("password")}
                onChange={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default withRouter(Admin);
