import React from "react";
import { NavLink } from "react-router-dom";
import "./ProductRow.scss";

const ProductRow = ({ children, title, subTitle, link }) => {
  return (
    <div className="product__row_">
      <div className="product__row__content">
        <div className="container">
          <div className="content__section">
            <div className="content__section__title">
              <h2>{title}</h2>
              <h3>{subTitle}</h3>
            </div>
            <div className="content__section__link">
              <NavLink to={link ? link : "/"}>
                <button>view all</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="product__row__products">
        <div className="container">
          <div className="product__section">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRow;
