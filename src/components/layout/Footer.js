import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";

const iconsList = [InstagramIcon, FacebookIcon, LinkedInIcon, XIcon];

export default function Footer() {
  return (
    <footer className="bg-background">
      <section className="py-4 flex flex-col gap-2 border-b-1 border-primary">
        <h1 className="text-2xl font-semibold text-center text-primary">
          E-shop App
        </h1>
        <p className="text-center text-text">
          Your one-stop shop for all your needs
        </p>
      </section>

      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-primary text-2xl text-center font-semibold line-clamp-1">
                About Us
              </h3>
              <ul className="text-center flex flex-col gap-2">
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  About EShop
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Careers
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Press
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Blog
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-primary text-2xl text-center font-semibold line-clamp-1">
                Customer Service
              </h3>
              <ul className="text-center flex flex-col gap-2">
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Contact Us
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Shipping Info
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Returns
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  FAQ
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-primary text-2xl text-center font-semibold line-clamp-1">
                Legal
              </h3>
              <ul className="text-center flex flex-col gap-2">
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Privacy Policy
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Terms of Service
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Cookie Policy
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Accessibility
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-primary text-2xl text-center font-semibold line-clamp-1">
                Quick Links
              </h3>
              <ul className="text-center flex flex-col gap-2">
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  My Account
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Wishlist
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Track Order
                </li>
                <li className="bg-background-secondary p-2 rounded-md text-text cursor-pointer hover:text-primary hover:bg">
                  Gift Cards
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 flex flex-col gap-2 bg-background-secondary">
        <h1 className="font-semibold text-center text-primary text-2xl">
          Follow Us
        </h1>
        <div className="flex justify-center gap-2">
          {iconsList.map((item, i) => {
            const Icon = item;
            return (
              <button
                className="p-2.5 bg-background border text-primary border-primary rounded-lg cursor-pointer font-medium hover-scale"
                key={i}
              >
                <Icon />
              </button>
            );
          })}
        </div>
      </section>

      <section className="py-4 flex flex-col gap-2 bg-background-tertiary">
        <p className="text-center text-text">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-primary font-semibold">E-Shop</span>. All rights
          reserved.
        </p>
      </section>
    </footer>
  );
}
