import React from "react";
import Image from "../../utility/img/kabarSjpBerkhidmat.png";

const KabarSjpBerkhidmat = () => {
  return (
    <div className="flex w-[744px] mb-[39px] items-center">
      <div className="pt-2">
        <p className="text-[#FF5001] text-[18px] font-semibold">Et lorem</p>
        <p className="text-[21px] text-slate-700 font-bold">Aliquam pulvinar sit tellus morbi condimentum tincidunt nulla porttitor risus id morbi</p>
        <p className="text-slate-700 text-[16px] pt-2">16 Agustus 2022</p>
      </div>
      <img className="w-[327px] h-[150px]" src={Image.src} alt="image1  " />
    </div>
  );
};

export default KabarSjpBerkhidmat;
