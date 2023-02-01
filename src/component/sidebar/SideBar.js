import { useRouter } from "next/router";
import React from "react";
import { BackIcon } from "../../utility/icon/icon";
import Logo from "../../utility/Logo";
import Footer from "../Footer";
import MataramContent from "./MataramContent";

function SideBar({ content }) {
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.back()} className="flex justify-end cursor-pointer">
        <BackIcon />
      </div>
      <div className="flex flex-col justify-between px-8 mt-2 h-full border-r-2 ">
        <div>
          <Logo />
        </div>
        <div className="mb-auto">{content}</div>
        <div className="mt-24 bottom-0 -z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default SideBar;
