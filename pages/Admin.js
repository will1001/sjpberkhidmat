import React from "react";
import SideBar from "../src/component/sidebar/SideBar";
import AdminContent from "../src/component/sidebar/AdminContent";
import { withRouter } from "next/router";
import { logoSidebar } from "../src/utility/icon/LogoSidebar";
import CloseIcon from "../src/utility/icon/close.png";
import KeyIcon from "../src/utility/icon/key.png";
import homeIcn from "../src/utility/icon/home_icon.png";
import { useDispatch, useSelector } from "react-redux";
import FormInputItem from "../src/component/FormInputItem";
import { showOrHidePopUpDash } from "../src/redux/panelReducer";
import FormSelect from "../src/component/FormSelect";
import FormDatePlaceBirth from "../src/component/admin/FormDatePlaceBirth";
import useFetch from "../src/API/useFetch";
import { useState } from "react";
import FormInputPassword from "../src/component/FormInputPassword";
import { useEffect } from "react";
import { DaftarRelawanIcon } from "../src/utility/icon/icon";
import axiosFetch from "../src/API/axiosFetch";
var generator = require("generate-password");

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
  const popUpDashType = useSelector((state) => state.panel.popUpDashType);

  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  useEffect(() => {}, [formData]);

  const generatePassword = () => {
    // setFormData({ ...formData, password: e.target.value });
    // if (formData.password !== confirmPassword) alert("Password Tidak sama");
    var password = generator.generate({
      length: 10,
      numbers: true,
    });

    setFormData({ ...formData, password: password });
    setConfirmPassword(password);
  };

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

  const register = async () => {
    if (popUpDashType === "Relawan") {
      if (formData.password === confirmPassword) {
        await axiosFetch("post", `user/register`, formData)
          .then(() => {
            alert("Pendaftaran Berhasil");
            dispatch(showOrHidePopUpDash({ type: null }));
          })
          .catch((error) => {
            // setHandelError(true);
            // setErrorMessage(error.response.data.message);
          });
      } else {
        alert("Password Tidak Sama");
      }
    } else {
      let formDataSimpatisan = formData;
      delete formDataSimpatisan.role;
      delete formDataSimpatisan.password;
      console.log(formDataSimpatisan);
      await axiosFetch("post", `user/simpatisan`, formDataSimpatisan)
        .then((res) => {
          console.log(res, "berhasil daftar");
          alert("Pendaftaran Berhasil");

          dispatch(showOrHidePopUpDash({ type: null }));
          // setHandelSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          // setHandelError(true);
          // setErrorMessage(err.response.data.message);
        });
    }
  };

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
        {(popUpDashType === "Relawan" || popUpDashType === "Simpatisan") && (
          <div className="w-full h-[200vh] absolute top-0">
            <div className="bg-black opacity-50 w-full h-[200vh] absolute top-0"></div>
            <div className="bg-white h-[1100px] w-[700px] absolute top-[5%] left-[33%] p-5">
              <div className="flex justify-end cursor-pointer">
                <img
                  onClick={() => {
                    dispatch(showOrHidePopUpDash({ type: null }));
                  }}
                  src={CloseIcon.src}
                />
              </div>
              <div className="font-bold text-4xl">Tambah {popUpDashType}</div>
              <FormInputItem
                label={"Nama Akun"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <FormInputItem
                label={"Email"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FormInputItem
                label={"No Hp"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <FormInputItem
                label={"NIK"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, nik: e.target.value })
                }
              />
              <FormSelect
                label={"Jenis Kelamin"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                options={gender}
              />
              <FormDatePlaceBirth
                onChangePlace={(e) =>
                  setFormData({ ...formData, place_birth: e.target.value })
                }
                onChangeDate={(e) =>
                  setFormData({ ...formData, date_birth: e.target.value })
                }
              />
              <FormSelect
                label={"Pekerjaan"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, pekerjaan: e.target.value })
                }
                options={pekerjaan}
              />
              <h1>ALAMAT {popUpDashType.toUpperCase()}</h1>
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
                onChange={(e) =>
                  setFormData({ ...formData, target_desa: e.target.value })
                }
                options={kelurahan}
              />
              <FormInputItem
                label={"Alamat"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <div className="border-b-2 my-[30px]" />

              {popUpDashType === "Relawan" && (
                <>
                  {" "}
                  <div className="flex justify-start items-center">
                    <div className="w-[20%] mr-[50px]">Set Password</div>
                    <div
                      onClick={() => {
                        generatePassword();
                      }}
                      className="flex items-center border-2 rounded-md p-3 cursor-pointer"
                    >
                      <img src={KeyIcon.src} />{" "}
                      <span className="font-bold ml-3">Generate Password</span>
                    </div>
                  </div>
                  <FormInputPassword
                    label={""}
                    value={formData.password}
                    type={passwordType}
                    onclickShow={() => setPasswordType("text")}
                    onClickHide={() => setPasswordType("password")}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <FormInputPassword
                    label={"Tulis Ulang Password"}
                    value={confirmPassword}
                    type={passwordType2}
                    onclickShow={() => setPasswordType2("text")}
                    onClickHide={() => setPasswordType2("password")}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </>
              )}

              <div className="flex mt-[40px] justify-end">
                <div
                  onClick={() => router.push("HomePage")}
                  className="h-[42px] mr-3 px-4 cursor-pointer flex justify-center items-center gap-2 border border-[#374151] text-[#374151] rounded-md"
                >
                  {/* <img src={homeIcn.src} /> */}
                  <p className="text-[18px] font-semibold">Bersihkan </p>
                </div>
                <div
                  onClick={() => {
                    register();
                  }}
                  className="h-[42px] w-[240px] bg-[#E44700] rounded-md  cursor-pointer  text-[18px] text-white font-semibold items-center justify-center gap-2 flex"
                >
                  Buat Akun <DaftarRelawanIcon />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default withRouter(Admin);
