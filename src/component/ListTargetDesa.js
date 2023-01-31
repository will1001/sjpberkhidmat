import React from "react";

function ListTargetDesa({ label, id_kab }) {
  return (
    <div className="flex items-center justify-between shadow-md p-[20px] w-[1000px]">
      <div>{label}</div>
      <div className="flex">
        <div className="mr-[100px]">
          5.000 /<span className="text-orange-600 font-bold">25.000</span>
        </div>
        <a href="" className="underline text-orange-600">
          lihat detail
        </a>
      </div>
    </div>
  );
}

export default ListTargetDesa;
