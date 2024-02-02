import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaCartArrowDown } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      <li>
        <Link to="/secret">Secret</Link>
      </li>
      {!user ? (
        <li>
          <Link to="/login">Login</Link>
        </li>
      ) : (
        <li>
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-primary btn-sm text-red-800"
          >
            Logout
          </button>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar fixed z-10 bg-black bg-opacity-40 max-w-screen-xl mx-auto text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <span className="mx-2 text-md">{user?.displayName}</span>

        <Link to="/dashboard/cart">
          <button className="btn mx-2">
            <FaCartArrowDown />
            <div className="badge badge-secondary">
              +{cart.length ? cart.length : 0}
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
