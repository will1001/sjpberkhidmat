import React from "react";
import { MailIcon } from "../utility/icon/icon";
import forumTimIcon from "../utility/img/tim_koordinator_forum.png";
import forumBesarIcon from "../utility/img/forum_besar.png";
import ppUser from "../utility/img/pp_user.png";
import ChatForum from "./ChatForum";

const Forum = () => {
  return (
    <div className="flex">
      <div className="px-[36px] pb-[150px] text-[#374151] scrollbar-track-white scrollbar-thin sticky h-screen overflow-scroll w-[500px] overflow-x-hidden border-r-2">
        <p className="mt-[76px] text-[32px] font-bold">Forum</p>
        <div className="flex mb-[40px] text-[16px] mt-[16px] border gap-3 px-4 items-center h-[48px] rounded-full stroke-[#374151]">
          <MailIcon />
          <input
            type={"text"}
            placeholder="Cari Pesan..."
            className="outline-none w-full"
          />
        </div>
        {/* list forum */}
        <div className="border-y-[1px] py-6">
          <div className="flex gap-3 items-center bg-[#FFECE480] px-2 py-1 mb-2">
            <img
              className="h-[52px] w-[52px] rounded-full"
              src={forumTimIcon.src}
              alt="forum Tim Koordinator"
            />
            <div className="cursor-pointer">
              <p className="text-black font-semibold">Tim Koordinator</p>
              <p className="text-[14px] text-[#4B5563]">
                Pandji: Siap Meluncur!
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center bg-[#FFECE480] px-2 py-1 mb-2">
            <img
              className="h-[52px] w-[52px] rounded-full"
              src={forumBesarIcon.src}
              alt="forum Besar"
            />
            <div className="cursor-pointer">
              <p className="text-black font-semibold">Forum Besar Tim SJP</p>
              <p className="text-[14px] text-[#4B5563]">
                Pandji: Siap Meluncur!
              </p>
            </div>
          </div>
        </div>
        {/* list chat user */}
        <div className="flex gap-3 items-center px-2 py-1 my-2 w-[300px]">
          <img className="h-[52px] w-[52px] rounded-full" src={ppUser.src} />
          <div className="cursor-pointer">
            <div className="flex gap-3">
              <p className="text-black font-semibold">Anies</p>
              <p className="text-[#FF5001] text-[14px] border border-[#FF5001] px-2 rounded-full">
                Koordinator
              </p>
            </div>
            <p className="text-[14px] w-[180px] text-[#4B5563] whitespace-nowrap truncate">
              Anda: Baik Pak, Akan sasdsadasdsadsadsadsadsad
            </p>
          </div>
          <div className="px-2 flex justify-center items-center bg-[#FF5001] text-[14px] rounded-full text-white">
            1
          </div>
        </div>
        <div className="flex gap-3 items-center px-2 py-1 my-2 w-[300px]">
          <img className="h-[52px] w-[52px] rounded-full" src={ppUser.src} />
          <div className="cursor-pointer">
            <div className="flex gap-3">
              <p className="text-black font-semibold">Anies</p>
              <p className="text-[#FF5001] text-[14px] border border-[#FF5001] px-2 rounded-full">
                Relawan
              </p>
            </div>
            <p className="text-[14px] w-[180px] text-[#4B5563] whitespace-nowrap truncate">
              Anda: Baik Pak, Akan sasdsadasdsadsadsadsadsad
            </p>
          </div>
          <div className="px-2 flex justify-center items-center bg-[#FF5001] text-[14px] rounded-full text-white">
            1
          </div>
        </div>
        <div className="flex gap-3 items-center px-2 py-1 my-2 w-[300px]">
          <img className="h-[52px] w-[52px] rounded-full" src={ppUser.src} />
          <div className="cursor-pointer">
            <div className="flex gap-3">
              <p className="text-black font-semibold">Anies</p>
              <p className="text-[#FF5001] text-[14px] border border-[#FF5001] px-2 rounded-full">
                Relawan
              </p>
            </div>
            <p className="text-[14px] w-[180px] text-[#4B5563] whitespace-nowrap truncate">
              Anda: Baik Pak, Akan sasdsadasdsadsadsadsadsad
            </p>
          </div>
          <div className="px-2 flex justify-center items-center bg-[#FF5001] text-[14px] rounded-full text-white">
            1
          </div>
        </div>
      </div>
      <div className="overflow-scroll h-screen w-full scrollbar-thin scrollbar-track-white">
        <ChatForum />
      </div>
    </div>
  );
};

export default Forum;
