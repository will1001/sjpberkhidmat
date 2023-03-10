import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axiosFetch from "../../API/axiosFetch";
import perivikasi from "../../utility/img/perivikasi_email.png";
import show from "../../utility/icon/show_password.png";
import hide from "../../utility/icon/hide_password.png";
import { useEffect } from "react";

const Periv = ({ setPage, email }) => {
  const router = useRouter();
  const containerStyle = {
    position: "absolute",
    width: "538px",
    height: "840px",
    left: "451px",
    top: "80px",
    background: "#FFFFFF",
    boxShadow: "0px 8px 21px rgba(0, 0, 0, 0.08)",
  };
  const containWrap = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "0px",
    gap: "44px",

    position: "absolute",
    width: "411px",
    height: "485.88px",
    left: "64px",
    top: "57px",
  };

  const [otp, setOtp] = useState();
  const [newPassword, setNewPassword] = useState();
  const [passType, setPasType] = useState("password");
  const [timer, setTimer] = useState(0);

  const reqReset = async () => {
    const a = new FormData();
    a.append("email", email);
    a.append("otp", otp);
    a.append("new_password", newPassword);
    await axiosFetch("put", "user/reset_password/verify", a)
      .then((res) => {
        console.log(res);
        setPage("login");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  const reqOtp = async () => {
    const a = new FormData();
    a.append("email", email);
    await axiosFetch("post", "user/reset_password/otp", a)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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

  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        <div className="px-[16px]">
          <div className="flex items-center justify-center mt-[24px] mb-[31px]">
            <img className="w-[248px] h-[148px]" src={perivikasi.src} alt="perivikasi_email.png" />
          </div>
          <p className="text-[21px] text-[#374151] font-bold text-center mb-[31px]">Silahkan Cek Email Anda</p>
          <p className="text-[14px] text-[#374151] text-center">Kami telah mengirimkan Kode OTP untuk reset</p>
          <p className="text-[14px] text-[#374151] text-center">password anda melalui email.</p>
          <p className="mt-3 mb-2 text-[#6B7280]">Masukkan Kode OTP</p>
          <input onChange={(e) => setOtp(e.target.value)} type={"text"} className="outline-0 w-full flex h-[40px] border rounded-md text-[#374151] px-2 items-center" />
          <p className="mt-2 mb-2 text-[#6B7280]">New Password</p>
          <div className="flex h-[40px] border rounded-md text-[#374151] px-2 items-center">
            <input onChange={(e) => setNewPassword(e.target.value)} className="outline-0 w-full" type={passType} id="password" />
            {passType === "password" ? (
              <img className="cursor-pointer" onClick={() => setPasType("text")} src={hide.src} alt="hide.png" />
            ) : (
              <img className="cursor-pointer" onClick={() => setPasType("password")} src={show.src} alt="hide.png" />
            )}
          </div>
          <div onClick={reqReset} className="flex mt-4 justify-center bg-[#FF5001] text-white font-medium py-2 rounded-sm">
            Submit
          </div>
          <div onClick={reqOtp} className="flex mt-2 justify-center border border-[#374151] rounded-sm font-medium py-2 text-[#374151]">
            Kirim Ulang Kode OTP
          </div>
          <div className="flex justify-center mt-[21px]">
            <span
              onClick={() =>
                router.push({
                  pathname: "HomePage",
                })
              }
              className="text-[#9CA3AF] flex items-center cursor-pointer pb-[100px]"
            >
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 16.7087L6.66667 10.8753L12.5 5.04199" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kembali ke homepage
            </span>
          </div>
        </div>
      ) : (
        <div style={containerStyle}>
          <div style={containWrap}>
            <img src={perivikasi.src} alt="perivikasi_email.png" />
            <p className="text-[#374151] text-[26px] font-bold">Silahkan Cek Emial Anda</p>
            <div className="flex justify-center items-center border-b-2 pb-4">
              <p className="items-center flex flex-col text-[#374151]">
                <span>Kami telah mengirimkan Kode OTP untuk reset password </span> <span>anda melalui email.</span>
              </p>
            </div>
            <div className="flex flex-col self-stretch gap-2">
              <label className="text-[14px] text-[#374151] ">Masukan Kode OTP</label>
              <input onChange={(e) => setOtp(e.target.value)} type={"text"} className="outline-0 w-full flex h-[40px] border rounded-md text-[#374151] px-2 items-center" />
            </div>
            <div className="flex flex-col self-stretch gap-2">
              <label htmlFor="password" className="text-[14px] text-[#374151] ">
                New Password
              </label>
              <div className="flex h-[40px] border rounded-md text-[#374151] px-2 items-center">
                <input onChange={(e) => setNewPassword(e.target.value)} className="outline-0 w-full" type={passType} id="password" />
                {passType === "password" ? (
                  <img className="cursor-pointer" onClick={() => setPasType("text")} src={hide.src} alt="hide.png" />
                ) : (
                  <img className="cursor-pointer" onClick={() => setPasType("password")} src={show.src} alt="hide.png" />
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div onClick={reqReset} className="bg-[#FF5001] py-2 px-6 rounded-md text-white font-medium cursor-pointer">
                Submit
              </div>
              <div onClick={reqOtp} className="bg-white border-[#374151] border py-2 px-6 rounded-md text-[#374151] font-medium cursor-pointer">
                Kirim Ulang Kode OTP
              </div>
            </div>

            <span
              onClick={() =>
                router.push({
                  pathname: "HomePage",
                })
              }
              className="text-[#9CA3AF] flex items-center cursor-pointer pb-[100px]"
            >
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 16.7087L6.66667 10.8753L12.5 5.04199" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kembali ke homepage
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Periv;
