import React from "react";
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7 } from "../../utility/icon/icon";

const KategoriKabar = () => {
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
  ];

  return (
    <div className="flex flex-col gap-4">
      {kategori.map((res, i) => {
        return (
          <div key={i} style={{ backgroundColor: res.bg }} className={`flex w-[350px] h-[68px] rounded-full items-center px-6 gap-4 cursor-pointer`}>
            <res.icon />
            <p className="text-[20px] text-white font-extrabold">{res.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default KategoriKabar;
