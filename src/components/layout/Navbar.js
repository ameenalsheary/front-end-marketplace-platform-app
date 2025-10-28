"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useState, useRef, Suspense } from "react";
import clsx from "clsx";
import { Formik, Form } from "formik";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContrastIcon from "@mui/icons-material/Contrast";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LockIcon from "@mui/icons-material/Lock";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import CustomImage from "../ui/CustomImage";
import { openAuthModal } from "@/redux/slices/authModalSlice";
import authService from "@/services/auth.service";

function SearchBar() {
  const inputRef = useRef();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    const value = inputRef.current.value.trim();
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");
    if (value) params.set("query", value);
    else params.delete("query");

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      className="flex-grow flex rounded-full overflow-hidden"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        className="outline-0 min-w-0 text-text flex-grow bg-background-secondary h-12 rounded-md px-3"
        defaultValue={searchParams.get("query") || ""}
      />
      <button
        type="submit"
        className="flex-none bg-primary text-[#e5e5e5] px-4 h-12 cursor-pointer font-medium hover-scale"
      >
        <SearchIcon />
      </button>
    </form>
  );
}

export default function NavBar() {
  const dispatch = useDispatch();
  const { status, isAuthenticated, user } = useSelector(
    (state) => state.authModal
  );

  const [openMenu, setOpenMenu] = useState(false);

  const openAuth = () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }
  };

  return (
    <>
      <nav className="shadow-md bg-background sticky top-0 z-2">
        <div className="container bg-background">
          <div className="flex items-center gap-2 py-4">
            <Link href={"/"}>
              <div className="flex-none flex items-center gap-2 cursor-pointer">
                <Image
                  src={"/logos/logo192.png"}
                  width={192}
                  height={192}
                  className="h-12 w-12"
                  alt="logo"
                />

                <h1 className="text-3xl font-bold text-primary hidden md:block">
                  E-shop
                </h1>
              </div>
            </Link>

            <Suspense>
              <SearchBar />
            </Suspense>

            {status === "idle" || status === "loading" ? (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <button className=" px-4 rounded-lg h-12 skeleton">Ld</button>
                  <button className=" px-4 rounded-lg h-12 skeleton">Ld</button>
                </div>
                <button className=" px-4 rounded-full h-12 skeleton">Ld</button>
              </>
            ) : (
              <>
                {!isAuthenticated ? (
                  <>
                    <button
                      className="bg-primary text-[#e5e5e5] px-4 rounded-lg h-12 cursor-pointer font-medium text-base hover-scale md:hidden"
                      onClick={() => openAuth()}
                    >
                      <ExitToAppIcon />
                    </button>

                    <button
                      className="bg-primary text-[#e5e5e5] px-4 rounded-lg h-12 cursor-pointer font-medium text-base hover-scale hidden md:block"
                      onClick={() => openAuth()}
                    >
                      Sign in <ExitToAppIcon />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="hidden md:flex items-center gap-2">
                      <Link
                        href={"/shopping-cart"}
                        onClick={() => setOpenMenu(false)}
                      >
                        <button className="bg-background border text-primary border-primary px-4 rounded-lg h-12 cursor-pointer font-medium text-base hover-scale">
                          <ShoppingCartIcon />
                        </button>
                      </Link>
                      <Link
                        href={"/profile/favorites"}
                        onClick={() => setOpenMenu(false)}
                      >
                        <button className="bg-background border text-primary border-primary px-4 rounded-lg h-12 cursor-pointer font-medium text-base hover-scale">
                          <FavoriteIcon />
                        </button>
                      </Link>
                    </div>

                    <button
                      className="size-12 bg-background-secondary rounded-full cursor-pointer overflow-hidden hover-scale"
                      onClick={() => setOpenMenu(!openMenu)}
                    >
                      <CustomImage
                        src={user.profileImage}
                        fallback="/images/profile-image-placeholder.png"
                        width={400}
                        height={400}
                        alt="Profile image"
                        priority
                        className="h-full w-full"
                      />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
      <div
        className={clsx(
          "bg-[#0000009f] fixed z-2 left-0 w-full h-screen-minus-header",
          {
            "top-[80px] opacity-100": openMenu === true,
            "top-[-100%] opacity-0": openMenu === false,
          }
        )}
        onClick={() => setOpenMenu(false)}
      >
        <div className="container">
          <ul
            className="mt-1.5 rounded-md overflow-hidden w-64 ml-auto shadow-md bg-background flex flex-col gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href={"/profile"} onClick={() => setOpenMenu(false)}>
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <AccountBoxIcon className="text-primary" />
                <span className="text-text">Profile</span>
              </li>
            </Link>
            <Link
              href={"/profile/favorites"}
              onClick={() => setOpenMenu(false)}
              className="md:hidden"
            >
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <FavoriteIcon className="text-primary" />
                <span className="text-text">Favorites</span>
              </li>
            </Link>
            <Link
              href={"/shopping-cart"}
              onClick={() => setOpenMenu(false)}
              className="md:hidden"
            >
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <ShoppingCartIcon className="text-primary" />
                <span className="text-text">Shopping cart</span>
              </li>
            </Link>
            <Link href={"/profile/orders"} onClick={() => setOpenMenu(false)}>
              <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <ShoppingBagIcon className="text-primary" />
                <span className="text-text">Orders</span>
              </li>
            </Link>

            <li className="bg-background-secondary py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
              <ContrastIcon className="text-primary" />
              <span className="text-text">Thems</span>
            </li>

            <li>
              <Formik
                initialValues={{}}
                onSubmit={async () => {
                  const res = await authService.logOut();
                  if (res.status === "Success") {
                    setOpenMenu(false);
                    window.location.reload();
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {isSubmitting ? (
                      <div className="bg-background-secondary py-4 px-2">
                        <span className="skeleton">Loading...</span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="bg-background-secondary w-full py-4 px-2 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all text-red-500"
                      >
                        <LockIcon />
                        <span className="font-medium">Log out</span>
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
