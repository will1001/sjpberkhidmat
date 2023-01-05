import React from "react";
import SideBar from "../src/component/sidebar/SideBar";
import AdminContent from "../src/component/sidebar/AdminContent";

function Admin() {
  return (
    <>
      <p>helloooooo</p>
      <div className="flex ">
        <div className="basis-3/12 h-full">
          <SideBar content={<AdminContent />} />
        </div>
        <div className="basis-9/12"></div>
      </div>
    </>
  );
}

export default Admin;
