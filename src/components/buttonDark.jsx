import React from 'react';


const ButtonDark = ({ text = "Add Assets", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="min-w-[200px] flex items-center justify-center gap-2 rounded-full bg-card-gradient bg-[length:200%] bg-left hover:bg-right transition-[background-position] duration-500 px-6 py-2 font-inria text-xl text-darkGreen"
    >
      
      {text}
    </button>
  );
};

export default ButtonDark;
