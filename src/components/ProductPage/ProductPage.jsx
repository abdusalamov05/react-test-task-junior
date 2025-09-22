import { useState, useEffect } from "react";
import { getProduct, getSizes } from "../../services/api";
import { useParams } from "react-router";
import "./ProductPage.css";

export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  useEffect(() => {
    getProduct(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  useEffect(() => {
    getSizes().then((data) => {
      setSizes(data);
    });
  }, []);

  if (!product) return;

  const selectedColor = product.colors[selectedColorIndex];

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleColorChange = (index) => {
    setSelectedColorIndex(index);
    setSelectedImageIndex(0);
  };

  const isSizeAvailable = (sizeId) => {
    return selectedColor.sizes.includes(sizeId);
  };

  return (
    <div className="product-page">
      <div className="product-page__left-block">
        <ul className="product-page__thumbnails">
          {selectedColor.images.map((image, index) => (
            <li
              key={index}
              className={`product-page__thumbnail-item ${
                selectedImageIndex === index ? "selected" : ""
              }`}
              onClick={() => handleImageChange(index)}
            >
              <img
                className="product-page__thumbnail-image"
                src={image}
                alt=""
              />
            </li>
          ))}
        </ul>

        <img
          className="product-page__main-image"
          src={selectedColor.images[selectedImageIndex]}
          alt=""
        />
      </div>

      <div className="product-page__right-block">
        <h2 className="product-page__title">{product.name}</h2>

        <p className="product-page__descr">{selectedColor.description}</p>

        <h3 className="product-page__subtitle">Доступные цвета:</h3>

        <ul className="product-page__colors">
          {product.colors.map((color, index) => (
            <li
              key={color.id}
              className={`product-page__color-item ${
                selectedColorIndex === index ? "selected" : ""
              }`}
              onClick={() => handleColorChange(index)}
            >
              <button className="product-page__color-button">
                {color.name}
              </button>
            </li>
          ))}
        </ul>

        <h3 className="product-page__subtitle">Доступные размеры:</h3>

        <ul className="product-page__sizes">
          {sizes.map((size) => {
            const isAvailable = isSizeAvailable(size.id);
            return (
              <li key={size.id} className="product-page__size-item">
                <button
                  className="product-page__size-button"
                  disabled={!isAvailable}
                >{`${size.label} (${size.number})`}</button>
              </li>
            );
          })}
        </ul>

        <p className="product-page__price">Цена: {selectedColor.price}р.</p>
      </div>
    </div>
  );
}
