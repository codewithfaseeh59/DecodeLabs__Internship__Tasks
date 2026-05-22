gsap.utils.toArray(".process-step-img").forEach(img => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img,
            scroller: "#wrapper",
            start: "top 85%",
        },
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: "power3.out"
    });
});