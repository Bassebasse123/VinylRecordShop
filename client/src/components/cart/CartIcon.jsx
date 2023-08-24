import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartContainer from "./CartContainer";
import { DataContext } from "../../store/context";

const CartIcon = () => {
  const { cartState, dispatchCart } = useContext(DataContext);

  const handleToggleCart = () => dispatchCart({ type: "TOGGLE_CART" });

  return (
    <div className='cart'>
      <button type='button' className='btn-cart' onClick={handleToggleCart}>
        <FaShoppingCart />
        <span className='items-amount'>
          {cartState.items ? cartState.items.length : 0}
        </span>
      </button>

      <CartContainer handleToggleCart={handleToggleCart} />
    </div>
  );
};

export default CartIcon;
