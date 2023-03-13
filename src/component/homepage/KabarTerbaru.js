import { useRouter } from "next/router";
import React from "react";
import playIcon from "../../utility/icon/playIcon.png";

const KabarTerbaru = ({ data, mobile }) => {
  const router = useRouter();
  const sandboxOptions = "allow-scripts allow-same-origin";
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];

  return (
    <>
      {mobile !== undefined ? (
        <div className="flex justify-between gap-2 ">
          <div className="flex h-[82px]">
            <div
              onClick={() =>
                router.push({
                  pathname: "../../publikasi/DetailPublikasi",
                  query: {
                    title: data?.title,
                    image: data?.video,
                    category: data?.category,
                    creat: data?.createdAt?.split("T").shift().split("-").reverse().join("/"),
                  },
                })
              }
              className="absolute cursor-pointer h-[82px]"
            ></div>
            <div className="">{data?.length !== 0 && <iframe className="rounded-md" width="105" height="82" src={"https://www.youtube.com/embed/" + data?.video?.split("=").pop()}></iframe>}</div>
          </div>

          <div className="flex flex-col justify-between w-[239px]">
            <div>
              <p className="font-semibold text-[14px] text-[#E44700]">{data?.category}</p>
              <p className="font-semibold text-[12px] text-slate-700">{data?.title}</p>
            </div>

            <p className="font-semibold text-[10px] text-[#E44700]">
              {" "}
              {data?.createdAt?.split("T").shift().split("-")[2]} {monthNames[new Date(data?.createdAt?.split("T").shift().split("-")[1]).getMonth()]} {data?.createdAt?.split("T").shift().split("-")[0]}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-2 w-[382px]">
          <div className="flex justify-center w-[175px] h-[116.67px]">
            <div
              onClick={() =>
                router.push({
                  pathname: "../../publikasi/DetailPublikasi",
                  query: {
                    title: data?.title,
                    image: data?.video,
                    category: data?.category,
                    creat: data?.createdAt?.split("T").shift().split("-").reverse().join("/"),
                  },
                })
              }
              className="absolute cursor-pointer w-[175px] h-[116.67px]"
            ></div>
            <div className="">{data?.length !== 0 && <iframe className="rounded-sm" width="175" height="116.67" src={"https://www.youtube.com/embed/" + data?.video?.split("=").pop()}></iframe>}</div>
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
      )}
    </>
  );
};

export default KabarTerbaru;
