import { useRouter } from "next/router";
import React from "react";

function ListTargetDesa({ label, simpatisan, target }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between shadow-md p-[20px] w-[1000px]">
      <div>{label}</div>
      <div className="flex">
        <div className="mr-[100px]">
          {simpatisan} /
          <span className="text-orange-600 font-bold">{target}</span>
        </div>
        <span
          onClick={() => {
            router.push({
              pathname: "/DetailTargetDesa",
              query: {},
            });
          }}
          className="underline text-orange-600"
        >
          lihat detail
        </span>
      </div>
    </div>
  );
}

export default ListTargetDesa;
