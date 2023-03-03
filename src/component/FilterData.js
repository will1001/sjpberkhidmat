import React from "react";
import { useState } from "react";
import { SearchIcon } from "../utility/icon/icon";

const FilterData = ({ keyword, kabupaten, kecamatan, kelurahan, short, setShort, setFilterKecamatan }) => {
  return (
    <div className="flex justify-between">
      {keyword !== undefined && (
        <label htmlFor="search_data" className="flex items-center border rounded-sm stroke-black ">
          <input onChange={(e) => keyword(e.target.value)} className="outline-none py-2 px-2" placeholder="Cari Data" type={"text"} id="search_data" />
          <div className="flex items-center px-2">
            <SearchIcon />
          </div>
        </label>
      )}

      {kabupaten !== undefined && (
        <label htmlFor="kabupaten" className="flex items-center gap-3">
          <p>Pilih Kabupaten / Kota</p>
          <select className="border p-2 rounded-sm" id="kabupaten">
            <option selected="disable">Pilih Kabupaten / Kota</option>
            {kabupaten?.map((res) => (
              <option key={res._id} value={res._d}>
                {res.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {kecamatan.data !== undefined && (
        <label htmlFor="kecamatan" className="flex items-center gap-3">
          <p>Pilih Kecamatan</p>
          <select
            onChange={(e) => {
              setFilterKecamatan && setFilterKecamatan(e.target.value);
            }}
            className="border p-2 rounded-sm"
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
        <label htmlFor="shor" className="flex items-center gap-3">
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
