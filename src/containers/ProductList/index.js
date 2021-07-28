import React from "react";

import Layout from "../../components/Layout/Layout";
import getQueryParams from "../../helpers/getQueryParams";
import ProductPage from "./ProductPage/ProductPage";
import ProductStore from "./ProductStore";
import Prod from './Prod';

const ProductList = (props) => {
  const renderProductList = () => {
    const params = getQueryParams(props.location.search);
    let renderedPage;
    switch (params.type) {
      case "store":
        renderedPage = <ProductStore {...props} params={params} />;
        break;
      case "page":
        renderedPage = <ProductPage {...props} params={params} />;
        break;
      default:
        renderedPage = <Prod {...props} params={params} />;
    }
    return renderedPage;
  };

  return (
    <>
      <Layout>
        {renderProductList()}
      </Layout>
    </>
  );
};

export default ProductList;
