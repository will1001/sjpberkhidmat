import { useRouter } from "next/router";
import React from "react";
import { ButtonLogin } from "../../src/utility/icon/icon";
import Logo from "../../src/utility/Logo";

const DetailArtikel = () => {
  const router = useRouter();
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  //   const style = {};
  console.log(router.query.description);
  return (
    <>
      <div className="fixed top-0 w-screen border-b-2 z-50 shadow-md">
        <div className="flex bg-white w-full h-[72px] px-20 justify-between z-20">
          <div>
            <Logo />
          </div>

          <div className="flex items-center gap-4 text-[16px] font-medium text-[#374151]">
            <p
              onClick={() => {
                router.push("/");
              }}
              className={`cursor-pointer `}
            >
              Beranda
            </p>
            <p onClick={() => router.push("../../../Profil")} className="cursor-pointer">
              Profil
            </p>
            <p
              onClick={() => {
                router.push({
                  pathname: "/",
                  query: { page: "program" },
                });
              }}
              className="cursor-pointer"
            >
              <span>Program</span>
            </p>
            <p onClick={() => goto(refPublikasi.current)} className={`flex cursor-pointer  text-[#FF5001]`}>
              <span>Publikasi</span>
            </p>
            <p
              onClick={() => {
                router.push({
                  pathname: "/",
                  query: { page: "pendaftaran" },
                });
              }}
              className="flex cursor-pointer stroke-[#374151] "
            >
              Pendaftaran Anggota
            </p>
            <div onClick={() => router.push("../../../Aspirasi")} className="bg-[#FF5001] text-white h-[31px] px-4 cursor-pointer flex items-center rounded-md">
              Rumah Aspirasi
            </div>
            <button
              onClick={() => {
                router.push({ pathname: "../../../Login" });
              }}
            >
              <ButtonLogin />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#FF5001] text-[32px] font-bold text-white mt-[70px] flex justify-center py-4">Publikasi Artikel</div>
      <div className="flex px-[70px] py-[52px] text-[#374151] justify-between">
        <div className="basis-7/12">
          <p className="text-[52px] font-bold">{router?.query?.title}</p>
          <div className="flex gap-6 my-[24px] text-[#E44700] font-medium">
            <p>
              {router?.query?.creat !== undefined && router?.query?.creat?.split("T").shift().split("-")[2]} {monthNames[new Date(router?.query?.creat?.split("T").shift().split("-")[1]).getMonth()]}{" "}
              {router?.query?.creat !== undefined && router?.query?.creat.split("T").shift().split("-")[0]} - {router?.query?.creat?.split(".").shift().split("T").pop().split(":").reverse().join(":")} WIB
            </p>
            <p>{router?.query?.category}</p>
          </div>
          <div>
            <img className="w-full h-[395px] rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + router?.query?.image} />
          </div>
          <div className="mt-[24px]" dangerouslySetInnerHTML={{ __html: router?.query?.description }} />
        </div>
        <div>video Lainnya</div>
      </div>
    </>
  );
};

export default DetailArtikel;
