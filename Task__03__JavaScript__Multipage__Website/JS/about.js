function initAboutPage() {
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, x: -30 },
            {
                opacity: 1, x: 0,
                duration: 0.8,
                delay: i * 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    scroller: "#wrapper",
                    start: "top 95%",
                    toggleActions: "play none none none",
                }
            }
        );
    });

    gsap.utils.toArray(".value-card").forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    scroller: "#wrapper",
                    start: "top 95%",
                    toggleActions: "play none none none",
                }
            }
        );
    });

    gsap.fromTo(".founder-img",
        { opacity: 0, x: -50 },
        {
            opacity: 1, x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".founder-img",
                scroller: "#wrapper",
                start: "top 90%",
                toggleActions: "play none none none",
            }
        }
    );

    gsap.fromTo(".founder-content",
        { opacity: 0, x: 50 },
        {
            opacity: 1, x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".founder-content",
                scroller: "#wrapper",
                start: "top 90%",
                toggleActions: "play none none none",
            }
        }
    );
}

initAboutPage();
