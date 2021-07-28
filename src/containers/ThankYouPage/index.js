import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import "./ThankYouPage.scss";
import { staggerChild, revealText } from '../../helpers/animation';


const ThankYou = () => {
    const headRef = useRef();
    const descRef = useRef();
    useEffect(() => {
        staggerChild(headRef.current.children, false);
        revealText(descRef.current);
    }, [])
    return (
        <Layout>
            <div className="thankyou__page__container">
                <div className="c__lines">
                    <div className="c__lines__line"></div>
                    <div className="c__lines__line"></div>
                </div>
                <div className="container">
                    <div className="thankyou__content">
                        <h1 ref={headRef}>
                            <span>T</span>
                            <span>H</span>
                            <span>A</span>
                            <span>N</span>
                            <span>K</span>
                            <span>-</span>
                            <span>Y</span>
                            <span>O</span>
                            <span>U</span>
                        </h1>
                        <div className="desc__container">
                            <h3 ref={descRef}>Keep Shopping With Us</h3>
                        </div>
                        <Link to="/">
                            <button>Return To Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ThankYou
