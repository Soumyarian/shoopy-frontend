import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import HomePage from './containers/HomePage/HomePage';
import ProductList from './containers/ProductList';
import { isUserLogedIn, updateCart } from './store/actions/index';
import ProductDetails from './containers/ProductDetails/ProductDetails';
import Cart from './containers/Cart/Cart';
import Checkout from './containers/Checkout';
import OrderPage from './containers/OrdersPage';
import SignInPage from './containers/SignInPage';
import SignUpPage from './containers/SignUpPage';
import Category from './containers/Category';
import ThankYou from './containers/ThankYouPage';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLogedIn());
    }
  }, [auth.authenticated, dispatch])
  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticated, dispatch])
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, [])
  return (
    <div className="App">
      <ScrollToTop />
      <Switch>
        <Route path="/login" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/categories" component={Category}></Route>
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={OrderPage} />
        <Route path="/thankyou" component={ThankYou}></Route>
        <Route path="/:productSlug/:productId/p" component={ProductDetails} />
        <Route path="/:slug" component={ProductList} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
