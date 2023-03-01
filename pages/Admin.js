import React from "react";
import SideBar from "../src/component/sidebar/SideBar";
import AdminContent from "../src/component/sidebar/AdminContent";
import { withRouter } from "next/router";
import { logoSidebar } from "../src/utility/icon/LogoSidebar";
import CloseIcon from "../src/utility/icon/close.png";
import DownloadIcon from "../src/utility/icon/download.png";
import KeyIcon from "../src/utility/icon/key.png";
import homeIcn from "../src/utility/icon/home_icon.png";
import uploadFile from "../src/utility/icon/uploadIcon.png";
import peopleOrangeIcon from "../src/utility/icon/people-orange.png";
import lockOrangeIcon from "../src/utility/icon/lock-orange.png";

import { useDispatch, useSelector } from "react-redux";
import FormInputItem from "../src/component/FormInputItem";
import { setEditData, showOrHidePopUpDash, showOrHidePopUpDptDps } from "../src/redux/panelReducer";
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
  const dataDptDps = useFetch("get", "user/dpt_dps/statistik");
  const popUpDashType = useSelector((state) => state.panel.popUpDashType);
  const popUpDptDpsType = useSelector((state) => state.panel.popUpDptDpsType);
  const idPeriode = useSelector((state) => state.panel.idPeriode);
  const role = useSelector((state) => state.user.roles);
  const editData = useSelector((state) => state.panel.editData);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [clear, setClear] = useState(false);
  const [stopEditData, setStopEditData] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jmlPenduduk, setJmlPenduduk] = useState(null);
  const [jmlTps, setJmlTps] = useState(null);

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
  });

  const [formDataDPtDps, setFormDataDPtDps] = useState({
    file: "",
    id_periode: idPeriode,
  });
  useEffect(() => {
    setJmlPenduduk(dataDptDps.data?.jml_penduduk);
    setJmlTps(dataDptDps.data?.jml_tps);
    if (editData && !clear && !stopEditData) {
      setFormData({
        name: editData.name,
        email: editData.email,
        nik: editData.nik,
        phone: editData.phone,
        pekerjaan: popUpDashType === "Relawan" ? editData.pekerjaan : editData.pekerjaan?._id,
        id_kabupaten: editData.id_kabupaten,
        id_kecamatan: editData.id_kecamatan,
        target_desa: editData.target_desa,
        date_birth: editData.date_birth,
        place_birth: editData.place_birth,
        gender: editData.gender,
        address: editData.address,
      });
      setTimeout(() => {
        setStopEditData(true);
      }, 1000);
    }
    console.log(editData);
  }, [formData, editData, formDataDPtDps]);

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

  const importDPT = async () => {
    const a = new FormData();
    a.append("file", formDataDPtDps.file);
    a.append("id_periode", idPeriode);
    dispatch(showOrHidePopUpDptDps({ type: null }));

    {
      await axiosFetch("post", `user/dpt_dps/import`, a, token)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    location.reload();
  };
  const postDataDptDps = async () => {
    const a = new FormData();
    a.append("jml_penduduk", jmlPenduduk);
    a.append("jml_tps", jmlTps);
    dispatch(showOrHidePopUpDptDps({ type: null }));

    {
      await axiosFetch("post", `user/dpt_dps/statistik`, a, token)
        .then((res) => {
          // window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    location.reload();
  };

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
    }
    location.reload();
  };
  console.log(role);
  return (
    <div className="h-screen">
      <div className="flex">
        <div className=" basis-3/12 sticky  h-screen w-full  scrollbar-thumb-[#9CA3AF] scrollbar-thin scrollbar-track-[#E5E7EB] overflow-x-hidden">
          <SideBar content={<AdminContent />} />
        </div>
        <div className="basis-9/12 w-full h-screen sticky scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB] overflow-scroll">
          {logoSidebar.map((res, i) => {
            if (router.query.component === res.path) {
              return <div key={i}>{res.component}</div>;
            }
          })}
        </div>
        {(popUpDashType === "Relawan" || popUpDashType === "Simpatisan" || popUpDashType === "Akun Tim") && (
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
              <FormInputItem label={"Nama Akun"} type="text" onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
              <FormInputItem label={"Email"} type="text" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} disabled={editData && true} />
              <FormInputItem label={"No Hp"} type="text" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} value={formData.phone} />
              <FormInputItem label={"NIK"} type="text" onChange={(e) => setFormData({ ...formData, nik: e.target.value })} value={formData.nik} disabled={editData && true} />
              <FormSelect label={"Jenis Kelamin"} type="text" onChange={(e) => setFormData({ ...formData, gender: e.target.value })} options={gender} value={formData.gender} />
              <FormDatePlaceBirth
                onChangePlace={(e) => setFormData({ ...formData, place_birth: e.target.value })}
                valuePlace={formData.place_birth}
                onChangeDate={(e) => setFormData({ ...formData, date_birth: e.target.value })}
                valueDate={formData.date_birth}
              />
              {popUpDashType !== "Akun Tim" && <FormSelect label={"Pekerjaan"} type="text" onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })} options={pekerjaan} value={formData.pekerjaan?._id} />}

              <h1>ALAMAT {popUpDashType.toUpperCase()}</h1>
              <FormSelect label={"Kabupaten Kota"} type="text" onChange={(e) => changeKabupaten(e.target.value)} options={kabupaten} value={formData.id_kabupaten} />
              {popUpDashType !== "Akun Tim" && <FormSelect label={"Kecamatan"} type="text" onChange={(e) => changeKecamatan(e.target.value)} options={kecamatan} value={formData.id_kecamatan} />}
              {popUpDashType !== "Akun Tim" && <FormSelect label={"Target Desa"} type="text" onChange={(e) => setFormData({ ...formData, target_desa: e.target.value })} options={kelurahan} value={formData.target_desa} />}

              <FormInputItem label={"Alamat"} type="text" onChange={(e) => setFormData({ ...formData, address: e.target.value })} value={formData.address} />
              <div className="border-b-2 my-[30px]" />
              {(popUpDashType === "Relawan" || popUpDashType === "Akun Tim") && editData === null && (
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
                      <img src={KeyIcon.src} /> <span className="font-bold ml-3">Generate Password</span>
                    </div>
                  </div>
                  <FormInputPassword
                    label={""}
                    value={formData.password}
                    type={passwordType}
                    onclickShow={() => setPasswordType("text")}
                    onClickHide={() => setPasswordType("password")}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        {popUpDptDpsType === "import" && (
          <>
            <div className="w-full h-[200vh] absolute top-0">
              <div className="bg-black opacity-50 w-full h-[200vh] absolute top-0"></div>
              <div className="bg-white h-[400px] w-[400px] absolute top-[5%] left-[37%] p-5">
                <div className="flex justify-end cursor-pointer">
                  <img
                    onClick={() => {
                      dispatch(showOrHidePopUpDptDps({ type: null }));
                    }}
                    src={CloseIcon.src}
                  />
                </div>
                <h1>Impor Data DPT / DPS</h1>
                <div className="flex justify-between m-3">
                  <span>Contoh File</span>
                  <a href="https://file.sjpberkhidmat.id/format_dpt_dps.xlsx" className="flex items-center rounded-lg border-orange-500 border p-2 cursor-pointer">
                    <span className="mr-2 text-orange-500 font-bold">Download</span>
                    <img src={DownloadIcon.src} />
                  </a>
                </div>
                <div className="flex justify-between m-3">
                  <span>Upload file Import</span>
                  <label htmlfor="file_upload" className="h-[112px] border border-[#D1D5DB] cursor-pointer p-2">
                    <div></div>

                    <div className="flex flex-col items-center pt-4">
                      <img src={uploadFile.src} alt="upload here" />
                      <p className="text-[12px] text-[#000000] font-semibold">
                        <span className="text-[#FF5001]">Upload a file </span>of drag and drop{" "}
                      </p>
                      <p className="text-[12px] font-normal">.xls max 2MB</p>
                    </div>
                    <input
                      onChange={(e) => {
                        console.log(e.target.files);
                        setFormDataDPtDps({
                          ...formDataDPtDps,
                          file: e.target.files[0],
                        });
                      }}
                      id="file_upload"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <div
                    onClick={() => {
                      importDPT();
                    }}
                    className="h-[42px] w-[240px] bg-[#E44700] rounded-md  cursor-pointer  text-[18px] text-white font-semibold items-center justify-center gap-2 flex"
                  >
                    Impor Sekarang
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {popUpDptDpsType === "input_penduduk" && (
          <>
            <div className="w-full h-[200vh] absolute top-0">
              <div className="bg-black opacity-50 w-full h-[200vh] absolute top-0"></div>
              <div className="bg-white h-[450px] w-[400px] absolute top-[5%] left-[37%] p-5">
                <div className="flex justify-end cursor-pointer">
                  <img
                    onClick={() => {
                      dispatch(showOrHidePopUpDptDps({ type: null }));
                    }}
                    src={CloseIcon.src}
                  />
                </div>
                <h1>Jumlah Penduduk & TPS</h1>
                <br />

                <div className="flex bg-orange-100 rounded-lg p-3">
                  <img className="mr-3" src={peopleOrangeIcon.src} alt="" />
                  <span className="mr-3">{dataDptDps.data?.jml_penduduk}</span>
                  <span>Jumlah Penduduk</span>
                </div>
                <div className="flex bg-orange-100 rounded-lg p-3 mt-2">
                  <img className="mr-3" src={lockOrangeIcon.src} alt="" />
                  <span className="mr-3">{dataDptDps.data?.jml_tps}</span>
                  <span>Jumlah TPS</span>
                </div>
                <div className="flex items-center justify-start w-[400px] mt-[20px]">
                  <span className="mr-[20px]">Jumlah Penduduk</span>
                  <input
                    className="h-[40px] w-[50%] border text-[#374151] px-2 outline-0"
                    type="number"
                    onChange={(e) => {
                      setJmlPenduduk(e.target.value);
                    }}
                    // value={jmlPenduduk}
                  />
                </div>
                <div className="flex items-center justify-start w-[400px] mt-[20px]">
                  <span className="mr-[65px]">Jumlah TPS</span>
                  <input
                    className="h-[40px] w-[50%] border text-[#374151] px-2 outline-0"
                    type="number"
                    onChange={(e) => {
                      setJmlTps(e.target.value);
                    }}
                    // value={jmlTps}
                  />
                </div>
                <br />
                <div
                  onClick={() => {
                    postDataDptDps();
                  }}
                  className="h-[42px] w-[240px] bg-[#E44700] rounded-md  cursor-pointer  text-[18px] text-white font-semibold items-center justify-center gap-2 flex"
                >
                  Simpan Data
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default withRouter(Admin);
