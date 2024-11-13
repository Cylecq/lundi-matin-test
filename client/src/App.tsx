import { Route, Routes } from "react-router-dom";
import Root from "./pages/root";
import Info from "./pages/info";
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
}

export default App;
