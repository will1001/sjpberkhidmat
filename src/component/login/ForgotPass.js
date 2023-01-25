import React from "react";
import { ReCaptcha } from "next-recaptcha-v3";

const ForgotPass = () => {
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
          <input className="w-full border mt-2 text-[16px] h-[48px] rounded-md p-4 outline-0" type={"email"} />
        </div>
        <ReCaptcha action="page-view" />
        <p>asdasd</p>
      </div>
    </div>
  );
};

export default ForgotPass;
