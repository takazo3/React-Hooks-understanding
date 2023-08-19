import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const myInfo = {
  name: "Takazo",
  age: "??",
};

const MyInfoContext = createContext(myInfo);

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyInfoContext.Provider value={myInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MyInfoContext.Provider>
);

export default MyInfoContext;
