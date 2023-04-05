import React from "react";

function SelectIconButton({ icon, title, checked, onClick }) {
  return (
    <div
      className={`border border-orange-400 rounded-xl py-3 cursor-pointer ${
        checked && "bg-orange-100"
      }`}
      onClick={onClick}
    >
      <div className="px-3">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="option"
            value="option1"
            checked={checked}
            className="form-radio h-6 w-6 text-orange-500 bg-gray-300 rounded-full  checked:text-orange-600 checked:bg-orange-500"
          />
        </label>
      </div>
      <img src={icon.src} className="px-[50px]" />
      <div className="flex justify-center text-center font-bold">
        <h5>{title}</h5>
      </div>
    </div>
  );
}

export default SelectIconButton;
