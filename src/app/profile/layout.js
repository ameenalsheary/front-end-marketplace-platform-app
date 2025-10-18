import Link from "next/link";

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
  { icon: ShoppingCartIcon, name: "Shopping Cart", href: "/cart" },
];

export default function ProfileLayout({ children }) {
  return (
    <div className="bg-background-secondary">
      <div className="container">
        <div className="py-4 h-screen-minus-header grid grid-cols-[auto_1fr] gap-2">
          <div className="">
            <ul className="bg-background-secondary flex flex-col gap-0.5 rounded-md shadow-sm overflow-hidden">
              {listButtons.map(({ icon: Icon, name, href }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="bg-background p-4 flex items-center gap-2 cursor-pointer hover:bg-background-tertiary transition-all"
                  >
                    <Icon className="text-primary" />
                    <span className="text-text hidden lg:flex pr-20">
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
