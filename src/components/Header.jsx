import React, { useState } from "react";
import hamburgerMenu from "../assets/hamburgerMenu.svg";
import close from "../assets/close.svg";
import logo from "../assets/logo.png";
import mobLogo from "../assets/mobLogo.png";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="w-full h-[80px] bg-white border-b px-20 shadow-lg">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto h-full w-full flex justify-between items-center">
        <img
          src={logo}
          alt="Logo"
          className="hidden sm:inline lg:inline xl:inline h-8 cursor-pointer"
        />
        <img
          src={mobLogo}
          alt="Mobile Logo"
          className="sm:hidden lg:hidden xl:hidden h-8"
        />
        <div className="hidden md:flex items-center">
          <ul className="flex gap-4">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Team</li>
            <li className="cursor-pointer">Contact</li>
            <li className="cursor-pointer">Careers</li>
          </ul>
        </div>

        <div className="hidden md:flex">
          <button className=" border border-[#0C5BC6] text-blue-500 rounded-sm flex justify-bteween items-center bg-transperent px-6 gap-2 cursor-pointer">
            Sign In
          </button>
        </div>

        <div className="md:hidden" onClick={handleToggle}>
          <img
            alt="Menu"
            src={toggle ? close : hamburgerMenu}
            className="md:hidden"
          />
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <ul>
          <li className="p-4 hover:bg-gray-100 flex justify-center items-center cursor-pointer">
            Home
          </li>
          <li className="p-4 hover:bg-gray-100 flex justify-center items-center cursor-pointer">
            Team
          </li>
          <li className="p-4 hover:bg-gray-100 flex justify-center items-center cursor-pointer">
            Contact
          </li>
          <li className="p-4 hover:bg-gray-100 flex justify-center items-center cursor-pointer">
            Careers
          </li>

          <div className="flex flex-col my-4 gap-4">
            <button className="border border-[#0C5BC6] text-blue-500 rounded-sm flex justify-center items-center bg-transperent px-6 gap-2 py-4 cursor-pointer">
              Sign In
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
