import axios from "axios";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosFetch from "../../src/API/axiosFetch";
import useFetch from "../../src/API/useFetch";
import ListKecamatan from "../../src/component/petakekuatan/ListKecamatan";
import MataramContent from "../../src/component/sidebar/MataramContent";
import SideBar from "../../src/component/sidebar/SideBar";
import MataramMap from "../../src/utility/peta/MataramMap";
import PetaLombokBarat from "../../src/utility/peta/PetaLombokBarat";
import PetaLombokTengah from "../../src/utility/peta/PetaLombokTengah";
import PetaLombokTimur from "../../src/utility/peta/PetaLombokTimur";
import PetaLombokUtara from "../../src/utility/peta/PetaLombokUtara";

const DetailKota = ({ router }) => {
  const id_kabupaten = router?.query.kota?.toString();
  // console.log(id_kabupaten);
  const [hover, setHover] = useState(false);
  const periode = useSelector((state) => state.panel.idPeriode);
  const token = useSelector((state) => state.user.token);
  const [targetKab, setTargetKab] = useState();
  const [icon, setIcon] = useState();
  const statisticKec = useFetch("get", `user/dashboard/statistik/kecamatan/${router.query.kota}`);

  useEffect(() => {
    axiosFetch("get", "user/target/details/kabupaten", {}, token)
      .then((res) => router.query.kota === "mataram" && setTargetKab(res.data.data[4]))
      .catch((err) => console.log(err));
  }, [router.query.kota]);

  console.log(router.query.mobile);

  return (
    <>
      {router.query.mobile === "true" ? (
        <div className="px-[16px] pt-[24px]">
          <MataramContent mobile={true} statisticKec={statisticKec?.data} setIcon={setIcon} targetKab={targetKab} data={id_kabupaten?.toString()} setHover={setHover} />
        </div>
      ) : (
        <div className="flex">
          <div className="basis-4/12 z-50 bg-white pb-[100px]  ">{<SideBar content={<MataramContent statisticKec={statisticKec?.data} setIcon={setIcon} targetKab={targetKab} data={id_kabupaten?.toString()} setHover={setHover} />} />}</div>

          <div className={`${router.query.mobile !== undefined ? "hidden" : "visible"} basis-9/12 `}>
            {router.query.kota === "5271" && (
              <div className="fixed left-[-900px] top-[-700px]">
                <MataramMap hover={hover} />
              </div>
            )}
            {router.query.kota === "5201" && (
              <div className="fixed left-[550px] top-[]">
                <ListKecamatan statisticKec={statisticKec?.data} kabupaten={router?.query?.kota} setHover={setHover} icon={icon} id={"5201"} />
                <PetaLombokBarat hover={hover} />
              </div>
            )}
            {router.query.kota === "5208" && (
              <div>
                <ListKecamatan statisticKec={statisticKec?.data} kabupaten={router?.query?.kota} setHover={setHover} icon={icon} id={"5201"} />
                <PetaLombokUtara hover={hover} />
              </div>
            )}
            {router.query.kota === "5202" && (
              <div>
                <ListKecamatan statisticKec={statisticKec?.data} kabupaten={router?.query?.kota} setHover={setHover} icon={icon} id={"5201"} />
                <PetaLombokTengah hover={hover} />
              </div>
            )}
            {router.query.kota === "5203" && (
              <div>
                <ListKecamatan statisticKec={statisticKec?.data} kabupaten={router?.query?.kota} setHover={setHover} icon={icon} id={"5201"} />
                <PetaLombokTimur hover={hover} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(DetailKota);
