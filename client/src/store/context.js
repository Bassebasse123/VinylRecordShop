import { createContext, useEffect, useReducer, useState } from "react";
import { recordsInitialState, recordsReducer } from "./reducers/recordsReducer";
import { cartInitialState, cartReducer } from "./reducers/cartReducer";
import { usersInitialState, usersReducer } from "./reducers/usersReducer";

import getAllRecords from "../apiCalls/recordsApiCalls";
import { getCartData } from "../apiCalls/cartsApiCalls";
import Cookies from "js-cookie";
import { getMyData } from "../apiCalls/usersApiCalls";
import { setAxiosDefaults } from "../utils/axiosConfig";

export const DataContext = createContext();

const ContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [recordsState, dispatchRecords] = useReducer(
    recordsReducer,
    recordsInitialState
  );

  const [cartState, dispatchCart] = useReducer(cartReducer, cartInitialState);

  const [usersState, dispatchUsers] = useReducer(
    usersReducer,
    usersInitialState
  );

  const { isUserLoggedIn, user } = usersState;

  useEffect(() => {
    setAxiosDefaults();
    getAllRecords(dispatchRecords);
  }, []);

  useEffect(() => {
    setAxiosDefaults();
    isUserLoggedIn && getCartData(dispatchCart, user.cartId);
  }, [isUserLoggedIn, dispatchCart, user.cartId]);

  useEffect(() => {
    Cookies.get("jwt") && getMyData(dispatchUsers);
  }, [dispatchUsers]);

  return (
    <DataContext.Provider
      value={{
        error,
        setError,
        loading,
        setLoading,
        recordsState,
        cartState,
        dispatchCart,
        usersState,
        dispatchUsers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
