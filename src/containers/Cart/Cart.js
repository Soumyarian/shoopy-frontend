import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./../../components/Layout/Layout";
import { addToCart, removeCartItem } from "./../../store/actions/index";
import CartAndOrderCard from "../../components/CartAndOrderCard";
import "./Cart.scss";

const Cart = (props) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const quantityHandler = (_id, name, img, price, payload) => {
    dispatch(addToCart({ _id, name, img, price, payload }));
  };
  const removeCartItemHandler = (productId) => {
    dispatch(removeCartItem({ productId }))
  }
  useEffect(() => {
    const length = Object.keys(cart.cartItems).length;
    if (length > 0) {
      setIsEmpty(false);
    }
  }, [cart.cartItems])
  return (
    <Layout>
      <div className="cart__container">
        <div className="c__lines">
          <div className="c__lines__line"></div>
          <div className="c__lines__line"></div>
        </div>
        <div className="cart__header">
          <h1>My Cart</h1>
        </div>
        <div style={{ paddingBottom: "10px" }} className="container">
          <div className="cart__content">
            {cart.cartItems &&
              Object.keys(cart.cartItems).map((key, idx) => {
                return (
                  <CartAndOrderCard
                    _id={key}
                    key={idx}
                    orderPage={props.orderPage}
                    imgName={cart.cartItems[key].img}
                    title={cart.cartItems[key].name}
                    price={cart.cartItems[key].price}
                    qty={cart.cartItems[key].quantity}
                    quantityHandler={quantityHandler}
                    removeHandler={removeCartItemHandler}
                  />
                );
              })}
          </div>
          <div className="cart__subtotal__container">
            <h3>Total</h3>
            <div className="cart__subtotal">
              <h3>
                Quantity-
                <span>
                  {Object.keys(cart.cartItems).reduce((qty, cur) => {
                    return qty + cart.cartItems[cur].quantity;
                  }, 0)}
                </span>
              </h3>
            </div>
            <div className="cart__subtotal">
              <h3>
                Price-
                <span>
                  {Object.keys(cart.cartItems).reduce((price, cur) => {
                    return price + cart.cartItems[cur].price * cart.cartItems[cur].quantity;
                  }, 0)}
                </span>
              </h3>
            </div>

            <Link to={isEmpty ? "#" : "/checkout"}>
              <button>
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
