import gsap from "gsap";

export const staggerChild = (element, trigger = true) => {
    const obj = {
        duration: 0.5,
        stagger: { each: 0.1, from: 3 },
        autoAlpha: 1,
        y: 0
    }
    if (trigger) {
        obj.scrollTrigger = element
    }
    return gsap.to(element, obj)
}

export const revealText = (element, trigger = true) => {
    const obj = {
        autoAlpha: 1,
        y: 0
    }
    if (trigger) {
        obj.scrollTrigger = element
    }
    return gsap.to(element, obj)
}