import { useState, useEffect } from "react";
import { getProducts } from "../../services/api";
import { Link } from "react-router";
import "./ProductList.css";

export function ProductList() {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="product-list">
      <ul className="product-list__items">
        {products.map((product) => (
          <li className="product-list__item" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                className="product-list__image"
                src={product.colors[0].images[0]}
                alt={product.name}
              />
            </Link>
            <h3 className="product-list__title">{product.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
