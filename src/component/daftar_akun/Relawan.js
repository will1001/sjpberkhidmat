import React from "react";
import { PatternFormat } from "react-number-format";
import { DaftarRelawanIcon } from "../../utility/icon/icon";

const Relawan = () => {
  return (
    <div>
      <form>
        <div className="pl-[67px] ">
          <div className="flex flex-col gap-3">
            <p className="text-[#374151] text-[32px] font-bold mb-[27px] ">Tambah Akun Relawan</p>
            {/* nama */}
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="nama_akun" className="text-[14px] text-[#374151] ">
                Nama Akun
              </label>
              <input className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"text"} id="nama_akun" />
            </div>
            {/* email */}
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="email" className="text-[14px] text-[#374151] ">
                Email
              </label>
              <input className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"email"} id="email" />
            </div>
            {/* contact */}
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="noHp" className="text-[14px] text-[#374151] ">
                No Hp Relawan
              </label>
              <PatternFormat id="noHp" format="### ### ### ###" allowEmptyFormatting className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]" />
            </div>
            {/* jabatan */}
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="jabatan" className="text-[14px] text-[#374151] pr-[72px]">
                Jabatan
              </label>
              <select id="jabatan" className="h-[40px] w-[363px] border outline-0 text-[#374151]">
                <option value="jabatan1">Tokoh Masyarakat</option>
                <option value="q1">sdasd</option>
                <option value="q12">asd</option>
              </select>
            </div>
            {/* target desa */}
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="target_desa" className="text-[14px] text-[#374151] pr-[72px]">
                Target Desa
              </label>
              <select id="target_desa" className="h-[40px] w-[363px] border outline-0 text-[#374151]">
                <option value="jabatan1"> Ampenan</option>
                <option value="q1">sdasd</option>
                <option value="q12">asd</option>
              </select>
            </div>
          </div>
          <div className="border-b-2 my-[30px]" />

          {/* password */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="password" className="text-[14px] text-[#374151] ">
                Set Password
              </label>
              <input className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"password"} id="password" />
            </div>
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="password" className="text-[14px] text-[#374151] ">
                Set Ulang Password
              </label>
              <input className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"password"} id="password" />
            </div>
          </div>

          <div className="h-[42px] w-[240px] bg-[#E44700] rounded-md mt-[48px] cursor-pointer ml-[375px] text-[18px] text-white font-semibold items-center justify-center gap-2 flex">
            Buat Akun <DaftarRelawanIcon />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Relawan;
