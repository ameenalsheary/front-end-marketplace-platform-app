"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const listButtons = [
  { icon: AccountBoxIcon, name: "Profile", href: "/profile" },
  { icon: ShoppingBagIcon, name: "Orders", href: "/profile/orders" },
  { icon: AddLocationIcon, name: "Addresses", href: "/profile/addresses" },
  { icon: FavoriteIcon, name: "Favorites", href: "/profile/favorites" },
  { icon: ShoppingCartIcon, name: "Shopping Cart", href: "/shopping-cart" },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <ul className="bg-background-secondary flex flex-col gap-0.5 rounded-md shadow-sm overflow-hidden">
      {listButtons.map(({ icon: Icon, name, href }, i) => {
        const isActive = pathname === href;
        return (
          <Link key={i} href={href}>
            <li
              className={`p-4 flex items-center gap-2 cursor-pointer transition-all ${
                isActive
                  ? "bg-background-tertiary"
                  : "bg-background hover:bg-background-tertiary"
              }`}
            >
              <Icon className="text-primary" />
              <span className="text-text hidden lg:flex pr-20">{name}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
