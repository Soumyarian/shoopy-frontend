import React, { useState } from "react";
import {
    AiOutlineMinusCircle,
    AiOutlinePlusCircle,
    AiOutlineClose,
} from "react-icons/ai";
import { BiRupee } from "react-icons/bi";


export const CartAndOrderCard = (props) => {
    const [count, setCount] = useState(props.qty);
    const countHandler = (payload) => {
        setCount((prev) => {
            if (prev === 0 && payload === -1) {
                return 0;
            } else {
                return prev + payload;
            }
        });
        props.quantityHandler(
            props._id,
            props.title,
            props.imgName,
            props.price,
            payload
        );
    };
    return (
        <>
            <div className="cart__item__container">
                <table>
                    <tbody>
                        <tr>
                            <td className="cart__item__partOne">
                                {!props.orderPage && <div onClick={() => props.removeHandler(props._id)} className="cart__item__remove">
                                    <AiOutlineClose />
                                </div>}
                                <div className="cart__item__image">
                                    <img
                                        src={`http://localhost:8000/public/${props.imgName}`}
                                        alt=""
                                    />
                                </div>
                            </td>
                            <td className="cart__item__partTwo flex__container">
                                <div className="flex__container">
                                    <div className="cart__item__name">
                                        <h2>{props.title}</h2>
                                        <p>Deliver in 5-6 days</p>
                                    </div>
                                </div>
                                <div className="flex__container">
                                    {!props.orderPage ?
                                        <div className="cart__item__quantity">
                                            <button onClick={() => countHandler(-1)}>
                                                <AiOutlineMinusCircle />
                                            </button>
                                            <div>{count}</div>
                                            <button onClick={() => countHandler(1)}>
                                                <AiOutlinePlusCircle />
                                            </button>
                                        </div> :
                                        <div className="cart__item__quantity">
                                            <div>{count}</div>
                                        </div>
                                    }
                                    <div className="cart__item__price">
                                        <BiRupee />
                                        {props.price}
                                    </div>
                                </div>
                                {props.orderPage && <div className="flex__container">
                                    <div className="order__item">
                                        Order Received
                                    </div>
                                    <div className="order__item">
                                        <div>Payment {props.paymentStatus}</div>
                                    </div>
                                </div>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CartAndOrderCard;