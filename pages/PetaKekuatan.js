import React, { useEffect, useState } from "react";
import useFetch from "../src/API/useFetch";
import PetaKekuatanContent from "../src/component/sidebar/PetaKekuatanContent";
import SideBar from "../src/component/sidebar/SideBar";
import PetaLombok from "../src/utility/PetaLombok";

function PetaKekuatan() {
  const base_url = "https://api.sjpberkhidmat.id/";
  const kabupaten = useFetch("get", "user/kabupaten");
  const [relawan, setRelawan] = useState([]);
  const [hover, setHover] = useState();

  const dataChill = (data) => console.log(data);

  return (
    <div className="w-[1350px]">
      <div className="flex w-full">
        <div className="flex flex-col basis-3/12 ">
          <SideBar content={<PetaKekuatanContent toParent={dataChill} setHover={setHover} dataKabupaten={kabupaten} />} />
        </div>
        <div className="basis-9/12 bg-white h-screen w-full">
          <div className="fixed ml-[120px]">
            <PetaLombok hover={hover} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetaKekuatan;
