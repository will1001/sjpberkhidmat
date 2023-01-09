import React from "react";

const NewButton = ({ style, title, action, icon }) => {
  return (
    <button className="flex items-center justify-center gap-2" onClick={action} style={style}>
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
