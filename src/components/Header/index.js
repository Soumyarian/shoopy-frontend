import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.scss";
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { logout } from '../../store/actions';
import MobileNavigation from "../MobileNavigation";


const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navigationLinkRef = useRef([]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const headerRef = useRef()

  const mouseLeave = (idx) => {
    navigationLinkRef.current[idx].classList.add("animate-out");
    setTimeout(() => navigationLinkRef.current[idx].classList.remove("animate-out"), 300)
  }
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.create({
      start: 80,
      toggleClass: {
        targets: 'body',
        className: "revealed"
      }
    })
  }, [])

  return (
    <nav>
      <div ref={headerRef} className="header__container">
        <div className="header__brand">
          <NavLink to="/">ShoppY!</NavLink>
        </div>

        <div
          className="header__toggleIcon"
          onClick={() => setShowMobileNav(true)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className="header__navList">
          <li>
            <NavLink
              onMouseLeave={() => mouseLeave(0)}
              ref={(el) => { navigationLinkRef.current[0] = el }}
              to="/"
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              onMouseLeave={() => mouseLeave(1)}
              ref={(el) => { navigationLinkRef.current[1] = el }}
              to="/categories"
            >
              categories
            </NavLink>
          </li>
          {auth.authenticated ? <li>
            <NavLink
              onMouseLeave={() => mouseLeave(2)}
              ref={(el) => { navigationLinkRef.current[2] = el }}
              to="/login"
            >
              {auth.user.firstName}
            </NavLink>
          </li>
            :
            <li>
              <NavLink
                onMouseLeave={() => mouseLeave(2)}
                ref={(el) => { navigationLinkRef.current[2] = el }}
                to="/login"
              >
                SignIn
              </NavLink>
            </li>}
          {!auth.authenticated && (<li>
            <NavLink
              onMouseLeave={() => mouseLeave(3)}
              ref={(el) => { navigationLinkRef.current[3] = el }}
              to="/signup"
            >
              Signup
            </NavLink>
          </li>
          )}
          {auth.authenticated && (<li>
            <NavLink
              onMouseLeave={() => mouseLeave(4)}
              ref={(el) => { navigationLinkRef.current[4] = el }}
              to="/orders"
            >
              Orders
            </NavLink>
          </li>
          )}
          <li>
            <NavLink
              onMouseLeave={() => mouseLeave(5)}
              ref={(el) => { navigationLinkRef.current[5] = el }}
              to="/cart"
              onClick={() => dispatch(logout())}
            >
              Cart
            </NavLink>
          </li>
          {
            auth.authenticated && (<li>
              <NavLink
                onMouseLeave={() => mouseLeave(6)}
                ref={(el) => { navigationLinkRef.current[6] = el }}
                to="#"
                onClick={() => dispatch(logout())}
              >

                Logout
              </NavLink>
            </li>)
          }
        </ul>
      </div>
      {showMobileNav && <MobileNavigation closeMobileNav={() => setShowMobileNav(false)} />}
      {/* <MenuHeader></MenuHeader> */}
    </nav>
  );
};

export default Header;
