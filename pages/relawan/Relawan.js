import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logistik from "../../src/component/admin/Logistik";
import RealCount from "../../src/component/admin/RealCount";
import SimpatisanDash from "../../src/component/admin/SimpatisanDash";
import RumahAspirasi from "../../src/component/aspirasi/RumahAspirasi";
import RelawanContent from "../../src/component/sidebar/RelawanContent";
import SideBar from "../../src/component/sidebar/SideBar";
import Logo from "../../src/utility/Logo";
import CloseIcon from "../../src/utility/icon/close.png";
import FormInputItem from "../../src/component/FormInputItem";
import FormSelect from "../../src/component/FormSelect";
import FormDatePlaceBirth from "../../src/component/admin/FormDatePlaceBirth";
import useFetch from "../../src/API/useFetch";

const Relawan = () => {
  const [selectTool, setSelectTool] = useState("Real Count");
  const name = useSelector((state) => state.user.name);
  const role = useSelector((state) => state.user.roles);
  const [popupPeriode, setPopupPeriode] = useState(false);
  const editData = useSelector((state) => state.panel.editData);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const roles = useSelector((state) => state.user.roles);
  const popUpDashType = useSelector((state) => state.panel.popUpDashType);
  const idPeriode = useSelector((state) => state.panel.idPeriode);
  const pekerjaan = useFetch("get", "user/jobs");
  const kabupaten = useFetch("get", "user/kabupaten");

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

  const [formData, setFormData] = useState({
    name: "",
    id_periode: idPeriode,
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
    detail: "",
    kebutuhan: "",
  });

  const register = async () => {
    if (popUpDashType === "Relawan") {
      if (editData) {
        console.log(formData);

        await axiosFetch("put", `user/users`, formData, token)
          .then(() => {
            alert("Edit Berhasil");
            dispatch(showOrHidePopUpDash({ type: null }));
          })
          .catch((error) => {
            // setHandelError(true);
            // setErrorMessage(error.response.data.message);
          });
      } else {
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
      }
    } else if (popUpDashType === "Akun Tim") {
      let formDataSimpatisan = formData;
      formDataSimpatisan.role = "koordinator";
      delete formDataSimpatisan.phone;
      delete formDataSimpatisan.pekerjaan;
      delete formDataSimpatisan.target_desa;
      formDataSimpatisan.id_kecamatan = "5201010";

      if (formData.password === confirmPassword) {
        await axiosFetch("post", `user/register`, formDataSimpatisan)
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
      if (editData) {
        console.log(formData);
        await axiosFetch("put", `user/users`, formData, token)
          .then(() => {
            alert("Edit Berhasil");
            dispatch(showOrHidePopUpDash({ type: null }));
          })
          .catch((error) => {
            // setHandelError(true);
            // setErrorMessage(error.response.data.message);
          });
      } else {
        let formDataSimpatisan = formData;
        delete formDataSimpatisan.role;
        delete formDataSimpatisan.password;

        await axiosFetch(
          "post",
          roles === "admin" ? `user/simpatisan` : `user/relawan/simpatisan`,
          formDataSimpatisan,
          roles === "admin" ? undefined : token
        )
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
    }
    location.reload();
  };

  return (
    <div className="flex h-screen">
      <div className="basis-3/12 sticky min-h-screen overflow-scroll  scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]">
        <SideBar
          content={
            <RelawanContent
              setPopupPeriode={setPopupPeriode}
              username={name}
              role={role}
              setSelectTool={setSelectTool}
            />
          }
        />
      </div>
      <div
        className={`${
          popupPeriode === true && "-z-50"
        } basis-9/12 overflow-scroll scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]`}
      >
        {selectTool === "Real Count" && <RealCount user={"Relawan"} />}
        {selectTool === "Logistik" && <Logistik />}
        {selectTool === "Simpatisan" && <SimpatisanDash />}
        {selectTool === "Aspirasi" && <RumahAspirasi />}
      </div>
      {(popUpDashType === "Relawan" ||
        popUpDashType === "Simpatisan" ||
        popUpDashType === "Akun Tim") && (
        <div className="w-full h-[200vh] absolute top-0">
          <div className="bg-black opacity-50 w-full h-[200vh] absolute top-0"></div>
          <div className="bg-white h-[1100px] w-[700px] absolute top-[5%] left-[33%] p-5">
            <div className="flex justify-end cursor-pointer">
              <img
                onClick={() => {
                  dispatch(showOrHidePopUpDash({ type: null }));
                  dispatch(setEditData({ editData: null }));
                  setClear(false);
                  setStopEditData(false);
                  setFormData({
                    name: "",
                    id_periode: idPeriode,
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
              value={formData.name}
            />
            <FormInputItem
              label={"Email"}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              disabled={editData && true}
            />
            <FormInputItem
              label={"No Hp"}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              value={formData.phone}
            />
            <FormInputItem
              label={"NIK"}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, nik: e.target.value })
              }
              value={formData.nik}
              disabled={editData && true}
            />
            <FormSelect
              label={"Jenis Kelamin"}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              options={gender}
              value={formData.gender}
            />
            <FormDatePlaceBirth
              onChangePlace={(e) =>
                setFormData({ ...formData, place_birth: e.target.value })
              }
              valuePlace={formData.place_birth}
              onChangeDate={(e) =>
                setFormData({ ...formData, date_birth: e.target.value })
              }
              valueDate={formData.date_birth}
            />
            {popUpDashType !== "Akun Tim" && (
              <FormSelect
                label={"Pekerjaan"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, pekerjaan: e.target.value })
                }
                options={pekerjaan}
                value={formData.pekerjaan?._id}
              />
            )}

            <h1>ALAMAT {popUpDashType.toUpperCase()}</h1>
            <FormSelect
              label={"Kabupaten Kota"}
              type="text"
              onChange={(e) => changeKabupaten(e.target.value)}
              options={kabupaten}
              value={formData.id_kabupaten}
            />
            {popUpDashType !== "Akun Tim" && (
              <FormSelect
                label={"Kecamatan"}
                type="text"
                onChange={(e) => changeKecamatan(e.target.value)}
                options={kecamatan}
                value={formData.id_kecamatan}
              />
            )}
            {popUpDashType !== "Akun Tim" && (
              <FormSelect
                label={"Target Desa"}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, target_desa: e.target.value })
                }
                options={kelurahan}
                value={formData.target_desa}
              />
            )}

            <FormInputItem
              label={"Alamat"}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              value={formData.address}
            />
            <div className="border-b-2 my-[30px]" />
            {(popUpDashType === "Relawan" || popUpDashType === "Akun Tim") &&
              editData === null && (
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
                onClick={() => {
                  setClear(true);
                  setFormData({
                    name: "",
                    id_periode: idPeriode,
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
                }}
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
  );
};

export default Relawan;
