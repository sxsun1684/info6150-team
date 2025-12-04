import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // 一定要导入样式文件！

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

