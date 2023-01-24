import React from "react";
const style = {
  padding: "9px 21px",
  gap: "8px",
  background: "#E44700",
  borderRadius: "4px",
  fontFamily: "Work Sans",
  fontWeight: 600,
  fontSize: "18px",
  textAlign: "center",
  color: "#FFFFFF",
};
const NewButton = ({ title, action, icon }) => {
  return (
    <button
      className="flex items-center justify-center gap-2"
      onClick={action}
      style={style}
    >
      {icon === undefined ? (
        title
      ) : (
        <>
          {title} <img src={icon.src} alt={`${title}`} />
        </>
      )}
    </button>
  );
};

export default NewButton;
