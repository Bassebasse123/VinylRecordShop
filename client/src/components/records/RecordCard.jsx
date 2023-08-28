import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { DataContext } from "../../store/context";
import { motion } from "framer-motion";
import { addCartItem, getCartData } from "../../apiCalls/cartsApiCalls";
import { useNavigate } from "react-router-dom";

const RecordCard = ({ record, index }) => {
  const { cartState, dispatchCart, usersState } = useContext(DataContext);
  const navigate = useNavigate();

  const cartID = usersState.user?.cartId;
  const { title, img, price, artist, year } = record;

  const addToCartHandler = async (record) => {
    if (usersState.isUserLoggedIn) {
      await addCartItem(dispatchCart, cartState, record, cartID);
      await getCartData(dispatchCart, cartID);
    } else {
      navigate("/login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.05 }}
      className="record"
    >
      <div>
        <img className="record-img" src={img} alt="cartoon of record" />
      </div>

      <div className="record-info">
        <p>{title}</p>
        <p>
          {artist} - {year}
        </p>
      </div>

      <div className="record-footer">
        <p className="record-footer-price">{price} €</p>
        <div className="record-footer-icon">
          <FaShoppingCart onClick={() => addToCartHandler(record)} />
        </div>
      </div>
    </motion.div>
  );
};

export default RecordCard;
