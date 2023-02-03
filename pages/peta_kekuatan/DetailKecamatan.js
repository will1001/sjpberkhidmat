import { withRouter } from "next/router";
import React, { useState } from "react";
import MataramContent from "../../src/component/sidebar/MataramContent";
import SideBar from "../../src/component/sidebar/SideBar";
import kecMataram from "../../src/utility/peta/kec_mataram.png";
import DetailDesaContent from "../../src/component/sidebar/DetailKecamatanContent";
import KecMataramMap from "../../src/utility/peta/KecMataramMap";
import AmpenanMap from "../../src/utility/peta/AmpenanMap";

const DetailKecamatan = ({ router }) => {
  const [hover, setHover] = useState();
  console.log(router?.query?.id);

  return (
    <div className="flex">
      <div className="basis-4/12 bg-white z-50">{<SideBar content={<DetailDesaContent setHover={setHover} data={router?.query?.kecamatan} nama={router?.query?.nama} />} />}</div>
      {router?.query?.nama?.toLowerCase() === "mataram" && (
        <div className="fixed left-[-2500px] top-[-2000px] ">
          <KecMataramMap hover={hover} nama={router?.query?.nama} />
        </div>
      )}
      {router?.query?.nama?.toLowerCase() === "ampenan" && (
        <div className="fixed left-[-3800px] top-[-2600px] ">
          <AmpenanMap hover={hover} nama={router?.query?.nama} />
        </div>
      )}
    </div>
  );
};

export default withRouter(DetailKecamatan);
