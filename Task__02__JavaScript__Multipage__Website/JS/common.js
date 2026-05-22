let locoScroll;

function locoScrollAnime() {
    locoScroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"),
        smooth: true,
        multiplier: 0.9,
        lerp: 0.07,
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#wrapper", {
        scrollTop(val) {
            return arguments.length
                ? locoScroll.scrollTo(val, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#wrapper").style.transform ? "transform" : "fixed",
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

function loaderAnime() {
    const loaderBar = document.getElementById("loader-bar");
    const loaderNum = document.getElementById("loader-num");
    const loader = document.getElementById("loader");
    let prog = 0;
    const interval = setInterval(() => {
        prog += Math.random() * 12;
        if (prog >= 100) {
            prog = 100;
            clearInterval(interval);
            hideLoader();
        }
        loaderBar.style.width = Math.floor(prog) + "%";
        loaderNum.textContent = Math.floor(prog) + "%";
    }, 80);
    function hideLoader() {
        gsap.to(loader, {
            opacity: 0, duration: 0.8, delay: 0.3,
            onComplete: () => { loader.style.display = "none"; }
        });
    }
}

function headerScrollEffect() {
    if (typeof locoScroll !== 'undefined' && locoScroll) {
        locoScroll.on("scroll", ({ scroll }) => {
            const header = document.querySelector(".main-header");
            scroll.y > 60 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
        });
    }
}

function initCursor() {
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    let fx = 0, fy = 0, mx = 0, my = 0;
    document.addEventListener("mousemove", (e) => {
        mx = e.clientX; my = e.clientY;
        cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    });
    function animateFollower() {
        fx += (mx - fx) * 0.1;
        fy += (my - fy) * 0.1;
        follower.style.transform = `translate(${fx - 16}px, ${fy - 16}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    document.querySelectorAll("a, button, .watch-card, .retailer-card, .value-card").forEach(el => {
        el.addEventListener("mouseenter", () => {
            follower.style.width = "56px";
            follower.style.height = "56px";
            follower.style.opacity = "0.2";
        });
        el.addEventListener("mouseleave", () => {
            follower.style.width = "32px";
            follower.style.height = "32px";
            follower.style.opacity = "0.5";
        });
    });
}

function statsCounter() {
    document.querySelectorAll(".stat-num[data-count]").forEach((el) => {
        const target = +el.dataset.count;
        ScrollTrigger.create({
            trigger: el,
            scroller: "#wrapper",
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target, duration: 2, ease: "power2.out",
                    onUpdate() { el.textContent = Math.floor(this.targets()[0].val) + "+"; }
                });
            }
        });
    });
}

function gsapScrollReveals() {
    gsap.utils.toArray([
        ".watch-card", ".value-card", ".retailer-card",
        ".timeline-item", ".process-step-content",
        ".section-title", ".section-label",
        ".founder-content", ".craft-intro-wrap",
        ".contact-info-item", ".about-left", ".about-right"
    ]).forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    scroller: "#wrapper",
                    start: "top 90%",
                    toggleActions: "play none none none",
                }
            }
        );
    });
}

function pageHeroAnime() {
    gsap.from(".hero-eyebrow",    { opacity: 0, y: 20, duration: 1,   delay: 0.5, ease: "power3.out" });
    gsap.from(".page-hero-title", { opacity: 0, y: 40, duration: 1.2, delay: 0.8, ease: "power3.out" });
}

function initHamburger() {
     const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");
    const overlay = document.getElementById("nav-overlay");
    const icon = document.getElementById("ham-icon");

    if (hamburger && navbar && overlay && icon) {
        hamburger.addEventListener("click", () => {
            navbar.classList.toggle("open");
            overlay.classList.toggle("active");
            
            if (navbar.classList.contains("open")) {
                icon.className = "ri-close-large-fill";
            } else {
                icon.className = "ri-menu-3-fill";
            }
        });
        
        overlay.addEventListener("click", () => {
            navbar.classList.remove("open");
            overlay.classList.remove("active");
            icon.className = "ri-menu-3-fill";
        });
    }
}


   
const wrapper = document.querySelector("#wrapper");
const loader = document.getElementById("loader");

if (wrapper && loader) {
    locoScrollAnime();
    loaderAnime();
    headerScrollEffect();
}

initCursor();
initHamburger();

if (document.querySelector(".stat-num[data-count]")) {
    statsCounter();
}

if (document.querySelector(".watch-card, .value-card, .timeline-item")) {
    gsapScrollReveals();
}

if (document.querySelector(".page-hero-title")) {
    pageHeroAnime();
}
