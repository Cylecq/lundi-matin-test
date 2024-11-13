import { Route, Routes } from "react-router-dom";
import Root from "./pages/root";
import Info from "./pages/info";
import Edit from "./pages/edit";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Root />} />
        <Route path="/info" element={<Info />} />
        <Route path="/edit" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;
