import {
  FaBook,
  FaCalendar,
  FaList,
  FaUsers,
  FaUtensils,
} from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { FaAd, FaHome, FaShoppingBag, FaShoppingCart } from "react-icons/fa";

import { MdContactMail, MdOutlineMenu } from "react-icons/md";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import useMenu from "../hooks/useMenu";

const Dashboard = () => {
  const [cart] = useCart();
  const [menu] = useMenu();

  // TODO: GET isAdmin Value From The Database
  const [isAdmin] = useAdmin();

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
          {isAdmin ? (
            <>
              <li>
                <Link to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/addItems">
                  <FaUtensils></FaUtensils>
                  Add Items
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manageItems">
                  <FaList></FaList>
                  Manage Items
                  <span className="text-black mr-1"> + {menu.length}</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/bookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard/userHome">
                  <FaHome></FaHome>
                  User Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/reservation">
                  <FaCalendar></FaCalendar>
                  Reservation
                </Link>
              </li>
              <li>
                <Link to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart ({cart.length})
                </Link>
              </li>
              <li>
                <Link to="/dashboard/review">
                  <FaAd></FaAd>
                  Add a Review
                </Link>
              </li>
              <li>
                <Link to="/dashboard/bookings">
                  <FaList></FaList>
                  My Bookings
                </Link>
              </li>
            </>
          )}
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
