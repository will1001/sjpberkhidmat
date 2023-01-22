import axios from "axios";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFetch from "../../src/API/useFetch";
import MataramContent from "../../src/component/sidebar/MataramContent";
import SideBar from "../../src/component/sidebar/SideBar";
import mataram from "../../src/utility/peta/peta_mataram.png";
import Lotim from "../../src/component/sidebar/Lotim";

const DetailKota = ({ router }) => {
  const id_kabupaten = router.query.kota?.toString();
  //   console.log(id_kabupaten);

  return (
    <div className="flex">
      <div className="basis-3/12">{<SideBar content={<MataramContent data={id_kabupaten} />} />}</div>

      <div className="basis-9/12">{id_kabupaten === "5271" && <img className="h-full w-full" src={mataram.src} alt="peta_mataram.png" />}</div>
    </div>
  );
};

export default withRouter(DetailKota);
