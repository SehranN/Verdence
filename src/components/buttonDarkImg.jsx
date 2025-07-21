import React from 'react';


const ButtonDarkImg = ({ text = "Add Assets", icon = "/plus.png", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="min-w-[200px] flex items-center justify-center gap-2 rounded-full bg-card-gradient bg-[length:200%] bg-left hover:bg-right transition-[background-position] duration-500 px-6 py-2 font-inria text-xl text-darkGreen"
    >
      <img src={icon} alt="icon" className="w-5 h-5" />
      {text}
    </button>
  );
};

export default ButtonDarkImg;
