import React from "react";

import { KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import JumlahPenduduk from "../JumlahPenduduk";

function PetaKekuatanContent() {
  return (
    <div className="mt-4">
      <Button
        title={"Kembali"}
        icon={<KembaliIcon />}
        text={"white"}
        w={"260px"}
        h={"53px"}
        bgColor={"rgb(51, 65, 85)"}
      />
      <div className="flex mt-8 justify-between">
        <JumlahPenduduk
          title={"Relawan"}
          icon={<TpsIcon />}
          total="123.123"
          h={"63px"}
          w={"175px"}
          totalSize={"21px"}
          titleSize={"18px"}
        />
        <JumlahPenduduk
          title={"Relawan"}
          icon={<TpsIcon />}
          total="123.123"
          h={"63px"}
          w={"175px"}
          totalSize={"21px"}
          titleSize={"18px"}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <JumlahPenduduk
          title={"Relawan"}
          icon={<TpsIcon />}
          total="123.123"
          h={"63px"}
          w={"175px"}
          totalSize={"21px"}
          titleSize={"18px"}
        />
        <JumlahPenduduk
          title={"Relawan"}
          icon={<TpsIcon />}
          total="123.123"
          h={"63px"}
          w={"175px"}
          totalSize={"21px"}
          titleSize={"18px"}
        />
      </div>

      <hr className="w-full h-1 bg-gray-100 border-0 rounded  mt-8" />

      <p className="text-[32px] font-bold text-slate-700 mt-4">
        Kabupaten / Kota
      </p>

      <div className="mt-6 text-[20px] flex flex-col gap-2 text-slate-700">
        <p>Kabupaten Lombok Barat</p>
        <p>Kabupaten Lombok Tengah</p>
        <p>Kabupaten Lombok Timur</p>
        <p>Kabupaten Lombok Utara</p>
        <p>Kota Mataram</p>
      </div>
    </div>
  );
}

export default PetaKekuatanContent;
