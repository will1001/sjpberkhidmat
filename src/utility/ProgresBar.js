import React from "react";

const ProgressBar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "#FFECE4",
    borderRadius: 0,
    margin: 0,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 0,
    textAlign: "right",
  };

  const progresstext = {
    padding: 10,
    color: "black",
    fontWeight: 700,
  };

  return (
    <div className="flex items-center justify-between">
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <span style={progresstext}></span>
        </div>
      </div>
      <p className="font-bold text-[26px] text-[#FF5001] ml-2">{`${progress}%`}</p>
    </div>
  );
};

export default ProgressBar;
