import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Navbarr from "./Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { jwt } = useContext(AuthContext);
  const url = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${url}/products/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setProduct(response.data[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  if (!product) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <>
      <Navbarr />

      {/* Product Details */}
      <div className="container mt-5">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-5">
            <div
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                position: "sticky",
                top: "20px",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="img-fluid 75vh"
                style={{ height: "75vh", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <h2 className="mb-3">{product.name}</h2>
            <p className="text-muted" style={{ fontSize: "1rem" }}>
              {product.description}
            </p>
            <h4 className="text-success">
              ₹{product.price.toLocaleString()}{" "}
              <span
                className="text-muted"
                style={{
                  fontSize: "0.9rem",
                  textDecoration: "line-through",
                  marginLeft: "10px",
                }}
              >
                MRP ₹{(product.price * 1.5).toFixed(2)}
              </span>
            </h4>
            <p className="mt-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight}
            </p>
            <p>
              <strong>Warranty:</strong> {product.warranty}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock > 0 ? product.stock : "Out of Stock"}
            </p>
            <p>
              <strong>Manufacturer:</strong> {product.manufacturer}
            </p>

            {/* Quantity Selector */}
            <div className="d-flex justify-content-center align-items-center mt-4 m-auto">
              <strong>Quantity:</strong>
              <div className="d-flex ms-3 align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  style={{ marginRight: "5px" }}
                >
                  -
                </button>
                <span
                  style={{
                    padding: "5px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  {quantity}
                </span>
                <button
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={() =>
                    setQuantity((prev) => Math.min(prev + 1, product.stock))
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-4">
              
                <button
                  className="btn btn-warning btn-lg w-75"
                  onClick={() => handleAddToCart(product, quantity)}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
