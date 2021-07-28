import React, { useRef } from "react";
import "./footer.scss";

const Footer = () => {
  const footerRef = useRef([]);
  return (
    <div className="footer__wrapper">
      <div className="c__lines">
        <div className="c__lines__line"></div>
        <div className="c__lines__line"></div>
      </div>
      <div className="container">
        <div className="footer">
          <div ref={(el) => { footerRef.current[0] = el }} className="footer__item">
            <h3>Follow</h3>
            <p>instagram</p>
            <p>press</p>
          </div>
          <div ref={(el) => { footerRef.current[1] = el }} className="footer__item">
            <h3>Help</h3>
            <p>take back</p>
            <p>terms & condition</p>
          </div>
          <div ref={(el) => { footerRef.current[2] = el }} className="footer__item">
            <h3>contact</h3>
            <p>info@shoppy.com</p>
            <p>9876897668</p>
          </div>
        </div>
      </div>
      <div className="footer__end__container">
        shoopy@mail.com
      </div>
    </div>
  );
};

export default Footer;
