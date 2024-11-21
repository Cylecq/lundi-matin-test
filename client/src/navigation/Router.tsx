import { redirect, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Login from "../pages/login";
import Root from "../pages/root";
import Info from "../pages/info";
import { useEffect } from "react";

const Router = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route index element={<Root />} />
        <Route path="/info/:id" element={<Info />} />
      </Route>
    </Routes>
  );
};

export default Router;
