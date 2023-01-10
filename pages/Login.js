import { useRouter, withRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../src/API/axiosFetch";
import { setToken } from "../src/redux/userReducer";
import Logo from "../src/utility/Logo";

const Login = ({ router }) => {
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
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.user.roles);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const login = async () => {
    const res = await axiosFetch("post", `user/login`, formData);
    if (res.data) {
      dispatch(
        setToken({ token: res.data.access_token, roles: res.data.roles })
      );
    }
    if (roles == "relawan") {
      router.push({ pathname: "Admin", query: { component: "Simpatisan" } });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={containWrap}>
        <Logo />
        <form>
          <div className="flex flex-col gap-6">
            {/* email */}
            <div className="flex flex-col self-stretch gap-2">
              <label htmlFor="email" className="text-[14px] text-[#374151] ">
                Email
              </label>

              <input
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="h-[40px] rounded-md border text-[#374151] px-2 outline-0"
                type={"email"}
                id="email"
              />
            </div>

            {/* password */}
            <div className="flex flex-col self-stretch gap-2">
              <label htmlFor="password" className="text-[14px] text-[#374151] ">
                Password
              </label>

              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="h-[40px] border rounded-md text-[#374151] px-2 outline-0"
                type={"password"}
                id="password"
              />
            </div>

            {/* button submit */}
            <div
              onClick={() => {
                login();
              }}
              className="flex justify-center rounded-md items-center h-[48px] w-[411px] bg-[#E44700] font-semibold text-white text-[18px]"
            >
              Login
            </div>
          </div>
        </form>
        <p className="text-[#374151]">
          <span>Lupa Password / Email Anda? </span>
          <span className="text-[#FF5001] font-semibold cursor-pointer">
            Klik Disini
          </span>
        </p>
        <p className="text-[#374151] items-center flex flex-col">
          <span>
            Tertarik menjadi Relawan / Simpatisan?{" "}
            <span
              onClick={() => {
                router.push({
                  pathname: "Daftar",
                  query: { type: "simpatisan" },
                });
              }}
              className="text-[#FF5001] font-semibold cursor-pointer"
            >
              Klik Disini
            </span>
          </span>

          <span
            onClick={() =>
              router.push({
                pathname: "HomePage",
              })
            }
            className="text-[#9CA3AF] mt-[15px] flex items-center cursor-pointer"
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 16.7087L6.66667 10.8753L12.5 5.04199"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Kembali ke homepage
          </span>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Login);
