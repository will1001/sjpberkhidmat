import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../src/API/useFetch";
import { ButtonLogin, FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, TwitterIcon, YouTubeIcon } from "../../src/utility/icon/icon";
import Logo from "../../src/utility/Logo";

const SemuaArtikel = () => {
  const router = useRouter();
  const getPublikasi = useFetch("get", "user/articles?page=1&type=artikel");
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  const [filter, setFilter] = useState();

  useEffect(() => {
    setFilter(router.query.category);
  }, [router.query]);

  console.log(filter);
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
              className={`cursor-pointer`}
            >
              Beranda
            </p>
            <p onClick={() => router.push("../Profil")} className="cursor-pointer">
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
            <p
              onClick={() => {
                router.push({
                  pathname: "/",
                  query: { page: "publikasi" },
                });
              }}
              className={`flex cursor-pointer  text-[#FF5001] `}
            >
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
            <div onClick={() => router.push("../Aspirasi")} className="bg-[#FF5001] text-white h-[31px] px-4 cursor-pointer flex items-center rounded-md">
              Rumah Aspirasi
            </div>
            <button
              onClick={() => {
                router.push({ pathname: "../Login" });
              }}
            >
              <ButtonLogin />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-[70px] mt-[100px] mb-4">
        <p className=" mb-2 text-[#374151] text-[26px] font-bold">Publikasi Artikel</p>
        <div className="flex gap-3 items-center">
          Pilih Kategori
          <select onChange={(e) => router.push({ pathname: "./SemuaArtikel", query: { category: e.target.value } })} className="w-[200px] py-2 px-4 border rounded-md outline-0">
            <option className="font-medium" value={filter}>
              {filter}
            </option>
            <option className={`${filter === "Semua" && "hidden"}`} value={"Semua"}>
              Semua
            </option>
            <option className={`${filter === "Bantuan Sosial" && "hidden"}`} value={"Bantuan Sosial"}>
              Bantuan Sosial
            </option>
            <option className={`${filter === "Infrastruktur" && "hidden"}`} value={"Infrastruktur"}>
              Infrastruktur
            </option>
            <option className={`${filter === "Pendidikan" && "hidden"}`} value={"Pendidikan"}>
              Pendidikan
            </option>
            <option className={`${filter === "Lapangan Kerja" && "hidden"}`} value={"Lapangan Kerja"}>
              Lapangan Kerja
            </option>
            <option className={`${filter === "Peraturan Daerah" && "hidden"}`} value={"Peraturan Daerah"}>
              Peraturan Daerah
            </option>
            <option className={`${filter === "Ormas & Keagamaan" && "hidden"}`} value={"Ormas & Keagamaan"}>
              Ormas & Keagamaan
            </option>
            <option className={`${filter === "Kesehatan" && "hidden"}`} value={"Kesehatan"}>
              Kesehatan
            </option>
            <option className={`${filter === "Politik & Pemerintahan" && "hidden"}`} value={"Politik & Pemerintahan"}>
              Politik & Pemerintahan
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4  gap-4 mr-2 ml-[70px] pb-[50px]">
        {getPublikasi?.data
          ?.filter((data) => ["jpg", "jpeg", "png"].includes(data.image.split(".").pop().toLowerCase()))
          .filter((data) => (filter === "Semua" ? true : filter.includes(data.category)))
          .map((res) => (
            <div key={res._id} className="w-[300px]">
              <div className="flex justify-center w-[300px] h-[200px]">
                <img
                  onClick={() =>
                    router.push({
                      pathname: "./DetailArtikel",
                      query: { title: res?.title, description: res?.description, category: res?.category, creat: res?.createdAt, image: res?.image },
                    })
                  }
                  className="w-full h-full rounded-md cursor-pointer"
                  src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image}
                  alt={res.title}
                />
              </div>
              <p className="text-[#FF5001] text-[18px] font-semibold mt-2">{res.category}</p>
              <p className="text-[#374151] font-semibold">{res.title}</p>
              <p className="mt-3 text-[#374151] text-[16px]">
                {res?.createdAt.split("T").shift().split("-")[2]} {monthNames[new Date(res?.createdAt.split("T").shift().split("-")[1]).getMonth()]} {res?.createdAt.split("T").shift().split("-")[0]}
              </p>
            </div>
          ))}
      </div>
      <div className="flex h-[248px] bg-[#FF5001] py-[65px] w-screen px-[50px]">
        <p className="text-white text-[26px] flex font-bold basis-1/2">
          Kami membuka pintu komunikasi yang <br /> kondusif dan terbuka untuk menerima <br /> pesan dan aspirasi dari masyarakat.
        </p>
        <div className="basis-1/2">
          <p className="text-[18px]  text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
          <button onClick={() => router.push("../Aspirasi")} className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">
            Sampaikan Aspirasi
          </button>
        </div>
      </div>
      <div style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.02)" }} className="flex w-screen h-[240px] justify-between pr-[120px]">
        <div className="flex flex-col justify-center pl-[70px]">
          <div className="flex justify-center w-[560px]">
            <Logo />
            <div className="pl-[32px] w-[580px]">
              <p className="text-[16px] text-[#4B5563] font-semibold">H. SURYADI JAYA PURNAMA, S.T.</p>

              <p className="text-[12px] text-[#FF5001]">DPR RI Dapil II Provinsi Nusa Tenggara Barat</p>
              <p className="text-[12px] text-[#4B5563]">
                Bekerja bersama untuk membangun masa depan yang <br /> lebih baik bagi masyarakat dan generasi yang akan datang.
              </p>
            </div>
          </div>
          <div className="border  border-[#6B7280] mt-[52px]" />
          <span className="text-[12px] text-[#4B5563]">Copyright © 2022. Website Resmi SJP Berkhidmat dikelola oleh Tim Internal</span>
        </div>

        <div className="flex flex-col gap-1 text-[#4B5563] justify-center">
          <p className="">Pemilu 2024</p>
          <p className="">Publikasi</p>
          <p className="">Gallery</p>
          <p className="">Rumah Aspirasi</p>
          <p className="">Daftar Relawan</p>
          <p className="">Daftar Simpatisan</p>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <p className="flex justify-center font-semibold text-[16px] text-[#4B5563]">Social Media</p>
          <div className="flex items-center gap-3">
            <button>
              <LinkedInIcon />
            </button>
            <a className="cursor-pointer" target="_blank" href="https://www.instagram.com/suryadi.sjp/?igshid=OGQ2MjdiOTE=">
              <InstagramIcon />
            </a>
            <a className="cursor-pointer" href="https://www.facebook.com/sjp.officialpage?mibextid=ZbWKwL" target="_blank">
              <FacebookIcon />
            </a>
            <a className="cursor-pointer" href="https://youtube.com/@suryadijayapurnama_sjp4774" target="_blank">
              <YouTubeIcon />
            </a>
            <a className="cursor-pointer" href="https://twitter.com/suryadi_sjpntb" target="_blank">
              <TwitterIcon />
            </a>
            <button>
              <TikTokIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SemuaArtikel;
