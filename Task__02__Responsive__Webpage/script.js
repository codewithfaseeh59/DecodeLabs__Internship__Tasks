
const loader = document.getElementById("loader");
const loaderBar = document.getElementById("loaderBar");
const loaderCount = document.getElementById("loaderCount");

let progress = 0;

const loaderInterval = setInterval(() => {
    progress += Math.random() * 3.5 + 0.5;
    if (progress >= 100) progress = 100;

    loaderBar.style.width = progress + "%";
    loaderCount.textContent = Math.floor(progress);

    if (progress === 100) {
        clearInterval(loaderInterval);
        setTimeout(hideLoader, 400);
    }
}, 40);

function hideLoader() {
    const tl = gsap.timeline({
        onComplete: () => {
            loader.style.display = "none";
            initAnimations();
        }
    });
    tl.to(".loader-blob-wrap", {
        scale: 1.4, opacity: 0,
        duration: 0.5, ease: "back.in(2)"
    })
        .to(".loader-word", {
            y: -40, opacity: 0,
            duration: 0.4, ease: "power3.in"
        }, "-=0.3")
        .to("#loader", {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.8, ease: "power4.inOut"
        }, "-=0.1");
}


const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursor-follower");

let mouseX = 0, mouseY = 0;
let prevX = 0, prevY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
    prevX = mouseX; prevY = mouseY;
    mouseX = e.clientX; mouseY = e.clientY;

    const vx = mouseX - prevX;
    const vy = mouseY - prevY;
    const speed = Math.sqrt(vx * vx + vy * vy);
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);

    const stretchX = 1 + Math.min(speed * 0.04, 0.8);
    const stretchY = 1 - Math.min(speed * 0.02, 0.3);

    gsap.to(cursor, {
        x: mouseX, y: mouseY,
        scaleX: stretchX, scaleY: stretchY,
        rotation: angle,
        duration: 0.1, ease: "none"
    });

    gsap.to(cursor, {
        scaleX: 1, scaleY: 1, rotation: 0,
        duration: 0.6, ease: "elastic.out(1, 0.4)",
        delay: 0.05
    });
});

gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    gsap.set(cursorFollower, { x: followerX, y: followerY });
});

const hoverTargets = document.querySelectorAll(
    "a, button, .work-card, .testi-card, .service-item"
);
hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hovering");
        cursorFollower.classList.add("is-hovering");
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hovering");
        cursorFollower.classList.remove("is-hovering");
    });
});

document.addEventListener("mousedown", () => cursor.classList.add("is-clicking"));
document.addEventListener("mouseup", () => cursor.classList.remove("is-clicking"));

function initMagnetic() {
    const magneticEls = document.querySelectorAll(
        ".btn-primary, .btn-outline, #hamburger, .social-icons a, .work-hover-btn"
    );
    magneticEls.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.4;
            const deltaY = (e.clientY - centerY) * 0.4;
            gsap.to(el, { x: deltaX, y: deltaY, duration: 0.4, ease: "power3.out" });
        });
        el.addEventListener("mouseleave", () => {
            gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        });
    });
}

function initBlobMorph() {
    gsap.to(".about-morph", {
        duration: 4,
        ease: "elastic.out(1, 0.4)",
        repeat: -1,
        yoyo: true,
        attr: {
            d: "M 270 70 C 380 90 440 170 415 270 C 388 378 310 445 210 425 C 110 405 58 318 72 218 C 86 118 148 48 270 70 Z"
        }
    });
}

