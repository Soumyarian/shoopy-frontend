import React from "react";
import { Link } from "react-router-dom";
import "./CustomCard.scss";
import { BiRupee } from 'react-icons/bi'

const CustomCard = (props) => {
  return (
    <Link to={props.link}>
      < div className="card_" >
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
    </Link>
  );
};

export default CustomCard;
