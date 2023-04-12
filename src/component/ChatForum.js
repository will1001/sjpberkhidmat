import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../API/axiosFetch";
import { BackIcon, ImportGambarIcon, KirimIcon, Titik3Icon } from "../utility/icon/icon";
import ForumBesarIcon from "../utility/img/forum_besar.png";
import ppUser from "../utility/img/pp_user.png";
import fileIcon from "../utility/icon/file.png";
import CloseIcon from "../utility/icon/close.png";
import kembaliMobile from "../utility/icon/backIcn.png";

import Moment from "moment";
import "moment/locale/id";
import { setImagePreviewer } from "../redux/panelReducer";

const ChatForum = ({ roomChat, roomtitle, roomLogo, chatType, mobile, setRoomChat }) => {
  const [chats, setChat] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [message, setMessage] = useState("");
  const [fileMessage, setFileMessage] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [typeFilePreview, setTypeFilePreview] = useState("");
  const [idChat, setIDChat] = useState(null);
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
      if(idChat)  a.append("reply_to", idChat);

      {
        await axiosFetch("post", `user/chats/forum`, a, token)
          .then((res) => {
            // window.location.reload(false);
            setMessage("");
            setFileMessage(null);
            setFilePreview(null);
            setTypeFilePreview(null);
            setIDChat(null);

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
      
      if(idChat)  a.append("reply_to", idChat);

      {
        await axiosFetch("post", `user/chats`, a, token)
          .then((res) => {
            // window.location.reload(false);
            setMessage("");
            setFileMessage(null);
            setFilePreview(null);
            setTypeFilePreview(null);
            setIDChat(null);
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
      await axiosFetch("get", `user/chats/forum?offset=0&forum=${roomChat}`, [], token)
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
      await axiosFetch("get", `user/chats?offset=0&target=${roomChat}`, [], token)
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

  const [isPressed, setIsPressed] = useState();
  const [timer, setTimer] = useState();

  const handleMouseDown = (id) => {
    setTimer(
      setTimeout(() => {
        setIsPressed(id);
        // Tambahkan kode untuk menangani event long press di sini
      }, 1000)
    ); // Waktu (dalam milidetik) yang dibutuhkan untuk dianggap sebagai long press
  };

  const handleMouseUp = () => {
    // setIsPressed(false);
    clearTimeout(timer);
  };

  const [balasPesan, setBalasPesan] = useState({
    user: undefined,
    message: undefined,
    image: undefined,
    file: undefined,
  });

  return (
    <div className="">
      <div className="flex items-center pt-[25px] justify-between border-b-[1px] pb-[25px] px-[32px] sticky top-0 bg-white">
        {mobile === true && <img onClick={() => setRoomChat(undefined)} className="mr-[24px]" src={kembaliMobile.src} />}
        <div className="flex gap-3 items-center">
          <img src={roomLogo.src} />
          <div>
            <p className=" text-black font-semibold">{roomtitle}</p>
            <p className="w-[330px] whitespace-nowrap truncate">{/* Gawati Zulaika Karsa Dabukke Budi Pradipta eko mamat maman */}</p>
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
                if (e.image.split(".").pop() === "png" || e.image.split(".").pop() === "jpg" || e.image.split(".").pop() === "jpeg") {
                  return (
                    <div onTouchStart={() => handleMouseDown(e._id)} onTouchEnd={handleMouseUp} onMouseDown={() => handleMouseDown(e._id)} onMouseUp={handleMouseUp} className="flex gap-3 mb-6">
                      <div className="flex items-end">
                        <img className="h-[32px] w-[32px] rounded-full" src={ppUser.src} />
                      </div>

                      <div className="shadow-lg bg-white px-2 py-1 rounded-xl rounded-bl-none">
                      {e.reply_to && 
                      <div className="border border-white border-l-4 p-3 rounded-xl">
                        <p className="text-[14px] text-white font-semibold">{e.reply_to.user?.name}</p>
                        <p className={`${mobile === true ? "w-full text-[14px] text-white" : "w-[345px] text-[14px] text-white"}`}>{e.reply_to.message}</p>
                        {e.reply_to?.type === "image" && e.reply_to?.image?.split(".").pop() === "png" || e.reply_to?.image?.split(".").pop() === "jpg" || e.reply_to?.image?.split(".").pop() === "jpeg" ? 
                      <>
                      <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer: process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image,
                              })
                            );
                          }}
                        />
                      </>
                      :
                      <>
                       File
                       <img className="cursor-pointer w-[50px] my-[10px]" src={fileIcon.src} />
                       <div
                            onClick={() => {
                              window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to.image, "_blank");
                            }}
                            className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl w-[55px]"
                          >
                            Open
                       </div>
                      </>  
                      }
                      </div>
                    }
                        <p className="text-[14px] text-[#FF5001] font-semibold">{e.user?.name}</p>
                        <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer: process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image,
                              })
                            );
                          }}
                        />
                        <p className="flex justify-end text-[10px] text-[#1F2937]">{Moment(e.createdAt).format("hh:mm")}</p>
                      </div>
                      {isPressed === e._id && (
                        <div 
                        className="relative text-[14px] bg-white shadow-lg px-2 text-[#374151] rounded-lg h-[60px] cursor-pointer">
                          <p className="z-20 text-red-500 text-right cursor-pointer" onClick={() => setIsPressed()}>
                            x
                          </p>
                          <p
                          className="z-10 flex flex-col justify-center items-center relative bottom-[20px] h-[60px] w-[90px] mr-3"
                             onClick={() => {
                              setBalasPesan({ ...balasPesan, user: e.user?.name, message: e.message, image: e.image });
                              setIsPressed();
                              setIDChat(e._id);
                            }}
                          >
                            {" "}
                            Balas Pesan
                          </p>
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div onTouchStart={() => handleMouseDown(e._id)} onTouchEnd={handleMouseUp} onMouseDown={() => handleMouseDown(e._id)} onMouseUp={handleMouseUp} className="flex gap-3 mb-6">
                      <div className="flex items-end">
                        <img className="h-[32px] w-[32px] rounded-full" src={ppUser.src} />
                      </div>
                      <div className="shadow-lg bg-white px-2 py-1 rounded-xl rounded-bl-none">
                      {e.reply_to && 
                      <div className="border border-white border-l-4 p-3 rounded-xl">
                        <p className="text-[14px] text-white font-semibold">{e.reply_to.user?.name}</p>
                        <p className={`${mobile === true ? "w-full text-[14px] text-white" : "w-[345px] text-[14px] text-white"}`}>{e.reply_to.message}</p>
                        {e.reply_to?.type === "image" && e.reply_to?.image?.split(".").pop() === "png" || e.reply_to?.image?.split(".").pop() === "jpg" || e.reply_to?.image?.split(".").pop() === "jpeg" ? 
                      <>
                      <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer: process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image,
                              })
                            );
                          }}
                        />
                      </>
                      :
                      <>
                       File
                       <img className="cursor-pointer w-[50px] my-[10px]" src={fileIcon.src} />
                       <div
                            onClick={() => {
                              window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to.image, "_blank");
                            }}
                            className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl w-[55px]"
                          >
                            Open
                       </div>
                      </>  
                      }
                      </div>
                    }
                        <p className="text-[14px] text-[#FF5001] font-semibold">{e.user?.name}</p>
                        <div>
                          File
                          <img className="cursor-pointer w-[50px] my-[10px]" src={fileIcon.src} />
                          <div
                            onClick={() => {
                              window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image, "_blank");
                            }}
                            className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl"
                          >
                            Open
                          </div>
                        </div>
                        <p className="flex justify-end text-[10px] text-[#1F2937]">{Moment(e.createdAt).format("hh:mm")}</p>
                      </div>
                      {isPressed === e._id && (
                        <div 
                        className="relative text-[14px] bg-white shadow-lg px-2 text-[#374151] rounded-lg h-[60px] cursor-pointer">
                          <p className="z-20 text-red-500 text-right cursor-pointer" onClick={() => setIsPressed()}>
                            x
                          </p>
                          <p
                          className="z-10 flex flex-col justify-center items-center relative bottom-[20px] h-[60px] w-[90px] mr-3"
                             onClick={() => {
                              setBalasPesan({ ...balasPesan, file: fileIcon, user: e.user?.name, message: e.message });
                              setIsPressed();
                              setIDChat(e._id);
                            }}
                          >
                            {" "}
                            Balas Pesan
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
              } else {
                return (
                  <>
                  
                    <div
                      onTouchStart={() => handleMouseDown(e._id)}
                      onTouchEnd={handleMouseUp}
                      onMouseDown={() => handleMouseDown(e._id)}
                      onMouseUp={handleMouseUp}
                      className={`${mobile === true ? "flex gap-3 mb-6" : "flex gap-3 mb-6 cursor-pointer"}  `}
                    >
                      <div className={`flex items-end`}>
                        <img className="h-[32px] w-[32px] rounded-full" src={ppUser.src} />
                      </div>

                      <div className="shadow-lg bg-white px-2 py-1 rounded-xl rounded-bl-none">
                      {e.reply_to && 
                      <div className="border border-white border-l-4 p-3 rounded-xl">
                        <p className="text-[14px] text-white font-semibold">{e.reply_to.user?.name}</p>
                        <p className={`${mobile === true ? "w-full text-[14px] text-white" : "w-[345px] text-[14px] text-white"}`}>{e.reply_to.message}</p>
                        {e.reply_to?.type === "image" && e.reply_to?.image?.split(".").pop() === "png" || e.reply_to?.image?.split(".").pop() === "jpg" || e.reply_to?.image?.split(".").pop() === "jpeg" ? 
                      <>
                      <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer: process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image,
                              })
                            );
                          }}
                        />
                      </>
                      :
                      <>
                       File
                       <img className="cursor-pointer w-[50px] my-[10px]" src={fileIcon.src} />
                       <div
                            onClick={() => {
                              window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to.image, "_blank");
                            }}
                            className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl w-[55px]"
                          >
                            Open
                       </div>
                      </>  
                      }
                      </div>
                    }
                        <p className="text-[14px] text-[#FF5001] font-semibold">{e.user?.name}</p>
                        <p className={`${mobile === true ? "w-full text-[14px] text-[#374151]" : "w-[345px] text-[14px] text-[#374151]"}`}>{e.message}</p>
                        <p className="flex justify-end text-[10px] text-[#1F2937]">{Moment(e.createdAt).format("hh:mm")}</p>
                      </div>
                      {isPressed === e._id && (
                        <div 
                        className="relative text-[14px] bg-white shadow-lg px-2 text-[#374151] rounded-lg h-[60px] cursor-pointer">
                          <p className="z-20 text-red-500 text-right cursor-pointer" onClick={() => setIsPressed()}>
                            x
                          </p>
                          <p
                          className="z-10 flex flex-col justify-center items-center relative bottom-[20px] h-[60px] w-[90px] mr-3"
                             onClick={() => {
                              setBalasPesan({ ...balasPesan, file: fileIcon, user: e.user?.name, message: e.message });
                              setIsPressed();
                              setIDChat(e._id);
                            }}
                          >
                            {" "}
                            Balas Pesan
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                );
              }
            } else {
              if (e.type === "image") {
                if (e.image.split(".").pop() === "png" || e.image.split(".").pop() === "jpg" || e.image.split(".").pop() === "jpeg") {
                  return (
                    <div className="flex justify-end mb-6">
                      {e.reply_to && 
                      <div className="border border-white border-l-4 p-3 rounded-xl">
                        <p className="text-[14px] text-white font-semibold">{e.reply_to.user?.name}</p>
                        <p className={`${mobile === true ? "w-full text-[14px] text-white" : "w-[345px] text-[14px] text-white"}`}>{e.reply_to.message}</p>
                        {e.reply_to?.type === "image" && e.reply_to?.image?.split(".").pop() === "png" || e.reply_to?.image?.split(".").pop() === "jpg" || e.reply_to?.image?.split(".").pop() === "jpeg" ? 
                      <>
                      <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer: process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image,
                              })
                            );
                          }}
                        />
                      </>
                      :
                      <>
                       File
                       <img className="cursor-pointer w-[50px] my-[10px]" src={fileIcon.src} />
                       <div
                            onClick={() => {
                              window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to.image, "_blank");
                            }}
                            className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl w-[55px]"
                          >
                            Open
                       </div>
                      </>  
                      }
                      </div>
                    }
                      <div className="bg-[#FF5001] text-white py-1 px-2 rounded-xl rounded-br-none">
                        <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer: process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image,
                              })
                            );
                          }}
                        />
                        <p className="text-[10px] flex justify-end">{Moment(e.createdAt).format("hh:mm")}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex justify-end mb-6">
                      {e.reply_to && 
                      <div className="border border-white border-l-4 p-3 rounded-xl">
                        <p className="text-[14px] text-white font-semibold">{e.reply_to.user?.name}</p>
                        <p className={`${mobile === true ? "w-full text-[14px] text-white" : "w-[345px] text-[14px] text-white"}`}>{e.reply_to.message}</p>
                        {e.reply_to?.type === "image" && e.reply_to?.image?.split(".").pop() === "png" || e.reply_to?.image?.split(".").pop() === "jpg" || e.reply_to?.image?.split(".").pop() === "jpeg" ? 
                      <>
                      <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer: process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image,
                              })
                            );
                          }}
                        />
                      </>
                      :
                      <>
                       File
                       <img className="cursor-pointer w-[50px] my-[10px]" src={fileIcon.src} />
                       <div
                            onClick={() => {
                              window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to.image, "_blank");
                            }}
                            className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl w-[55px]"
                          >
                            Open
                       </div>
                      </>  
                      }
                      </div>
                    }
                      <div className="bg-[#FF5001] text-white py-1 px-2 rounded-xl rounded-br-none">
                        File
                        <img className="cursor-pointer w-[50px] my-[10px]" src={fileIcon.src} />
                        <div
                          onClick={() => {
                            window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.image, "_blank");
                          }}
                          className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl"
                        >
                          Open
                        </div>
                        <p className="text-[10px] flex justify-end">{Moment(e.createdAt).format("hh:mm")}</p>
                      </div>
                    </div>
                  );
                }
              } else {
                return (
                  <div className="flex flex-col">
                  <div className="flex justify-end mb-6">
                    <div className="bg-[#FF5001] text-white py-1 px-2 rounded-xl rounded-br-none">
                    {e.reply_to && 
                      <div className="border border-white border-l-4 p-3 rounded-xl">
                        <p className="text-[14px] text-white font-semibold">{e.reply_to.user?.name}</p>
                        <p className={`${mobile === true ? "w-full text-[14px] text-white" : "w-[345px] text-[14px] text-white"}`}>{e.reply_to.message}</p>
                        {e.reply_to?.type === "image" && e.reply_to?.image?.split(".").pop() === "png" || e.reply_to?.image?.split(".").pop() === "jpg" || e.reply_to?.image?.split(".").pop() === "jpeg" ? 
                      <>
                      <img
                          className="w-[150px] cursor-pointer"
                          src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image}
                          onClick={() => {
                            dispatch(
                              setImagePreviewer({
                                imagePreviewer: process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to?.image,
                              })
                            );
                          }}
                        />
                      </>
                      :
                      <>
                       File
                       <img className="cursor-pointer w-[50px] my-[10px]" src={fileIcon.src} />
                       <div
                            onClick={() => {
                              window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + e.reply_to.image, "_blank");
                            }}
                            className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl w-[55px]"
                          >
                            Open
                       </div>
                      </>  
                      }
                      </div>
                    }
                    
                      <p className={`${mobile === true ? "w-full text-[14px] text-white" : "w-[345px] text-[14px] text-white"}`}>{e.message}</p>
                      <p className="text-[10px] flex justify-end">{Moment(e.createdAt).format("hh:mm")}</p>
                    </div>
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
          <div className="flex justify-center">{typeFilePreview.includes("image") ? <img src={filePreview} className="w-[280px] h-[330px] object-fill" /> : <img src={fileIcon.src} />}</div>
        </div>
      )}

      <div className="sticky bottom-0  bg-[#E5E7EB] py-2">
        {balasPesan.user !== undefined && (
          <div className="bg-white px-[24px] mb-2 pb-[24px]">
            <p onClick={() => setBalasPesan({ user: undefined, message: undefined, image: undefined, file: undefined })} className="text-right cursor-pointer">
              x
            </p>
            <p className="text-[14px] text-[#FF5001] font-semibold">{balasPesan.user}</p>
            <p className="text-[14px] text-[#374151]">{balasPesan.message}</p>
            {balasPesan.image !== undefined && <img className="w-[150px] cursor-pointer" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + balasPesan.image} />}
            {balasPesan.file !== undefined && (
              <div>
                File
                <img className="cursor-pointer w-[50px] my-[10px]" src={balasPesan.file.src} />
                <div
                  onClick={() => {
                    window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + balasPesan.image, "_blank");
                  }}
                  className="cursor-pointer flex items-center p-1 border border-black border-3 rounded-xl"
                >
                  Open
                </div>
              </div>
            )}
          </div>
        )}

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
                setBalasPesan({ user: undefined, message: undefined, image: undefined, file: undefined })
              }
            }}
            value={message}
            disabled={!filePreview ? false : true}
          />
          {/* kirim chat */}
          <div
            onClick={(e) => {
              sendMessage();
              setBalasPesan({ user: undefined, message: undefined, image: undefined, file: undefined })
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
