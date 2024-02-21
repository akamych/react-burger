import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";

import common from "./constants/bundles/common.json";
import orders from "./constants/bundles/orders.json";
import ingredients from "./constants/bundles/ingredients.json";
import signup from "./constants/bundles/signup.json";
import login from "./constants/bundles/login.json";
import password from "./constants/bundles/password.json";
import profile from "./constants/bundles/profile.json";
import store from "./services/Store";
import { Provider } from "react-redux";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";

const resources = {
  ru: {
    common,
    ingredients,
    orders,
    signup,
    login,
    password,
    profile,
  },
};

i18next
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
