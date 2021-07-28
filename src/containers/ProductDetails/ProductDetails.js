import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { addToCart, getProductById } from "../../store/actions";
import { MdThumbUp, MdStar } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import "./ProductDetails.scss";
import Carousel from './../../components/Carousel'

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProductById(props.match.params.productId));
  }, []);
  const addToCartHandler = () => {
    const prod = {
      _id: products.detailedProduct._id,
      name: products.detailedProduct.name,
      img: products.detailedProduct.productPictures[0].img,
      price: products.detailedProduct.price,
    };
    dispatch(addToCart(prod));
    props.history.push("/cart");
  };
  return (
    <Layout>
      <div className="product__details__container">
        <div className="c__lines">
          <div className="c__lines__line"></div>
          <div className="c__lines__line"></div>
        </div>
        <div className="product__details">
          <div className="banner__image_container">
            {/* {products.detailedProduct.productPictures && (
              <img
                src={`http://localhost:8000/public/${products.detailedProduct.productPictures[0].img}`}
                alt=""
              />
            )} */}
            {
              products?.detailedProduct?.productPictures &&
              <Carousel images={products.detailedProduct.productPictures} />
            }
          </div>

          <div className="product__banner">
            <div className="product__banner__headline">
              <span>
                4.5 <MdStar />
              </span>
              <span>1,972 Ratings & 235 Reviews</span>
              <span>
                Shoppy Assured <MdThumbUp />
              </span>
            </div>
            <div className="product__banner__content">
              <div className="product__banner__title">
                {products.detailedProduct && products.detailedProduct.name}
              </div>
              <p>
                {products.detailedProduct &&
                  products.detailedProduct.description}
              </p>
            </div>
            <div className="product__action__buttons">
              <div className="product__banner__price">
                <BiRupee />
                {products.detailedProduct && products.detailedProduct.price}
              </div>
              <button onClick={addToCartHandler}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
