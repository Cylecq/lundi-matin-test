import { Route, Routes } from "react-router-dom";
import Root from "./pages/root";
import Info from "./pages/info";
import Edit from "./pages/edit";
import Layout from "./components/Layout";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
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
          path="/info"
          element={
            <ProtectedRoute>
              <Info />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
