import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../src/API/axiosFetch";
import { setToken } from "../src/redux/userReducer";
import Logo from "../src/utility/Logo";
import show from "../src/utility/icon/show_password.png";
import hide from "../src/utility/icon/hide_password.png";
import ForgotPass from "../src/component/login/ForgotPass";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import Periv from "../src/component/login/Periv";
import { KembaliIcon, PrevIcon } from "../src/utility/icon/icon";

import { app } from "../firebase";
import { getToken, getMessaging } from "firebase/messaging";

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
  const token = useSelector((state) => state.user.token);
  const name = useSelector((state) => state.user.name);

  const saveFcmToken = async () => {
    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      getToken(messaging, {
        vapidKey:
          "BOZ5lS6LL3TkU3LI1WcH_S_2Vvo_Fg6FiDo7BUmqylHHZDmSMq6sRNcL-ObBCl6jN3geNd0anA7u_pOf8pP6TD8",
      }).then(async (tokenFcm) => {
        console.log("tokenFcm");
        console.log(tokenFcm);
        console.log("tokenFcm");
        if (tokenFcm) {
          const a = new FormData();
          a.append("token", tokenFcm);
          {
            await axiosFetch("post", `user/token/save`, a, token);
          }
        } else {
          console.log("no granted");
        }
      });
    }

    if (permission === "denied") {
      console.log("Anda menolak notifikasi akses");
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [email, setEmail] = useState();

  const login = async () => {
    const res = await axiosFetch("post", `user/login`, formData)
      .then(async (res) => {
        if (res?.data) {
          dispatch(
            setToken({
              token: res.data.access_token,
              roles: res.data.roles,
              name: res.data.name,
              email: res.data.email,
              id_kabupaten: res.data.id_kabupaten,
            })
          );
          window.location.reload(false);
        } else {
          return <p>Loading.....</p>;
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message);
      });
  };

  const setPageForgot = () => {
    setPage("login");
  };
  const setPageverif = () => {
    setPage("perivikasi");
  };

  const [passType, setPasType] = useState("password");
  const [page, setPage] = useState("login");

  useEffect(() => {

    if (token) {
      saveFcmToken();
    }
    if (roles === "admin") {
      router.push({ pathname: "Admin", query: { component: "Dashboard" } });
    } else if (roles === "relawan") {
      router.push({ pathname: "relawan/Relawan" });
    } else if (roles === "koordinator" || roles === "ketua_tim") {
      router.push({ pathname: "koordinator/Koordinator" });
    }
  }, [roles, token]);

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

  if (page === "login") {
    return screenSize.width >= 350 && screenSize.width <= 450 ? (
      // login mobile
      <div className="pt-[55px] px-[16px]">
        <div className="flex justify-center mb-[44px]">
          <Logo />
        </div>
        {/* email */}
        <p className="text-[#6B7280] mb-2">Email</p>
        <input
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Masukkan Email Anda"
          className="border p-2 rounded-sm w-full border-[#D1D5DB]"
          type={"email"}
        />
        {/* password */}
        <p className="text-[#6B7280] mb-2 mt-3">Password</p>
        <div className="flex h-[40px] border rounded-sm text-[#374151] px-2 items-center">
          <input
            placeholder="Masukkan Password Anda"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="outline-0 w-full"
            type={passType}
            id="password"
          />
          {passType === "password" ? (
            <img
              className="cursor-pointer"
              onClick={() => setPasType("text")}
              src={hide.src}
              alt="hide.png"
            />
          ) : (
            <img
              className="cursor-pointer"
              onClick={() => setPasType("password")}
              src={show.src}
              alt="hide.png"
            />
          )}
        </div>
        {/* login button */}
        <div
          onClick={login}
          className="flex justify-center bg-[#FF5001] mt-3 text-white font-medium rounded-sm py-2"
        >
          Login
        </div>
        <p className="text-[14px] text-[#374151] text-center mt-[21px]">
          Lupa Password / Email Anda?{" "}
          <span
            onClick={() => setPage("lupa password")}
            className="text-[#FF5001] font-medium"
          >
            Klik Disini
          </span>
        </p>
        <p className="text-[14px] text-[#374151] text-center mt-2">
          Tertarik menjadi Relawan / Simpatisan?
        </p>
        <p
          onClick={() => {
            router.push({
              pathname: "Daftar",
              query: { type: "simpatisan" },
            });
          }}
          className="text-[14px] font-medium text-[#FF5001] text-center mt-2"
        >
          Klik Disini
        </p>
        <div
          onClick={() =>
            router.push({
              pathname: "HomePage",
            })
          }
          className="flex justify-center items-center mt-3 gap-3 stroke-[#9CA3AF] text-[#9CA3AF]"
        >
          <PrevIcon />
          <p>Kembali ke homepage</p>
        </div>
      </div>
    ) : (
      // login dekstop
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
                <label
                  htmlFor="password"
                  className="text-[14px] text-[#374151] "
                >
                  Password
                </label>
                <div className="flex h-[40px] border rounded-md text-[#374151] px-2 items-center">
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="outline-0 w-full"
                    type={passType}
                    id="password"
                  />
                  {passType === "password" ? (
                    <img
                      className="cursor-pointer"
                      onClick={() => setPasType("text")}
                      src={hide.src}
                      alt="hide.png"
                    />
                  ) : (
                    <img
                      className="cursor-pointer"
                      onClick={() => setPasType("password")}
                      src={show.src}
                      alt="hide.png"
                    />
                  )}
                </div>
              </div>

              {/* button submit */}
              <div
                onClick={login}
                className="cursor-pointer flex justify-center rounded-md items-center h-[48px] w-[411px] bg-[#E44700] font-semibold text-white text-[18px]"
              >
                Login
              </div>
            </div>
          </form>
          <p className="text-[#374151]">
            <span>Lupa Password / Email Anda? </span>
            <span
              onClick={() => setPage("lupa password")}
              className="text-[#FF5001] font-semibold cursor-pointer"
            >
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
  } else if (page === "lupa password") {
    return (
      <ForgotPass
        email={email}
        setEmail={setEmail}
        pageForgot={setPageForgot}
        pagePeriv={setPageverif}
      />
    );
  } else if (page === "perivikasi") {
    return (
      <Periv email={email} setPage={setPage} kePageLogin={setPageForgot} />
    );
  }
};

export default withRouter(Login);
