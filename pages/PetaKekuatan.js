import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosFetch from "../src/API/axiosFetch";
import useFetch from "../src/API/useFetch";
import PetaKekuatanContent from "../src/component/sidebar/PetaKekuatanContent";
import SideBar from "../src/component/sidebar/SideBar";
import PetaLombok from "../src/utility/PetaLombok";

function PetaKekuatan() {
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);
  const kabupaten = useFetch("get", "user/kabupaten");
  const getProgram = useFetch("get", "user/articles?page=1&type=program");
  const [targetKab, setTargetKab] = useState([]);
  const [hover, setHover] = useState();
  useEffect(() => {
    axiosFetch("get", `user/target/details/kabupaten`, {}, token)
      .then((res) => setTargetKab(res.data))
      .catch((err) => console.log(err));
  }, []);

  // const dataChill = (data) => console.log(data);
  console.log(kabupaten?.data, "target");

  return (
    <div className="w-[1350px]">
      <div className="flex w-full">
        <div className="flex flex-col basis-3/12 ">
          <SideBar
            content={<PetaKekuatanContent program={getProgram?.data?.filter((data) => [periode].includes(data.id_periode))} targetKab={targetKab?.data?.map((res) => res.total_target)} setHover={setHover} dataKabupaten={kabupaten} />}
          />
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