function initElasticButtons() {
    document.querySelectorAll(".btn-elastic, .btn-primary, .btn-outline").forEach(btn => {
        btn.addEventListener("click", () => {
            gsap.timeline()
                .to(btn, { scaleX: 1.2, scaleY: 0.8, duration: 0.1, ease: "power2.out" })
                .to(btn, { scaleX: 0.9, scaleY: 1.2, duration: 0.2, ease: "power2.out" })
                .to(btn, { scaleX: 1, scaleY: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        });
    });
}


function initAnimations() {

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"),
        smooth: true,
        multiplier: 0.85,
        lerp: 0.08
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#wrapper", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#wrapper").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();


    setTimeout(() => {
        locoScroll.update();
        ScrollTrigger.refresh();
    }, 500);

    window.addEventListener("load", () => {
        locoScroll.update();
        ScrollTrigger.refresh();
    });


    let lastScrollY = 0;
    locoScroll.on("scroll", ({ scroll }) => {
        const currentY = scroll.y;
        if (currentY > lastScrollY && currentY > 80) {
            gsap.to("#navbar", { y: "-100%", duration: 0.5, ease: "power3.inOut" });
        } else {
            gsap.to("#navbar", { y: "0%", duration: 0.6, ease: "elastic.out(1, 0.5)" });
        }
        lastScrollY = currentY;
    });

    const hamburger = document.getElementById("hamburger");
    const navOverlay = document.getElementById("navOverlay");
    const overlayLinks = document.querySelectorAll(".overlay-link");
    let overlayOpen = false;

    hamburger.addEventListener("click", () => {
        overlayOpen = !overlayOpen;
        hamburger.classList.toggle("is-open", overlayOpen);
        navOverlay.classList.toggle("is-open", overlayOpen);

        gsap.fromTo(hamburger,
            { scale: 0.8 },
            { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" }
        );

        if (overlayOpen) {
            gsap.fromTo(overlayLinks,
                { y: 100, opacity: 0, skewY: 5 },
                {
                    y: 0, opacity: 1, skewY: 0,
                    duration: 0.8, stagger: 0.1,
                    ease: "elastic.out(1, 0.6)", delay: 0.35
                }
            );
            gsap.fromTo(".overlay-footer",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.5)", delay: 0.8 }
            );
        } else {
            gsap.to([...overlayLinks, ".overlay-footer"], {
                y: -30, opacity: 0, skewY: -3,
                duration: 0.3, stagger: 0.05, ease: "power2.in"
            });
        }
    });
    const allNavLinks = document.querySelectorAll(".nav-links a, .overlay-link");

    allNavLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            if (overlayOpen) {
                overlayOpen = false;
                hamburger.classList.remove("is-open");
                navOverlay.classList.remove("is-open");
                gsap.to([...overlayLinks, ".overlay-footer"], {
                    y: -30, opacity: 0,
                    duration: 0.3, stagger: 0.05, ease: "power2.in"
                });
                setTimeout(() => {
                    locoScroll.scrollTo(targetEl, {
                        offset: -80, duration: 1200,
                        easing: [0.25, 0.0, 0.35, 1.0]
                    });
                }, 400);
            } else {
                locoScroll.scrollTo(targetEl, {
                    offset: -80, duration: 1200,
                    easing: [0.25, 0.0, 0.35, 1.0]
                });
            }
        });
    });

    gsap.set(".hero-badge", { opacity: 0, scale: 0 });
    gsap.set(".title-line", { y: 100, opacity: 0, skewX: -5 });
    gsap.set(".hero-sub", { y: 40, opacity: 0 });
    gsap.set(".hero-btns", { y: 40, opacity: 0, scale: 0.8 });
    gsap.set(".floaty", { scale: 0, opacity: 0 });

    gsap.timeline({ defaults: { ease: "elastic.out(1, 0.5)" }, delay: 0.1 })
        .to(".hero-badge", { opacity: 1, scale: 1, duration: 0.8 })
        .to(".title-line", { y: 0, opacity: 1, skewX: 0, duration: 1, stagger: 0.15 }, "-=0.4")
        .to(".hero-sub", { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .to(".hero-btns", { y: 0, opacity: 1, scale: 1, duration: 0.8 }, "-=0.4")
        .to(".floaty", { scale: 1, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.6");


    gsap.utils.toArray(".section-header").forEach(el => {
        gsap.set(el, { y: 60, opacity: 0, scale: 0.95 });
        ScrollTrigger.create({
            trigger: el,
            scroller: "#wrapper",
            start: "top 85%",
            onEnter: () => {
                gsap.to(el, {
                    y: 0, opacity: 1, scale: 1,
                    duration: 1, ease: "elastic.out(1, 0.5)"
                });
            }
        });
    });


    gsap.utils.toArray(".work-card").forEach((card, i) => {
        gsap.set(card, { scale: 0.85, opacity: 0, y: 50 });
        ScrollTrigger.create({
            trigger: card,
            scroller: "#wrapper",
            start: "top 88%",
            onEnter: () => {
                gsap.to(card, {
                    scale: 1, opacity: 1, y: 0,
                    duration: 0.9, delay: i * 0.1,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        });
    });

    gsap.utils.toArray(".service-item").forEach((item, i) => {
        gsap.set(item, { x: -80, opacity: 0 });
        ScrollTrigger.create({
            trigger: item,
            scroller: "#wrapper",
            start: "top 88%",
            onEnter: () => {
                gsap.to(item, {
                    x: 0, opacity: 1,
                    duration: 1, delay: i * 0.12,
                    ease: "elastic.out(1, 0.4)"
                });
            }
        });
    });

    gsap.set(".about-text", { x: -60, opacity: 0 });
    gsap.set(".about-visual", { scale: 0.7, opacity: 0, rotation: -10 });
    gsap.set(".about-stat", { scale: 0, opacity: 0 });
    gsap.set(".about-icon", { scale: 0, opacity: 0 });

    ScrollTrigger.create({
        trigger: "#about",
        scroller: "#wrapper",
        start: "top 75%",
        onEnter: () => {
            gsap.to(".about-text", {
                x: 0, opacity: 1,
                duration: 1, ease: "elastic.out(1, 0.4)"
            });
            gsap.to(".about-visual", {
                scale: 1, opacity: 1, rotation: 0,
                duration: 1.2, ease: "elastic.out(1, 0.4)", delay: 0.2
            });
            gsap.to(".about-stat", {
                scale: 1, opacity: 1,
                duration: 0.8, stagger: 0.15,
                ease: "elastic.out(1.2, 0.4)", delay: 0.4
            });
            gsap.to(".about-icon", {
                scale: 1, opacity: 1,
                duration: 0.8, stagger: 0.1,
                ease: "elastic.out(1.5, 0.4)", delay: 0.5
            });
        }
    });

    gsap.utils.toArray(".testi-card").forEach((card, i) => {
        gsap.set(card, { scale: 0.8, opacity: 0, rotation: i % 2 === 0 ? -5 : 5 });
        ScrollTrigger.create({
            trigger: card,
            scroller: "#wrapper",
            start: "top 88%",
            onEnter: () => {
                gsap.to(card, {
                    scale: 1, opacity: 1, rotation: 0,
                    duration: 0.9, delay: i * 0.15,
                    ease: "elastic.out(1, 0.4)"
                });
            }
        });
    });


    gsap.set(".contact-inner", { scale: 0.9, opacity: 0, y: 60 });
    gsap.utils.toArray(".contact-input").forEach(el => gsap.set(el, { x: -40, opacity: 0 }));

    ScrollTrigger.create({
        trigger: "#contact",
        scroller: "#wrapper",
        start: "top 82%",
        onEnter: () => {
            gsap.to(".contact-inner", {
                scale: 1, opacity: 1, y: 0,
                duration: 1.2, ease: "elastic.out(1, 0.4)"
            });
            gsap.utils.toArray(".contact-input").forEach((el, i) => {
                gsap.to(el, {
                    x: 0, opacity: 1,
                    duration: 0.8, delay: 0.3 + i * 0.12,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        }
    });


    gsap.utils.toArray(".footer-links-group").forEach((el, i) => {
        gsap.set(el, { y: 40, opacity: 0 });
        ScrollTrigger.create({
            trigger: el,
            scroller: "#wrapper",
            start: "top 95%",
            onEnter: () => {
                gsap.to(el, {
                    y: 0, opacity: 1,
                    duration: 0.8, delay: i * 0.1,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        });
    });

    gsap.utils.toArray(".social-icons a").forEach((el, i) => {
        gsap.set(el, { scale: 0, opacity: 0, rotation: -30 });
        ScrollTrigger.create({
            trigger: el,
            scroller: "#wrapper",
            start: "top 100%",
            onEnter: () => {
                gsap.to(el, {
                    scale: 1, opacity: 1, rotation: 0,
                    duration: 0.6, delay: i * 0.1,
                    ease: "elastic.out(1.2, 0.4)"
                });
            }
        });
    });
    ScrollTrigger.create({
        trigger: ".footer-bottom",
        scroller: "#wrapper",
        start: "top 100%",
        onEnter: () => {
            gsap.to(".social-icons a", {
                scale: 1, opacity: 1, rotation: 0,
                duration: 0.6, stagger: 0.08,
                ease: "elastic.out(1.2, 0.4)"
            });
            gsap.to(".footer-bottom p", {
                opacity: 1, y: 0, duration: 0.5
            });
        }
    });

    initMagnetic();
    initBlobMorph();
    initElasticButtons();
}