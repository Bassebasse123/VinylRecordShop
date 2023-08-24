import React, { useContext } from "react";
import { DataContext } from "../../store/context";
import CartItemsList from "./CartItemsList";
import { motion } from "framer-motion";

const CartContainer = () => {
  const { cartState, dispatchCart } = useContext(DataContext);

  const getTotalPrice = () =>
    cartState.items.reduce(
      (total, item) => total + item.record?.price * item.quantity,
      0
    );

  return (
    <motion.div
      initial={{ y: -1000, x: 100 }}
      animate={{ y: 0, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cartState.isOpen ? (
        <div
          className='cart-sidebar'
          style={{ height: "100vh", transition: "1s" }}
        >
          <button
            type='button'
            className='close-button'
            onClick={() => dispatchCart({ type: "TOGGLE_CART" })}
          >
            &times;
          </button>
          {cartState.items ? (
            <>
              <p className='cart-price'>Total: €{getTotalPrice().toFixed(2)}</p>
              <div className='cart-body'>
                <CartItemsList />
              </div>
            </>
          ) : (
            <>
              <p className='cart-price'>Total: €0</p>
              <div className='cart-body'>
                <p className='cart-empty'>The silence is deafening here!</p>
              </div>
            </>
          )}
        </div>
      ) : null}
    </motion.div>
  );
};

export default CartContainer;
