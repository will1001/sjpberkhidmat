import React, { useState } from "react";
import { MailIcon } from "../utility/icon/icon";
import forumTimIcon from "../utility/img/tim_koordinator_forum.png";
import forumBesarIcon from "../utility/img/forum_besar.png";
import ppUser from "../utility/img/pp_user.png";
import PeopleIcon from "../utility/icon/people.png";
import ChatForum from "./ChatForum";
import useFetch from "../API/useFetch";
import CloseIcon from "../utility/icon/close.png";

import { useDispatch, useSelector } from "react-redux";
import { setImagePreviewer } from "../redux/panelReducer";

const Forum = ({ mobile }) => {
  const [roomChat, setRoomChat] = useState();
  const [roomtitle, setRoomTitle] = useState("");
  const [roomLogo, setRoomLogo] = useState("");
  const [chatType, setChatType] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const imagePreviewer = useSelector((state) => state.panel.imagePreviewer);
  const dispatch = useDispatch();

  const contacts = useFetch("get", `user/chats/room/list${contactSearch !== "" ? `?keyword=${contactSearch}` : ""}`);

  return (
    <>
      {mobile === true ? (
        <div className="px-[16px] pb-[50px]">
          <p className="mt-[21px] text-[32px] font-bold">Forum</p>
          <div className="flex mb-[40px] text-[16px] mt-[16px] border gap-3 px-4 items-center h-[48px] rounded-full stroke-[#374151]">
            {/* <MailIcon /> */}
            <img src={PeopleIcon.src} alt="" className="w-[20px]" />
            <input
              type={"text"}
              placeholder="Cari Contact ..."
              className="outline-none w-full"
              onChange={(e) => {
                setContactSearch(e.target.value);
              }}
            />
          </div>
          {/* list forum */}
          <div className="border-y-[1px] py-6">
            <div className="flex gap-3 items-center bg-[#FFECE480] px-2 py-1 mb-2">
              <img className="h-[52px] w-[52px] rounded-full" src={forumTimIcon.src} alt="forum Tim Koordinator" />
              <div
                onClick={() => {
                  setRoomChat("7c1b3334-22c2-4c92-8255-c1c6105aae6c");
                  setRoomTitle("Tim Koordinator");
                  setRoomLogo(forumTimIcon);
                  setChatType("forum");
                }}
                className="cursor-pointer"
              >
                <p className="text-black font-semibold">Tim Koordinator</p>
                <p className="text-[14px] text-[#4B5563]">Pandji: Siap Meluncur!</p>
              </div>
            </div>
            <div className="flex gap-3 items-center bg-[#FFECE480] px-2 py-1 mb-2">
              <img className="h-[52px] w-[52px] rounded-full" src={forumBesarIcon.src} alt="forum Besar" />
              <div
                onClick={() => {
                  setRoomChat("a5d0dd52-7856-402f-95b9-e7785f2abc68");
                  setRoomTitle("Forum Besar Tim SJP");
                  setRoomLogo(forumBesarIcon);
                  setChatType("forum");
                }}
                className="cursor-pointer"
              >
                <p className="text-black font-semibold">Forum Besar Tim SJP</p>
                <p className="text-[14px] text-[#4B5563]">Pandji: Siap Meluncur!</p>
              </div>
            </div>
          </div>
          {/* list chat user */}
          {contacts.data?.map((e, i) => {
            return (
              <div
                onClick={() => {
                  setRoomChat(e._id);
                  setRoomTitle(e.name);
                  setRoomLogo(ppUser);
                  setChatType("private");
                }}
                className="flex gap-3 items-center px-2 py-1 my-2 w-[350px]"
              >
                <img className="h-[52px] w-[52px] rounded-full" src={ppUser.src} />
                <div className="cursor-pointer">
                  <div className="flex gap-3">
                    <p className="text-black font-semibold">{e.name.length > 15 ? e.name.substring(0, 15) + ". . ." : e.name}</p>
                    <p className="text-[#FF5001] text-[14px] border border-[#FF5001] px-2 rounded-full">{e.role}</p>
                  </div>
                  <p className="text-[14px] w-[180px] text-[#4B5563] whitespace-nowrap truncate">{e.chat.length !== 0 ? (e.chat[0].message.length > 15 ? e.chat[0].message.substring(0, 15) + ". . ." : e.chat[0].message) : ""}</p>
                </div>
                {/* <div className="px-2 flex justify-center items-center bg-[#FF5001] text-[14px] rounded-full text-white">
            1
          </div> */}
              </div>
            );
          })}
          {roomChat !== undefined && (
            <div className="fixed w-screen h-screen bg-white top-0 left-0 overflow-scroll">
              <ChatForum mobile={true} setRoomChat={setRoomChat} roomChat={roomChat} roomtitle={roomtitle} roomLogo={roomLogo} chatType={chatType} />
            </div>
          )}
          {imagePreviewer && (
            <>
              <div className="w-screen h-screen fixed top-0 left-0">
                {" "}
                <div
                  onClick={() => {
                    dispatch(setImagePreviewer({ imagePreviewer: null }));
                  }}
                  className="bg-black h-[100vh] opacity-30"
                >
                  <div className="flex cursor-pointer">
                    <img
                      onClick={() => {
                        dispatch(setImagePreviewer({ imagePreviewer: null }));
                      }}
                      className="w-[40px]"
                      src={CloseIcon.src}
                    />
                  </div>
                </div>
                <div className="">
                  <img className="w-full absolute top-[20%]" src={imagePreviewer} alt="" />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex">
          {imagePreviewer && (
            <>
              <div className="w-full h-[100vh] absolute z-50">
                {" "}
                <div
                  onClick={() => {
                    dispatch(setImagePreviewer({ imagePreviewer: null }));
                  }}
                  className="bg-black h-[100vh] opacity-30"
                >
                  <div className="flex cursor-pointer">
                    <img
                      onClick={() => {
                        dispatch(setImagePreviewer({ imagePreviewer: null }));
                      }}
                      className="w-[40px]"
                      src={CloseIcon.src}
                    />
                  </div>
                </div>
                <div className="">
                  <img className="w-[700px] absolute top-10 left-60" src={imagePreviewer} alt="" />
                </div>
              </div>
            </>
          )}
          <div className="px-[36px] pb-[150px] text-[#374151] scrollbar-track-white scrollbar-thin sticky h-screen overflow-scroll w-[550px] overflow-x-hidden border-r-2">
            <p className="mt-[76px] text-[32px] font-bold">Forum</p>
            <div className="flex mb-[40px] text-[16px] mt-[16px] border gap-3 px-4 items-center h-[48px] rounded-full stroke-[#374151]">
              {/* <MailIcon /> */}
              <img src={PeopleIcon.src} alt="" className="w-[20px]" />
              <input
                type={"text"}
                placeholder="Cari Contact ..."
                className="outline-none w-full"
                onChange={(e) => {
                  setContactSearch(e.target.value);
                }}
              />
            </div>
            {/* list forum */}
            <div className="border-y-[1px] py-6">
              <div className="flex gap-3 items-center bg-[#FFECE480] px-2 py-1 mb-2">
                <img className="h-[52px] w-[52px] rounded-full" src={forumTimIcon.src} alt="forum Tim Koordinator" />
                <div
                  onClick={() => {
                    setRoomChat("7c1b3334-22c2-4c92-8255-c1c6105aae6c");
                    setRoomTitle("Tim Koordinator");
                    setRoomLogo(forumTimIcon);
                    setChatType("forum");
                  }}
                  className="cursor-pointer"
                >
                  <p className="text-black font-semibold">Tim Koordinator</p>
                  <p className="text-[14px] text-[#4B5563]">Pandji: Siap Meluncur!</p>
                </div>
              </div>
              <div className="flex gap-3 items-center bg-[#FFECE480] px-2 py-1 mb-2">
                <img className="h-[52px] w-[52px] rounded-full" src={forumBesarIcon.src} alt="forum Besar" />
                <div
                  onClick={() => {
                    setRoomChat("a5d0dd52-7856-402f-95b9-e7785f2abc68");
                    setRoomTitle("Forum Besar Tim SJP");
                    setRoomLogo(forumBesarIcon);
                    setChatType("forum");
                  }}
                  className="cursor-pointer"
                >
                  <p className="text-black font-semibold">Forum Besar Tim SJP</p>
                  <p className="text-[14px] text-[#4B5563]">Pandji: Siap Meluncur!</p>
                </div>
              </div>
            </div>
            {/* list chat user */}
            {contacts.data?.map((e, i) => {
              return (
                <div
                  onClick={() => {
                    setRoomChat(e._id);
                    setRoomTitle(e.name);
                    setRoomLogo(ppUser);
                    setChatType("private");
                  }}
                  className="flex gap-3 items-center px-2 py-1 my-2 w-[350px]"
                >
                  <img className="h-[52px] w-[52px] rounded-full" src={ppUser.src} />
                  <div className="cursor-pointer">
                    <div className="flex gap-3">
                      <p className="text-black font-semibold">{e.name.length > 15 ? e.name.substring(0, 15) + ". . ." : e.name}</p>
                      <p className="text-[#FF5001] text-[14px] border border-[#FF5001] px-2 rounded-full">{e.role}</p>
                    </div>
                    <p className="text-[14px] w-[180px] text-[#4B5563] whitespace-nowrap truncate">{e.chat.length !== 0 ? (e.chat[0].message.length > 15 ? e.chat[0].message.substring(0, 15) + ". . ." : e.chat[0].message) : ""}</p>
                  </div>
                  {/* <div className="px-2 flex justify-center items-center bg-[#FF5001] text-[14px] rounded-full text-white">
                1
              </div> */}
                </div>
              );
            })}
            {/* <div className="flex gap-3 items-center px-2 py-1 my-2 w-[300px]">
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
      </div> */}
          </div>
          <div className="overflow-scroll h-screen w-full scrollbar-thin scrollbar-track-white">
            <ChatForum roomChat={roomChat} roomtitle={roomtitle} roomLogo={roomLogo} chatType={chatType} />
          </div>
        </div>
      )}
    </>
  );
};

export default Forum;
