import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axiosFetch from "../../API/axiosFetch";

const ForgotPass = ({ pageForgot, pagePeriv, email, setEmail }) => {
  const router = useRouter();
  const containerStyle = {
    position: "absolute",
    width: "538px",
    height: "600px",
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

  //   a.append("id", email);
  const reqReset = async () => {
    const a = new FormData();
    a.append("email", email);
    await axiosFetch("post", "user/reset_password/otp", a)
      .then((res) => console.log(res))
      .then(pagePeriv)
      .catch((err) => console.log(err));
  };

  // console.log(email);
  return (
    <div style={containerStyle}>
      <div style={containWrap}>
        <p className="text-[#374151] text-[26px] font-bold">Bantuan Login SJP Berkhidmat</p>
        <div className="flex justify-center items-center border-b-2 pb-4">
          <p className="flex flex-col items-center text-[#374151]">
            <span>Kami akan mengirimkan link untuk mengatur ulang </span>
            <span>password anda melalui akun email anda yang telah</span> terdaftar.
          </p>
        </div>
        <div className="w-full px-6 text-[#6B7280]">
          <label htmlFor="email">Email</label>
          <input placeholder="Masukan Email Anda" onChange={(e) => setEmail(e.target.value.toString())} className="w-full border mt-2 text-[16px] h-[48px] rounded-md p-4 outline-0" type={"email"} />
        </div>
        <div className="w-full px-6">
          <div onClick={reqReset} className="flex justify-center items-center cursor-pointer h-[41px] w-full bg-[#E44700] rounded-sm">
            <p className="text-white font-semibold text-[18px]">Reset Password</p>
          </div>
        </div>
        <p className="text-[#374151]">
          Coba Login Lagi?&nbsp;
          <span onClick={pageForgot} className="text-[#FF5001] font-semibold cursor-pointer">
            Kembali Ke Login
          </span>
        </p>
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
  );
};

export default ForgotPass;
