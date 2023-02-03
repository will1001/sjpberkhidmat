import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DetailDesaContent from "../../src/component/sidebar/DetailDesaContent";
import SideBar from "../../src/component/sidebar/SideBar";
import KecMataramMap from "../../src/utility/peta/KecMataramMap";

const DetailDesa = ({ router }) => {
  const [top, setTop] = useState();
  const [left, setLeft] = useState();
  useEffect(() => {
    if (router?.query?.desa === "Punia") {
      setTop("-2800px");
      setLeft("-3900px");
    } else if (router?.query?.desa === "Pejanggik") {
      setTop("-2600px");
      setLeft("-4000px");
    } else if (router?.query?.desa === "Mataram Timur") {
      setTop("-2800px");
      setLeft("-3900px");
    } else if (router?.query?.desa === "Pagesangan Barat") {
      setTop("-2900px");
      setLeft("-3900px");
    } else if (router?.query?.desa === "Pagesangan") {
      setTop("-2900px");
      setLeft("-3900px");
    } else if (router?.query?.desa === "Pagesangan Timur") {
      setTop("-2900px");
      setLeft("-4000px");
    } else if (router?.query?.desa === "Pagutan Barat") {
      setTop("-3100px");
      setLeft("-4000px");
    } else if (router?.query?.desa === "Pagutan") {
      setTop("-3100px");
      setLeft("-4000px");
    } else if (router?.query?.desa === "Pagutan Timur") {
      setTop("-3100px");
      setLeft("-4000px");
    }
  }, [router]);
  console.log(router?.query);
  return (
    <div className="flex">
      <div className="basis-4/12 z-50 bg-white pb-[100px]">
        <SideBar content={<DetailDesaContent desa={router?.query?.desa} />} />
      </div>
      <div className={`fixed top-[${top}] left-[${left}] `}>
        <KecMataramMap desa={router?.query?.desa?.toLowerCase()} />
      </div>
    </div>
  );
};

export default withRouter(DetailDesa);
