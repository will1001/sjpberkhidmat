import React from "react";
import { ImportGambarIcon, KirimIcon, Titik3Icon } from "../utility/icon/icon";
import ForumBesarIcon from "../utility/img/forum_besar.png";
import ppUser from "../utility/img/pp_user.png";

const ChatForum = () => {
  return (
    <div className="">
      <div className="flex items-center pt-[25px] justify-between border-b-[1px] pb-[25px] px-[32px] sticky top-0 bg-white">
        <div className="flex gap-3 items-center">
          <img src={ForumBesarIcon.src} />
          <div>
            <p className=" text-black font-semibold">Forum Besar Tim SJP</p>
            <p className="w-[330px] whitespace-nowrap truncate">
              Gawati Zulaika Karsa Dabukke Budi Pradipta eko mamat maman
            </p>
          </div>
        </div>
        <Titik3Icon />
      </div>
      <div className="bg-slate-50 pt-[25px]">
        <div className="flex justify-center">
          {/* tgl chat */}
          <div className="bg-[#E5E7EB] text-[#6B7280] rounded-full py-1 px-2 mb-[32px]">
            12 Desember 2023
          </div>
        </div>
        {/* chat */}
        <div className="px-[32px]">
          {/* get chat user lain */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-end">
              <img
                className="h-[32px] w-[32px] rounded-full"
                src={ppUser.src}
              />
            </div>

            <div className="shadow-lg bg-white px-2 py-1 rounded-xl rounded-bl-none">
              <p className="text-[14px] text-[#FF5001] font-semibold">
                Safina Sudiati
              </p>
              <p className="w-[345px] text-[14px] text-[#374151]">
                Hei, kamu sudah dengar tentang perkembangan terbaru di bidang
                logistik?
              </p>
              <p className="flex justify-end text-[10px] text-[#1F2937]">
                10.30
              </p>
            </div>
          </div>
          {/* get chat pengirim */}
          <div className="flex justify-end mb-6">
            <div className="bg-[#FF5001] text-white py-1 px-2 rounded-xl rounded-br-none">
              <p className="text-[14px] w-[345px]">
                Hei, kamu sudah dengar tentang perkembangan terbaru di bidang
                logistik?
              </p>
              <p className="text-[10px] flex justify-end">10.45</p>
            </div>
          </div>
          {/* get chat user lain */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-end">
              <img
                className="h-[32px] w-[32px] rounded-full"
                src={ppUser.src}
              />
            </div>

            <div className="shadow-lg bg-white px-2 py-1 rounded-xl rounded-bl-none">
              <p className="text-[14px] text-[#FF5001] font-semibold">
                Safina Sudiati
              </p>
              <p className="w-[345px] text-[14px] text-[#374151]">
                Hei, kamu sudah dengar tentang perkembangan terbaru di bidang
                logistik?
              </p>
              <p className="flex justify-end text-[10px] text-[#1F2937]">
                10.30
              </p>
            </div>
          </div>
          {/* get chat user lain */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-end">
              <img
                className="h-[32px] w-[32px] rounded-full"
                src={ppUser.src}
              />
            </div>

            <div className="shadow-lg bg-white px-2 py-1 rounded-xl rounded-bl-none">
              <p className="text-[14px] text-[#FF5001] font-semibold">
                Safina Sudiati
              </p>
              <p className="w-[345px] text-[14px] text-[#374151]">
                Hei, kamu sudah dengar tentang perkembangan terbaru di bidang
                logistik?
              </p>
              <p className="flex justify-end text-[10px] text-[#1F2937]">
                10.30
              </p>
            </div>
          </div>
          {/* get chat pengirim */}
          <div className="flex justify-end mb-6">
            <div className="bg-[#FF5001] text-white py-1 px-2 rounded-xl rounded-br-none">
              <p className="text-[14px] w-[345px]">
                Hei, kamu sudah dengar tentang perkembangan terbaru di bidang
                logistik?
              </p>
              <p className="text-[10px] flex justify-end">10.45</p>
            </div>
          </div>
        </div>
        {/* tutup chat */}
      </div>
      <div className="sticky bottom-0  bg-[#E5E7EB] py-2">
        <div className="flex gap-3 px-[24px]">
          {/* import gambar */}
          <div className="h-[48px] w-[60px] bg-white flex items-center justify-center rounded-full cursor-pointer">
            <ImportGambarIcon />
          </div>
          {/* text chat */}
          <input
            placeholder="Ketik Pesan Anda..."
            className="w-full rounded-full px-4 outline-none"
            type={"text"}
          />
          {/* kirim chat */}
          <div className="h-[48px] w-[60px] bg-white flex items-center justify-center rounded-full cursor-pointer">
            <KirimIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatForum;
