import successHandler from "../middlewares/successHandler.js";
import Cart from "../models/cartModel.js";

//! Get cart document
//* GET: http://localhost:8000/carts

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("items.record");
    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

/* 
*     POST: http://localhost:8000/carts
^     req.body : {record:"existing-record-id"}
*/
export const addCartItem = async (req, res, next) => {
  try {
    const { record, quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $push: { items: { record, quantity } } },
      { upsert: true, new: true }
    ).populate("items.record");

    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

/* 
! Delete one item from the items array in the cart document
* PUT: http://localhost:8000/carts/63eb90ca444724041af1803f
^ req.body : {record:"the-id-of-the-record-to-delete"}
*/

export const deleteCartItemById = async (req, res, next) => {
  try {
    const { record } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $pull: { items: { record } } },
      { new: true }
    ).populate("items.record");

    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

/* 
! Update one field (quantity) in the items array in the cart document
* PATCH: http://localhost:8000/carts/63eb90ca444724041af1803f
^ req.body : {
^             record:"the-id-of-the-record-to-delete",
^             "quantity": new-quantity-as-number
^             }
*/

export const updateItemFieldById = async (req, res, next) => {
  try {
    const { quantity, record } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { "items.$[item].quantity": quantity } },
      { arrayFilters: [{ "item.record": record }], new: true }
    );

    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

//! Delete the entire cart document
// * DELETE: http://localhost:8000/carts/
export const deleteCarts = async (req, res, next) => {
  try {
    const cart = await Cart.deleteMany();
    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

//! Delete all the items inside the array in the cart document
// * DELETE: http://localhost:8000/carts/63eb90ca444724041af1803f
export const deleteAllCartItems = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { items: [] } },
      { new: true }
    );
    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};
