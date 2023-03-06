import { useRouter } from "next/router";
import React from "react";
import useFetch from "../../src/API/useFetch";
import { ButtonLogin, FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, TwitterIcon, YouTubeIcon } from "../../src/utility/icon/icon";
import Logo from "../../src/utility/Logo";

const DetailArtikel = () => {
  const router = useRouter();
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  const getArtikel = useFetch("get", "user/articles?page=1&type=artikel");
  //   console.log(router.query.description);
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
      <div className="flex px-[70px] py-[52px] gap-[100px] text-[#374151] justify-between">
        <div className="basis-8/12">
          <p className="text-[52px] font-bold">{router?.query?.title}</p>
          <div className="flex gap-6 my-[24px] text-[#E44700] font-medium">
            <p>
              {router?.query?.creat !== undefined && router?.query?.creat?.split("T").shift().split("-")[2]} {monthNames[new Date(router?.query?.creat?.split("T").shift().split("-")[1]).getMonth()]}{" "}
              {router?.query?.creat !== undefined && router?.query?.creat.split("T").shift().split("-")[0]}
              {/* - {router?.query?.creat?.split(".").shift().split("T").pop().split(":").reverse().join(":")} WIB */}
            </p>
            <p>{router?.query?.category}</p>
          </div>
          <div>
            <img className="w-full h-[395px] rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + router?.query?.image} />
          </div>
          <div className="mt-[24px]" dangerouslySetInnerHTML={{ __html: router?.query?.description }} />
        </div>
        <div className="basis-4/12">
          <p className="text-[26px] mb-3 mt-3 font-bold">KabarTerbaru</p>
          {getArtikel?.data
            ?.filter((data) => ["jpg", "jpeg", "png"].includes(data?.image?.split(".").pop().toLowerCase()))
            .map((res, index) => (
              <div key={res._id}>
                {index <= 3 && (
                  <div
                    onClick={() =>
                      router.push({
                        pathname: "./DetailArtikel",
                        query: { title: res?.title, description: res?.description, category: res?.category, creat: res?.createdAt, image: res?.image },
                      })
                    }
                    className="mb-3 flex gap-2 cursor-pointer"
                  >
                    <div className="w-[122px] h-[96px]">
                      <img className="w-full h-full rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res?.image} />
                    </div>
                    <div className="w-[250px] flex flex-col justify-between">
                      <p className="font-semibold break-words">{res.title}</p>
                      <p className="font-medium text-[14px] text-[#E44700]">{res?.createdAt}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          <div className="mt-12">
            <Logo />
            <p>Bekerja bersama untuk membangun masa depan yang
lebih baik bagi masyarakat dan generasi yang akan datang.</p>
            <p className="text-[26px] mb-3 mt-3 font-bold">Kategori Publikasi</p>
            <div className="flex flex-col gap-2 font-medium cursor-pointer">
              <p>Bantuan Sosial</p>
              <p>Infrastruktur</p>
              <p>Pendidikan</p>
              <p>Lapangan Kerja</p>
              <p>Peraturan Daerah</p>
              <p>Ormas & Keagamaan</p>
              <p>Kesehatan</p>
              <p>Politik & Pemerintahan</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[248px] bg-[#FF5001] py-[65px] w-screen px-[50px]">
        <p className="text-white text-[26px] flex font-bold basis-1/2">
          Kami membuka pintu komunikasi yang <br /> kondusif dan terbuka untuk menerima <br /> pesan dan aspirasi dari masyarakat.
        </p>
        <div className="basis-1/2">
          <p className="text-[18px]  text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
          <button onClick={() => router.push("../../../Aspirasi")} className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">
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

export default DetailArtikel;
