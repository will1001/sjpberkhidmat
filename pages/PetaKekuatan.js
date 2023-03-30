import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosFetch from "../src/API/axiosFetch";
import useFetch from "../src/API/useFetch";
import PetaKekuatanContent from "../src/component/sidebar/PetaKekuatanContent";
import SideBar from "../src/component/sidebar/SideBar";
import PetaLombok from "../src/utility/PetaLombok";

function PetaKekuatan() {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);
  const kabupaten = useFetch("get", "user/kabupaten");
  const getProgram = useFetch("get", "user/articles?page=1&type=program");
  const getStatistic = useFetch("get", "user/dashboard/statistik/kabupaten");
  const [targetKab, setTargetKab] = useState([]);
  const [hover, setHover] = useState();
  const [dataMataram, setDataMataram] = useState();
  useEffect(() => {
    axiosFetch("get", `user/target/details/kabupaten`, {}, token)
      .then((res) => {
        setTargetKab(res.data);
        setDataMataram(res?.data?.data[4]);
      })
      .catch((err) => console.log(err));
  }, []);

  // const dataChill = (data) => console.log(data);
  // console.log(getStatistic);

  return (
    <div className={`${router.query.display === "mobile" ? "" : "w-[1350px]"} `}>
      <div className="flex w-full">
        <div className={`${router.query.display === "mobile" ? "" : "flex flex-col basis-3/12 "} `}>
          <SideBar
            content={
              <PetaKekuatanContent
                mobile={router.query.display === "mobile" ? true : false}
                statistic={getStatistic?.data}
                program={getProgram?.data?.filter((data) => [periode].includes(data.id_periode))}
                targetKab={targetKab?.data?.map((res) => res.total_target)}
                setHover={setHover}
                dataKabupaten={kabupaten}
              />
            }
          />
        </div>
        <div className={`${router.query.display === "mobile" && "hidden"} basis-9/12 bg-white h-screen w-full`}>
          <div className="fixed ml-[120px]">
            <PetaLombok hover={hover} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetaKekuatan;
