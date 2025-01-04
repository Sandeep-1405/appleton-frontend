import React, { useContext, useEffect, useState } from 'react';
import Carousel from './Carousel';
import Navbarr from './Navbar';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import HOC from './HOC';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [productsList, setProductsList] = useState([]);
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  const { jwt } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await axios.get(`${url}/products`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setProductsList(result.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickProduct = (id) => {
    navigate(`product/${id}`);
  };

  return (
    <div>
      <Navbarr />
      <div className="container mt-4">
        <Carousel />
        <h2 className="text-center my-4">Our Products</h2>
        <div className="row d-flex justify-content-center">
          {productsList &&
            productsList.map((product) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                key={product._id}
                onClick={() => onClickProduct(product._id)}
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{product.name}</h5>
                    <p className="card-text text-muted ">${product.price}</p>
                    <div className="d-flex justify-content-around">
                      <p className="card-text text-muted mb-4">
                        Category: {product.category}
                      </p>
                      <p className="card-text text-muted mb-4">
                        Stock: {product.stock}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HOC(Home);
