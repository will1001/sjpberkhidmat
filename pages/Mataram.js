import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWilayah } from "../src/features/API/dataWilayahSlice";
import MataramContent from "../src/component/sidebar/MataramContent";
import SideBar from "../src/component/sidebar/SideBar";
import { BackIcon } from "../src/utility/icon/icon";
import PetaLombok from "../src/utility/PetaLombok";

const Mataram = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataWilayah());
  }, [dispatch]);

  const dataMataram = useSelector((state) => state.dataWilayah.data[0]);

  return (
    <div className="flex">
      <div className="flex basis-3/12">
        <SideBar content={<MataramContent data={dataMataram} />} />
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

export default Mataram;
