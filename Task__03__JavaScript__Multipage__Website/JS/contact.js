function initContactPage() {
    gsap.utils.toArray(".form-group").forEach((group, i) => {
        gsap.fromTo(group,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: group,
                    scroller: "#wrapper",
                    start: "top 95%",
                    toggleActions: "play none none none",
                }
            }
        );
    });

    gsap.utils.toArray(".retailer-card").forEach((card, i) => {
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

    gsap.utils.toArray(".contact-info-item").forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, x: -20 },
            {
                opacity: 1, x: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    scroller: "#wrapper",
                    start: "top 95%",
                    toggleActions: "play none none none",
                }
            }
        );
    });

    gsap.fromTo(".contact-form-wrap",
        { opacity: 0, x: -40 },
        {
            opacity: 1, x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".contact-form-wrap",
                scroller: "#wrapper",
                start: "top 90%",
                toggleActions: "play none none none",
            }
        }
    );

    gsap.fromTo(".contact-info-wrap",
        { opacity: 0, x: 40 },
        {
            opacity: 1, x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".contact-info-wrap",
                scroller: "#wrapper",
                start: "top 90%",
                toggleActions: "play none none none",
            }
        }
    );

    const btn = document.querySelector(".btn-submit");
    if (btn) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(btn, {
                scale: 0.95, duration: 0.1,
                onComplete: () => gsap.to(btn, { scale: 1, duration: 0.2 })
            });
        });
    }
}

initContactPage();