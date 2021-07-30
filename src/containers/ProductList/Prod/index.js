import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsBySlug } from "../../../store/actions";
import { BiRupee, BiStar } from "react-icons/bi";
import { staggerChild } from "./../../../helpers/animation";
import { NavLink } from "react-router-dom";
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
        <div className="container">
          <div className="product__list__container">
            {allProducts?.products?.map((prod, idx) => {
              return (
                <NavLink key={idx} to={`/${prod.slug}/${prod._id}/p`}>
                  <div className="cart__content">
                    <div className="cart__item__container">
                      <table>
                        <tbody>
                          <tr>
                            <td className="cart__item__partOne">
                              <div className="cart__item__image">
                                <img
                                  src={`${prod.productPictures[0].img}`}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td className="cart__item__partTwo">
                              <div className="itemm__data">
                                <div className="item__name">
                                  <h2>{prod.name}</h2>
                                  <p>
                                    {/* {prod.description} */}
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Voluptatibus modi mollitia
                                    assumenda sequi cumque voluptatum,
                                    necessitatibus excepturi quas, ut, rem optio
                                    id similique ducimus delectus tempore vel.
                                    Error vel pariatur architecto sit possimus
                                    ipsa. Cumque architecto quos assumenda ipsum
                                    iure optio porro! Dolores dignissimos eum
                                    sint ullam molestias vero officiis.
                                  </p>
                                  <div className="item__desc">
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
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Prod;
