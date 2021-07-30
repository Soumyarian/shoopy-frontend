import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";

import { getProductPage } from '../../../store/actions';
import './ProductPage.scss';

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products);
    const { page } = product

    useEffect(() => {
        dispatch(getProductPage(props.params.cid, props.params.type))
    }, []);

    return (
        <div className="page">
            <div className="c__lines">
                <div className="c__lines__line"></div>
                <div className="c__lines__line"></div>
            </div>
            <div className="page__title">
                <h1>{page.title}</h1>
            </div>
            <div className="carousel__container">
                <Carousel
                    autoPlay
                    infiniteLoop
                    stopOnHover
                    showThumbs={false}
                    style={{ position: "relative" }}>
                    {page?.banners && page?.banners.map((banner, index) => (
                        <div key={index}>
                            <NavLink to={`/${page?.title}?cid=${page?.category}&type=`}>
                                <img className="d-block w-100" src={`${banner?.img.slice(8)}`} alt="img" />
                            </NavLink>
                        </div>
                    ))}

                </Carousel >
            </div>
            <div className="page__banner__container">
                {page.products && page.products.map((prod, index) => (
                    <NavLink key={index} to={`/${page.title}?cid=${page.category}&type=`}>
                        <img src={`${prod?.img.slice(8)}`} alt="img" />
                    </NavLink>
                ))}
            </div>

        </div>
    )
}

export default ProductPage
