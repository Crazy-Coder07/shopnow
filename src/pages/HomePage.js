import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { useAuth } from "../context/Auth.js";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart.js";
import img1 from "../images/h1.jpeg";
import "../styles/Homepage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

  // get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.product]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      // eclient
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }, [checked, radio]);

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <ToastContainer />
      <img
        src={img1}
        alt="bannerimage"
        style={{ height: "320px", width: "100%" }}
      />
      <h3 className="text-center mt-2 text-success">  WELCOME TO SHOPNOW</h3>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center fw-bold">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <div className="d-flex align-items-start" key={c._id}>
                <Checkbox
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className="mb-1"
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4 fw-bold">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="mb-1">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn bg-primary text-white mt-2"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <div width="290px" height="260px">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top p-0"
                    alt={p.name}
                  />
                </div>
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title mb-1 ">{p.name}</h5>
                    <h5 className="card-title card-price mb-0">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text mb-1">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="card-name-price pb-0">
                    <button
                      className="btn btn-info ms-1 mb-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!filterApplied && products && products.length < total && (
            <div className="m-2 p-3">
              <button
                className="btn loadmore bg-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                style={{ height: "50px", width: "200px" }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            </div>
          )}
          <div>
            {
              filterApplied && products.length === 0 && (
                <h1 className="m-2 p-3 text-center">Result Not Found!!</h1>
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
