import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ProductList, ProductListItem } from "../components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<ProductList />} />
        <Route path={"/product/:id"} element={<ProductListItem />} />
      </Routes>
    </Router>
  );
}
