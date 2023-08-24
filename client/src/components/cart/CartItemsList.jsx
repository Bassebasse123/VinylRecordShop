import React, { useContext } from "react";
import { DataContext } from "../../store/context";
import { MdDelete } from "react-icons/md";
import { deleteCartItem, getCartData } from "../../apiCalls/cartsApiCalls";

const CartItemsList = () => {
  const { cartState, dispatchCart, usersState } = useContext(DataContext);

  const deleteFromCartHandler = async (recordId) => {
    const cartID = usersState.user?.cartId;
    if (cartState && cartState.items) {
      await deleteCartItem(dispatchCart, recordId, cartID);
      await getCartData(dispatchCart, cartID);
    }
  };

  return (
    <ul className='cart-items-list'>
      {cartState.items.length > 0 &&
        cartState.items?.map(({ record, quantity }) => {
          const { _id, title, artist, img } = record;

          return (
            <li key={_id} className='cart-item'>
              <h3 className='cart-item__title'>
                {title} by {artist}
              </h3>

              <img src={img} alt='thumbnail' className='cart-item__thumbnail' />

              <div className='cart-item__actions'>
                <div className='cart-item__quantity'>{quantity}</div>

                <MdDelete
                  className='cart-item__remove'
                  onClick={() => deleteFromCartHandler(_id)}
                />
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CartItemsList;
