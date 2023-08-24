import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ContextProvider from "./store/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ContextProvider>
);
