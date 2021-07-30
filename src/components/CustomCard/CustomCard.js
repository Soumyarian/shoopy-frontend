import React from "react";
import { NavLink } from "react-router-dom";
import "./CustomCard.scss";
import { BiRupee } from 'react-icons/bi'

const CustomCard = (props) => {
  return (
    <NavLink to={props.link}>
      <div className="card_" >
        <div className="card__image__container">
          <img src={`${props.img}`} alt="img" />
        </div>
        <div className="card__details">
          <div className="card__title">
            <h3>{props.title}</h3>
          </div>
          <div className="card__description">
            <BiRupee />
            <span>{props.price}</span>
          </div>
        </div>
      </div >
    </NavLink>
  );
};

export default CustomCard;
