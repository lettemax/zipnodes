import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastContainer, toast } from 'react-toastify';

//redux stuff
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store";
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}
//end redux
function Root() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);