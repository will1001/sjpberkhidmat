import React from "react";
import { useState } from "react";
import { SearchIcon } from "../utility/icon/icon";

const FilterData = ({ mobile, keyword, kabupaten, kecamatan, kelurahan, short, setShort, setFilterKecamatan, setFilterKabupaten, display, filterKabupaten }) => {
  return (
    <div className={`${mobile === true ? "" : "flex justify-between"}`}>
      {keyword !== undefined && (
        <label htmlFor="search_data" className={` flex items-center border rounded-sm stroke-black`}>
          <input onChange={(e) => keyword(e.target.value)} className={`${mobile === true ? "outline-none py-2 px-2 w-full" : "outline-none py-2 px-2"}`} placeholder="Cari Data" type={"text"} id="search_data" />
          <div className="flex items-center px-2">
            <SearchIcon />
          </div>
        </label>
      )}

      {kabupaten !== undefined && kabupaten.data !== undefined && (
        <label htmlFor="kabupaten" className="flex items-center gap-3">
          <p className={`${display === "hide" ? "hidden" : "visible"}`}>Pilih Kabupaten / Kota</p>
          <select
            value={filterKabupaten}
            onChange={(e) => {
              setFilterKabupaten && setFilterKabupaten(e.target.value);
            }}
            className="border p-2 rounded-sm"
            id="kabupaten"
          >
            <option value={"semua"}>Pilih Kabupaten / Kota</option>
            {kabupaten?.data?.map((res) => (
              <option key={res._id} value={res._id}>
                {res.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {kecamatan !== undefined && kecamatan.data !== undefined && (
        <label htmlFor="kecamatan" className={`${mobile === true && "mt-3"} flex items-center gap-3`}>
          <p className={`${display === "hide" ? "hidden" : "visible"}`}>Pilih Kecamatan</p>
          <select
            onChange={(e) => {
              setFilterKecamatan && setFilterKecamatan(e.target.value);
            }}
            className={`${mobile === true && "w-full"} border p-2 rounded-sm`}
            id="kecamatan"
          >
            <option value={"semua"}>Pilih Kecamatan</option>
            {kecamatan?.data?.map((res) => (
              <option key={res._id} value={res._id}>
                {res.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {kelurahan !== undefined && (
        <label htmlFor="kelurahan" className="flex items-center gap-3">
          <p>Pilih Kelurahan / Desa</p>
          <select className="border p-2 rounded-sm" id="kelurahan">
            <option selected="disable">Pilih kelurahan / Desa</option>
            {kelurahan?.map((res) => (
              <option key={res._id} value={res._d}>
                {res.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {short !== undefined && (
        <label htmlFor="shor" className={`${mobile === true && "mt-3 w-full justify-center"} flex items-center gap-3`}>
          <p>Urutkan</p>
          <select
            onChange={(e) => {
              setShort !== undefined && setShort(e.target.value);
            }}
            className="border p-2 rounded-sm"
            id="short"
          >
            <option value={"terkecil"}>Terkecil</option>
            <option value={"terbanyak"}>Terbanyak</option>
          </select>
        </label>
      )}
    </div>
  );
};

export default FilterData;
