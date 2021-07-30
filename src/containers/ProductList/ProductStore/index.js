import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProductsBySlug } from "../../../store/actions/index";
import CustomCard from "../../../components/CustomCard/CustomCard";
import ProductRow from "./../../../components/ProductRow";
import "./ProductStore.scss";

const ProductStore = (props) => {
  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsBySlug(props.match.params.slug));
  }, []);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className="c__lines">
        <div className="c__lines__line"></div>
        <div className="c__lines__line"></div>
      </div>
      <div>
        <div className="nmx">
          <h1>Samsung</h1>
        </div>
        {allProducts.productsByPrice && Object.keys(allProducts.productsByPrice).map((key, index) => {
          return (
            <ProductRow title="products" subTitle={key} key={index}
              link="/Samsung?cid=6100e628a480376578b04542&type=product">
              {allProducts.productsByPrice[key].map((prod, ind) => {
                return (
                  <CustomCard
                    key={ind}
                    title={prod.name}
                    price={prod.price}
                    img={prod.productPictures[0].img}
                    link={`/${prod.slug}/${prod._id}/p`}
                  />
                );
              })}
            </ProductRow>
          );
        })}
      </div>
    </div>
  );
};

export default ProductStore;
