import { useRouter } from "next/router";
import React from "react";
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8, Icon9 } from "../../utility/icon/icon";

const KategoriKabar = ({ mobile }) => {
  const kategori = [
    {
      icon: Icon1,
      title: "Bantuan Sosial",
      bg: "#1481BA",
    },
    {
      icon: Icon2,
      title: "Infrastruktur",
      bg: "#1D8AE8",
    },
    {
      icon: Icon3,
      title: "Pendidikan",
      bg: "#20AC25",
    },
    {
      icon: Icon4,
      title: "Lapangan Kerja",
      bg: "#E1AD00",
    },
    {
      icon: Icon5,
      title: "Peraturan Daerah",
      bg: "#E4572E",
    },
    {
      icon: Icon6,
      title: "Ormas & Keagamaan",
      bg: "#AC0C92",
    },
    {
      icon: Icon7,
      title: "Kesehatan",
      bg: "#0FB4B1",
    },
    {
      icon: Icon8,
      title: "Politik & Pemerintahan",
      bg: "#434343",
    },
  ];
  const router = useRouter();
  return (
    <>
      {mobile !== undefined ? (
        <div className="flex flex-col gap-4">
          <div
            onClick={() =>
              router.push({
                pathname: "../../../publikasi/SemuaArtikel",
                query: { category: "Semua", display: "mobile" },
              })
            }
            className={`flex w-full py-3 rounded-full items-center px-6 gap-4 cursor-pointer bg-[#FF5001]`}
          >
            <Icon9 mobile={mobile} />
            <p className="text-[18px] text-white font-extrabold">Semua Kategori</p>
          </div>
          {kategori.map((res, i) => {
            return (
              <div
                onClick={() =>
                  router.push({
                    pathname: "../../../publikasi/SemuaArtikel",
                    query: { category: res.title },
                  })
                }
                key={i}
                style={{ backgroundColor: res.bg }}
                className={`flex w-full py-3 rounded-full items-center px-6 gap-4 cursor-pointer bg-[#FF5001]`}
              >
                <res.icon mobile={mobile} />
                <p className="text-[20px] text-white font-extrabold">{res.title}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div
            onClick={() =>
              router.push({
                pathname: "../../../publikasi/SemuaArtikel",
                query: { category: "Semua" },
              })
            }
            className={`flex w-[350px] h-[68px] rounded-full items-center px-6 gap-4 cursor-pointer bg-[#FF5001]`}
          >
            <Icon9 />
            <p className="text-[20px] text-white font-extrabold">Semua Kategori</p>
          </div>
          {kategori.map((res, i) => {
            return (
              <div
                onClick={() =>
                  router.push({
                    pathname: "../../../publikasi/SemuaArtikel",
                    query: { category: res.title },
                  })
                }
                key={i}
                style={{ backgroundColor: res.bg }}
                className={`flex w-[350px] h-[68px] rounded-full items-center px-6 gap-4 cursor-pointer`}
              >
                <res.icon />
                <p className="text-[20px] text-white font-extrabold">{res.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default KategoriKabar;
