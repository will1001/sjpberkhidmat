import React from "react";
import hide from "../utility/icon/hide_password.png";
import show from "../utility/icon/show_password.png";

function FormInputPassword({
  label,
  type,
  onChange,
  onClickHide,
  onclickShow,
}) {
  return (
    <div className="flex justify-start items-center my-3">
      <label className="text-[14px] w-[20%] text-[#374151] mr-[50px]">
        {label}
      </label>
      <input
        onChange={onChange}
        className="h-[40px] w-[70%] border text-[#374151] px-2 outline-0"
        type={type}
      />
      {type === "password" ? (
        <img
          className="cursor-pointer"
          onClick={onclickShow}
          src={hide.src}
          alt="hide.png"
        />
      ) : (
        <img
          onClick={onClickHide}
          className="cursor-pointer"
          src={show.src}
          alt="show.png"
        />
      )}
    </div>
  );
}

export default FormInputPassword;
