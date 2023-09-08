import React, { FC } from "react";

export const HeaderBar = ({}) => {
  return (
    <div className=" p-6 w-full justify-between flex flex-row fixed top-6 left-0">
      <div className="font-neueMontreal text-2xl leading-6">
        <div>Coder</div>
        <div>Craftsman</div>
        <div>Designer</div>
        <div>Architect</div>
      </div>
      <div className="group font-neueMontreal text-2xl leading-6 items-end flex flex-col transition">
        <div className="group-hover:opacity-30 hover:!opacity-100 hover:text-4xl ease-in-out duration-500 transition">
          Works
        </div>
        <div className="group-hover:opacity-30 hover:!opacity-100 transition ease-in-out duration-500 hover:text-4xl">
          Clients
        </div>
        <div className="group-hover:opacity-30 hover:!opacity-100 hover:text-4xl ease-in-out duration-500 transition">
          About
        </div>
        <div className="group-hover:opacity-30 hover:!opacity-100 hover:text-4xl ease-in-out duration-500 transition">
          Contact
        </div>
      </div>
    </div>
  );
};
