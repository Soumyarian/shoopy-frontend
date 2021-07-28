import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Layout from '../../components/Layout/Layout';
import CartAndOrderCard from '../../components/CartAndOrderCard';

import { getOrders } from '../../store/actions';
import "./../Cart/Cart.scss";
import { staggerChild } from '../../helpers/animation';

const OrderPage = () => {
    const headerRef = useRef();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getOrders());
        staggerChild(headerRef.current.children, false);
    }, [])
    return (
        <Layout>
            <div className="cart__container">
                <div className="c__lines">
                    <div className="c__lines__line"></div>
                    <div className="c__lines__line"></div>
                </div>
                <div className="cart__header">
                    <h1 ref={headerRef}>
                        <span>m</span>
                        <span>y</span>
                        <span>-</span>
                        <span>O</span>
                        <span>r</span>
                        <span>d</span>
                        <span>e</span>
                        <span>r</span>
                        <span>s</span>
                    </h1>
                </div>
                <div className="container">
                    <div className="cart__content">
                        {
                            user?.orders?.map(order => {
                                return (
                                    <div className="order__container">
                                        {order?.items?.map((item, idx) => {
                                            return (
                                                <CartAndOrderCard
                                                    key={idx}
                                                    index={idx + 1}
                                                    orderPage
                                                    orderId={order._id}
                                                    price={item?.payablePrice}
                                                    qty={item?.purchasedQty}
                                                    title={item?.productId?.name}
                                                    paymentStatus={order?.paymentStatus}
                                                    imgName={item?.productId?.productPictures[0]?.img}
                                                />
                                            )
                                        })}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default OrderPage
