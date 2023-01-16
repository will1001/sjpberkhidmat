import React, { useState } from "react";
import { ButtonLogin, DropDownIcon, FacebookIcon, InstagramIcon, LinkedInIcon, SearchIcon, TikTokIcon, TwitterIcon, YouTubeIcon } from "../src/utility/icon/icon";
import Logo from "../src/utility/Logo";
import Slideshow from "../src/component/homepage/SlideShow";
import CountDown from "../src/component/homepage/CountDown";
import KabarTerbaru from "../src/component/homepage/KabarTerbaru";
import DaftarSimpatisanButton from "../src/component/homepage/DaftarSimpatisanButton";
import DaftarRelawanButton from "../src/component/homepage/DaftarRelawanButton";
import bgImage from "../src/utility/img/sliderBg.png";
import Publikasi from "../src/component/homepage/Publikasi";
import bgImage2 from "../src/utility/img/bgDaftarSimpatisan.png";
import KabarSjpBerkhidmat from "../src/component/homepage/KabarSjpBerkhidmat";
import KategoriKabar from "../src/component/homepage/KategoriKabar";
import imageKosong from "../src/utility/img/gambarKosong.png";
import LogoPKS from "../src/utility/LogoPKS";
import DropDownPublikasi from "../src/component/homepage/DropDownPublikasi";
import { withRouter } from "next/router";
import Daftar from "./Daftar";

