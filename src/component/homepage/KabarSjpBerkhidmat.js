import { useRouter } from "next/router";
import React from "react";
import Image from "../../utility/img/kabarSjpBerkhidmat.png";

const KabarSjpBerkhidmat = ({ data, mobile }) => {
  const router = useRouter();
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  // console.log(data);
  return (
    <>
      {mobile !== undefined ? (
        <div className="flex justify-between mb-2">
          <div className="pt-2 flex flex-col justify-between w-[400px]">
            <div>
              <p className="text-[#FF5001] text-[12px] font-semibold">{data?.category}</p>
              <p className="text-[10px] text-slate-700 font-bold">{data?.title}</p>
            </div>

            <p className="text-slate-700 text-[10px] pt-2">
              {data?.createdAt.split("T").shift().split("-")[2]} {monthNames[new Date(data?.createdAt.split("T").shift().split("-")[1]).getMonth()]} {data?.createdAt.split("T").shift().split("-")[0]}
            </p>
          </div>
          <div
            onClick={() =>
              router.push({
                pathname: "../../../publikasi/DetailArtikel",
                query: {
                  title: data?.title,
                  description: data?.description,
                  category: data?.category,
                  creat: data?.createdAt,
                  image: data?.image,
                },
              })
            }
            className="w-[200px] h-[82px] cursor-pointer"
          >
            <img className="w-[200px] h-[82px] rounded-sm" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + data?.image} alt="image1  " />
          </div>
        </div>
      ) : (
        <div className="flex justify-between mb-4">
          <div className="pt-2 flex flex-col justify-between w-[400px]">
            <div>
              <p className="text-[#FF5001] text-[18px] font-semibold">{data?.category}</p>
              <p className="text-[21px] text-slate-700 font-bold">{data?.title}</p>
            </div>

            <p className="text-slate-700 text-[16px] pt-2">
              {data?.createdAt.split("T").shift().split("-")[2]} {monthNames[new Date(data?.createdAt.split("T").shift().split("-")[1]).getMonth()]} {data?.createdAt.split("T").shift().split("-")[0]}
            </p>
          </div>
          <div
            onClick={() =>
              router.push({
                pathname: "../../../publikasi/DetailArtikel",
                query: {
                  title: data?.title,
                  description: data?.description,
                  category: data?.category,
                  creat: data?.createdAt,
                  image: data?.image,
                },
              })
            }
            className="w-[327px] h-[140px] cursor-pointer"
          >
            <img className="h-full w-full rounded-sm" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + data?.image} alt="image1  " />
          </div>
        </div>
      )}
    </>
  );
};

export default KabarSjpBerkhidmat;
