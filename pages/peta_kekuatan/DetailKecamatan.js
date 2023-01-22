import { withRouter } from "next/router";
import React from "react";
import MataramContent from "../../src/component/sidebar/MataramContent";
import SideBar from "../../src/component/sidebar/SideBar";
import kecMataram from "../../src/utility/peta/kec_mataram.png";
import DetailDesaContent from "../../src/component/sidebar/DetailDesaContent";

const DetailKecamatan = ({ router }) => {
  const idKecamatan = router.query;

  //   console.log(idKecamatan);
  return (
    <div className="flex">
      <div className="basis-3/12">{<SideBar content={<DetailDesaContent data={idKecamatan} />} />}</div>
      <div className="basis-9/12">{true && <img className="h-full w-full" src={kecMataram.src} alt="kec_mataram.png" />}</div>
    </div>
  );
};

export default withRouter(DetailKecamatan);
