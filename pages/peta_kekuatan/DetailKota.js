import axios from "axios";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosFetch from "../../src/API/axiosFetch";
import ListKecamatan from "../../src/component/petakekuatan/ListKecamatan";
import MataramContent from "../../src/component/sidebar/MataramContent";
import SideBar from "../../src/component/sidebar/SideBar";
import MataramMap from "../../src/utility/peta/MataramMap";
import PetaLombokBarat from "../../src/utility/peta/PetaLombokBarat";

const DetailKota = ({ router }) => {
  const id_kabupaten = router?.query.kota?.toString();
  // console.log(id_kabupaten);
  const [hover, setHover] = useState(false);
  const periode = useSelector((state) => state.panel.idPeriode);
  const token = useSelector((state) => state.user.token);
  const [targetKab, setTargetKab] = useState();
  const [icon, setIcon] = useState();

  useEffect(() => {
    axiosFetch("get", "user/target/details/kabupaten", {}, token)
      .then((res) => router.query.kota === "mataram" && setTargetKab(res.data.data[4]))
      .catch((err) => console.log(err));
  }, [router.query.kota]);
  // console.log(targetKab, "asd");
  console.log(icon);

  return (
    <div className="flex">
      <div className="basis-4/12 z-50 bg-white pb-[100px]">{<SideBar content={<MataramContent setIcon={setIcon} targetKab={targetKab} data={id_kabupaten?.toString()} setHover={setHover} />} />}</div>

      <div className="basis-9/12">
        {router.query.kota === "mataram" && (
          <div className="fixed left-[-900px] top-[-700px]">
            <MataramMap hover={hover} />
          </div>
        )}
        {router.query.kota === "lombok barat" && (
          <div className="">
            <div className="flex gap-3">
              <div className="">
                <div>
                  <ListKecamatan icon={icon} id={"5201"} />
                </div>
              </div>
              <div>
                <PetaLombokBarat />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(DetailKota);
