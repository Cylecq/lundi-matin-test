import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Login from "../pages/login";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Root from "../pages/root";
import Info from "../pages/info";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          index
          element={
            <ProtectedRoute>
              <Root />
            </ProtectedRoute>
          }
        />
        <Route
          path="/info/:id"
          element={
            <ProtectedRoute>
              <Info />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
