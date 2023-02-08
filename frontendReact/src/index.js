import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AllTodos from "./views/AllTodos";
import Register from "./views/Register";
import Login from "./views/Login";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";

import "./components/styles/main.css";
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/admin/allTodos"
        element={<AdminLayout element={<AllTodos />} />}
      />
      <Route path="/auth/login" element={<AuthLayout element={<Login />} />} />
      <Route
        path="/auth/register"
        element={<AuthLayout element={<Register />} />}
      />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
