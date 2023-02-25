import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import axiosFetch from "../../src/API/axiosFetch";
import useFetch from "../../src/API/useFetch";
import { DetailIcon, FilterIcon, KembaliIcon, SearchIcon } from "../../src/utility/icon/icon";

const DetailKelurahan = () => {
  const getKabupaten = useFetch("get", "user/kabupaten");
  const router = useRouter();
  const [kecamatan, setKecamatan] = useState();
  const [filterKab, setFilterKab] = useState();
  const [filterKecamatan, setFilterKecamatan] = useState();
  const [popupFilter, setPopupFilter] = useState(false);
  const detailDesa = useFetch("get", `user/dashboard/statistik/kelurahan/5208010?page=1&limit=10`);

  useEffect(() => {
    if (router.query.id_kabupaten !== undefined) {
      setFilterKab(router.query.id_kabupaten);
      const res = axiosFetch("get", `user/kecamatan/${router.query.id_kabupaten}`).then((res) => setKecamatan(res.data));
      if (router.query.id_kecamatan !== undefined) {
        setFilterKecamatan(router.query.id_kecamatan);
      }
    }
  }, [router.query.id_kabupaten]);

  const changeKabupaten = async (idKabupaten) => {
    setFilterKab(idKabupaten);
    const res = await axiosFetch("get", `user/kecamatan/${idKabupaten}`);
    setKecamatan(res.data);
  };

  console.log(kecamatan);
  return (
    <>
      <div style={popupFilter === true ? { visibility: "visible" } : { visibility: "hidden" }} className="fixed top-0 left-0 w-screen h-screen bg-[#37415152] z-50">
        <div className="absolute bg-white left-[450px] top-[100px] text-[#374151] p-[60px]">
          <p onClick={() => setPopupFilter(false)} className="absolute text-[#9CA3AF] right-0 top-0 px-2 text-[18px] font-medium cursor-pointer">
            X
          </p>
          <p className="text-[32px] font-bold">Filter Data</p>
          <div className="mt-[32px]">
            <p className="text-[#6B7280]">Pilih Data Filter</p>
            <select className="border w-[400px] h-[48px] font-medium mt-2 rounded-sm outline-0">
              <option value={"Jumlah Relawan"}>Jumlah Relawan</option>
              <option value={"Jumlah Simpatisan"}>Jumlah Simpatisan</option>
              <option value={"Target Suara"}>Target Suara</option>
              <option value={"Suara Periode Lalu"}>Suara Periode Lalu</option>
              <option value={"Jumlah TPS"}>Jumlah TPS</option>
              <option value={"Jumlah DPT / DPS"}>Jumlah DPT / DPS</option>
              <option value={"Logistik"}>Logistik</option>
              <option value={"Program"}>Program</option>
            </select>
          </div>
          <div className="mt-[32px]">
            <p className="text-[#6B7280]">Urutkan</p>
            <select className="border w-[400px] h-[48px] font-medium mt-2 rounded-sm outline-0">
              <option value={"Jumlah Terendah"}>Jumlah Terendah</option>
              <option value={"Jumlah Tertinggi"}>Jumlah Tertinggi</option>
            </select>
          </div>
          <div className="flex gap-3 justify-center mt-[32px]">
            <div onClick={() => setPopupFilter(false)} className="border flex justify-center rounded-md py-2 px-6 text-[18px] font-semibold w-full cursor-pointer">
              Batal
            </div>
            <div className="w-full text-white font-semibold rounded-md bg-[#E44700] text-[18px] py-2 px-6 flex justify-center cursor-pointer">Terapkan Filter</div>
          </div>
        </div>
      </div>
      <div className="p-[40px] text-[#374151] flex flex-col sticky">
        <div className="flex">
          <div onClick={() => router.back()} className="bg-[#374151] flex items-center gap-1 py-2 px-4 rounded-md cursor-pointer">
            <div className="h-[20px] w-[20px] flex items-center">
              <KembaliIcon />
            </div>
            <p className="text-white font-semibold">Kembali</p>
          </div>
        </div>
        <p className="text-[32px] font-bold mt-[42px]">Peta Kekuatan Per Desa / Kelurahan</p>
        <div className="flex mt-[24px] pr-[228px] justify-between">
          <div>
            <p className="text-[#9CA3AF] font-medium">NAMA KABUPATEN / KOTA</p>
            <select value={filterKab} onChange={(e) => changeKabupaten(e.target.value)} className="border border-[#9CA3AF] text-[18px] font-semibold mt-[16px] outline-0 cursor-pointer w-full px-2 py-2 rounded-md">
              <option value={""} disabled>
                Pilih Kabupaten
              </option>
              {getKabupaten?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-[#9CA3AF] font-medium">DAFTAR KECAMATAN</p>
            <select value={filterKecamatan} onChange={(e) => setFilterKecamatan(e.target.value)} className="border border-[#9CA3AF] text-[18px] font-semibold mt-[16px] outline-0 cursor-pointer w-full px-2 py-2 rounded-md">
              <option value={""} disabled>
                Pilih Kecamatan
              </option>
              {kecamatan?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-[#9CA3AF] font-medium">DATA TARGET</p>
            <div className="flex gap-2">
              <p className="text-[18px] font-bold">Target Simpatisan</p>
              <p className="text-[#6B7280] text-[18px]">122.1233</p>/<p className="font-semibold text-[18px]">123.123</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-[#D1D5DB]">
                <div className="bg-[#FF5001] h-[7px] text-[#FF5001] text-[1px] w-[95%]">a</div>
              </div>
              <p className="text-[18px] font-semibold">95%</p>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <div>
            <p className="text-[#9CA3AF] font-medium mb-2">DAFTAR DESA / KELURAHAN</p>
            <div className="flex justify-between">
              <div className="stroke-[#374151] w-[366px] px-2 flex items-center border rounded-sm h-[43px] justify-between">
                <input placeholder="Cari Data" className="border-none outline-0 w-full" type={"text"} />
                <SearchIcon />
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[18px]">Urutkan</p>
                <div onClick={() => setPopupFilter(true)} className="flex gap-3 rounded-md cursor-pointer stroke-white bg-[#FF5001] py-2 px-4 text-white">
                  <FilterIcon />
                  <p className="font-medium">Filter Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[24px] overflow-x-scroll">
          <table className="w-[2000px] ">
            <thead className="bg-[#374151]  ">
              <tr className="h-[51px] text-white">
                <th scope="col" className="px-6  py-3 text-left text-xs font-medium ">
                  No
                </th>
                <th scope="col" className="px-6  py-3 text-left text-xs font-medium">
                  Desa / Kelurahan
                </th>
                <th scope="col" className="px-6  py-3 text-left text-xs font-medium">
                  Target Suara
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Suara Periode Lalu
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Jumlah TPS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Jumlah DPT/DPS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Jumlah Relawan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Jumlah Simpatisan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Logistik
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Program
                </th>
                <th scope="col" className="fixed right-0 mr-10 z-50 w-[100px] bg-[#374151] justify-center flex py-4 border-l-2 text-left text-xs font-medium">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">qewewqeqwe</td>
                <td className="px-6 py-4 whitespace-nowrap">qweqwewewex</td>
                <td className="px-6 py-4 whitespace-nowrap">qweqwewewex</td>
                <td className="px-6 py-4 whitespace-nowrap">qweqwewewex</td>
                <td className="px-6 py-4 whitespace-nowrap">qweqwewewex</td>
                <td className="px-6 py-4 whitespace-nowrap">qweqwewewex</td>
                <td className="px-6 py-4 whitespace-nowrap">qweqwewewex</td>
                <td className="px-6 py-4 whitespace-nowrap">qweqwewewex</td>
                <td className="px-6 py-4 whitespace-nowrap">qweqwewewex</td>
                <td className="fixed cursor-pointer right-0 mr-10 z-50 w-[100px] bg-white flex justify-center py-4 border-l-2 text-left text-xs font-medium">
                  <DetailIcon />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DetailKelurahan;
