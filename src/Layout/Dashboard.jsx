import { FaCalendar, FaCartPlus } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { GiVibratingShield } from "react-icons/gi";
import { TbBrandBooking } from "react-icons/tb";
import { MdContactMail, MdOutlineMenu } from "react-icons/md";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu menu_item p-4 w-80 min-h-full text-white  bg-indigo-600">
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard/userHome">
              {" "}
              <FaHome />
              User Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/reservation">
              {" "}
              <FaCalendar />
              Reservation
            </Link>
          </li>

          <li>
            <Link to="/dashboard/cart">
              {" "}
              <FaCartPlus /> My Cart{" "}
              <span className="text-black-800 font-bold">
                +{cart.length ? cart.length : 0}
              </span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/review">
              {" "}
              <GiVibratingShield />
              Add A Review
            </Link>
          </li>
          <li>
            <Link to="/dashboard/bookings">
              {" "}
              <TbBrandBooking />
              My Bookings
            </Link>
          </li>
          <div className="divider divider-primary"></div>
          <li>
            <Link to="/">
              {" "}
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu">
              {" "}
              <MdOutlineMenu />
              Menu
            </Link>
          </li>
          <li>
            <Link to="/order/salad">
              {" "}
              <FaShoppingBag />
              Shop
            </Link>
          </li>
          <li>
            <Link to="/">
              {" "}
              <MdContactMail />
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
