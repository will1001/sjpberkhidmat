import React from "react";

const Publikasi = ({ data }) => {
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  // console.log("xxx");
  // console.log(data);
  // console.log("xxx");
  return (
    <div className="font-bold text-[32px] text-slate-700">
      {data?.image && <img className="w-[540px] h-[420px] rounded-xl object-cover" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + data?.image} alt="Frame-2519" border="0"></img>}
      <div className="flex mt-8">{data?.length !== 0 && <iframe className="rounded-sm" width="750" height="450" src={"https://www.youtube.com/embed/" + data?.video?.split("=").pop()}></iframe>}</div>
      <div className="flex items-center mt-3 gap-6">
        <p className="text-[#FF5001] text-[21px] font-medium">{data?.category}</p>
        <p className="text-[21px] font-medium">
          {data?.createdAt?.split("T").shift().split("-")[2]} {monthNames[new Date(data?.createdAt?.split("T").shift().split("-")[1]).getMonth()]} {data?.createdAt?.split("T").shift().split("-")[0]}
        </p>
      </div>
      <p className="text-[26px]">{data?.title}</p>
    </div>
  );
};

export default Publikasi;
