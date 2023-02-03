import { withRouter } from "next/router";
import React, { useState } from "react";
import MataramContent from "../../src/component/sidebar/MataramContent";
import SideBar from "../../src/component/sidebar/SideBar";
import kecMataram from "../../src/utility/peta/kec_mataram.png";
import DetailDesaContent from "../../src/component/sidebar/DetailDesaContent";
import KecMataramMap from "../../src/utility/peta/KecMataramMap";

const DetailKecamatan = ({ router }) => {
  const [hover, setHover] = useState();
  console.log(router.query.kecamatan);

  return (
    <div className="flex">
      <div className="basis-3/12 z-50">{<SideBar content={<DetailDesaContent setHover={setHover} data={router?.query?.kecamatan} nama={router?.query?.nama} />} />}</div>
      <div className="basis-9/12 fixed left-[-2500px] top-[-2000px] ">{router.query.nama.toLowerCase() === "mataram" && <KecMataramMap hover={hover} />}</div>
    </div>
  );
};

export default withRouter(DetailKecamatan);
