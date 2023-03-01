import { useRouter } from "next/router";
import React from "react";
import playIcon from "../../utility/icon/playIcon.png";

const KabarTerbaru = ({ data }) => {
  const router = useRouter();
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  // console.log(data, "ini data");
  return (
    <div className="flex justify-between gap-2 w-[382px]">
      <div className="flex justify-center w-[175px] h-[116.67px]">
        <img
          onClick={() =>
            router.push({
              pathname: "../../publikasi/DetailPublikasi",
              query: {
                title: data?.title,
                image: data?.image,
                category: data?.category,
                creat: data?.createdAt?.split("T").shift().split("-").reverse().join("/"),
              },
            })
          }
          className="h-[30px] w-[30px] absolute mt-[40px] cursor-pointer z-20"
          src={playIcon.src}
        />
        {/* <div className="flex mt-8">{data?.length !== 0 && <iframe className="rounded-sm" width="828" height="552" src={"https://www.youtube.com/embed/" + data?.video?.split("=").pop()}></iframe>}</div> */}
      </div>

      <div className="flex flex-col justify-between w-[239px]">
        <div>
          <p className="font-semibold text-[14px] text-[#E44700]">{data?.category}</p>
          <p className="font-semibold text-[14px] text-slate-700">{data?.title}</p>
        </div>

        <p className="font-semibold text-[14px] text-[#E44700]">
          {" "}
          {data?.createdAt?.split("T").shift().split("-")[2]} {monthNames[new Date(data?.createdAt?.split("T").shift().split("-")[1]).getMonth()]} {data?.createdAt?.split("T").shift().split("-")[0]}
        </p>
      </div>
    </div>
  );
};

export default KabarTerbaru;