const HomePage = ({ router }) => {
  const [dropDownPublikasi, setDropDownPublikasi] = useState(false);
  const handlePublikasi = () => setDropDownPublikasi(!dropDownPublikasi);

  return (
    <>
      <div onClick={handlePublikasi} className={`${dropDownPublikasi === false ? "hidden" : "visible"} absolute w-[1350px] h-[4750px] mt-[650px] z-10 bg-opacity-50 bg-slate-600 `}></div>
      <div className="w-[1350px] ">
        <div className="flex bg-white w-full h-[72px] px-20 justify-between z-20">
          <Logo />
          <div className="flex items-center gap-4 text-[16px] font-medium text-[#374151]">
            <p className="cursor-pointer">Beranda</p>
            <p className="cursor-pointer">Pemilu 2024</p>
            <p onClick={handlePublikasi} className={`flex cursor-pointer ${dropDownPublikasi === false ? "stroke-[#374151]" : "stroke-[#FF5001] "} `}>
              <span className={dropDownPublikasi === false ? "" : "text-[#FF5001] "}>Publikasi</span> <DropDownIcon />
            </p>
            <p className="flex cursor-pointer stroke-[#374151]">
              Pendaftaran Anggota <DropDownIcon />
            </p>
            <button>
              <svg width="139" height="31" viewBox="0 0 139 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="139" height="31" rx="4" fill="#E44700" />
                <path
                  d="M21.4645 10.76C22.5099 10.76 23.3312 11.012 23.9285 11.516C24.5259 12.02 24.8245 12.6967 24.8245 13.546C24.8245 14.4513 24.5259 15.1467 23.9285 15.632C23.3312 16.108 22.5145 16.346 21.4785 16.346L21.2825 16.458H19.2945V20H17.3905V10.76H21.4645ZM21.2405 14.988C21.7819 14.988 22.1832 14.8807 22.4445 14.666C22.7152 14.442 22.8505 14.1013 22.8505 13.644C22.8505 13.1867 22.7152 12.8507 22.4445 12.636C22.1832 12.412 21.7819 12.3 21.2405 12.3H19.2945V14.988H21.2405ZM22.3745 15.394L25.3705 20H23.2005L20.7225 15.954L22.3745 15.394ZM29.0504 20.14C28.5838 20.14 28.1638 20.056 27.7904 19.888C27.4171 19.72 27.1184 19.454 26.8944 19.09C26.6798 18.7167 26.5724 18.236 26.5724 17.648V13H28.4904V17.186C28.4904 17.7273 28.6024 18.1053 28.8264 18.32C29.0504 18.5253 29.3724 18.628 29.7924 18.628C29.9884 18.628 30.1798 18.5953 30.3664 18.53C30.5531 18.4553 30.7164 18.3433 30.8564 18.194C31.0058 18.0447 31.1224 17.8533 31.2064 17.62C31.2904 17.3773 31.3324 17.0927 31.3324 16.766V13H33.2504V20H31.5424L31.4724 18.782C31.2391 19.2487 30.9171 19.594 30.5064 19.818C30.1051 20.0327 29.6198 20.14 29.0504 20.14ZM35.2687 20V13H36.9907L37.0607 14.26C37.2941 13.7933 37.6114 13.4433 38.0127 13.21C38.4234 12.9767 38.8761 12.86 39.3707 12.86C39.8747 12.86 40.3274 12.9767 40.7287 13.21C41.1394 13.4433 41.4474 13.7887 41.6527 14.246C41.8021 13.938 42.0027 13.6813 42.2547 13.476C42.5067 13.2707 42.7867 13.1167 43.0947 13.014C43.4027 12.9113 43.7154 12.86 44.0327 12.86C44.4901 12.86 44.9054 12.9533 45.2787 13.14C45.6614 13.3267 45.9647 13.6067 46.1887 13.98C46.4127 14.3533 46.5247 14.8293 46.5247 15.408V20H44.6067V15.786C44.6067 15.2727 44.4947 14.9087 44.2707 14.694C44.0467 14.4793 43.7574 14.372 43.4027 14.372C43.1227 14.372 42.8614 14.442 42.6187 14.582C42.3854 14.722 42.1987 14.932 42.0587 15.212C41.9281 15.4827 41.8627 15.8233 41.8627 16.234V20H39.9447V15.786C39.9447 15.2727 39.8281 14.9087 39.5947 14.694C39.3707 14.4793 39.0814 14.372 38.7267 14.372C38.4841 14.372 38.2414 14.4373 37.9987 14.568C37.7654 14.6987 37.5694 14.904 37.4107 15.184C37.2614 15.464 37.1867 15.8327 37.1867 16.29V20H35.2687ZM52.4931 15.534C52.4931 15.1327 52.3765 14.82 52.1431 14.596C51.9191 14.372 51.6205 14.26 51.2471 14.26C50.9018 14.26 50.5985 14.3487 50.3371 14.526C50.0758 14.7033 49.8845 14.9973 49.7631 15.408L48.1251 14.904C48.2838 14.288 48.6291 13.7933 49.1611 13.42C49.7025 13.0467 50.4258 12.86 51.3311 12.86C51.9471 12.86 52.4838 12.958 52.9411 13.154C53.3985 13.3407 53.7531 13.6253 54.0051 14.008C54.2665 14.3907 54.3971 14.8713 54.3971 15.45V18.292C54.3971 18.6467 54.5651 18.824 54.9011 18.824C55.0598 18.824 55.2091 18.8007 55.3491 18.754L55.2371 19.944C54.9945 20.0653 54.6911 20.126 54.3271 20.126C54.0005 20.126 53.7065 20.07 53.4451 19.958C53.1838 19.846 52.9785 19.678 52.8291 19.454C52.6798 19.2207 52.6051 18.9313 52.6051 18.586V18.53L52.9411 18.474C52.8851 18.8287 52.7311 19.132 52.4791 19.384C52.2271 19.6267 51.9191 19.8133 51.5551 19.944C51.2005 20.0747 50.8318 20.14 50.4491 20.14C49.9731 20.14 49.5625 20.07 49.2171 19.93C48.8718 19.7807 48.6058 19.566 48.4191 19.286C48.2325 19.006 48.1391 18.6607 48.1391 18.25C48.1391 17.7273 48.3071 17.3027 48.6431 16.976C48.9791 16.64 49.4598 16.4113 50.0851 16.29L52.7171 15.758L52.7031 16.948L51.0231 17.284C50.7058 17.3493 50.4631 17.438 50.2951 17.55C50.1365 17.6527 50.0571 17.8253 50.0571 18.068C50.0571 18.3013 50.1411 18.4787 50.3091 18.6C50.4865 18.7213 50.6965 18.782 50.9391 18.782C51.1351 18.782 51.3265 18.7587 51.5131 18.712C51.6998 18.6653 51.8678 18.5907 52.0171 18.488C52.1665 18.3853 52.2831 18.2453 52.3671 18.068C52.4511 17.8907 52.4931 17.676 52.4931 17.424V15.534ZM56.5422 20V9.934H58.4602V14.19C58.6842 13.742 58.9922 13.4107 59.3842 13.196C59.7762 12.972 60.2195 12.86 60.7142 12.86C61.1995 12.86 61.6288 12.9533 62.0022 13.14C62.3848 13.3267 62.6835 13.6113 62.8982 13.994C63.1222 14.3673 63.2342 14.8387 63.2342 15.408V20H61.3162V15.968C61.3162 15.3613 61.1995 14.946 60.9662 14.722C60.7328 14.4887 60.4342 14.372 60.0702 14.372C59.7995 14.372 59.5382 14.4373 59.2862 14.568C59.0435 14.6893 58.8428 14.8947 58.6842 15.184C58.5348 15.464 58.4602 15.8373 58.4602 16.304V20H56.5422ZM77.311 20H75.309L74.539 17.746H70.997L70.227 20H68.253L71.627 10.76H73.937L77.311 20ZM71.431 16.318H74.105L72.761 12.286L71.431 16.318ZM81.2445 20.14C80.5352 20.14 79.8865 20.014 79.2985 19.762C78.7199 19.51 78.2485 19.1553 77.8845 18.698L78.9905 17.578C79.2145 17.914 79.5132 18.1893 79.8865 18.404C80.2599 18.6187 80.7032 18.726 81.2165 18.726C81.5805 18.726 81.8699 18.6747 82.0845 18.572C82.3085 18.46 82.4205 18.2873 82.4205 18.054C82.4205 17.9047 82.3692 17.7787 82.2665 17.676C82.1639 17.564 81.9585 17.4753 81.6505 17.41L80.4185 17.158C79.6065 16.99 79.0279 16.738 78.6825 16.402C78.3465 16.0567 78.1785 15.6133 78.1785 15.072C78.1785 14.6893 78.2905 14.33 78.5145 13.994C78.7479 13.658 79.0932 13.3873 79.5505 13.182C80.0079 12.9673 80.5772 12.86 81.2585 12.86C81.9585 12.86 82.5652 12.972 83.0785 13.196C83.6012 13.4107 84.0119 13.7327 84.3105 14.162L83.1625 15.282C82.9572 14.9553 82.6865 14.708 82.3505 14.54C82.0239 14.3627 81.6785 14.274 81.3145 14.274C81.0532 14.274 80.8292 14.302 80.6425 14.358C80.4559 14.414 80.3159 14.4933 80.2225 14.596C80.1292 14.6893 80.0825 14.8107 80.0825 14.96C80.0825 15.1093 80.1479 15.24 80.2785 15.352C80.4092 15.4547 80.6472 15.5433 80.9925 15.618L82.4205 15.912C83.1112 16.052 83.6059 16.29 83.9045 16.626C84.2032 16.9527 84.3525 17.3493 84.3525 17.816C84.3525 18.264 84.2312 18.6653 83.9885 19.02C83.7552 19.3653 83.4052 19.6407 82.9385 19.846C82.4812 20.042 81.9165 20.14 81.2445 20.14ZM85.882 22.94V13H87.604L87.73 15.226L87.492 14.974C87.576 14.5633 87.73 14.1993 87.954 13.882C88.1874 13.5647 88.4814 13.3173 88.836 13.14C89.1907 12.9533 89.5874 12.86 90.026 12.86C90.5954 12.86 91.104 13.0047 91.552 13.294C92 13.5833 92.35 13.9987 92.602 14.54C92.8634 15.072 92.994 15.7207 92.994 16.486C92.994 17.2513 92.8634 17.9093 92.602 18.46C92.3407 19.0013 91.9814 19.4167 91.524 19.706C91.076 19.9953 90.5627 20.14 89.984 20.14C89.368 20.14 88.8547 19.9673 88.444 19.622C88.0427 19.2767 87.7674 18.8427 87.618 18.32L87.8 18.026V22.94H85.882ZM89.424 18.67C89.9374 18.67 90.3387 18.488 90.628 18.124C90.9267 17.7507 91.076 17.2093 91.076 16.5C91.076 15.7907 90.9314 15.254 90.642 14.89C90.362 14.5167 89.9654 14.33 89.452 14.33C89.1254 14.33 88.836 14.4187 88.584 14.596C88.3414 14.764 88.15 15.0113 88.01 15.338C87.87 15.6553 87.8 16.0427 87.8 16.5C87.8 16.948 87.8654 17.3353 87.996 17.662C88.1267 17.9887 88.3134 18.2407 88.556 18.418C88.808 18.586 89.0974 18.67 89.424 18.67ZM95.6254 11.992C95.224 11.992 94.9254 11.908 94.7294 11.74C94.5334 11.5627 94.4354 11.306 94.4354 10.97C94.4354 10.6247 94.5334 10.368 94.7294 10.2C94.9254 10.0227 95.224 9.934 95.6254 9.934C96.0267 9.934 96.3254 10.0227 96.5214 10.2C96.7174 10.368 96.8154 10.6247 96.8154 10.97C96.8154 11.306 96.7174 11.5627 96.5214 11.74C96.3254 11.908 96.0267 11.992 95.6254 11.992ZM96.5774 13V20H94.6594V13H96.5774ZM98.6105 20V13H100.277L100.403 14.372C100.589 13.8867 100.86 13.5133 101.215 13.252C101.579 12.9907 102.031 12.86 102.573 12.86C102.731 12.86 102.876 12.874 103.007 12.902C103.137 12.93 103.245 12.9673 103.329 13.014L103.105 14.624C103.011 14.5867 102.895 14.5587 102.755 14.54C102.624 14.5213 102.451 14.512 102.237 14.512C101.957 14.512 101.686 14.582 101.425 14.722C101.163 14.8527 100.949 15.058 100.781 15.338C100.613 15.6087 100.529 15.954 100.529 16.374V20H98.6105ZM108.384 15.534C108.384 15.1327 108.267 14.82 108.034 14.596C107.81 14.372 107.511 14.26 107.138 14.26C106.792 14.26 106.489 14.3487 106.228 14.526C105.966 14.7033 105.775 14.9973 105.654 15.408L104.016 14.904C104.174 14.288 104.52 13.7933 105.052 13.42C105.593 13.0467 106.316 12.86 107.222 12.86C107.838 12.86 108.374 12.958 108.832 13.154C109.289 13.3407 109.644 13.6253 109.896 14.008C110.157 14.3907 110.288 14.8713 110.288 15.45V18.292C110.288 18.6467 110.456 18.824 110.792 18.824C110.95 18.824 111.1 18.8007 111.24 18.754L111.128 19.944C110.885 20.0653 110.582 20.126 110.218 20.126C109.891 20.126 109.597 20.07 109.336 19.958C109.074 19.846 108.869 19.678 108.72 19.454C108.57 19.2207 108.496 18.9313 108.496 18.586V18.53L108.832 18.474C108.776 18.8287 108.622 19.132 108.37 19.384C108.118 19.6267 107.81 19.8133 107.446 19.944C107.091 20.0747 106.722 20.14 106.34 20.14C105.864 20.14 105.453 20.07 105.108 19.93C104.762 19.7807 104.496 19.566 104.31 19.286C104.123 19.006 104.03 18.6607 104.03 18.25C104.03 17.7273 104.198 17.3027 104.534 16.976C104.87 16.64 105.35 16.4113 105.976 16.29L108.608 15.758L108.594 16.948L106.914 17.284C106.596 17.3493 106.354 17.438 106.186 17.55C106.027 17.6527 105.948 17.8253 105.948 18.068C105.948 18.3013 106.032 18.4787 106.2 18.6C106.377 18.7213 106.587 18.782 106.83 18.782C107.026 18.782 107.217 18.7587 107.404 18.712C107.59 18.6653 107.758 18.5907 107.908 18.488C108.057 18.3853 108.174 18.2453 108.258 18.068C108.342 17.8907 108.384 17.676 108.384 17.424V15.534ZM115.233 20.14C114.523 20.14 113.875 20.014 113.287 19.762C112.708 19.51 112.237 19.1553 111.873 18.698L112.979 17.578C113.203 17.914 113.501 18.1893 113.875 18.404C114.248 18.6187 114.691 18.726 115.205 18.726C115.569 18.726 115.858 18.6747 116.073 18.572C116.297 18.46 116.409 18.2873 116.409 18.054C116.409 17.9047 116.357 17.7787 116.255 17.676C116.152 17.564 115.947 17.4753 115.639 17.41L114.407 17.158C113.595 16.99 113.016 16.738 112.671 16.402C112.335 16.0567 112.167 15.6133 112.167 15.072C112.167 14.6893 112.279 14.33 112.503 13.994C112.736 13.658 113.081 13.3873 113.539 13.182C113.996 12.9673 114.565 12.86 115.247 12.86C115.947 12.86 116.553 12.972 117.067 13.196C117.589 13.4107 118 13.7327 118.299 14.162L117.151 15.282C116.945 14.9553 116.675 14.708 116.339 14.54C116.012 14.3627 115.667 14.274 115.303 14.274C115.041 14.274 114.817 14.302 114.631 14.358C114.444 14.414 114.304 14.4933 114.211 14.596C114.117 14.6893 114.071 14.8107 114.071 14.96C114.071 15.1093 114.136 15.24 114.267 15.352C114.397 15.4547 114.635 15.5433 114.981 15.618L116.409 15.912C117.099 16.052 117.594 16.29 117.893 16.626C118.191 16.9527 118.341 17.3493 118.341 17.816C118.341 18.264 118.219 18.6653 117.977 19.02C117.743 19.3653 117.393 19.6407 116.927 19.846C116.469 20.042 115.905 20.14 115.233 20.14ZM120.836 11.992C120.435 11.992 120.136 11.908 119.94 11.74C119.744 11.5627 119.646 11.306 119.646 10.97C119.646 10.6247 119.744 10.368 119.94 10.2C120.136 10.0227 120.435 9.934 120.836 9.934C121.238 9.934 121.536 10.0227 121.732 10.2C121.928 10.368 122.026 10.6247 122.026 10.97C122.026 11.306 121.928 11.5627 121.732 11.74C121.536 11.908 121.238 11.992 120.836 11.992ZM121.788 13V20H119.87V13H121.788Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                router.push({ pathname: "Login" });
              }}
            >
              <ButtonLogin />
            </button>
          </div>
        </div>
        <div className={`${dropDownPublikasi === false ? "hidden" : "visible"} z-20`}>
          <DropDownPublikasi />
        </div>

        <div style={{ backgroundImage: `url(${bgImage.src})` }} className="h-[350px] bg-no-repeat bg-cover">
          <Slideshow />
        </div>
        <div className="flex flex-col bg-[#ffece4] pb-[118px]">
          <div className="flex items-center justify-center gap-6 px-12 rounded-xl mx-auto mt-[55px] h-[137px] bg-[#FF5001]">
            <img className="object-cover  h-[92px]  rounded-2xl" src="https://i.ibb.co/tpcPypN/Frame-2512.jpg" alt="gunakan-hak-pilih" />
            <p>
              <span className="font-bold text-white text-[26px]">Ayo Gunakan Hak Pilih Anda</span>
              <br />
              <span className="text-white text-[18px]">Consequat quis semper enim enim massa augue.</span>
            </p>
            <CountDown />
          </div>
          <div className="flex px-[160px] gap-24 mt-[55px]">
            <Publikasi />
            <div className="flex flex-col gap-2 font-bold text-slate-700 text-[26px] pt-[40px] object-contain">
              <p className="mb-2">Kabar Terbaru</p>
              <KabarTerbaru />
              <KabarTerbaru />
              <KabarTerbaru />
              <KabarTerbaru />
            </div>
          </div>
        </div>
        <div className="flex pl-[680px] pb-[62px] gap-8 items-end h-[408px]  bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bgImage2.src})` }}>
          <div
            onClick={() => {
              router.push({
                pathname: "Daftar",
                query: { type: "simpatisan" },
              });
            }}
            className="cursor-pointer"
          >
            <DaftarSimpatisanButton />
          </div>
          <div
            onClick={() => {
              router.push({
                pathname: "Daftar",
                query: { type: "relawan" },
              });
            }}
            className="cursor-pointer"
          >
            <DaftarRelawanButton />
          </div>
        </div>
        <div className="flex pt-[103px] pl-[70px] pr-[70px]">
          <div>
            <p className="text-[26px] text-slate-700 font-bold pb-[40px]">Kabar SJP Berkhidmat</p>
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
          </div>
          <div className="pl-[150px]">
            <p className="text-[26px] text-slate-700 font-bold pb-[40px]">Kategori Kabar</p>
            <KategoriKabar />
            <img className="mt-[47px] w-[350px] h-[300px] rounded-xl" src={imageKosong.src} alt="gambar  " />
          </div>
        </div>
        <div className="bg-[#4B5563] h-[1372px]">
          <p className="text-[39px] font-bold text-white pt-[67px] pl-[70px]">Program</p>
        </div>
        <div className="flex h-[248px] bg-[#FF5001] pt-[65px]">
          <p className="text-white text-[26px] font-bold pl-[180px]">Sampaikan Aspirasi Anda Consectetur ut duis vitae diam tincidunt diam quis nec commodo. Mattis elit rhoncus vel</p>
          <div className="pr-[144px]">
            <p className="text-[18px] text-white">Consectetur ut duis vitae diam tincidunt diam quis nec commodo. Mattis elit rhoncus vel parturient </p>
            <button className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">Sampaikan Aspirasi</button>
          </div>
        </div>
        <div style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.02)" }} className="flex h-[240px] justify-between pr-[120px]">
          <div className="flex flex-col justify-center pl-[70px]">
            <div className="flex justify-center w-[560px]">
              <Logo />
              <div className="pl-[32px] w-[580px]">
                <p className="text-[16px] text-[#4B5563] font-semibold">H. SURYADI JAYA PURNAMA, S.T.</p>

                <p className="text-[12px] text-[#FF5001]">DPR RI Dapil II Provinsi Nusa Tenggara Barat</p>
                <p className="text-[12px] text-[#4B5563]">
                  Bekerja bersama untuk membangun masa depan yang <br /> lebih baik bagi masyarakat dan generasi yang akan datang.
                </p>
              </div>
            </div>
            <div className="border  border-[#6B7280] mt-[52px]" />
            <span className="text-[12px] text-[#4B5563]">Copyright © 2022. Website Resmi SJP Berkhidmat dikelola oleh Tim Internal</span>
          </div>

          <div className="flex flex-col gap-1 text-[#4B5563] justify-center">
            <p className="">Pemilu 2024</p>
            <p className="">Publikasi</p>
            <p className="">Gallery</p>
            <p className="">Rumah Aspirasi</p>
            <p className="">Daftar Relawan</p>
            <p className="">Daftar Simpatisan</p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <p className="flex justify-center font-semibold text-[16px] text-[#4B5563]">Social Media</p>
            <div className="flex items-center gap-3">
              <button>
                <LinkedInIcon />
              </button>
              <a className="cursor-pointer" target="_blank" href="https://www.instagram.com/suryadi.sjp/?igshid=OGQ2MjdiOTE=">
                <InstagramIcon />
              </a>
              <a className="cursor-pointer" href="https://www.facebook.com/sjp.officialpage?mibextid=ZbWKwL" target="_blank">
                <FacebookIcon />
              </a>
              <a className="cursor-pointer" href="https://youtube.com/@suryadijayapurnama_sjp4774" target="_blank">
                <YouTubeIcon />
              </a>
              <a className="cursor-pointer" href="https://twitter.com/suryadi_sjpntb" target="_blank">
                <TwitterIcon />
              </a>
              <button>
                <TikTokIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HomePage);
