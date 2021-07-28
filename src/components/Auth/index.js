import React from "react";
import Layout from "../Layout/Layout";
import Spinner from "../UI/Spinner";
import "./Auth.scss";

const Auth = ({ title, loading, submitHandler, children }) => {

  return (
    <Layout>
      <div className="auth__container">
        <div className="c__lines">
          <div className="c__lines__line"></div>
          <div className="c__lines__line"></div>
        </div>
        <div className="container">
          <div className="auth__input__container">
            {loading ? (
              <Spinner />
            ) : (
              <div className="auth__inputs">
                <h2>{title}</h2>
                <form onSubmit={submitHandler}>
                  {children}
                  <button type="submit">{title}</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
