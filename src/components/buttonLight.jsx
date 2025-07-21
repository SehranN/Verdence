import React from "react";

const ButtonLight = ({ text = "Login", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="min-w-[200px] flex items-center justify-center gap-2 rounded-full bg-white border border-darkGreen hover:bg-darkGreen hover:text-white duration-500 px-6 py-2 font-inria text-xl text-darkGreen"
    >
      {text}
    </button>
  );
};

export default ButtonLight;
