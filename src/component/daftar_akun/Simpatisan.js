import React from "react";
import { PatternFormat } from "react-number-format";

const Simpatisan = () => {
  return (
    <form>
      <div className="pl-[67px] ">
        {/* relawan pengajak */}
        <div>
          <p className="text-[#D1D5DB] font-medium ">RELAWAN</p>
          <div className="flex items-center">
            <label htmlFor="pengjak" className="text-[14px] text-[#374151] pr-[72px]">
              Relawan Pengajak (Opsional)
            </label>
            <select id="pengajak" className="h-[40px] w-[363px] border text-[#374151]">
              <option value="Chandra Pradana">Chandra Pradana</option>
              <option value="Pengajak1">Pengajak1</option>
              <option value="Pengajak2">Pengajak2</option>
            </select>
          </div>
        </div>
        <div className="border-b-2 my-[30px]" />
        {/* identitas pribadi    */}
        <div className="flex flex-col gap-3">
          <p className="text-[#D1D5DB] font-medium ">IDENTITAS PRIBADI</p>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="nama" className="text-[14px] text-[#374151] ">
              Nama
            </label>
            <input className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"text"} id="nama" />
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="NIK" className="text-[14px] text-[#374151] ">
              NIK
            </label>
            <PatternFormat id="NIK" format="#### #### #### ###" allowEmptyFormatting className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]" />
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="email" className="text-[14px] text-[#374151] ">
              Email
            </label>
            <input className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"email"} id="email" />
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="gender" className="text-[14px] text-[#374151] ">
              Jenis Kelamin
            </label>
            <select id="gender" className="h-[40px] w-[363px] border text-[#374151] outline-0">
              <option value="Laki-Laki">L</option>
              <option value="Perempuan">P</option>
            </select>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="tanggal lahir" className="text-[14px] text-[#374151] ">
              Tgl Lahir
            </label>
            <input className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type="date" id="tanggal lahir" name="trip-start" defaultValue="" min="1945-01-01" max="2024-12-31"></input>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="noHP" className="text-[14px] text-[#374151] ">
              NO HP
            </label>
            <PatternFormat id="noHp" format="###-###-###-###" allowEmptyFormatting mask={""} className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]" />
          </div>
        </div>
        <div className="border-b-2 my-[30px]" />
        {/* alamat simpatisan */}
        <div className="flex flex-col gap-3">
          <p className="text-[#D1D5DB] font-medium ">IDENTITAS PRIBADI</p>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="kabupaten" className="text-[14px] text-[#374151] pr-[72px]">
              Kabupaten Kota
            </label>
            <select id="kabupaten" className="h-[40px] w-[363px] border text-[#374151]">
              <option value="lotim">Lombok Timur</option>
              <option value="lobar">Lombok Barat</option>
              <option value="loteng">Lombok Tengah</option>
              <option value="klu">Lombok Utara</option>
              <option value="mtrm">Mataram</option>
            </select>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="kecamatan" className="text-[14px] text-[#374151] pr-[72px]">
              Kecamatan
            </label>
            <select id="kecamatan" className="h-[40px] w-[363px] border text-[#374151]">
              <option value="sukamulia">Sukamulia</option>
              <option value="suralaga">Suralaga</option>
              <option value="kec3">kec3</option>
            </select>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="desa" className="text-[14px] text-[#374151] pr-[72px]">
              Desa
            </label>
            <select id="desa" className="h-[40px] w-[363px] border text-[#374151]">
              <option value="desa1">desa</option>
              <option value="desa2">desa2</option>
              <option value="desa3">desa3</option>
            </select>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="alamat" className="text-[14px] text-[#374151] ">
              Alamat
            </label>
            <input className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"text"} id="alamat" />
          </div>
        </div>
        <div className="h-[42px] w-[240px] bg-[#E44700] rounded-md mt-[27px] cursor-pointer ml-[375px] text-[18px] text-white font-semibold items-center justify-center flex">Bergabung Simpatisan</div>
      </div>
    </form>
  );
};

export default Simpatisan;
