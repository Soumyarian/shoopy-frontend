import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAddress, addOrder } from "../../store/actions/index";
import "./Checkout.scss";
import Layout from "../../components/Layout/Layout";

import AddAddress from './AddAddress';
import ShowAddress from "./ShowAddress";
import { staggerChild } from "../../helpers/animation";


let addressTobeEdited;
const Checkout = () => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const history = useHistory();

  const checkoutHeaderRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    if (!(Object.keys(cart?.cartItems).length > 0)) {
      history.goBack();
    }
    dispatch(getAddress());
    staggerChild(checkoutHeaderRef.current.children, false);
  }, []);

  useEffect(() => {
    if (user.address.address) {
      const updatedUser = user.address.address.map((user) => {
        return {
          ...user,
          selected: false,
          edit: false,
        };
      });
      setAddress(updatedUser);
    }
  }, [user.address]);

  const onConfirmOrderHandler = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, quantity } = cart.cartItems[key];
        return totalPrice + price * quantity;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].quantity,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };
    dispatch(addOrder(payload));
  };


  const updateSelectedAddress = (add) => {
    const updatedAddress = address.map((addr) => {
      if (addr._id === add._id) {
        addr.selected = true;
      } else {
        addr.selected = false;
      }
      return addr;
    });
    setAddress(updatedAddress);
  };

  const editAddress = (add) => {
    addressTobeEdited = address.filter(add => add.selected === true)
    setShow(true);
  }

  return (
    <Layout>
      <div className="checkout">
        <div className="c__lines">
          <div className="c__lines__line"></div>
          <div className="c__lines__line"></div>
        </div>
        <div className="chcekout__container">

          <div className="container">
            <h1 ref={checkoutHeaderRef}>
              <span>C</span>
              <span>H</span>
              <span>E</span>
              <span>C</span>
              <span>K</span>
              <span>O</span>
              <span>U</span>
              <span>T</span>
            </h1>
          </div>
          <div className="checkout__steps__container">
            <div className="container">
              <div className="checkout__steps">
                <div className="checkout__step__login">
                  <h1>Step 1: {auth.token ? "Welcome" : "Login"}</h1>
                  <h3>
                    {auth.token ? (
                      <>
                        <span>{auth.user.firstName}</span>
                        <span>{auth.user.email}</span>
                      </>
                    ) : (
                      <>
                        <span>Login to continue further.</span>
                        <Link to="/login">
                          <button>Login</button>
                        </Link>
                      </>
                    )}
                  </h3>
                </div>
                <div className="checkout__step__address">
                  <h1>Step 2: Select Address</h1>
                  {show && <AddAddress
                    show={show}
                    initialData={addressTobeEdited ? addressTobeEdited[0] : null}
                    handleClose={handleClose}
                  />}
                  <div className="address__container">
                    <button onClick={() => setShow(true)}>
                      Add New Address +
                    </button>
                    {!selectedAddress ? address &&
                      address.map((add, idx) => {
                        return (
                          <ShowAddress
                            add={add}
                            key={idx}
                            confirmDelivaryAddress={setSelectedAddress}
                            updateAddress={updateSelectedAddress}
                            editAddress={editAddress}
                            selectedAddress={selectedAddress ? true : false}
                          />
                        );
                      }) :
                      <ShowAddress add={selectedAddress} selectedAddress={selectedAddress ? true : false}
                        setSelectedAddress={setSelectedAddress}
                      />
                    }
                  </div>
                </div>
                <div className="checkout__step__orderSummery">
                  <h1>Step 3: Your Order</h1>
                  <div className="orderSummery__container">
                    <h2>Name</h2>
                    <h2>Quantity</h2>
                    <h2>Price</h2>
                    {cart.cartItems &&
                      Object.keys(cart.cartItems).map((key, idx) => {
                        return (
                          <React.Fragment key={idx}>
                            <h5>{cart.cartItems[key].name}</h5>
                            <h5>{cart.cartItems[key].quantity}</h5>
                            <h5>{cart.cartItems[key].price}</h5>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <div className="orderSummery__total">
                    <h3>TOTAL</h3>
                    <h3>
                      {Object.keys(cart.cartItems).reduce((qty, cur) => {
                        return qty + cart.cartItems[cur].quantity;
                      }, 0)}
                    </h3>
                    <h3>
                      {Object.keys(cart.cartItems).reduce((totalPrice, cur) => {
                        const { price, quantity } = cart.cartItems[cur];
                        return totalPrice + price * quantity;
                      }, 0)}
                    </h3>
                  </div>
                </div>
                <div className="checkout__step__payment">
                  <h1>Step 4: Payment</h1>
                  <div className="checkout__payment__container">
                    <div>
                      <input type="radio" name="payment" />
                      Cash on delivery
                    </div>
                    {
                      auth.authenticated && (Object.keys(cart?.cartItems).length > 0) && selectedAddress && (
                        <Link to="/thankyou">
                          <button onClick={onConfirmOrderHandler}>Order now</button>
                        </Link>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
