import { useRouter } from "next/router";
import React, { useState } from "react";
import { UserIcon } from "../../utility/icon/icon";
import { logoSidebar } from "../../utility/icon/LogoSidebar";
import Dashboard from "../admin/Dashboard";
import SelectPeriode from "../SelectPeriode";

function AdminContent() {
  const [select, setSelect] = useState("Relawan");
  const router = useRouter();
  return (
    <>
      <div className="mt-2 mb-16 h-screen">
        <div className="flex items-center mb-4">
          <UserIcon />
          <div className="flex flex-col pl-2 ">
            <p className="font-semibold text-slate-700">Username</p>
            <p className="text-xs text-slate-700 font-thin">Akun Admin</p>
          </div>
        </div>
        <SelectPeriode />
        <hr />
        <div className="mt-4 ">
          {logoSidebar.map((res, i) => {
            if (res.name === undefined) {
              <div className="hidden"></div>;
            } else {
              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelect(res.name);
                    router.push({
                      pathname: "/Admin",
                      query: { component: res.name },
                    });
                  }}
                  className="flex gap-2 p-2 justify-start w-full text-[18px] font-medium items-center"
                  style={{
                    stroke: select === res.name ? "rgb(234, 88, 12)" : "rgb(51, 65, 85)",
                    backgroundColor: select === res.name ? "rgb(255, 247, 237)" : "white",
                    WebkitTextFillColor: select === res.name ? "rgb(234, 88, 12)" : "rgb(51, 65, 85)",
                  }}
                >
                  <span className="">{res.icon} </span> <span className="font-semibold">{res.name}</span>
                </button>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default AdminContent;
