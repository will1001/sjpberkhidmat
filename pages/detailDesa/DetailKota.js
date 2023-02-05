import React, { useEffect } from "react";
import { BackIcon } from "../../src/utility/icon/icon";
import PetaLombok from "../../src/utility/PetaLombok";
import DetailDesa from "../../src/component/sidebar/DetailDesaContent";
import SideBar from "../../src/component/sidebar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWilayah } from "../../src/features/API/dataWilayahSlice";

const DetailKota = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataWilayah());
  }, [dispatch]);

  const data = useSelector((state) => state.dataWilayah.data[0]);

  return (
    <div className="flex">
      <div className="flex basis-3/12">
        <SideBar content={<DetailDesa data={data} />} />
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

export default DetailKota;
