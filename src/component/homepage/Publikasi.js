import React from "react";

const Publikasi = ({ data }) => {
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  // console.log(data);
  return (
    <div className="font-bold text-[32px] text-slate-700">
      {/* {data?.image && <img className="w-[540px] h-[420px] rounded-xl object-cover" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + data?.image} alt="Frame-2519" border="0"></img>} */}
      <div className=" mt-8">
        {data?.image && (
          <video className="w-[828px] h-[552.18px] rounded-xl object-fill" controls>
            <source src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + data?.image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
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
