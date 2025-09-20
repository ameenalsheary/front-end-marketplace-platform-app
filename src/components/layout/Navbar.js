"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

import SearchIcon from "@mui/icons-material/Search";
import SegmentIcon from "@mui/icons-material/Segment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContrastIcon from "@mui/icons-material/Contrast";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import FavoriteIcon from "@mui/icons-material/Favorite";

const auth = true;

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <nav className="shadow-md bg-background sticky top-0 z-2">
        <div className="container bg-background">
          <div className="flex items-center gap-2 py-4">
            <div className="flex-none flex items-center gap-2 cursor-pointer">
              <Image
                src={require("../.././../public/images/logo192.png")}
                width={192}
                height={192}
                className="h-12 w-12"
                alt="logo"
              />
              <h1 className="text-3xl font-bold text-primary hidden md:block">
                E-shop
              </h1>
            </div>
            <div className="flex-grow flex rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                className="outline-0 min-w-0 text-text flex-grow bg-background-secondary h-12 rounded-md px-3"
              />
              <button className="flex-none bg-primary text-[#e5e5e5] px-4 h-12 cursor-pointer font-medium hover-scale">
                <SearchIcon />
              </button>
            </div>
            {!auth ? (
              <>
                <button
                  className="flex-none btn-t-primary hover-scale md:hidden"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <SegmentIcon />
                </button>
                <div className="flex-none gap-2 hidden md:flex">
                  <button className="btn-t-secondary hover-scale">
                    Log in
                  </button>
                  <button className="btn-t-primary hover-scale">Sign up</button>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <button className="flex-none btn-t-secondary hover-scale">
                    <ShoppingCartIcon />
                  </button>
                  <button className="flex-none btn-t-secondary hover-scale">
                    <FavoriteIcon />
                  </button>
                </div>
                <button
                  className="flex-none btn-t-primary hover-scale"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <SegmentIcon />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <div
        className={clsx(
          "bg-[#0000009f] fixed z-10 left-0 w-full h-[calc(100vh-80px)]",
          {
            "top-[80px] opacity-100": openMenu === true,
            "top-[-100%] opacity-0": openMenu === false,
          }
        )}
        onClick={() => setOpenMenu(false)}
      >
        {!auth ? (
          <div className="container md:hidden">
            <ul
              className="mt-1.5 rounded-md overflow-hidden w-64 ml-auto shadow-md bg-background flex flex-col gap-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <LoginIcon className="text-primary" />
                <span className="text-text">LOg in</span>
              </li>
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <LoginIcon className="text-primary" />
                <span className="text-text">sign up</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="container">
            <ul
              className="mt-1.5 rounded-md overflow-hidden w-64 ml-auto shadow-md bg-background flex flex-col gap-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <AccountBoxIcon className="text-primary" />
                <span className="text-text">Profile</span>
              </li>
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all md:hidden">
                <FavoriteIcon className="text-primary" />
                <span className="text-text">Favorites</span>
              </li>
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all md:hidden">
                <ShoppingCartIcon className="text-primary" />
                <span className="text-text">Shopping cart</span>
              </li>
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <ShoppingBagIcon className="text-primary" />
                <span className="text-text">Orders</span>
              </li>
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <ContrastIcon className="text-primary" />
                <span className="text-text">Thems</span>
              </li>
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all text-red-500">
                <LockIcon />
                <span className="font-medium">Log out</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
