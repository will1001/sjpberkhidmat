import { useRouter } from "next/router";
import React from "react";

function ListTargetDesa({ label, simpatisan, target, id_kabupaten, mobile }) {
  const router = useRouter();
  return (
    <div className={`flex items-center justify-between shadow-md ${mobile === true ? "px-3 w-full py-3" : "p-[20px] w-[1000px]"} `}>
      <div className={``}>{label}</div>
      <div className={`${mobile === true ? "" : "flex"}`}>
        <div className={`${mobile === true ? "" : "mr-[100px]"}`}>
          {simpatisan} /<span className="text-orange-600 font-bold">{target}</span>
        </div>
        <span
          onClick={() => {
            router.push({
              pathname: "/DetailTargetDesa",
              query: { id_kabupaten },
            });
          }}
          className="underline text-orange-600 cursor-pointer"
        >
          lihat detail
        </span>
      </div>
    </div>
  );
}

export default ListTargetDesa;
