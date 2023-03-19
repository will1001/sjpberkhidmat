import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosFetch from "../API/axiosFetch";
import { ImportGambarIcon, KirimIcon, Titik3Icon } from "../utility/icon/icon";
import ForumBesarIcon from "../utility/img/forum_besar.png";
import ppUser from "../utility/img/pp_user.png";
import Moment from "moment";
import "moment/locale/id";

const ChatForum = ({ roomChat, roomtitle, roomLogo, chatType }) => {
  const [chats, setChat] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [message, setMessage] = useState("");
  Moment.locale("id");

  const sendMessage = async () => {
    const a = new FormData();
    let target = [];

    // dispatch(showOrHidePopUpDptDps({ type: null }));
    if (chatType === "forum") {
      a.append("forum", roomChat);
      a.append("message", message);
      a.append("type", "text");
      {
        await axiosFetch("post", `user/chats/forum`, a, token)
          .then((res) => {
            // window.location.reload(false);
            setMessage("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      // target.push(roomChat);
      a.append("target", roomChat);
      a.append("target", "");
      a.append("message", message);
      a.append("type", "text");
      {
        await axiosFetch("post", `user/chats`, a, token)
          .then((res) => {
            // window.location.reload(false);
            setMessage("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    setMessage("");

    // location.reload();
  };

  const getChatsForum = async () => {
    {
      await axiosFetch(
        "get",
        `user/chats/forum?offset=0&forum=${roomChat}`,
        [],
        token
      )
        .then((res) => {
          setChat(res.data);
          // window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getChatsPrivate = async () => {
    {
      await axiosFetch(
        "get",
        `user/chats?offset=0&target=${roomChat}`,
        [],
        token
      )
        .then((res) => {
          setChat(res.data);
          // window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (chatType === "forum") {
        getChatsForum();
      } else {
        getChatsPrivate();
      }
    }, 1000);
  });

  return (
    <div className="">
      <div className="flex items-center pt-[25px] justify-between border-b-[1px] pb-[25px] px-[32px] sticky top-0 bg-white">
        <div className="flex gap-3 items-center">
          <img src={roomLogo.src} />
          <div>
            <p className=" text-black font-semibold">{roomtitle}</p>
            <p className="w-[330px] whitespace-nowrap truncate">
              {/* Gawati Zulaika Karsa Dabukke Budi Pradipta eko mamat maman */}
            </p>
          </div>
        </div>
        <Titik3Icon />
      </div>
      <div className="bg-slate-50 pt-[25px]">
        {/* <div className="flex justify-center"> */}
        {/* tgl chat */}
        {/* <div className="bg-[#E5E7EB] text-[#6B7280] rounded-full py-1 px-2 mb-[32px]"> */}
        {/* 12 Desember 2023 */}
        {/* </div> */}
        {/* </div> */}
        {/* chat */}
        <div className="px-[32px]">
          {/* get chat user lain */}

          {chats.data?.map((e, i) => {
            if (!e.is_me) {
              return (
                <>
                  <div className="flex gap-3 mb-6">
                    <div className="flex items-end">
                      <img
                        className="h-[32px] w-[32px] rounded-full"
                        src={ppUser.src}
                      />
                    </div>

                    <div className="shadow-lg bg-white px-2 py-1 rounded-xl rounded-bl-none">
                      <p className="text-[14px] text-[#FF5001] font-semibold">
                        {e.user?.name}
                      </p>
                      <p className="w-[345px] text-[14px] text-[#374151]">
                        {e.message}
                      </p>
                      <p className="flex justify-end text-[10px] text-[#1F2937]">
                        {Moment(e.createdAt).format("hh:mm")}
                      </p>
                    </div>
                  </div>
                </>
              );
            } else {
              return (
                <div className="flex justify-end mb-6">
                  <div className="bg-[#FF5001] text-white py-1 px-2 rounded-xl rounded-br-none">
                    <p className="text-[14px] w-[345px]">{e.message}</p>
                    <p className="text-[10px] flex justify-end">
                      {Moment(e.createdAt).format("hh:mm")}
                    </p>
                  </div>
                </div>
              );
            }
          })}
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
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            value={message}
          />
          {/* kirim chat */}
          <div
            onClick={(e) => {
              sendMessage();
            }}
            className="h-[48px] w-[60px] bg-white flex items-center justify-center rounded-full cursor-pointer"
          >
            <KirimIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatForum;
