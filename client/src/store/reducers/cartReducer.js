export const cartInitialState = {
  items: [],
  isOpen: false,
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM":
      return {
        ...state,
        items: [...state.items, { record: action.payload, quantity: 1 }],
      };

    case "GET_CART_DATA":
      return {
        ...state,
        items: action.payload.items,
      };

    case "UPDATE_CART_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.record._id === action.payload._id ? action.payload : item
        ),
      };

    case "DELETE_CART_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.record._id !== action.payload),
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case "RESET_CART":
      return cartInitialState;

    default:
      return state;
  }
};
