import React, { Component } from 'react';
import { WebGLRenderer, PerspectiveCamera, Scene, PlaneBufferGeometry, Clock, Raycaster, Vector2 } from "three";
import NormalizeWheel from 'normalize-wheel'

import Media from './Media'
import './Category.scss';

class Category extends Component {
    constructor(props) {
        super(props)
        this.scroll = {
            ease: 0.05,
            current: 0,
            target: 0,
            last: 0
        }
        this.reff = React.createRef();
        this.containerRef = React.createRef();
        this.speed = 1;
        this.time = new Clock();
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
        this.intersectionObjects = [];
        this.currentIntersection = null;
    }

    componentWillUnmount = () => {
        window.removeEventListener("click", this.onClick);
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener('mousewheel', this.onWheel)
        window.removeEventListener('wheel', this.onWheel)

        window.removeEventListener('mousedown', this.onTouchDown)
        window.removeEventListener('mousemove', this.onTouchMove)
        window.removeEventListener('mouseup', this.onTouchUp)

        window.removeEventListener('touchstart', this.onTouchDown)
        window.removeEventListener('touchmove', this.onTouchMove)
        window.removeEventListener('touchend', this.onTouchUp)
        this.medias?.forEach(media => {
            media.plane.material.dispose();
            media.plane.geometry.dispose();
        })
        this.containerRef.current.removeChild(this.gl.domElement);
        this.gl.dispose();
    }

    componentDidMount = () => {
        this.createRenderer()
        this.createScene()
        this.createCamera()
        this.createGallery()

        this.onResize()

        this.createGeometry()
        this.createMedias()

        this.animate()

        this.addEventListeners()
    }


    createGallery = () => {
        this.gallery = this.reff.current
    }

    createRenderer = () => {
        this.renderer = new WebGLRenderer({ alpha: true });
        this.gl = this.renderer
        this.containerRef.current.appendChild(this.gl.domElement)
    }

    createCamera = () => {
        this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5
        this.scene.add(this.camera)
    }

    createScene = () => {
        this.scene = new Scene();
    }

    createGeometry = () => {
        this.planeGeometry = new PlaneBufferGeometry(1, 1, 100, 100);
    }

    createMedias = () => {
        this.mediasElements = this.gallery?.children
        this.medias = Array.from(this.mediasElements).map(element => {
            const { link } = element.dataset;
            let media = new Media({
                element,
                geometry: this.planeGeometry,
                gl: this.gl,
                height: this.galleryHeight,
                scene: this.scene,
                screen: this.screen,
                viewport: this.viewport,
                link: link
            })
            this.intersectionObjects.push(media.plane);
            return media
        })
    }

    lerp(p1, p2, t) {
        return p1 + (p2 - p1) * t
    }

    /**
     * Events.
     */
    onTouchDown = (event) => {
        this.isDown = true

        this.scroll.position = this.scroll.current
        this.start = event.touches ? event.touches[0].clientY : event.clientY
    }

    onTouchMove = (event) => {
        const x = event.touches ? event.touches[0].clientY : event.clientY;
        const y = event.touches ? event.touches[0].clientY : event.clientY;
        this.mouse.x = ((x / window.innerWidth) * 2.0) - 1.0;
        this.mouse.y = -(((y / window.innerHeight) * 2.0) - 1.0);
        if (!this.isDown) return

        const distance = (this.start - y) * 2

        this.scroll.target = this.scroll.position + distance
    }

    onTouchUp = (event) => {
        this.isDown = false
    }

    onWheel = (event) => {

        const normalized = NormalizeWheel(event)
        const speed = normalized.pixelY

        this.scroll.target += speed * 0.5
    }

