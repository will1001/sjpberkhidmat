import React from "react";
import SideBar from "../src/component/sidebar/SideBar";
import AdminContent from "../src/component/sidebar/AdminContent";
import { withRouter } from "next/router";
import { logoSidebar } from "../src/utility/icon/LogoSidebar";

function Admin({ router }) {
  return (
    <>
      <div className="flex ">
        <div className="basis-3/12 h-full">
          <SideBar content={<AdminContent />} />
        </div>
        <div className="basis-9/12">
          {logoSidebar.map((res, i) => {
            if (router.query.component === res.path) {
              return <div key={i}>{res.component}</div>;
            }
          })}
        </div>
      </div>
    </>
  );
}
export default withRouter(Admin);
