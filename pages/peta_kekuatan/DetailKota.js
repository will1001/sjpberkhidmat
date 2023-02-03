import axios from "axios";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFetch from "../../src/API/useFetch";
import MataramContent from "../../src/component/sidebar/MataramContent";
import SideBar from "../../src/component/sidebar/SideBar";
import MataramMap from "../../src/utility/peta/MataramMap";
import mataram from "../../src/utility/peta/peta_mataram.png";

const DetailKota = ({ router }) => {
  const id_kabupaten = router?.query.kota?.toString();
  console.log(id_kabupaten);
  const [hover, setHover] = useState(false);
  console.log(hover);

  return (
    <div className="flex">
      <div className="basis-3/12 z-50 bg-white pb-[100px]">{<SideBar content={<MataramContent data={id_kabupaten?.toString()} setHover={setHover} />} />}</div>

      <div className="basis-9/12">
        {
          router.query.kota === "mataram" && (
            <div className="fixed left-[-900px] top-[-700px]">
              <MataramMap hover={hover} />
            </div>
          )
          // <img className="h-full w-full" src={mataram.src} alt="peta_mataram.png" />
        }
      </div>
    </div>
  );
};

export default withRouter(DetailKota);
