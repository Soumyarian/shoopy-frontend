import React from 'react';
import { Link } from "react-router-dom";
import "./MobileNavigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from './../../store/actions';
const MobileNavigation = ({ closeMobileNav }) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    return (
        <div className="mobile__navigation__container">
            <div className="c__lines">
                <div className="c__lines__line"></div>
                <div className="c__lines__line"></div>
            </div>
            <div className="mobile__navigation__header">
                <div className="mobile__navigation__brand">
                    <Link to="/">ShoppY!</Link>
                </div>
                <div onClick={closeMobileNav} className="mobile__navigation__closebtn">
                    <span></span>
                    <span></span>
                </div>
            </div>

            <ul className="mobile__navigation__nav">
                <li>
                    <Link to="/"> home</Link>
                </li>
                <li>
                    <Link to="/categories">categories</Link>
                </li>
                {
                    auth.authenticated ?
                        <li>
                            {auth.user.firstName}
                        </li>
                        :
                        <li>
                            <Link to="/login">SignIn</Link>
                        </li>
                }
                {
                    !auth.authenticated && (
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    )
                }
                {
                    auth.authenticated && (
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                    )
                }
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                {
                    auth.authenticated && (
                        <li>
                            <Link to="#" onClick={() => dispatch(logout())}>Logout</Link>
                        </li>
                    )
                }
            </ul>
            <div className="mobile__nav__footer">shoppy@mail.com</div>
        </div>
    )
}

export default MobileNavigation
