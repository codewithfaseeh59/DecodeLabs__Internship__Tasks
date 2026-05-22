function filterCollection() {
    const btns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".watch-card");

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.classList.remove("hidden");
                    gsap.from(card, { opacity: 0, y: 30, duration: 0.5, ease: "power2.out" });
                } else {
                    card.classList.add("hidden");
                }
            });

            if (typeof locoScroll !== 'undefined') {
                locoScroll.update();
            }
        });
    });
}

filterCollection();
