import React, { useEffect, useState } from "react";
import {
  BackIcon,
  ChatIcon,
  DeletIcon,
  DetailIcon,
  DropDownIcon,
  NextIcon,
  PrevIcon,
  ReadIcon,
  RelawanIcon,
  SearchIcon,
} from "../../utility/icon/icon";
import ChatInput from "../logistik/ChatInput";
import alert from "../../utility/img/alert_broadcast.png";
import CarIcon from "../../utility/icon/car.png";
import PackageIcon from "../../utility/icon/package.png";

import forum from "../../utility/img/forum.png";
import ButtonPrimary from "../ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { setEditData, showOrHidePopUpDash } from "../../redux/panelReducer";
import useFetch from "../../API/useFetch";
import Moment from "moment";
import "moment/locale/id";
import axiosFetch from "../../API/axiosFetch";
import Pagination from "../Pagination";
import { useRouter } from "next/router";
import SelectIconButton from "../SelectIconButton";

const Logistik = ({ popupMobile }) => {
  const [popup, setPopup] = useState(false);
  const [popupPage, setPopupPage] = useState();
  const [popupPengajuan, setPopupPengajuan] = useState(false);
  const [kabupaten, setKabupaten] = useState();
  const [getKecamatans, setGetKecamatans] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [getKelurahans, setGetKelurahans] = useState();
  const [kelurahan, setKelurahan] = useState();
  const [logistikStatus, setLogistikStatus] = useState("");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [loadNewChat, setLoadNewChat] = useState(false);
  const [chats, setChat] = useState([]);
  const [nomor, setnomor] = useState();
  const [chatTargetId, setChatTargetId] = useState("");
  const [detailLogistik, setdetailLogistik] = useState();
  const [alertHapus, setAlertHapus] = useState(false);
  const [logistik, setLogistik] = useState();
  const [deleteId, setDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [jmlLogistikDisetujui, setJmlLogistikDisetujui] = useState(0);
  const getAPK = useFetch("get", "user/apk?page=1&limit=1000");
  const router = useRouter();

  const handlePopUp = async (name, id_relawan, data, nomor) => {
    console.log("data logistik");
    console.log(data);
    console.log("data logistik");
    setPopup(true);
    name !== popupPage ? setPopupPage(name) : setPopupPage();
    setChatTargetId(id_relawan);
    getChats(id_relawan);
    setdetailLogistik(data);
    setLogistikStatus(data.status);
    setJmlLogistikDisetujui(data?.jumlah);
    setnomor(nomor);
  };

  const token = useSelector((state) => state.user.token);
  const roles = useSelector((state) => state.user.roles);
  const id_kabupaten = useSelector((state) => state.user.id_kabupaten);
  const name = useSelector((state) => state.user.name);
  const emaill = useSelector((state) => state.user.email);
  const periode = useSelector((state) => state.panel.idPeriode);

  const [formPengajuan, setFormPengajuan] = useState({
    id_kabupaten: undefined,
    id_kecamatan: undefined,
    id_kelurahan: undefined,
    kebutuhan: undefined,
    detail: undefined,
    id_periode: periode,
  });

  const getKabupaten = useFetch("get", "user/kabupaten");

  const setujuiLogistik = () => {
    console.log("asdasd");
    axiosFetch(
      "patch",
      "user/logistik/status/" + detailLogistik?._id,
      {
        status: logistikStatus,
        jml_logistik: jmlLogistikDisetujui,
      },
      token
    )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Moment.locale("id");

  const getChats = async (id_relawan) => {
    {
      await axiosFetch(
        "get",
        `user/chats?offset=0&target=${id_relawan}`,
        [],
        token
      )
        .then((res) => {
          setChat(res.data);
          // window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const postLogistik = () => {
    axiosFetch("post", "user/logistik", formPengajuan, token)
      .then((res) => setPopupPengajuan(false))
      .catch((err) => {
        console.log(err);
      });
  };

  const deletLogistik = (id) =>
    axiosFetch("delete", `user/logistik/${id}`, {}, token)
      .then((res) => {
        console.log(res);
        setAlertHapus(false);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    axiosFetch("get", `user/kecamatan/${kabupaten}`)
      .then((res) => setGetKecamatans(res.data))
      .catch((err) => console.log(err));

    axiosFetch("get", `user/kelurahan/${kecamatan}`)
      .then((res) => setGetKelurahans(res.data))
      .catch((err) => console.log(err));

    axiosFetch(
      "get",
      `user/logistik?page=${currentPage}${
        roles === "koordinator" ? `&id_kabupaten=${id_kabupaten}` : ""
      }${
        router.query.id_kabupaten !== undefined
          ? "&id_kabupaten=" + router.query.id_kabupaten
          : ""
      }${
        router.query.id_kecamatan !== undefined
          ? "&id_kecamatan=" + router.query.id_kecamatan
          : ""
      }`,
      {},
      token
    )
      .then((res) => {
        setLogistik(res.data);
      })
      .catch((err) => console.log(err));
  }, [kabupaten, kecamatan, popupPengajuan, alertHapus, currentPage]);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(logistik);
  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 950 ? (
        <div className="px-[16px] pt-[20px] pb-[100px]">
          <p className="text-[24px] text-[#374151] font-bold">Logistik</p>
          <div
            onClick={() => setPopupPengajuan(true)}
            className="bg-[#E44700] font-semibold w-[170px] mt-[16px] text-white rounded-md cursor-pointer py-2 px-4 "
          >
            Tambah Pengajuan
          </div>
          <div className="flex text-[12px] stroke-[#374151] w-full border justify-between px-2 py-1 rounded-sm mt-[19px]">
            <input
              placeholder="Cari Data..."
              className="outline-none w-full pr-2"
              type={"text"}
            />
            <SearchIcon />
          </div>
          <div className="flex gap-3 mt-3">
            <select
              onChange={(e) => {
                setKabupaten(e.target.value);
                setFormPengajuan({
                  ...formPengajuan,
                  id_kabupaten: e.target.value,
                });
              }}
              className="border py-2 px-2 text-[10px] rounded-sm outline-none w-full"
            >
              <option selected={"disabled"}>Pilih Kabupaten / Kota</option>
              {getKabupaten?.data?.map((res) => (
                <option className="mb-2" key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setKecamatan(e.target.value);
                setFormPengajuan({
                  ...formPengajuan,
                  id_kecamatan: e.target.value,
                });
              }}
              className="border py-2 px-2 text-[10px] rounded-sm outline-none w-full"
            >
              <option selected={"disabled"}>Pilih Kecamatan</option>
              {getKecamatans?.data?.map((res) => (
                <option className="mb-2" key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`${
              popupMobile === true && "scrollbar-none"
            } flex overflow-x-auto pb-4 rounded-sm mt-[24px] scrollbar-thin scrollbar-track-[#D1D5DB] scrollbar-thumb-[#374151]`}
          >
            <table className="tabel-auto">
              <thead className="bg-[#374151]  ">
                <tr className="h-[51px] text-white ">
                  <th
                    scope="col"
                    className=" px-2 py-3 text-left text-xs font-medium text-clip"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className=" px-2 py-3 text-left text-xs font-medium text-clip"
                  >
                    tgl Pengajuan
                  </th>
                  <th
                    scope="col"
                    className=" px-2 py-3 text-left text-xs font-medium text-clip"
                  >
                    Kab / Kota
                  </th>
                  <th
                    scope="col"
                    className=" px-2 py-3 text-left text-xs font-medium text-clip"
                  >
                    Kebutuhan
                  </th>
                  <th
                    scope="col"
                    className=" px-2 py-3 text-left text-xs font-medium"
                  >
                    Kecamatan
                  </th>
                  <th scope="col" className=" px-2 py-3 text-xs font-medium">
                    Relawan
                  </th>
                  <th scope="col" className=" px-2 py-3 text-xs font-medium">
                    Status
                  </th>
                  <th
                    scope="col"
                    className={`border-l-2 bg-[#374151] px-2 py-3 sticky right-0 ${
                      popupPage === "chat" && "-z-50"
                    } text-white  text-xs font-medium`}
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {logistik !== undefined &&
                  logistik.data?.map((res, i) => {
                    return (
                      <tr
                        className={`${
                          (i + 1) % 2 !== 0 ? "bg-[#F9FAFB]" : "bg-white"
                        }  h-[52px]`}
                      >
                        <td className="px-2 py-3">{++i}</td>
                        <td className=" px-2 py-3 whitespace-nowrap">
                          {Moment(res.createdAt).format("DD-MMMM-YYYY")}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          {res.kabupaten.name}
                        </td>
                        <td className="w-[120px] px-2 py-3">{res.apk.nama}</td>
                        <td className="w-[120px] px-2 py-3">
                          {res.kecamatan.name}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          {res.relawan[0]?.name}
                        </td>
                        <td className="px-2 py-3 ">
                          <div className="bg-[#FEF3C7] border-[#F59E0B] border text-[#D97706] font-medium rounded-md text-center px-6 py-2">
                            {res.status}
                          </div>
                        </td>

                        <td
                          className={`px-2 py-3 border-l-2  ${
                            (i + 1) % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"
                          } sticky right-0 ${popupPage === "chat" && "-z-50"}`}
                        >
                          <div className="flex items-center justify-center gap-3">
                            <div
                              onClick={() =>
                                handlePopUp("chat", res.id_relawan, res)
                              }
                              className={`${
                                alertHapus === true && "hidden"
                              } cursor-pointer`}
                            >
                              <DetailIcon />
                            </div>
                            {alertHapus !== false && res._id === deleteId ? (
                              <div className="flex gap-3 items-center justify-center">
                                <div
                                  className="cursor-pointer border-2 font-medium border-[#374151] py-1 px-3 rounded-md"
                                  onClick={() => setAlertHapus(false)}
                                >
                                  Batal
                                </div>
                                <div
                                  className="bg-[#DC2626] border-2 border-[#DC2626] text-white font-medium py-1 px-3 cursor-pointer rounded-md"
                                  onClick={() => deletLogistik(res._id)}
                                >
                                  Hapus
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setAlertHapus(true);
                                  setDeleteId(res._id);
                                }}
                                className={`${
                                  alertHapus === true && "hidden"
                                } cursor-pointer`}
                              >
                                <DeletIcon />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <Pagination
            mobile={true}
            total_page={logistik?.metadata?.totalPage}
            total={logistik?.metadata?.total}
            current_page={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {popupPengajuan === true && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-[#37415152]">
              <div className=" bg-white pt-[24px] px-[16px] text-[#374151] h-screen overflow-scroll scrollbar-thin scrollbar-thumb-[#374151]">
                <div
                  onClick={() => setPopupPengajuan(false)}
                  className="absolute right-0 top-0 pr-2 font-medium cursor-pointer text-[#9CA3AF] text-[21px]"
                >
                  X
                </div>
                <p className="text-[21px] text-center mb-[21px] font-bold">
                  Tambah Pengajuan Logistik
                </p>
                <div className="text-[14px]">
                  <div className="flex flex-col gap-2 mb-3">
                    <label
                      className="w-[180px] items-center flex"
                      htmlFor="nama_relawan"
                    >
                      Nama Relawan
                    </label>
                    <input
                      className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                      type={"text"}
                      id="nama_relawan"
                      value={name}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label
                      className="w-[180px] items-center flex"
                      htmlFor="nama_relawan"
                    >
                      Kabupaten / Kota
                    </label>
                    <select
                      onChange={(e) => {
                        setKabupaten(e.target.value);
                        setFormPengajuan({
                          ...formPengajuan,
                          id_kabupaten: e.target.value,
                        });
                      }}
                      className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                    >
                      <option selected={"disabled"}>
                        Pilih Kabupaten / Kota
                      </option>
                      {getKabupaten?.data?.map((res) => (
                        <option className="mb-2" key={res._id} value={res._id}>
                          {res.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label
                      className="w-[180px] items-center flex"
                      htmlFor="nama_relawan"
                    >
                      Kecamatan
                    </label>
                    <select
                      onChange={(e) => {
                        setKecamatan(e.target.value);
                        setFormPengajuan({
                          ...formPengajuan,
                          id_kecamatan: e.target.value,
                        });
                      }}
                      className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                    >
                      <option selected={"disabled"}>Pilih Kecamatan</option>
                      {getKecamatans?.data?.map((res) => (
                        <option className="mb-2" key={res._id} value={res._id}>
                          {res.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label
                      className="w-[180px] items-center flex"
                      htmlFor="nama_relawan"
                    >
                      Desa
                    </label>
                    <select
                      onChange={(e) => {
                        setKelurahan(e.target.value);
                        setFormPengajuan({
                          ...formPengajuan,
                          id_kelurahan: e.target.value,
                        });
                      }}
                      className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                    >
                      <option selected={"disabled"}>
                        Pilih Desa / kelurahan
                      </option>
                      {getKelurahans?.data?.map((res) => (
                        <option className="mb-2" key={res._id} value={res._id}>
                          {res.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label
                      className="w-[180px] items-center flex"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                      type={"email"}
                      id="email"
                      value={emaill}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label
                      className="w-[180px] items-center flex"
                      htmlFor="kebutuhan"
                    >
                      Kebutuhan
                    </label>
                    <input
                      className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                      type={"text"}
                      id="kebutuhan"
                      onChange={(e) =>
                        setFormPengajuan({
                          ...formPengajuan,
                          kebutuhan: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label
                      className="w-[180px] flex"
                      htmlFor="detail_pengajuan"
                    >
                      Detail Pengajuan
                    </label>
                    <textarea
                      className="border py-2 px-2 rounded-sm outline-none w-[330px] h-[200px]"
                      type={"text"}
                      id="detail_pengajuan"
                      onChange={(e) =>
                        setFormPengajuan({
                          ...formPengajuan,
                          detail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end items-center gap-3 pb-[100px] mt-12">
                    <div
                      onClick={() => {
                        setPopupPengajuan(false);
                      }}
                      className="text-[#9CA3AF] border text-[18px] border-[#9CA3AF] rounded-md cursor-pointer font-semibold py-2 px-4"
                    >
                      Batalkan
                    </div>
                    <div
                      onClick={postLogistik}
                      className="text-white bg-[#E44700] py-2 px-4 font-semibold rounded-md cursor-pointer text-[18px]"
                    >
                      Buat Pengajuan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {popupPage === "chat" && (
            <>
              <div className="bg-[#37415152] fixed top-0 left-0 h-screen w-screen">
                <div className="absolute top-0 left-0  z-50 scrollbar scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]  overflow-scroll  right-0 bg-white text-[#374151]">
                  <div
                    onClick={() => {
                      setPopup(false);
                      setPopupPage();
                    }}
                    className="absolute pl-2 text-[21px] text-[#9CA3AF] cursor-pointer font-medium"
                  >
                    X
                  </div>
                  <div className="px-[50px] py-[30px]">
                    <p className="text-[21px] font-bold">
                      Logistik Kota Mataram
                    </p>
                    <div className="flex gap-4 mt-2">
                      <p className="w-[140px] text-[#6B7280]">Tgl Pengajuan</p>
                      <p>
                        {detailLogistik?.createdAt
                          ?.split("T")
                          .shift()
                          .split("-")
                          .reverse()
                          .join("/")}
                      </p>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <p className="w-[140px] text-[#6B7280]">Kebutuhan</p>
                      <p>{detailLogistik?.kebutuhan}</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <p className="w-[140px] text-[#6B7280]">Status</p>
                      <p>{detailLogistik?.status}</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <p className="w-[140px] text-[#6B7280]">
                        Detail Pengajuan
                      </p>
                      <p className="w-[360px]">{detailLogistik?.detail}</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <p className="w-[140px] text-[#6B7280]">Ubah Status</p>
                      <select className="border py-2 px-6 rounded-sm outline-0 cursor-pointer">
                        <option>Proses</option>
                        <option>Menunggu</option>
                        <option>Belum Input</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {" "}
          <div
            style={{
              visibility: popupPengajuan === false ? "hidden" : "visible",
            }}
            className="fixed top-0 left-0 bg-[#37415152] w-screen h-screen z-50"
          >
            <div className="fixed p-[20px] top-[80px] left-[450px] bg-white text-[#374151] h-screen overflow-scroll scrollbar-thin scrollbar-thumb-[#374151]">
              <div
                onClick={() => setPopupPengajuan(false)}
                className="absolute right-0 top-0 pr-2 font-medium cursor-pointer text-[#9CA3AF] text-[21px]"
              >
                X
              </div>
              <p className="text-[32px] text-center mb-[55px] font-bold">
                Tambah Pengajuan Logistik
              </p>
              <div className="text-[14px]">
                <div className="flex gap-[72px] justify-between mb-3">
                  <label
                    className="w-[180px] items-center flex"
                    htmlFor="nama_relawan"
                  >
                    Nama Relawan
                  </label>
                  <input
                    className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                    type={"text"}
                    id="nama_relawan"
                    value={name}
                  />
                </div>
                <div className="flex gap-[72px] justify-between mb-3">
                  <label
                    className="w-[180px] items-center flex"
                    htmlFor="nama_relawan"
                  >
                    Kabupaten / Kota
                  </label>
                  <select
                    onChange={(e) => {
                      setKabupaten(e.target.value);
                      setFormPengajuan({
                        ...formPengajuan,
                        id_kabupaten: e.target.value,
                      });
                    }}
                    className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                  >
                    <option selected={"disabled"}>
                      Pilih Kabupaten / Kota
                    </option>
                    {getKabupaten?.data?.map((res) => (
                      <option className="mb-2" key={res._id} value={res._id}>
                        {res.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-[72px] justify-between mb-3">
                  <label
                    className="w-[180px] items-center flex"
                    htmlFor="nama_relawan"
                  >
                    Kecamatan
                  </label>
                  <select
                    onChange={(e) => {
                      setKecamatan(e.target.value);
                      setFormPengajuan({
                        ...formPengajuan,
                        id_kecamatan: e.target.value,
                      });
                    }}
                    className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                  >
                    <option selected={"disabled"}>Pilih Kecamatan</option>
                    {getKecamatans?.data?.map((res) => (
                      <option className="mb-2" key={res._id} value={res._id}>
                        {res.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-[72px] justify-between mb-3">
                  <label
                    className="w-[180px] items-center flex"
                    htmlFor="nama_relawan"
                  >
                    Desa
                  </label>
                  <select
                    onChange={(e) => {
                      setKelurahan(e.target.value);
                      setFormPengajuan({
                        ...formPengajuan,
                        id_kelurahan: e.target.value,
                      });
                    }}
                    className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                  >
                    <option selected={"disabled"}>
                      Pilih Desa / kelurahan
                    </option>
                    {getKelurahans?.data?.map((res) => (
                      <option className="mb-2" key={res._id} value={res._id}>
                        {res.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-[72px] justify-between mb-3">
                  <label
                    className="w-[180px] items-center flex"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                    type={"email"}
                    id="email"
                    value={emaill}
                  />
                </div>
                <div className="flex gap-[72px] justify-between mb-3">
                  <label
                    className="w-[180px] items-center flex"
                    htmlFor="nama_relawan"
                  >
                    Nama APK
                  </label>
                  <select
                    onChange={(e) =>
                      setFormPengajuan({
                        ...formPengajuan,
                        kebutuhan: e.target.value,
                      })
                    }
                    className="border py-2 px-2 rounded-sm outline-none w-[330px]"
                  >
                    <option selected={"disabled"}></option>
                    {getAPK?.data?.map((res) => (
                      <option className="mb-2" key={res._id} value={res._id}>
                        {res.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-[72px] justify-between mb-3">
                  <label className="w-[180px] flex" htmlFor="detail_pengajuan">
                    Detail Pengajuan
                  </label>
                  <textarea
                    className="border py-2 px-2 rounded-sm outline-none w-[330px] h-[200px]"
                    type={"text"}
                    id="detail_pengajuan"
                    onChange={(e) =>
                      setFormPengajuan({
                        ...formPengajuan,
                        detail: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-end items-center gap-3 pb-[100px] mt-12">
                  <div
                    onClick={() => {
                      setPopupPengajuan(false);
                    }}
                    className="text-[#9CA3AF] border text-[18px] border-[#9CA3AF] rounded-md cursor-pointer font-semibold py-2 px-4"
                  >
                    Batalkan
                  </div>
                  <div
                    onClick={postLogistik}
                    className="text-white bg-[#E44700] py-2 px-4 font-semibold rounded-md cursor-pointer text-[18px]"
                  >
                    Buat Pengajuan
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* popup chat */}
          <div
            style={{ visibility: popup === false ? "hidden" : "visible" }}
            className="fixed  top-0 left-0 bg-[#37415152] w-screen h-screen"
          >
            {popupPage === "forum" && (
              <>
                <div className="absolute top-[100px] left-[500px] py-[40px] px-[80px] text-[#374151] bg-white">
                  <div
                    onClick={() => {
                      setPopup(false);
                      setPopupPage();
                    }}
                    className="absolute right-0 top-0 text-[21px] text-[#9CA3AF] cursor-pointer font-medium pr-2"
                  >
                    X
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center">
                      <img src={forum.src} alt="Forum" />
                    </div>

                    <p className="text-[32px] font-bold mt-3">
                      Kirim Ke Forum?
                    </p>
                    <p className="mt-3">
                      anda akan mengirimkan pesan ke semua akun
                    </p>
                    <p>relawan</p>
                    <div className="flex w-full gap-3 justify-between px-3 mt-3">
                      <div
                        onClick={() => {
                          setPopup(true);
                          setPopupPage("broadcast");
                        }}
                        className="border w-full text-center font-medium py-2 rounded-sm cursor-pointer"
                      >
                        Batal
                      </div>
                      <div className="font-medium text-white bg-[#E44700] rounded-sm cursor-pointer py-2 w-full text-center">
                        Kirim Pesan
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {popupPage === "broadcast" && (
              <>
                <div className="absolute top-[100px] left-[400px] p-[20px] text-[#374151] bg-white">
                  <div
                    onClick={() => {
                      setPopup(false);
                      setPopupPage();
                    }}
                    className="absolute right-0 top-0 text-[21px] text-[#9CA3AF] cursor-pointer font-medium pr-2"
                  >
                    X
                  </div>
                  <p className="text-[32px] font-bold mb-[42px]">
                    Jumlah Penduduk NTB
                  </p>
                  <img src={alert.src} alt="alert" />
                  <div className="flex justify-between items-center mt-3">
                    <label className="text-[18px]" htmlFor="perihal">
                      Perihal
                    </label>
                    <input
                      type={"text"}
                      id="perihal"
                      className="w-[300px] rounded-sm px-2 outline-none h-[40px] border"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <label className="text-[18px]" htmlFor="status">
                      Status
                    </label>
                    <select
                      id="status"
                      className="w-[300px] rounded-sm px-2 outline-none h-[40px] border"
                    >
                      <option>Proses</option>
                      <option>Menunggu</option>
                      <option>Belum Input</option>
                    </select>
                  </div>
                  <div className="flex justify-between mt-3">
                    <label className="text-[18px]" htmlFor="forum">
                      Detail Forum
                    </label>
                    <textarea
                      type={"text"}
                      id="forum"
                      className="w-[300px] rounded-sm px-2 outline-none h-[140px] border"
                    />
                  </div>
                  <div className="flex justify-end">
                    <div
                      onClick={() => handlePopUp("forum")}
                      className="py-2 px-4 bg-[#FF5001] text-white font-medium mt-3 rounded-sm cursor-pointer"
                    >
                      Broadcast Ke Relawan
                    </div>
                  </div>
                </div>
              </>
            )}
            {popupPage === "chat" && (
              <>
                <div className="fixed top-0 left-0 w-screen h-screen bg-[#37415152] px-[400px] pt-[120px]">
                  <div className="text-[#374151] bg-white p-5">
                    <p
                      onClick={() => {
                        setPopup(false);
                        setPopupPage();
                      }}
                      className="flex w-full justify-end pr-2 font-medium cursor-pointer"
                    >
                      X
                    </p>
                    <p className="text-[32px] font-bold text-center">
                      Logistik {detailLogistik?.kabupaten.name}
                    </p>
                    <div className="flex flex-col gap-2 px-[80px]">
                      <div className="flex">
                        <p className="w-[210px]">Tanggal Pengajuan</p>{" "}
                        <p>
                          :{" "}
                          {Moment(detailLogistik?.createdAt).format(
                            "DD-MMMM-YYYY"
                          )}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="w-[210px]">Kebutuhan</p>{" "}
                        <p className="">: {detailLogistik?.apk?.nama}</p>
                      </div>
                      <div className="flex">
                        <p className="w-[210px]">Status</p>{" "}
                        <p>: {detailLogistik?.status}</p>
                      </div>
                      <div className="flex">
                        <p className="w-[210px]">Detail Pengajuan</p>{" "}
                        <p>: {detailLogistik?.detail}</p>
                      </div>
                      <div className="flex">
                        <p className="w-[210px]">Jumlah Di Setujui</p>{" "}
                        <p>
                          :{" "}
                          <input
                            type="number"
                            value={jmlLogistikDisetujui}
                            onChange={(e) => {
                              setJmlLogistikDisetujui(e.target.value);
                            }}
                            min={1}
                            className="border"
                          />{" "}
                        </p>
                      </div>
                      <div className="flex justify-evenly">
                        <SelectIconButton
                          icon={PackageIcon}
                          title="Sedang Diproses"
                          checked={
                            logistikStatus === "Sedang Diproses" ? true : false
                          }
                          onClick={() => {
                            setLogistikStatus("Sedang Diproses");
                          }}
                        />
                        <SelectIconButton
                          icon={CarIcon}
                          title="Proses Selesai"
                          checked={
                            logistikStatus === "Proses Selesai" ? true : false
                          }
                          onClick={() => {
                            setLogistikStatus("Proses Selesai");
                          }}
                        />
                      </div>
                      <div className="w-[100px] mx-auto">
                        <ButtonPrimary
                          title="Simpan"
                          action={() => {
                            setujuiLogistik();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/*  */}
          <div className="p-[60px] text-[#374151] overflow-hidden stroke-[#374151]">
            <p className="text-[32px] font-bold">Logistik</p>
            <div className="flex">
              {roles === "relawan" && (
                <div className="py-[10px]">
                  {roles === "Admin" ? (
                    <ButtonPrimary
                      title={"Tambah Data"}
                      action={() => {
                        dispatch(showOrHidePopUpDash({ type: "Logistik" }));
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => setPopupPengajuan(true)}
                      className="bg-[#E44700] font-semibold text-white rounded-md cursor-pointer py-2 px-4 "
                    >
                      Tambah Pengajuan
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-[24px]">
              <div className="flex items-center gap-4">
                <div className="w-[234px] py-2 border flex justify-between rounded-sm px-3">
                  <input
                    className="outline-0 w-full"
                    type={"text"}
                    placeholder="Cari Data"
                  />
                  <SearchIcon />
                </div>
                <p>Filter</p>
                <select className="border py-2 px-3 rounded-sm cursor-pointer">
                  <option>Kabupaten / Kota</option>
                </select>
                <select className="border py-2 px-3 rounded-sm cursor-pointer">
                  <option>Kecamatan</option>
                </select>
              </div>
              {/* <div
            onClick={() => handlePopUp("broadcast")}
            className="flex items-center gap-2 py-2 px-6 rounded-sm cursor-pointer font-medium bg-[#B91C1C] text-white stroke-white"
          >
            <RelawanIcon />
            <p>Broadcast</p>
          </div> */}
            </div>
            <div className=" flex overflow-x-auto pb-4 rounded-sm mt-[24px] scrollbar-thin scrollbar-track-[#D1D5DB] scrollbar-thumb-[#374151]">
              <table className="tabel-auto">
                <thead className="bg-[#374151]  ">
                  <tr className="h-[51px] text-white ">
                    <th
                      scope="col"
                      className=" px-2 py-3 text-left text-xs font-medium text-clip"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className=" px-2 py-3 text-left text-xs font-medium text-clip"
                    >
                      tgl Pengajuan
                    </th>
                    <th
                      scope="col"
                      className=" px-2 py-3 text-left text-xs font-medium text-clip"
                    >
                      Kab / Kota
                    </th>
                    <th
                      scope="col"
                      className=" px-2 py-3 text-left text-xs font-medium text-clip"
                    >
                      Kebutuhan
                    </th>
                    <th
                      scope="col"
                      className=" px-2 py-3 text-left text-xs font-medium"
                    >
                      Kecamatan
                    </th>
                    <th scope="col" className=" px-2 py-3 text-xs font-medium">
                      Relawan
                    </th>
                    <th scope="col" className=" px-2 py-3 text-xs font-medium">
                      Status
                    </th>
                    <th
                      scope="col"
                      className={`border-l-2 bg-[#374151] px-2 py-3 sticky right-0 ${
                        popupPage === "chat" && "-z-50"
                      } text-white  text-xs font-medium`}
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {logistik !== undefined &&
                    logistik.data?.map((res, i) => {
                      return (
                        <tr
                          className={`${
                            (i + 1) % 2 !== 0 ? "bg-[#F9FAFB]" : "bg-white"
                          }  h-[52px]`}
                        >
                          <td className="px-2 py-3">{++i}</td>
                          <td className=" px-2 py-3 whitespace-nowrap">
                            {Moment(res.createdAt).format("DD-MMMM-YYYY")}
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            {res.kabupaten.name}
                          </td>
                          <td className="w-[120px] px-2 py-3">
                            {res.apk?.nama}
                          </td>
                          <td className="w-[120px] px-2 py-3">
                            {res.kecamatan.name}
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            {res.relawan[0]?.name}
                          </td>
                          <td className="px-2 py-3 ">
                            <div
                              className={`${
                                res.status === "Sedang Diproses"
                                  ? "bg-[#FEF3C7] border-[#F59E0B] border text-[#D97706]"
                                  : "bg-blue-300 border-blue-600 border text-blue-600"
                              } font-medium rounded-md text-center px-6 py-2`}
                            >
                              {res.status}
                            </div>
                          </td>

                          <td
                            className={`px-2 py-3 border-l-2  ${
                              (i + 1) % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"
                            } sticky right-0 ${
                              popupPage === "chat" && "-z-50"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-3">
                              {roles === "admin" && (
                                <div
                                  onClick={() =>
                                    handlePopUp("chat", res.id_relawan, res, i)
                                  }
                                  className={`${
                                    alertHapus === true && "hidden"
                                  } cursor-pointer`}
                                >
                                  <DetailIcon />
                                </div>
                              )}

                              {alertHapus !== false && res._id === deleteId ? (
                                <div className="flex gap-3 items-center justify-center">
                                  <div
                                    className="cursor-pointer border-2 font-medium border-[#374151] py-1 px-3 rounded-md"
                                    onClick={() => setAlertHapus(false)}
                                  >
                                    Batal
                                  </div>
                                  <div
                                    className="bg-[#DC2626] border-2 border-[#DC2626] text-white font-medium py-1 px-3 cursor-pointer rounded-md"
                                    onClick={() => deletLogistik(res._id)}
                                  >
                                    Hapus
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    setAlertHapus(true);
                                    setDeleteId(res._id);
                                  }}
                                  className={`${
                                    alertHapus === true && "hidden"
                                  } cursor-pointer`}
                                >
                                  <DeletIcon />
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-[24px]">
              <div className="flex gap-3 items-center text-[#828282]">
                <div className="flex py-2 px-4 border rounded-md">
                  <p>10</p>
                  <DropDownIcon />
                </div>
                <p>Showing 1 - 10 of 85</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="stroke-[#D1D5DB]">
                  <PrevIcon />
                </div>
                <div className="bg-[#FF5001] rounded-md py-2 px-4 text-white cursor-pointer">
                  1
                </div>
                <div className="stroke-black">
                  <NextIcon />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* popup pengajuan */}
    </>
  );
};

export default Logistik;
