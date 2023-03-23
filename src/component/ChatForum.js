import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../API/axiosFetch";
import { ImportGambarIcon, KirimIcon, Titik3Icon } from "../utility/icon/icon";
import ForumBesarIcon from "../utility/img/forum_besar.png";
import ppUser from "../utility/img/pp_user.png";
import fileIcon from "../utility/icon/file.png";
import CloseIcon from "../utility/icon/close.png";

import Moment from "moment";
import "moment/locale/id";
import { setImagePreviewer } from "../redux/panelReducer";

const ChatForum = ({ roomChat, roomtitle, roomLogo, chatType }) => {
  const [chats, setChat] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [message, setMessage] = useState("");
  const [fileMessage, setFileMessage] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [typeFilePreview, setTypeFilePreview] = useState("");
  const dispatch = useDispatch();

  Moment.locale("id");

  const sendMessage = async () => {
    const a = new FormData();
    let target = [];

    // dispatch(showOrHidePopUpDptDps({ type: null }));
    if (chatType === "forum") {
      a.append("forum", roomChat);
      if (fileMessage) {
        a.append("message", " ");
        a.append("type", "image");
        a.append("image", fileMessage);
      } else {
        a.append("message", message);
        a.append("type", "text");
      }

      {
        await axiosFetch("post", `user/chats/forum`, a, token)
          .then((res) => {
            // window.location.reload(false);
            setMessage("");
            setFileMessage(null);
            setFilePreview(null);
            setTypeFilePreview(null);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      // target.push(roomChat);
      a.append("target", roomChat);
      a.append("target", "");

      if (fileMessage) {
        a.append("message", " ");
        a.append("type", "image");
        a.append("image", fileMessage);
      } else {
        a.append("message", message);
        a.append("type", "text");
      }
      {
        await axiosFetch("post", `user/chats`, a, token)
          .then((res) => {
            // window.location.reload(false);
            setMessage("");
            setFileMessage(null);
            setFilePreview(null);
            setTypeFilePreview(null);
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
              if (e.type === "image") {
                if (
                  e.image.split(".").pop() === "png" ||
                  e.image.split(".").pop() === "jpg" ||
                  e.image.split(".").pop() === "jpeg"
                ) {
                  return (
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
                        <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer:
                                  process.env.NEXT_PUBLIC_BASE_URL_IMAGE +
                                  e.image,
                              })
                            );
                          }}
                        />
                        <p className="flex justify-end text-[10px] text-[#1F2937]">
                          {Moment(e.createdAt).format("hh:mm")}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
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
                        <div>
                          File
                          <img
                            className="cursor-pointer w-[50px] my-[10px]"
                            src={fileIcon.src}
                          />
                          <div
                            onClick={() => {
                              window.open(
                                process.env.NEXT_PUBLIC_BASE_URL_IMAGE +
                                  e.image,
                                "_blank"
                              );
                            }}
                            className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl"
                          >
                            Open
                          </div>
                        </div>
                        <p className="flex justify-end text-[10px] text-[#1F2937]">
                          {Moment(e.createdAt).format("hh:mm")}
                        </p>
                      </div>
                    </div>
                  );
                }
              } else {
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
              }
            } else {
              if (e.type === "image") {
                if (
                  e.image.split(".").pop() === "png" ||
                  e.image.split(".").pop() === "jpg" ||
                  e.image.split(".").pop() === "jpeg"
                ) {
                  return (
                    <div className="flex justify-end mb-6">
                      <div className="bg-[#FF5001] text-white py-1 px-2 rounded-xl rounded-br-none">
                        <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer:
                                  process.env.NEXT_PUBLIC_BASE_URL_IMAGE +
                                  e.image,
                              })
                            );
                          }}
                        />
                        <p className="text-[10px] flex justify-end">
                          {Moment(e.createdAt).format("hh:mm")}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex justify-end mb-6">
                      <div className="bg-[#FF5001] text-white py-1 px-2 rounded-xl rounded-br-none">
                        File
                        <img
                          className="cursor-pointer w-[50px] my-[10px]"
                          src={fileIcon.src}
                        />
                        <div
                          onClick={() => {
                            window.open(
                              process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image,
                              "_blank"
                            );
                          }}
                          className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl"
                        >
                          Open
                        </div>
                        <p className="text-[10px] flex justify-end">
                          {Moment(e.createdAt).format("hh:mm")}
                        </p>
                      </div>
                    </div>
                  );
                }
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
            }
          })}
        </div>
        {/* tutup chat */}
      </div>
      {/* pop up upload file */}
      {filePreview && (
        <div className="bg-gray-300 w-full h-[400px] relative">
          <div className="flex justify-end p-[10px]">
            <img
              onClick={() => {
                setFilePreview(null);
              }}
              className="cursor-pointer"
              src={CloseIcon.src}
              alt=""
            />
          </div>
          <div className="flex justify-center">
            {typeFilePreview.includes("image") ? (
              <img
                src={filePreview}
                className="w-[280px] h-[330px] object-fill"
              />
            ) : (
              <img src={fileIcon.src} />
            )}
          </div>
        </div>
      )}

      <div className="sticky bottom-0  bg-[#E5E7EB] py-2">
        <div className="flex gap-3 px-[24px]">
          {/* import gambar */}
          <div className="h-[48px] w-[60px] bg-white flex items-center justify-center rounded-full cursor-pointer">
            <label htmlFor="file_chat">
              <ImportGambarIcon />
              <input
                className="hidden"
                type="file"
                id="file_chat"
                onChange={(e) => {
                  setTypeFilePreview(e.target.files[0].type);
                  setFilePreview(URL.createObjectURL(e.target.files[0]));
                  setFileMessage(e.target.files[0]);
                }}
              />
            </label>
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
            disabled={!filePreview ? false : true}
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
