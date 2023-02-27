import React from "react";
import { BackIcon, ChatIcon, DeletIcon, DropDownIcon, NextIcon, PrevIcon, ReadIcon, RelawanIcon, SearchIcon } from "../../utility/icon/icon";

const Logistik = () => {
  return (
    <>
      {/* popup chat */}
      <div className="fixed  top-0 left-0 bg-[#37415152] w-screen h-screen">
        <div className="absolute inset-y-0 scrollbar scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]  overflow-scroll  right-0 bg-white text-[#374151]">
          <div className="absolute pl-2 text-[21px] text-[#9CA3AF] cursor-pointer font-medium">X</div>
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
              <p className="w-[360px]">Ornare magna ultricies sed dapibus pharetra imperdiet nascetur viverra vitae.</p>
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
            <div className="h-[1000px] overflow-y-auto">
              <div className="flex justify-center mb-12">
                <div className="bg-[#E5E7EB] text-[#6B7280] rounded-full px-2 py-1">12 Desember 2022</div>
              </div>
              {/* chat */}
              <div className="flex">
                <p className=" font-medium bg-white rounded-t-xl rounded-br-xl shadow-lg my-3 p-2 w-[420px] break-words">
                  Ornare magna ultricies sed dapibus pharetra imperdiet nascetur viverra vitae.asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                  <p className="text-end text-[12px] font-normal">10.23</p>
                </p>
              </div>
              <div className="flex justify-end ">
                <p className="font-medium bg-[#FF5001] text-white  rounded-t-xl rounded-bl-xl shadow-lg my-3 p-2 w-[420px]">
                  Ornare magna ultricies sed dapibus pharetra imperdiet nascetur viverra vitae.
                  <p className="text-[12px] font-normal flex gap-1 justify-end items-center">10.23 {<ReadIcon />}</p>
                </p>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="p-[60px] text-[#374151] overflow-hidden stroke-[#374151]">
        <p className="text-[32px] font-bold">Logistik</p>
        <div className="flex">
          <div className="bg-[#E44700] mt-[23px] text-white py-2 px-6 font-medium rounded-sm cursor-pointer">Tambah Data</div>
        </div>
        <div className="flex justify-between items-center mt-[24px]">
          <div className="flex items-center gap-4">
            <div className="w-[234px] py-2 border flex justify-between rounded-sm px-3">
              <input className="outline-0 w-full" type={"text"} placeholder="Cari Data" />
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
          <div className="flex items-center gap-2 py-2 px-6 rounded-sm cursor-pointer font-medium bg-[#B91C1C] text-white stroke-white">
            <RelawanIcon />
            <p>Broadcast</p>
          </div>
        </div>
        <div className="mt-[24px]">
          <table className="w-full">
            <thead className="bg-[#374151]  ">
              <tr className="h-[51px] text-white flex justify-between items-center">
                <th scope="col" className="w-[80px] px-2 py-3 text-left text-xs font-medium text-clip">
                  tgl Pengajuan
                </th>
                <th scope="col" className="w-[120px] px-2 py-3 text-left text-xs font-medium text-clip">
                  Kab / Kota
                </th>
                <th scope="col" className="w-[160px] px-2 py-3 text-left text-xs font-medium text-clip">
                  Kebutuhan
                </th>
                <th scope="col" className="w-[356px] px-2 py-3 text-left text-xs font-medium">
                  Detail Pengajuan
                </th>
                <th scope="col" className="w-[150px] px-2 py-3 text-xs font-medium">
                  Status
                </th>
                <th scope="col" className="w-[88px] border-l-2 flex justify-center px-2 py-3 text-left text-xs font-medium">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="flex justify-between bg-[#F9FAFB]">
                <td className="w-[80px] px-2 py-3">11/12/23</td>
                <td className="w-[120px] px-2 py-3">qewewqeqwe</td>
                <td className="w-[160px] px-2 py-3">qweqwewewex</td>
                <td className="max-w-[356px] px-2 py-3 break-words">qweqwewewexasdddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddd</td>
                <td className="w-[150px] flex items-center justify-center">
                  <div className="bg-[#FEF3C7] border-[#F59E0B] border text-[#D97706] font-medium rounded-md text-center px-6 py-2">Belum Input</div>
                </td>
                <td className="w-[88px] px-2 py-3 border-l-2 border-white flex items-center justify-center ">
                  <div className="flex  justify-center gap-3">
                    <div>
                      <ChatIcon />
                    </div>

                    <DeletIcon />
                  </div>
                </td>
              </tr>
              <tr className="flex justify-between bg-[]">
                <td className="w-[80px] px-2 py-3">11/12/23</td>
                <td className="w-[120px] px-2 py-3">qewewqeqwe</td>
                <td className="w-[160px] px-2 py-3">qweqwewewex</td>
                <td className="max-w-[356px] px-2 py-3 break-words">qweqwewewexasdddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddd</td>
                <td className="w-[150px] px-2 py-3 flex items-center justify-center">
                  <div className="bg-[#F1FAFF] border-[#0097EC] border text-[#0097EC] font-medium rounded-md text-center px-6 py-2">Selesai</div>
                </td>
                <td className="w-[88px] px-2 py-3 border-l-2 border-white flex justify-center items-center">
                  <div className="flex justify-center gap-3">
                    <div className="cursor-pointer">
                      <ChatIcon />
                    </div>

                    <DeletIcon />
                  </div>
                </td>
              </tr>
              <tr className="flex justify-between bg-[#F9FAFB]">
                <td className="w-[80px] px-2 py-3">11/12/23</td>
                <td className="w-[120px] px-2 py-3">qewewqeqwe</td>
                <td className="w-[160px] px-2 py-3">qweqwewewex</td>
                <td className="max-w-[356px] px-2 py-3 break-words">qweqwewewexasdddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddd</td>
                <td className="w-[150px] flex items-center justify-center">
                  <div className="bg-[#FFECE4] border-[#FF5001] border text-[#FF5001] font-medium rounded-md text-center px-6 py-2">Menunggu</div>
                </td>
                <td className="w-[88px] px-2 py-3 border-l-2 border-white flex items-center justify-center ">
                  <div className="flex  justify-center gap-3">
                    <div>
                      <ChatIcon />
                    </div>

                    <DeletIcon />
                  </div>
                </td>
              </tr>
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
            <div className="bg-[#FF5001] rounded-md py-2 px-4 text-white cursor-pointer">1</div>
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
