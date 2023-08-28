import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRecordVinyl } from "react-icons/fa";
import Cookies from "js-cookie";

import { DataContext } from "../store/context";
import { logout } from "../apiCalls/usersApiCalls";
import CartIcon from "./cart/CartIcon";
import Form from "./SearchRecord";

const Nav = () => {
  const { usersState, dispatchUsers, dispatchCart, cartState } =
    useContext(DataContext);
  const { isUserLoggedIn } = usersState;

  const navigate = useNavigate();

  const location = useLocation();

  const UserLinks = () => {
    let firstLetter;

    if (Cookies.get("jwt")) {
      firstLetter = usersState.user.firstName[0].toUpperCase();
    }

    const handleLogout = async () => {
      try {
        await logout(dispatchUsers, dispatchCart);
        await dispatchCart({ type: "RESET_CART" });
        navigate("/");
      } catch (error) {
        console.error("An error occurred during logout: ", error);
      }
    };

    return (
      <>
        <Link className='button-bg' onClick={handleLogout}>
          <p>Logout</p>
        </Link>
        {Cookies.get("jwt") && (
          <Link to='/profile' className='nav-avatar'>
            {firstLetter}
          </Link>
        )}
      </>
    );
  };

  const GuestLinks = () => (
    <>
      <Link to='/login'>
        <p>Login</p>
      </Link>
      <Link to='/signup' className='button-bg'>
        <p>Register</p>
      </Link>
    </>
  );
  const containerWidth = cartState.isOpen ? `calc(100vw - 365px)` : "100%";
  return (
    <motion.nav
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul style={{ width: containerWidth, transition: "1s" }}>
        <Link to={isUserLoggedIn ? "/records" : "/"} className='logo'>
          <FaRecordVinyl />
          Vinyl Destination
        </Link>

        {location.pathname.startsWith("/records") ? (
          <Form />
        ) : (
          <Link to='/records' className='browse-button'>
            Explore Our Collection
          </Link>
        )}

        <div className='items'>
          {isUserLoggedIn ? <UserLinks /> : <GuestLinks />}
          <CartIcon />
        </div>
      </ul>
    </motion.nav>
  );
};

export default Nav;
