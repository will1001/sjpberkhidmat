import React from "react";
import Logo from "../utility/Logo";

function Footer() {
  return (
    <div className="flex flex-col justify-center border-t-2 py-2 ">
      <div className="flex justify-center">
        <div className="">
          <p className="text-[16px] text-[#4B5563] font-semibold">H. SURYADI JAYA PURNAMA, S.T.</p>

          <p className="text-[12px] text-[#FF5001]">DPR RI Dapil II Provinsi Nusa Tenggara Barat</p>
          <p className="text-[12px] text-[#4B5563]">Bekerja bersama untuk membangun masa depan yang lebih baik bagi masyarakat dan generasi yang akan datang.</p>
        </div>
      </div>
      <div className="border  border-[#6B7280] mt-[20px]" />
      <span className="text-[12px] text-[#4B5563]">Copyright © 2022. Website Resmi SJP Berkhidmat dikelola oleh Tim Internal</span>
    </div>
  );
}

export default Footer;
