import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFetch from "../../src/API/useFetch";
import MataramContent from "../../src/component/sidebar/MataramContent";
import SideBar from "../../src/component/sidebar/SideBar";
import mataram from "../../src/utility/peta/peta_mataram.png";

const DetailKota = ({ router }) => {
  const [idKabupaten, setIdKabupaten] = useState();
  const [data, setData] = useState();
  let res = useFetch("get", `user/kecamatan/${router.query.kota}`);

  //   console.log(res);
  return (
    <div className="flex">
      <div className="basis-3/12">
        <SideBar content={<MataramContent data={res?.data} />} />
      </div>
      <div className="basis-9/12">
        <img className="h-full w-full" src={mataram.src} alt="peta_mataram.png" />
      </div>
    </div>
  );
};

export default withRouter(DetailKota);
