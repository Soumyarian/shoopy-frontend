import React from 'react';
import { NavLink } from "react-router-dom";
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
                    <NavLink to="/">ShoppY!</NavLink>
                </div>
                <div onClick={closeMobileNav} className="mobile__navigation__closebtn">
                    <span></span>
                    <span></span>
                </div>
            </div>

            <ul className="mobile__navigation__nav">
                <li>
                    <NavLink to="/"> home</NavLink>
                </li>
                <li>
                    <NavLink to="/categories">categories</NavLink>
                </li>
                {
                    auth.authenticated ?
                        <li>
                            {auth.user.firstName}
                        </li>
                        :
                        <li>
                            <NavLink to="/login">SignIn</NavLink>
                        </li>
                }
                {
                    !auth.authenticated && (
                        <li>
                            <NavLink to="/signup">Signup</NavLink>
                        </li>
                    )
                }
                {
                    auth.authenticated && (
                        <li>
                            <NavLink to="/orders">Orders</NavLink>
                        </li>
                    )
                }
                <li>
                    <NavLink to="/cart">Cart</NavLink>
                </li>
                {
                    auth.authenticated && (
                        <li>
                            <NavLink to="#" onClick={() => dispatch(logout())}>Logout</NavLink>
                        </li>
                    )
                }
            </ul>
            <div className="mobile__nav__footer">shoppy@mail.com</div>
        </div>
    )
}

export default MobileNavigation
