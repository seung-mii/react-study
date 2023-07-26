import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  // React Redux에는 Provider 컴포넌트를 통해 앱의 다른 컴포넌트에서 Redux store를 사용할 수 있다.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);