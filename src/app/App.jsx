import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ProductList, ProductPage } from "../components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<ProductList />} />
        <Route path={"/product/:id"} element={<ProductPage />} />
      </Routes>
    </Router>
  );
}
