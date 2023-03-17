import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ButtonLogin, FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, TwitterIcon, YouTubeIcon } from "../src/utility/icon/icon";
import Logo from "../src/utility/Logo";
import image1 from "../src/utility/img/profil_1.png";
import image2 from "../src/utility/img/profil_2.png";
import image3 from "../src/utility/img/profil_3.png";
import image4 from "../src/utility/img/profil_4.png";
import listIcon from "../src/utility/icon/centerIcon.png";

const Profil = () => {
  const router = useRouter();
  const refAspirasi = useRef();
  const [popupMobile, setPopupMobile] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goto = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        <div>
          <div className={`${popupMobile === false ? "hidden" : "visible"} fixed z-50 bg-white top-0 mt-[60px] px-[16px] py-1 w-screen h-screen`}>
            <div className="flex gap-3 mb-[32px] mt-2">
              <div onClick={() => router.push("Aspirasi")} className="bg-[#E44700] text-center w-full text-white text-[14px] font-semibold py-1 px-2 rounded-sm">
                Sampaikan Aspirasi
              </div>
              <div
                onClick={() => {
                  router.push({ pathname: "Login" });
                }}
                className="text-[#E44700] text-center border w-full border-[#E44700] text-[14px] font-semibold py-1 px-2 rounded-sm"
              >
                Login
              </div>
            </div>
            <p onClick={() => router.push("/")} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2">
              Beranda
            </p>
            <p onClick={() => setPopupMobile(false)} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">
              Profil
            </p>
            <p className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">Program</p>
            <p onClick={() => router.push("publikasi/SemuaPublikasi")} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">
              Publikasi
            </p>
            <p
              onClick={() =>
                router.push({
                  pathname: "Daftar",
                  query: { type: "simpatisan" },
                })
              }
              className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2"
            >
              Pendaftaran Anggota
            </p>
          </div>
          <div className="p-[16px] sticky top-0 z-50 border-b-[1px] bg-white flex items-center justify-between">
            <Logo mobile={screenSize} />
            <img onClick={() => setPopupMobile(!popupMobile)} className="w-[24px] h-[24px]" src={listIcon.src} alt={"drop down"} />
          </div>
          <div className="px-[16px] pt-[20px] pb-[38px]">
            <p className="text-[18px] text-[#FF5001] font-bold">Profil</p>
            <p className="text-[21px] text-[#374151] font-bold">H. Suryadi Jaya Purnama, ST</p>
            <img className="w-screen h-[258px] mt-[23px]" src={image1.src} />
            <img className="w-screen h-[258px] mt-[28px]" src={image2.src} />
            <img className="w-screen h-[258px] mt-[28px]" src={image3.src} />
            <img className="w-screen h-[258px] mt-[28px]" src={image4.src} />
            <p className="mt-[33px] text-[18px] text-[#374151] font-semibold">Profil Umum</p>
            <p className="mt-2 text-[#374151]">Nama Lengkap :</p>
            <p className="text-[#374151] font-semibold">H. SURYADI JAYA PURNAMA, S.T.</p>
            <p className="mt-2 text-[#374151]">Tempat Tgl Lahir :</p>
            <p className="text-[#374151] font-semibold">Lenek / 25 Februari 1974</p>
            <p className="mt-2 text-[#374151]">Agama :</p>
            <p className="text-[#374151] font-semibold">Islam</p>
            <p className="mt-[33px] text-[18px] text-[#374151] font-semibold">Riwayat Pendidikan</p>
            <p className="mt-1 text-[#374151]">SD , SDN NO 4 LENEK . Tahun: -</p>
            <p className="mt-1 text-[#374151]">SMP , SMPN NO 3 AIKME. Tahun: -</p>
            <p className="mt-1 text-[#374151]">SMA , SMAN I MATARAM . Tahun: -</p>
            <p className="mt-1 text-[#374151]">S1 T. SIPIL, UNRAM. Tahun: 1993 - 1999</p>
            <p className="mt-1 text-[#374151]">S2 MANAJEMEN, UNRAM. Tahun: 2005 -</p>
            <p className="mt-[33px] text-[18px] text-[#374151] font-semibold">Riwayat Pekerjaan</p>
            <p className="mt-1 text-[#374151]">dprd prov ntb , Sebagai: wakil ketua . </p>
            <p className="mt-1 text-[#374151]">Tahun: 2009 - 2014</p>
            <p className="mt-1 text-[#374151]">dprd prov ntb , Sebagai: anggota . Tahun: </p>
            <p className="mt-1 text-[#374151]">2004 - 2009</p>
            <p className="mt-[33px] text-[18px] text-[#374151] font-semibold">Riwayat Organisasi</p>
            <p className="mt-1 text-[#374151]">PKS , Sebagai: ketua dpw. Tahun: 2010 - </p>
            <p className="mt-1 text-[#374151]">2015</p>
            <p className="mt-1 text-[#374151]">KAMMI, Sebagai: ketua . Tahun: 1999 -</p>
            <p className="mt-1 text-[#374151]">2000</p>
            <p className="mt-1 text-[#374151]">LDK , Sebagai: sekertaris . Tahun: 1995 - </p>
            <p className="mt-1 text-[#374151]">1996</p>
            <p className="mt-2 text-[#374151]">
              SURYADI JAYA PURNAMA, ST, lahir di Lenek Lombok Timur, 25 Februari 1974. Suami dari Nuryanti, SE (Ngali-Bima) ini menempuh pendidikan di SDN 4 Lenek Aikmel 1987, SMPN 3 Aikmel 1990. Setelah lulus SMAN 1 Mataram 1993, ia
              menyelesiakan study S1 di Jurusan Teknik Sipil Universitas Mataram. Semasa menjadi mahasiswa ayah dari Wali Hajid (2000), Nurani Syahidah (2002), Wali Abid (2006) dan Fatih Gemilang (2008) ini aktif mengikuti aktivitas
              kemahasiswaan dan diantaranya menjadi Leader dibeberapa organisasi kemahasiswaan antara lain LDK Baabul Hikmah, Presidium Senat Mahasiswa Universitas Mataram (1997), BPM Fakultas Teknik (1996). Ketika gelombang Reformasi
              didorong oleh Mahasiswa 1998 beliau menjadi salah satu pimpinan KAMMI Daerah NTB. Pada tahun 1993 beliau sudah aktif di KNPI Provinsi NTB. Ketika pemilu pertama masa reformasi tahun 1999 beliau memulai karir politik di Partai
              Keadilan (PK) dan beliau diamahkan sebagai Sekretaris DPW PK NTB. Karir politik beliau dapat dikatakan begitu gemilang pada pemilu 2004 PKS mengantarkannya bersama 5 kader lainnya untuk berdakwah di mimbar parlemen DPRD NTB
              dan pada Pemilu 2009 kembali menjadi anggota DPRD NTB melalui Daerah Pemilihan yang sama NTB VI (Bima, Kota Bima dan Dompu) dan mengatarkan beliau menjadi Wakil Ketua DPRD NTB Termuda. Anggota DPRD NTB termuda periode
              2004-2009 ini pernah dimanahkan sebagai sekretaris Fraksi PKS, Anggota Komisi II bidang perekonomian dan lembaga keuangan serta menjadi anggota panitia anggaran. Pada periode tersebut FPKS mengungkap adanya penyimpangan APBD
              2005 yang dikenal dengan “APBD kembar siam” dan 5 mata anggaran bermasalah pada APBD 2007. Ketika PKS mengamanahkannya sebagai Wakil Ketua II DPRD NTB 2009-2014 pria yng memiliki motto “Tetap Komit pada Al-Haq dan ingat selalu
              pada kematian” ini memiliki obsesi yang ingin diwujudkan diparlemen yaitu Ingin menjadikan lembaga DPRD sebagai lembaga representatif rakyat yang kuat dan berwibawa dengan memperkokoh peran legislasi, budgeting dan pengawasan.
              Serta menjadi unsur pemarintahan yang bersinergi dengan eksekutif dengan kesetaraan mencapai visi daerah NTB Bersaing
            </p>
          </div>
          <div className="bg-[#FF5001] pt-[37px] pb-[29px] px-[16px]">
            <p className="text-[16px] font-bold text-white">Kami membuka pintu komunikasi yang kondusif dan terbuka untuk menerima pesan dan aspirasi dari masyarakat.</p>
            <p className="mt-2 text-[12px] text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
            <div className="mt-4 flex text-[#374151]">
              <div onClick={() => router.push("Aspirasi")} className="bg-white text-[14px] font-semibold py-1 px-2 rounded-sm">
                Sampaikan Aspirasi
              </div>
            </div>
          </div>
          <div className="px-[16px] pt-[35px] bg-[#F3F4F6]">
            <Logo />
            <p className="text-[14px] text-[#4B5563] font-semibold">H. SURYADI JAYA PURNAMA, S.T.</p>
            <p className="text-[10px] text-[#FF5001] font-semibold">DPR RI Dapil II Provinsi Nusa Tenggara Barat</p>
            <p className="text-[10px] text-[#4B5563]">Bekerja bersama untuk membangun masa depan yang lebih baik bagi masyarakat dan generasi yang akan datang.</p>
            <div className="flex py-[40px]">
              <div className="text-[14px] text-[#4B5563]">
                Pemilu 2024 <br />
                Publikasi <br />
                Gallery <br />
                Rumah Aspirasi <br />
                Daftar Relawan <br />
                Daftar Simpatisan
              </div>
              <div className="ml-[52px]">
                <p className="text-[16px] text-[#4B5563] font-bold">Social Media</p>
                <div className="grid grid-cols-3 grid-rows-3 mt-3 ">
                  <LinkedInIcon />
                  <a href="https://www.facebook.com/sjp.officialpage?mibextid=ZbWKwL" target="_blank">
                    <FacebookIcon />
                  </a>
                  <a target="_blank" href="https://www.instagram.com/suryadi.sjp/?igshid=OGQ2MjdiOTE=">
                    <InstagramIcon />
                  </a>
                  <a href="https://youtube.com/@suryadijayapurnama_sjp4774" target="_blank">
                    <YouTubeIcon />
                  </a>
                  <a href="https://twitter.com/suryadi_sjpntb" target="_blank">
                    <TwitterIcon />
                  </a>
                  <TikTokIcon />
                </div>
              </div>
            </div>
            <div className="border-b-[1px]" />
            <p className="mt-2 text-[12px] pb-3 px-2 text-[#9CA3AF] text-center">Copyright © 2022. Website Resmi SJP Berkhidmat dikelola oleh Tim Internal</p>
          </div>
        </div>
      ) : (
        <>
          {" "}
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
                <p onClick={() => router.push("Profil")} className="cursor-pointer text-[#FF5001]">
                  Profil
                </p>
                <p
                  onClick={() => {
                    router.push({
                      pathname: "/",
                      query: { page: "program" },
                    });
                  }}
                  className="cursor-pointer "
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
                  className={`flex cursor-pointer  `}
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
                <div onClick={() => goto(refAspirasi.current)} className="bg-[#FF5001] text-white h-[31px] px-4 cursor-pointer flex items-center rounded-md">
                  Rumah Aspirasi
                </div>
                <button
                  onClick={() => {
                    router.push({ pathname: "Login" });
                  }}
                >
                  <ButtonLogin />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-[130px] px-[70px] pb-[50px] flex">
            <div className="flex flex-col basis-1/2">
              <div className="flex gap-4">
                <img src={image1.src} alt="profil_1" />
                <img src={image2.src} alt="profil_2" />
              </div>
              <div className="flex gap-4 mt-4">
                <img src={image3.src} alt="profil_3" />
                <img src={image4.src} alt="profil_4" />
              </div>
              <div className="mt-4">
                {/* profil umum */}
                <p className="text-[18px] text-[#374151] font-semibold">Profil Umum</p>
                <div className="flex text-[#374151]">
                  <p className="w-[187px] ">nama Lengkap</p>
                  <p className="font-semibold">: H. SURYADI JAYA PURNAMA, S.T.</p>
                </div>
                <div className="flex text-[#374151]">
                  <p className="w-[187px] ">Tempat Tgl Lahir</p>
                  <p className="font-semibold">: Lenek / 25 Februari 1974</p>
                </div>
                <div className="flex text-[#374151]">
                  <p className="w-[187px] ">Agama</p>
                  <p className="font-semibold">: Islam</p>
                </div>
                {/* riwayat pendidikan */}
                <p className="text-[18px] text-[#374151] font-semibold mt-4">Riwayat Pendidikan</p>
                <p className=" text-[#374151]">SD , SDN NO 4 LENEK . Tahun: -</p>
                <p className=" text-[#374151]">SMP , SMPN NO 3 AIKMEL. Tahun: -</p>
                <p className=" text-[#374151]">SMA , SMAN I MATARAM . Tahun: -</p>
                <p className=" text-[#374151]">S1 T. SIPIL, UNRAM. Tahun: 1993 - 1999</p>
                <p className=" text-[#374151]">S2 MANAJEMEN, UNRAM. Tahun: 2005 -</p>
                {/* riwayat pekerjaan */}
                <p className="text-[18px] text-[#374151] font-semibold mt-4">Riwayat Pekerjaan</p>
                <p className=" text-[#374151]">dprd prov ntb , Sebagai: wakil ketua . Tahun: 2009 - 2014</p>
                <p className=" text-[#374151]">dprd prov ntb , Sebagai: anggota . Tahun: 2004 - 2009</p>
                {/* riwayat organisasi */}
                <p className="text-[18px] text-[#374151] font-semibold mt-4">Riwayat Organisasi</p>
                <p className=" text-[#374151]">PKS , Sebagai: ketua dpw. Tahun: 2010 - 2015</p>
                <p className=" text-[#374151]">KAMMI, Sebagai: ketua . Tahun: 1999 - 2000</p>
                <p className=" text-[#374151]">LDK , Sebagai: sekertaris . Tahun: 1995 - 1996</p>
              </div>
            </div>
            <div className=" flex flex-col basis-1/2">
              <p className="text-[26px] text-[#FF5001] font-bold">Profil</p>
              <p className="text-[32px] text-[#374151] font-bold mt-2">H. Suryadi Jaya Purnama, ST</p>
              <p className="mt-3 text-[#374151]">
                SURYADI JAYA PURNAMA, ST, lahir di Lenek Lombok Timur, 25 Februari 1974.
                <br /> Suami dari Nuryanti, SE (Ngali-Bima) ini menempuh pendidikan di SDN 4 Lenek <br /> Aikmel 1987, SMPN 3 Aikmel 1990. Setelah lulus SMAN 1 Mataram 1993, ia <br /> menyelesiakan study S1 di Jurusan Teknik Sipil
                Universitas Mataram. Semasa <br /> menjadi mahasiswa ayah dari Wali Hajid (2000), Nurani Syahidah (2002), Wali <br /> Abid (2006) dan Fatih Gemilang (2008) ini aktif mengikuti aktivitas
                <br /> kemahasiswaan dan diantaranya menjadi Leader dibeberapa organisasi <br /> kemahasiswaan antara lain LDK Baabul Hikmah, Presidium Senat Mahasiswa
                <br /> Universitas Mataram (1997), BPM Fakultas Teknik (1996). <br />
                <br />
                Ketika gelombang Reformasi didorong oleh Mahasiswa 1998 beliau menjadi
                <br /> salah satu pimpinan KAMMI Daerah NTB. Pada tahun 1993 beliau sudah aktif di
                <br /> KNPI Provinsi NTB. Ketika pemilu pertama masa reformasi tahun 1999 beliau
                <br /> memulai karir politik di Partai Keadilan (PK) dan beliau diamanahkan sebagai
                <br /> Sekretaris DPW PK NTB. Karir politik beliau dapat dikatakan begitu gemilang
                <br /> pada pemilu 2004 PKS mengantarkannya bersama 5 kader lainnya untuk berdakwah
                <br /> di mimbar parlemen DPRD NTB dan pada Pemilu 2009 kembali
                <br /> menjadi anggota DPRD NTB melalui Daerah Pemilihan yang sama NTB VI (Bima
                <br />
                ,Kota Bima dan Dompu) dan mengatarkan beliau menjadi Wakil Ketua DPRD NTB
                <br />
                Termuda.
                <br />
                <br /> Anggota DPRD NTB termuda periode 2004-2009 ini pernah diamanahkan sebagai
                <br /> sekretaris Fraksi PKS, Anggota Komisi II bidang perekonomian dan lembaga
                <br /> keuangan serta menjadi anggota panitia anggaran. Pada periode tersebut FPKS
                <br /> mengungkap adanya penyimpangan APBD 2005 yang dikenal dengan “APBD
                <br /> kembar siam” dan 5 mata anggaran bermasalah pada APBD 2007
                <br />
                <br />. Ketika PKS mengamanahkannya sebagai Wakil Ketua II DPRD NTB 2009-2014 pria
                <br /> yng memiliki motto “Tetap Komit pada Al-Haq dan ingat selalu pada kematian”
                <br /> ini memiliki obsesi yang ingin diwujudkan diparlemen yaitu Ingin menjadikan
                <br /> lembaga DPRD sebagai lembaga representatif rakyat yang kuat dan berwibawa
                <br /> dengan memperkokoh peran legislasi, budgeting dan pengawasan. Serta
                <br /> menjadi unsur pemarintahan yang bersinergi dengan eksekutif dengan
                <br /> kesetaraan mencapai visi daerah NTB Bersaing
              </p>
            </div>
          </div>
          <div ref={refAspirasi} />
          <div className="flex h-[248px] bg-[#FF5001] pt-[65px] w-screen">
            <p className="text-white text-[26px] font-bold pl-[180px] w-full">
              Kami membuka pintu komunikasi yang <br /> kondusif dan terbuka untuk menerima <br /> pesan dan aspirasi dari masyarakat.
            </p>
            <div className="pr-[144px] w-full ml-[39px]">
              <p className="text-[18px]  text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
              <button onClick={() => router.push("Aspirasi")} className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">
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
      )}
    </>
  );
};

export default Profil;
