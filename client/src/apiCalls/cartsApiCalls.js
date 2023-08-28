import axios from "axios";

//! Add an item to the cart
export const addCartItem = async (dispatchCart, cartState, record, cartID) => {
  try {
    //! check for item existance in the state
    const itemToUpdate = cartState.items?.find(
      (item) => item.record._id === record._id
    );

    /* 
   ! If item is exist: 
      * create patch request to update the quantity of the item in DB and increase it by one
      * Update the state with the new changes 
      * return to exit the function
   */
    if (itemToUpdate) {
      const response = await axios.patch(`/carts/${cartID}`, {
        quantity: itemToUpdate.quantity + 1,
        record: record._id,
        cartID,
      });

      dispatchCart({ type: "UPDATE_CART_ITEM", payload: response.data.data });
      return;
    }

    //! Otherwise submit the new item to the DB
    const response = await axios.post(`/carts/${cartID}`, {
      record,
      quantity: 1,
    });

    dispatchCart({
      type: "ADD_CART_ITEM",
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//! Get all items from the cart
export const getCartData = async (dispatchCart, cartID) => {
  try {
    const response = await axios.get(`/carts/${cartID}`);
    if (response.data.data && response.data.data.items) {
      dispatchCart({ type: "GET_CART_DATA", payload: response.data.data });
    }
  } catch (error) {
    console.log(error);
  }
};

//! Delete an item from the cart by its ID
export const deleteCartItem = async (dispatchCart, recordId, cartID) => {
  try {
    await axios.put(`/carts/${cartID}`, {
      record: recordId,
      quantity: -1,
    });

    dispatchCart({ type: "DELETE_FROM_CART", payload: recordId });
  } catch (error) {
    console.log(error);
  }
};

//! clear all cart items function
