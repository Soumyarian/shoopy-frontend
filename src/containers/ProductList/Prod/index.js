import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsBySlug } from "../../../store/actions";
import { BiRupee, BiStar } from "react-icons/bi";
import { staggerChild } from "./../../../helpers/animation";
import { Link } from "react-router-dom";
import "./ProductList.scss";
const Prod = (props) => {
  const headerRef = useRef();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  useEffect(() => {
    staggerChild(headerRef.current.children, false);
    dispatch(getAllProductsBySlug(props.match.params.slug));
  }, []);
  return (
    <>
      <div className="product__list_page__container">
        <div className="c__lines">
          <div className="c__lines__line"></div>
          <div className="c__lines__line"></div>
        </div>
        <div className="product__list__header">
          <div className="container">
            <h1 ref={headerRef}>
              <span>P</span>
              <span>R</span>
              <span>O</span>
              <span>D</span>
              <span>U</span>
              <span>C</span>
              <span>T</span>
              <span>S</span>
            </h1>
          </div>
        </div>
        <div className="container product__list__container">
          {allProducts?.products?.map((prod, idx) => {
            return (
              <Link key={idx} to={`/${prod.slug}/${prod._id}/p`}>
                <div className="cart__item__container">
                  <table>
                    <tbody>
                      <tr>
                        <td className="cart__item__partOne">
                          <div className="cart__item__image">
                            <img
                              src={`http://localhost:8000/public/${prod.productPictures[0].img}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="cart__item__partTwo flex__container">
                          <div className="flex__container">
                            <div className="cart__item__name">
                              <div>
                                <h2>{prod.name}</h2>
                                <p>
                                  {prod.description}
                                </p>
                              </div>
                              <div className="flex__container">
                                <div className="product__rating">
                                  <span>4</span>
                                  <BiStar />
                                </div>
                                <div className="cart__item__price">
                                  <BiRupee />
                                  {prod.price}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Prod;
