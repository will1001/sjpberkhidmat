import React, { useState } from "react";
import {
  BackIcon,
  ChatIcon,
  DeletIcon,
  DropDownIcon,
  NextIcon,
  PrevIcon,
  ReadIcon,
  RelawanIcon,
  SearchIcon,
} from "../../utility/icon/icon";
import ChatInput from "../logistik/ChatInput";
import alert from "../../utility/img/alert_broadcast.png";
import forum from "../../utility/img/forum.png";
import ButtonPrimary from "../ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { setEditData, showOrHidePopUpDash } from "../../redux/panelReducer";
import useFetch from "../../API/useFetch";
import Moment from "moment";
import "moment/locale/id";

const Logistik = () => {
  const [popup, setPopup] = useState(false);
  const [popupPage, setPopupPage] = useState();
  const dispatch = useDispatch();

  const handlePopUp = (name) => {
    setPopup(true);
    name !== popupPage ? setPopupPage(name) : setPopupPage();
  };

  const token = useSelector((state) => state.user.token);
  const roles = useSelector((state) => state.user.roles);

  const logistik = useFetch("get", `user/logistik?page=1`, token);
  Moment.locale("id");

  return (
    <>
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

                <p className="text-[32px] font-bold mt-3">Kirim Ke Forum?</p>
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
            <div className="absolute inset-y-0 scrollbar scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]  overflow-scroll  right-0 bg-white text-[#374151]">
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
                <p className="text-[21px] font-bold">Logistik Kota Mataram</p>
                <div className="flex gap-4 mt-2">
                  <p className="w-[140px] text-[#6B7280]">Tgl Pengajuan</p>
                  <p>11/12/23</p>
                </div>
                <div className="flex gap-4 mt-2">
                  <p className="w-[140px] text-[#6B7280]">Kebutuhan</p>
                  <p>Flayer</p>
                </div>
                <div className="flex gap-4 mt-2">
                  <p className="w-[140px] text-[#6B7280]">Status</p>
                  <p>Belum Input </p>
                </div>
                <div className="flex gap-4 mt-2">
                  <p className="w-[140px] text-[#6B7280]">Detail Pengajuan</p>
                  <p className="w-[360px]">
                    Ornare magna ultricies sed dapibus pharetra imperdiet
                    nascetur viverra vitae.
                  </p>
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
              <div className="bg-[#F3F4F6] p-[20px] min-h-screen pr-8">
                {/* chat */}
                <div className=" overflow-y-auto">
                  <div className="flex justify-center mb-12">
                    <div className="bg-[#E5E7EB] text-[#6B7280] rounded-full px-2 py-1">
                      12 Desember 2022
                    </div>
                  </div>

                  <div className="flex">
                    <p className=" font-medium bg-white rounded-t-xl rounded-br-xl shadow-lg my-3 p-2 w-[420px] break-words">
                      Ornare magna ultricies sed dapibus pharetra imperdiet
                      nascetur viverra
                      vitae.asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                      <p className="text-end text-[12px] font-normal">10.23</p>
                    </p>
                  </div>
                  <div className="flex justify-end ">
                    <p className="font-medium bg-[#FF5001] text-white  rounded-t-xl rounded-bl-xl shadow-lg my-3 p-2 w-[420px]">
                      Ornare magna ultricies sed dapibus pharetra imperdiet
                      nascetur viverra vitae.
                      <p className="text-[12px] font-normal flex gap-1 justify-end items-center">
                        10.23 {<ReadIcon />}
                      </p>
                    </p>
                  </div>
                </div>

                <div className="fixed bottom-0 z-50 py-3 px-6 w-full flex  bg-[#E5E7EB] items-center">
                  <ChatInput onSendMessage={alert} />
                </div>
                {/*  */}
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
              <ButtonPrimary
                title={"Tambah Data"}
                action={() => {
                  dispatch(showOrHidePopUpDash({ type: "Logistik" }));
                }}
              />
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
          <div
            onClick={() => handlePopUp("broadcast")}
            className="flex items-center gap-2 py-2 px-6 rounded-sm cursor-pointer font-medium bg-[#B91C1C] text-white stroke-white"
          >
            <RelawanIcon />
            <p>Broadcast</p>
          </div>
        </div>
        <div className="mt-[24px]">
          <table className="w-full">
            <thead className="bg-[#374151]  ">
              <tr className="h-[51px] text-white flex justify-between items-center">
                <th
                  scope="col"
                  className="w-[80px] px-2 py-3 text-left text-xs font-medium text-clip"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="w-[80px] px-2 py-3 text-left text-xs font-medium text-clip"
                >
                  tgl Pengajuan
                </th>
                <th
                  scope="col"
                  className="w-[120px] px-2 py-3 text-left text-xs font-medium text-clip"
                >
                  Kab / Kota
                </th>
                <th
                  scope="col"
                  className="w-[160px] px-2 py-3 text-left text-xs font-medium text-clip"
                >
                  Kebutuhan
                </th>
                <th
                  scope="col"
                  className="w-[356px] px-2 py-3 text-left text-xs font-medium"
                >
                  Detail Pengajuan
                </th>
                <th
                  scope="col"
                  className="w-[150px] px-2 py-3 text-xs font-medium"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="w-[88px] border-l-2 flex justify-center px-2 py-3 text-left text-xs font-medium"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="">
              {logistik.data?.map((res, i) => {
                return (
                  <tr className="flex justify-between bg-[#F9FAFB]">
                    <td className="w-[80px] px-2 py-3">{++i}</td>
                    <td className="w-[80px] px-2 py-3">
                      {Moment(res.createdAt).format("DD-MMMM-YYYY")}
                    </td>
                    <td className="w-[120px] px-2 py-3">
                      {res.kabupaten.name}
                    </td>
                    <td className="w-[120px] px-2 py-3">
                      {res.kecamatan.name}
                    </td>
                    <td className="max-w-[356px] px-2 py-3 break-words">
                      {res.detail}
                    </td>
                    <td className="w-[150px] flex items-center justify-center">
                      <div className="bg-[#FEF3C7] border-[#F59E0B] border text-[#D97706] font-medium rounded-md text-center px-6 py-2">
                        {res.status}
                      </div>
                    </td>
                    <td className="w-[88px] px-2 py-3 border-l-2 border-white flex items-center justify-center ">
                      <div className="flex  justify-center gap-3">
                        <div
                          onClick={() => handlePopUp("chat")}
                          className="cursor-pointer"
                        >
                          <ChatIcon />
                        </div>

                        <DeletIcon />
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
  );
};

export default Logistik;
