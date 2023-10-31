import React from "react";

const NewButton = ({ style, title, action, icon }) => {
  return (
    <a
      target="_blank"
      href="https://file.sjpberkhidmat.id/export/export.xlsx"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2"
      style={style}
    >
      {icon === undefined ? (
        title
      ) : (
        <>
          {title} <img src={icon.src} alt={`${title}`} />
        </>
      )}
    </a>
  );
};

export default NewButton;
