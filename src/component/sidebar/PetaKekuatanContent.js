import { useRouter } from "next/router";
import React from "react";
import { KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import ButtonPopUpInfo from "../ButtonPopUpInfo";
import Link from "next/link";
import MataramContent from "./MataramContent";

function PetaKekuatanContent({ toParent, dataKabupaten, setHover }) {
  toParent(dataKabupaten.data);

  const kabupaten = dataKabupaten?.data;
  const router = useRouter();

  return (
    <div className="mt-4 ">
      <div onClick={() => router.back()}>
        <Button title={"Kembali"} icon={<KembaliIcon />} text={"white"} w={"149px"} h={"53px"} bgColor={"rgb(51, 65, 85)"} />
      </div>

      <ButtonPopUpInfo type={"kab_kota"} setHover={setHover} />
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  mt-8" />
      {/* <p className="text-[32px] font-bold text-slate-700 mt-4">Kabupaten / Kota</p>
      <div className="mt-6 text-[21px] font-medium flex flex-col gap-3 text-slate-700"> */}
      {/* {kabupaten?.map((res) => (
          <p onClick={() => detailKota(res._id)} className="cursor-pointer" key={res?._id}>
            {res?.name}
          </p>
        ))} */}
    </div>
    // </div>
  );
}

export default PetaKekuatanContent;
