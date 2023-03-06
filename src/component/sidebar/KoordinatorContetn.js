import React from "react";
import { UserIcon } from "../../utility/icon/icon";
import SelectPeriode from "../SelectPeriode";

const KoordinatorContetn = ({ roles }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <UserIcon />
        <div className="flex flex-col pl-2 ">
          <p className="font-semibold text-slate-700">Username</p>
          <p className="text-xs text-slate-700 font-thin">Akun {roles} </p>
        </div>
      </div>
      <SelectPeriode />
    </div>
  );
};

export default KoordinatorContetn;