    /**
     * Resize.
     */
    onResize = () => {
        const { offsetWidth: cWidth, offsetHeight: cHeight } =
            this.containerRef.current;
        this.screen = {
            width: cWidth,
            height: cHeight
        }
        this.camera.aspect = this.screen.width / this.screen.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.screen.width, this.screen.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const fov = this.camera.fov * (Math.PI / 180)
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z
        const width = height * this.camera.aspect

        this.viewport = {
            height,
            width
        }

        this.galleryBounds = this.gallery.getBoundingClientRect()
        this.galleryHeight = this.viewport.height * this.galleryBounds.height / this.screen.height;
        if (this.medias) {
            this.medias.forEach(media => media.onResize({
                height: this.galleryHeight,
                screen: this.screen,
                viewport: this.viewport,
            }))
        }
    }

    onClick = () => {
        if (this.currentIntersection) {
            if (this.props.location.pathname) {
                this.props.history.push(this.currentIntersection.object.userData.link)
            }
        }
    }

    /**
     * Update.
     */
    animate = () => {
        this.renderer.setAnimationLoop(this.update);
    };
    update = () => {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.intersectionObjects);
        if (intersects.length > 0) {
            this.currentIntersection = intersects[0];
        } else {
            this.currentIntersection = null;
        }
        let time = this.time.getElapsedTime();
        this.scroll.target += this.speed

        this.scroll.current = this.lerp(this.scroll.current, this.scroll.target, this.scroll.ease)

        if (this.scroll.current > this.scroll.last) {
            this.direction = 'down'
            this.speed = 2
        } else if (this.scroll.current < this.scroll.last) {
            this.direction = 'up'
            this.speed = -2
        }

        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, this.direction, time));
        }

        this.renderer.render(this.scene, this.camera)

        this.scroll.last = this.scroll.current
    }

    /**
     * Listeners.
     */
    addEventListeners = () => {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('click', this.onClick);

        window.addEventListener('mousewheel', this.onWheel)
        window.addEventListener('wheel', this.onWheel)

        window.addEventListener('mousedown', this.onTouchDown)
        window.addEventListener('mousemove', this.onTouchMove)
        window.addEventListener('mouseup', this.onTouchUp)

        window.addEventListener('touchstart', this.onTouchDown)
        window.addEventListener('touchmove', this.onTouchMove)
        window.addEventListener('touchend', this.onTouchUp)
    }
    render = () => {
        return (
            <>
                <div ref={this.containerRef} className="category__canvas__container">
                    <div className="c__lines">
                        <div className="c__lines__line"></div>
                        <div className="c__lines__line"></div>
                    </div>
                    <div className="demo-1">
                        <div className="demo-1__header">
                            <div className="container">
                                <div className="demo-1__desc">
                                    <h1>
                                        <span>C</span>
                                        <span>A</span>
                                        <span>T</span>
                                        <span>E</span>
                                        <span>G</span>
                                        <span>O</span>
                                        <span>R</span>
                                        <span>I</span>
                                        <span>E</span>
                                        <span>S</span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div ref={this.reff} className="demo-1__gallery">
                            <figure
                                data-link="/Apple?cid=6100e51ea480376578b04539&type=page"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/apple1.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Apple?cid=6100e51ea480376578b04539&type=page"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/apple4.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Men-Clothing?cid=6100e63fa480376578b04548&type=product"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/mens1.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Samsung?cid=6100e628a480376578b04542&type=store"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/samsung4.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Women-Clothing?cid=6100e669a480376578b0454f&type=product"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/women1.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Samsung?cid=6100e628a480376578b04542&type=store"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/samsung1.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Samsung?cid=6100e628a480376578b04542&type=store"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/samsung2.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Apple?cid=6100e51ea480376578b04539&type=page"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/apple3.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Men-Clothing?cid=6100e63fa480376578b04548&type=product"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/mens2.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Samsung?cid=6100e628a480376578b04542&type=store"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/samsung3.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Apple?cid=6100e51ea480376578b04539&type=page"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/apple2.jpg" alt="img" />
                            </figure>
                            <figure
                                data-link="/Women-Clothing?cid=6100e669a480376578b0454f&type=product"
                                className="demo-1__gallery__figure">
                                <img className="demo-1__gallery__image" src="/shop_images/women2.jpg" alt="img" />
                            </figure>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Category;