import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axiosFetch from "../../API/axiosFetch";
import perivikasi from "../../utility/img/perivikasi_email.png";

const Periv = ({ kePageLogin }) => {
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

  const [email, setEmail] = useState();

  //   a.append("id", email);
  const reqReset = async () => {
    const a = new FormData();
    a.append("email", email);
    await axiosFetch("post", "user/reset_password/otp", a)
      .then((res) => console.log(res))
      .then(pagePeriv)
      .catch((err) => console.log(err));
  };

  //   console.log(page);
  return (
    <div style={containerStyle}>
      <div style={containWrap}>
        <img src={perivikasi.src} alt="perivikasi_email.png" />
        <p className="text-[#374151] text-[26px] font-bold">Silahkan Cek Emial Anda</p>
        <div className="flex justify-center items-center border-b-2 pb-4">
          <p className="items-center flex flex-col text-[#374151]">
            <span>Kami telah mengirimkan link untuk reset password </span> <span>anda melalui email.</span>
          </p>
        </div>
        <p className="text-[#374151]">
          Coba Login Lagi?&nbsp;
          <span onClick={kePageLogin} className="text-[#FF5001] font-semibold cursor-pointer">
            Kembali ke Login
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

export default Periv;
