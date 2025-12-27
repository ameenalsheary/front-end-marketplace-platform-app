"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, Suspense } from "react";
import clsx from "clsx";
import { Formik, Form } from "formik";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
    const params = new URLSearchParams();

    if (value) {
      params.set("page", "1");
      params.set("query", value);
      router.push(`/search?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <form
      className="grow flex rounded-full overflow-hidden"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        className="outline-0 min-w-0 text-text grow bg-background-secondary rounded-md px-3"
        defaultValue={searchParams.get("query") || ""}
      />
      <button
        type="submit"
        className="flex-none bg-primary text-[#e5e5e5] p-3 cursor-pointer font-medium hover-scale"
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
          <div className="flex items-center gap-2 py-3">
            <Link href={"/"}>
              <div className="flex-none flex items-center gap-2 cursor-pointer">
                <CustomImage
                  src={"/logos/logo192.png"}
                  width={192}
                  height={192}
                  priority
                  alt="logo"
                  className="size-12 min-w-12"
                />
                <h1 className="text-3xl font-bold text-primary hidden md:block">
                  E-shop
                </h1>
              </div>
            </Link>

            {/* 
              Next.js requires wrapping components that use `useSearchParams()` in <Suspense>.
              This is because `useSearchParams()` depends on the browser environment and 
              cannot be executed during server-side rendering. 
              <Suspense> delays rendering until the client is ready, preventing build errors.
            */}
            <Suspense fallback={<div className="grow" />}>
              <SearchBar />
            </Suspense>

            {status === "idle" || status === "loading" ? (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <button className=" p-3 rounded-lg skeleton">Ld</button>
                  <button className=" p-3 rounded-lg skeleton">Ld</button>
                </div>
                <button className=" p-3 ounded-full skeleton">Ld</button>
              </>
            ) : (
              <>
                {!isAuthenticated ? (
                  <>
                    <button
                      className="bg-primary text-[#e5e5e5] p-3 rounded-lg cursor-pointer font-medium text-base hover-scale md:hidden"
                      onClick={() => openAuth()}
                    >
                      <ExitToAppIcon />
                    </button>

                    <button
                      className="bg-primary text-[#e5e5e5] p-3 rounded-lg cursor-pointer font-medium text-base hover-scale hidden md:block"
                      onClick={() => openAuth()}
                    >
                      Sign in <ExitToAppIcon />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 min-w-12">
                    <div className="hidden md:flex items-center gap-2">
                      <Link
                        href={"/shopping-cart"}
                        onClick={() => setOpenMenu(false)}
                      >
                        <button className="bg-background border text-primary border-primary p-3 rounded-lg cursor-pointer font-medium text-base hover-scale">
                          <ShoppingCartIcon />
                        </button>
                      </Link>
                      <Link
                        href={"/profile/favorites"}
                        onClick={() => setOpenMenu(false)}
                      >
                        <button className="bg-background border text-primary border-primary p-3 rounded-lg cursor-pointer font-medium text-base hover-scale">
                          <FavoriteIcon />
                        </button>
                      </Link>
                    </div>

                    <button
                      className="bg-background-secondary rounded-full cursor-pointer overflow-hidden hover-scale"
                      onClick={() => setOpenMenu(!openMenu)}
                    >
                      <CustomImage
                        src={user.profileImage}
                        fallback="/images/profile-image-placeholder.png"
                        width={400}
                        height={400}
                        alt="Profile image"
                        priority
                        className="size-12"
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      <div
        className={clsx(
          "bg-overlay fixed z-2 left-0 w-full h-screen-minus-header transition-all",
          openMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpenMenu(false)}
      >
        <div className="container">
          <ul
            className="mt-1.5 rounded-md overflow-hidden w-64 ml-auto shadow-md bg-background flex flex-col gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href={"/profile"} onClick={() => setOpenMenu(false)}>
              <li className="bg-background-secondary py-3 px-1 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <AccountBoxIcon className="text-primary" />
                <span className="text-text">Profile</span>
              </li>
            </Link>
            <Link
              href={"/profile/favorites"}
              onClick={() => setOpenMenu(false)}
              className="md:hidden"
            >
              <li className="bg-background-secondary py-3 px-1 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <FavoriteIcon className="text-primary" />
                <span className="text-text">Favorites</span>
              </li>
            </Link>
            <Link
              href={"/shopping-cart"}
              onClick={() => setOpenMenu(false)}
              className="md:hidden"
            >
              <li className="bg-background-secondary py-3 px-1 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <ShoppingCartIcon className="text-primary" />
                <span className="text-text">Shopping cart</span>
              </li>
            </Link>
            <Link href={"/profile/orders"} onClick={() => setOpenMenu(false)}>
              <li className="bg-background-secondary py-3 px-1 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all">
                <ShoppingBagIcon className="text-primary" />
                <span className="text-text">Orders</span>
              </li>
            </Link>

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
                      <div className="bg-background-secondary py-3 px-1">
                        <span className="skeleton">Loading...</span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="bg-background-secondary w-full py-3 px-1 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all text-error"
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
