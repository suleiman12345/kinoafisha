import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  const itemClass = (path) =>
    `relative transition-colors ${
      isActive(path) ? "text-gray-700" : "text-black hover:text-gray-700"
    }`;

  return (
    <div className="w-full h-12 flex flex-col items-center justify-center relative">
      <div className="max-w-[712px] px-6 flex items-center gap-6 relative z-10">
        <div className="relative">
          <Link to="/" className={itemClass("/")}>
            Киноафиша
          </Link>
        </div>
      </div>

      <span className="w-2/3 h-0.5 bg-black absolute bottom-0"></span>
    </div>
  );
};

export default Navbar;
