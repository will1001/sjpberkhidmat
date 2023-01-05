import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataDesa } from "../../src/features/API/dataDesa";

import DetailDesaContent from "../../src/component/sidebar/DetailDesaContent";
import SideBar from "../../src/component/sidebar/SideBar";
import { BackIcon } from "../../src/utility/icon/icon";
import PetaLombok from "../../src/utility/PetaLombok";

const DetailDesa = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataDesa());
  }, [dispatch]);

  const data = useSelector((state) => state.dataDesa.data);

  return (
    <div className="flex">
      <div className="flex basis-3/12">
        <SideBar content={<DetailDesaContent data={data[0]} />} />
      </div>
      <div className="basis-9/12 bg-orange-50">
        <BackIcon />
        <div className="ml-24">
          <PetaLombok />
        </div>
      </div>
    </div>
  );
};

export default DetailDesa;
