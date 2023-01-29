import React from "react";

function RoundedBorderButton({ title, status }) {
  const activeStyle =
    "rounded-3xl p-3 border mr-3 font-bold border-orange-500 bg-orange-200 text-orange-500";
  const inactiveStyle = "rounded-3xl p-3 border mr-3 font-bold border-black";
  return (
    <div className={status === "active" ? activeStyle : inactiveStyle}>
      {title}
    </div>
  );
}

export default RoundedBorderButton;
