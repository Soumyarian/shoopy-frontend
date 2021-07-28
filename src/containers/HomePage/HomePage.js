import React, { useEffect, useRef } from "react";
import gsap from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from './../../store/actions/';
import { Link } from 'react-router-dom';

import HomeBanner from "../../components/HomeBanner";
import Layout from "./../../components/Layout/Layout";
import "./HomePage.scss";
// const HomeBanner = React.lazy(() => import('../../components/HomeBanner'));


const HomePage = () => {
  let homeSectionLinkRef = useRef([]);
  let portfolioRef = useRef();
  let imageCLRef = useRef();
  let imageCSRef = useRef();
  let imageLRef = useRef();
  let imageSRef = useRef();
  const category = useSelector(state => state.categories)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  useEffect(() => {
    createCategoryList(category.categories);
  }, [category.categories]);

  const mouseEnterHandler = (e) => {
    const { imgone, imgtwo } = e.target.dataset;
    const tl = gsap.timeline();
    tl
      .set(imageLRef.current, { backgroundImage: `url(${imgone})` })
      .set(imageSRef.current, { backgroundImage: `url("${imgtwo}")` })
      .to([imageCLRef.current, imageCSRef.current], { duration: 1, autoAlpha: 1 })
      .to(e.target, { color: "#fff", autoAlpha: 1 }, 0)
      .to(portfolioRef.current, { backgroundColor: "#000" }, 0)
  }
  const mouseLeaveHandler = () => {
    const tl = gsap.timeline();
    tl
      .to([imageCLRef.current, imageCSRef.current], { autoAlpha: 0 })
      .to(homeSectionLinkRef.current, { color: "#1c1b1b", autoAlpha: 1 }, 0)
      .to(portfolioRef.current, { backgroundColor: "#efefef" }, 0)
  }

  const mouseMoveHandler = (e) => {
    const { clientY } = e;
    const imageContainerHeight = portfolioRef.current.querySelector(".category__showcase__categories").clientHeight;
    gsap.to(imageCLRef.current, {
      duration: 1.2,
      y: (imageContainerHeight - clientY) / 3,
    })
    gsap.to(imageCSRef.current, {
      duration: 1.5,
      y: (imageContainerHeight - clientY) / 3,
    })
  }

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  return (
    <>
      <Layout>
        <div className="home_container containe_fluidcd ">
          <div className="c__lines">
            <div className="c__lines__line"></div>
            <div className="c__lines__line"></div>
          </div>
          <HomeBanner />

          {/* <div className="banner_section">
            <div ref={imageList} style={{ gridArea: "i" }} className="banner__image_container">
            </div>

            <div ref={testimonialList} style={{ gridArea: "c" }} className="banner__content">
              {testimonials.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    className={`content__wrapper ${state[idx] ? "active" : ""
                      }`}>
                    <h3 className="banner__content__name">{el.title}</h3>
                    <p className="banner__content__desc">{el.description}</p>
                    <button>Explore Now</button>
                  </div>
                );
              })}
            </div>
          </div> */}

          <section ref={portfolioRef} className="category__showcase__section">
            <div className="category__showcase__title">
              <div className="container">
                <h1>What we sell</h1>
              </div>
            </div>
            <div className="category__showcase__categories">
              {
                category?.categories?.map((cat, idx) => {
                  return (
                    <Link
                      key={idx}
                      to={`/${cat.slug}?cid=${cat._id}&type=${cat.type}`}
                      data-imgone={cat.categoryImage[0].img}
                      data-imgtwo={cat.categoryImage[1].img}
                      ref={(el) => { homeSectionLinkRef.current[idx] = el }}
                      onMouseEnter={mouseEnterHandler}
                      onMouseLeave={mouseLeaveHandler}
                      onMouseMove={mouseMoveHandler}
                      data-color="#b3a8b3"
                    >
                      {cat.name}
                    </Link>
                  )
                })
              }
              <div ref={imageCLRef} className="showcase__image__large">
                <div ref={imageLRef} className="showcase__image"></div>
              </div>
              <div ref={imageCSRef} className="showcase__image__small">
                <div ref={imageSRef} className="showcase__image">
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

// http://localhost:3000/samsung?cid=60f2ade4ad69e9034c6aa428&type=store

export default HomePage;
