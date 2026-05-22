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
            return {
                top: 0, left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.querySelector("#wrapper").style.transform
            ? "transform"
            : "fixed",
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
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            onComplete: () => {
                loader.style.display = "none";
            }
        });
    }
}

function headerScrollEffect() {
    locoScroll.on("scroll", ({ scroll }) => {
        const header = document.querySelector(".main-header");
        if (scroll.y > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

function initCursor() {
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    let fx = 0, fy = 0, mx = 0, my = 0;

    document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    });

    function animateFollower() {
        fx += (mx - fx) * 0.1;
        fy += (my - fy) * 0.1;
        follower.style.transform = `translate(${fx - 16}px, ${fy - 16}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll("a, button, .watch-card").forEach(el => {
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

function initWatch() {
    const canvas = document.getElementById("watch-canvas");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.5, 4);


    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(-5, -2, -5);
    scene.add(rimLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 20);
    pointLight.position.set(0, 3, 3);
    scene.add(pointLight);

    let isDragging = false;
    let idleRotation = true;
    let previousMouseX = 0;
    let previousMouseY = 0;

    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        idleRotation = false;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });
    window.addEventListener("mouseup", () => {
        isDragging = false;
        idleRotation = true;
    });
    window.addEventListener("mousemove", (e) => {
        if (!isDragging || !watchModel) return;
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        watchModel.rotation.y += deltaX * 0.01;
        watchModel.rotation.x += deltaY * 0.01;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });

    let watchModel = null;
    const loader = new THREE.GLTFLoader();
    loader.load(
        "./Assets/Watch-Model/rolex.glb",
        (gltf) => {
            watchModel = gltf.scene;

            const box = new THREE.Box3().setFromObject(watchModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            watchModel.position.sub(center);
            watchModel.scale.setScalar(1.8 / maxDim);

            scene.add(watchModel);
            initWatchScroll();
        },
        undefined,
        (err) => console.warn("Model load error:", err)
    );

    function initWatchScroll() {
        const parts = [];
        watchModel.traverse((child) => {
            if (child.isMesh) {
                child.userData.originalPos = child.position.clone();
                child.userData.explodeDir = new THREE.Vector3(
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4
                );
                parts.push(child);
            }
        });

        ScrollTrigger.create({
            trigger: "#hero-section",
            scroller: "#wrapper",
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
                if (!watchModel) return;

                watchModel.rotation.y = self.progress * Math.PI * 2;

                const explodeProgress = Math.max(0, (self.progress - 0.5) * 2);
                parts.forEach((part) => {
                    part.position.x = part.userData.originalPos.x + part.userData.explodeDir.x * explodeProgress;
                    part.position.y = part.userData.originalPos.y + part.userData.explodeDir.y * explodeProgress;
                    part.position.z = part.userData.originalPos.z + part.userData.explodeDir.z * explodeProgress;
                });

                camera.position.z = 6 - self.progress * 1.5;
            }
        });

        const partDetails = document.querySelectorAll(".part-detail");
        partDetails.forEach((el, i) => {
            ScrollTrigger.create({
                trigger: "#hero-section",
                scroller: "#wrapper",
                start: `${15 + i * 15}% top`,
                end: `${30 + i * 15}% top`,
                onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }),
                onLeave: () => gsap.to(el, { opacity: 0, y: -20, duration: 0.4 }),
                onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6 }),
                onLeaveBack: () => gsap.to(el, { opacity: 0, y: 20, duration: 0.4 }),
            });
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        if (watchModel && idleRotation) {
            watchModel.rotation.y += 0.003;
        }
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
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
                    val: target,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate() {
                        el.textContent = Math.floor(this.targets()[0].val) + "+";
                    }
                });
            }
        });
    });
}

function craftSteps() {
    const craftImgs = [
        "./Assets/Images/craft-1.png",
        "./Assets/Images/craft-2.png",
        "./Assets/Images/craft-3.png",
        "./Assets/Images/craft-4.png",
    ];

    document.querySelectorAll(".craft-step").forEach((step, i) => {
        ScrollTrigger.create({
            trigger: step,
            scroller: "#wrapper",
            start: "top 60%",
            onEnter: () => {
                document.querySelectorAll(".craft-step").forEach(s => s.classList.remove("active"));
                step.classList.add("active");
                const img = document.querySelector(".craft-image");
                gsap.to(img, {
                    opacity: 0, duration: 0.3,
                    onComplete: () => {
                        img.src = craftImgs[i];
                        gsap.to(img, { opacity: 0.7, duration: 0.4 });
                    }
                });
            }
        });
    });
}

function gsapAnimations() {

    gsap.from(".hero-eyebrow",    { opacity: 0, y: 20, duration: 1,   delay: 0.5, ease: "power3.out" });
    gsap.from(".hero-title",      { opacity: 0, y: 40, duration: 1.2, delay: 0.8, ease: "power3.out" });
    gsap.from(".hero-subtitle",   { opacity: 0, y: 20, duration: 1,   delay: 1.2, ease: "power3.out" });
    gsap.from(".hero-scroll-hint",{ opacity: 0,        duration: 1,   delay: 1.6, ease: "power2.out" });

    gsap.utils.toArray([
        ".watch-card",
        ".about-left",
        ".about-right",
        ".stat-item",
        ".quote-text",
        ".quote-author",
        ".craft-step",
        ".section-title",
        ".section-label",
    ]).forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                scroller: "#wrapper",
                start: "top 88%",
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out"
        });
    });
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

locoScrollAnime();
loaderAnime();
headerScrollEffect();
initCursor();
initWatch();
statsCounter();
craftSteps();
gsapAnimations();
initHamburger();