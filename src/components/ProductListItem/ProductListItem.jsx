import { useState, useEffect } from "react";
import { getProduct } from "../../services/api";
import { useParams, Link } from "react-router";
// import "./ProductListItem.css";

export function ProductListItem() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getProduct(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Загрузка товара...</p>;
  }

  if (error) {
    return <p>Не удалось загрузить товар</p>;
  }

  if (!product) {
    return <p>Товар не найден</p>;
  }

  return;
}
