import React from "react";

type InfoBarProps = {
  heading: string;
  message: string;
};

const InfoBar: React.FC<InfoBarProps> = ({ heading, message }) => {
  return (
    <div className="p-1 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex">
      <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 mr-3  text-xs">
        {heading}
      </span>
      <span className=" mr-2 text-left flex-auto  text-xs">{message}</span>
    </div>
  );
};

export default InfoBar;
