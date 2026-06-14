/* =====================================================
   PORTFOLIO SCRIPT V2
   PART 1
   Loader
   Scroll Progress
   Spotlight Cursor
   Typed.js
   Theme Manager
   Navbar Effects
   Smooth Scroll
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initScrollProgress();
    initSpotlightCursor();
    initTypedText();
    initThemeSystem();
    initNavbarEffects();
    initSmoothScrolling();

});

/* =====================================================
   LOADER
===================================================== */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

            setTimeout(() => {

                loader.remove();

            }, 1000);

        }, 1200);

    });

}

/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */

function initScrollProgress() {

    const progressBar =
        document.getElementById("progress-bar");

    if (!progressBar) return;

    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const docHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (scrollTop / docHeight) * 100;

        progressBar.style.width =
            `${percentage}%`;

    });

}

/* =====================================================
   SPOTLIGHT CURSOR
===================================================== */

function initSpotlightCursor() {

    const spotlight =
        document.getElementById("spotlight");

    if (!spotlight) return;

    document.addEventListener("mousemove", (e) => {

        spotlight.style.left =
            `${e.clientX}px`;

        spotlight.style.top =
            `${e.clientY}px`;

    });

}

/* =====================================================
   TYPED HERO TEXT
===================================================== */

function initTypedText() {

    const target =
        document.getElementById("typed-text");

    if (!target) return;

    if (typeof Typed === "undefined") {

        console.warn(
            "Typed.js not loaded"
        );

        return;
    }

    new Typed("#typed-text", {

        strings: [

            "Frontend Developer",
            "Full Stack Engineer",
            "UI / UX Enthusiast",
            "Problem Solver",
            "Modern Web Creator",
            "JavaScript Developer"

        ],

        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1800,
        startDelay: 300,
        loop: true,
        smartBackspace: true

    });

}

/* =====================================================
   THEME MANAGER
===================================================== */

function initThemeSystem() {

    const toggle =
        document.getElementById("themeToggle");

    if (!toggle) return;

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme) {

        document.body.classList.remove(
            "light",
            "dark",
            "cyberpunk"
        );

        document.body.classList.add(
            savedTheme
        );

        updateThemeIcon(savedTheme);

    }

    toggle.addEventListener("click", () => {

        const themes = [

            "dark",
            "light",
            "cyberpunk"

        ];

        let currentTheme =
            localStorage.getItem(
                "portfolio-theme"
            ) || "dark";

        let currentIndex =
            themes.indexOf(currentTheme);

        let nextIndex =
            (currentIndex + 1) %
            themes.length;

        const nextTheme =
            themes[nextIndex];

        document.body.classList.remove(
            "light",
            "dark",
            "cyberpunk"
        );

        document.body.classList.add(
            nextTheme
        );

        localStorage.setItem(
            "portfolio-theme",
            nextTheme
        );

        updateThemeIcon(nextTheme);

    });

}

function updateThemeIcon(theme) {

    const toggle =
        document.getElementById("themeToggle");

    if (!toggle) return;

    switch (theme) {

        case "light":
            toggle.innerHTML = "☀️";
            break;

        case "cyberpunk":
            toggle.innerHTML = "⚡";
            break;

        default:
            toggle.innerHTML = "🌙";
            break;
    }

}

/* =====================================================
   NAVBAR EFFECTS
===================================================== */

function initNavbarEffects() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.style.padding =
                "14px 24px";

            navbar.style.backdropFilter =
                "blur(30px)";

            navbar.style.boxShadow =
                "0 15px 40px rgba(0,0,0,.25)";

        } else {

            navbar.style.padding =
                "18px 30px";

            navbar.style.boxShadow =
                "none";

        }

    });

}

/* =====================================================
   SMOOTH SECTION SCROLLING
===================================================== */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            (e) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    targetId === "#" ||
                    targetId.length < 2
                ) {
                    return;
                }

                const section =
                    document.querySelector(
                        targetId
                    );

                if (!section) return;

                e.preventDefault();

                const offset = 100;

                const position =
                    section.offsetTop - offset;

                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });

}

/* =====================================================
   ACTIVE NAV LINK HIGHLIGHT
===================================================== */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.clientHeight;

        if (
            window.scrollY >= sectionTop
        ) {
            current = section.getAttribute(
                "id"
            );
        }

    });

    navLinks.forEach(link => {

        link.classList.remove(
            "active-link"
        );

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add(
                "active-link"
            );

        }

    });

});

/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */

document.addEventListener(
    "click",
    (e) => {

        const button =
            e.target.closest(
                ".primary-btn, .resume-btn"
            );

        if (!button) return;

        const ripple =
            document.createElement("span");

        const rect =
            button.getBoundingClientRect();

        ripple.className = "ripple";

        ripple.style.left =
            `${e.clientX - rect.left}px`;

        ripple.style.top =
            `${e.clientY - rect.top}px`;

        button.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 700);

    }
);

/* =====================================================
   PERFORMANCE
===================================================== */

window.addEventListener(
    "resize",
    debounce(() => {

        console.log(
            "Layout recalculated"
        );

    }, 250)
);

/* =====================================================
   DEBOUNCE UTILITY
===================================================== */

function debounce(
    callback,
    delay
) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}
/* =====================================================
   PART 2
   GSAP + SCROLLTRIGGER
   REVEALS
   COUNTERS
   FLOATING EFFECTS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initGSAPAnimations();
    initRevealAnimations();
    initCounterAnimations();
    initFloatingCards();
    initParallaxEffects();

});

/* =====================================================
   GSAP SETUP
===================================================== */

function initGSAPAnimations() {

    if (typeof gsap === "undefined") {
        console.warn("GSAP not loaded");
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    animateHero();
    animateNavbar();
    animateSections();

}

/* =====================================================
   HERO ENTRANCE
===================================================== */

function animateHero() {

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    tl.from(".availability", {
        y: 30,
        opacity: 0,
        duration: 0.8
    })

    .from(".hero-content h1", {
        y: 60,
        opacity: 0,
        duration: 1
    }, "-=0.4")

    .from(".hero-content h2", {
        y: 30,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")

    .from(".hero-content p", {
        y: 30,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")

    .from(".hero-buttons a", {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6
    }, "-=0.4")

    .from(".hero-socials a", {
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5
    }, "-=0.3")

    .from(".hero-image img", {
        scale: 0.85,
        opacity: 0,
        duration: 1.2
    }, "-=1");

}

/* =====================================================
   NAVBAR FADE
===================================================== */

function animateNavbar() {

    gsap.from(".navbar", {

        y: -80,
        opacity: 0,
        duration: 1,

        ease: "power3.out"

    });

}

/* =====================================================
   SECTION ANIMATIONS
===================================================== */

function animateSections() {

    const sections =
        document.querySelectorAll("section");

    sections.forEach(section => {

        gsap.from(section, {

            opacity: 0,
            y: 80,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: section,

                start: "top 80%",

                toggleActions:
                    "play none none none"

            }

        });

    });

}

/* =====================================================
   REVEAL OBSERVER
===================================================== */

function initRevealAnimations() {

    const elements = document.querySelectorAll(
        ".glass-card, .project-card, .tech-card, .stat-card, .achievement-card, .certificate-card"
    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    elements.forEach(el => {

        el.classList.add("fade-up");

        observer.observe(el);

    });

}

/* =====================================================
   COUNTER ANIMATION
===================================================== */

function initCounterAnimations() {

    const counters =
        document.querySelectorAll(
            ".glass-card h1, .stat-card h1"
        );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                animateCounter(
                    entry.target
                );

                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.4
        }

    );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

function animateCounter(element) {

    const raw =
        element.textContent.replace(
            /\D/g,
            ""
        );

    const target =
        parseInt(raw);

    if (!target) return;

    let count = 0;

    const duration = 1500;

    const increment =
        target /
        (duration / 16);

    const update = () => {

        count += increment;

        if (count < target) {

            element.textContent =
                Math.floor(count) + "+";

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target + "+";

        }

    };

    update();

}

/* =====================================================
   FLOATING GLASS CARDS
===================================================== */

function initFloatingCards() {

    const cards =
        document.querySelectorAll(
            ".glass-card"
        );

    cards.forEach((card, index) => {

        gsap.to(card, {

            y:
                index % 2 === 0
                    ? -12
                    : -20,

            duration:
                3 + Math.random(),

            repeat: -1,

            yoyo: true,

            ease:
                "sine.inOut"

        });

    });

}

/* =====================================================
   PARALLAX HERO IMAGE
===================================================== */

function initParallaxEffects() {

    const image =
        document.querySelector(
            ".hero-image img"
        );

    if (!image) return;

    window.addEventListener(
        "mousemove",
        throttle((e) => {

            const x =
                (window.innerWidth / 2 -
                    e.clientX) /
                40;

            const y =
                (window.innerHeight / 2 -
                    e.clientY) /
                40;

            image.style.transform =
                `translate(${x}px, ${y}px)`;

        }, 16)
    );

}

/* =====================================================
   TECH STACK STAGGER
===================================================== */

if (typeof gsap !== "undefined") {

    gsap.from(".tech-card", {

        opacity: 0,

        y: 50,

        stagger: 0.08,

        duration: 0.8,

        scrollTrigger: {

            trigger: "#tech-stack",

            start: "top 80%"

        }

    });

}

/* =====================================================
   PROJECT CARDS STAGGER
===================================================== */

if (typeof gsap !== "undefined") {

    gsap.from(".project-card", {

        opacity: 0,

        y: 60,

        stagger: 0.15,

        duration: 1,

        scrollTrigger: {

            trigger: "#projects",

            start: "top 80%"

        }

    });

}

/* =====================================================
   TIMELINE ANIMATION
===================================================== */

if (typeof gsap !== "undefined") {

    gsap.from(".timeline-item", {

        opacity: 0,

        x: -80,

        stagger: 0.25,

        duration: 1,

        scrollTrigger: {

            trigger: "#experience",

            start: "top 80%"

        }

    });

}

/* =====================================================
   MAGNETIC BUTTON EFFECT
===================================================== */

document.querySelectorAll(
    ".primary-btn, .resume-btn"
).forEach(button => {

    button.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            gsap.to(button, {

                x: x * 0.2,

                y: y * 0.2,

                duration: 0.3

            });

        }
    );

    button.addEventListener(
        "mouseleave",
        () => {

            gsap.to(button, {

                x: 0,

                y: 0,

                duration: 0.4

            });

        }
    );

});

/* =====================================================
   THROTTLE UTILITY
===================================================== */

function throttle(callback, limit) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}
/* =====================================================
   PART 3
   COMMAND PALETTE
   AI ASSISTANT
   MOBILE NAVIGATION
   SCROLL TO TOP
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initCommandPalette();
    initScrollTop();
    initMobileMenu();
    initAIAssistant();
    initKeyboardShortcuts();

});

/* =====================================================
   COMMAND PALETTE
===================================================== */

function initCommandPalette() {

    const palette =
        document.getElementById(
            "commandPalette"
        );

    const input =
        palette?.querySelector("input");

    if (!palette || !input) return;

    document.addEventListener(
        "keydown",
        (e) => {

            const isMac =
                navigator.platform
                    .toUpperCase()
                    .includes("MAC");

            const shortcut =
                isMac
                    ? e.metaKey && e.key === "k"
                    : e.ctrlKey && e.key === "k";

            if (shortcut) {

                e.preventDefault();

                palette.classList.toggle(
                    "active"
                );

                if (
                    palette.classList.contains(
                        "active"
                    )
                ) {
                    setTimeout(() => {
                        input.focus();
                    }, 100);
                }
            }

            if (
                e.key === "Escape"
            ) {

                palette.classList.remove(
                    "active"
                );

            }

        }
    );

    input.addEventListener(
        "keydown",
        (e) => {

            if (
                e.key === "Enter"
            ) {

                handleCommand(
                    input.value.trim()
                );

                input.value = "";

                palette.classList.remove(
                    "active"
                );

            }

        }
    );

}

function handleCommand(command) {

    const value =
        command.toLowerCase();

    const commands = {

        home: "#home",
        about: "#about",
        experience: "#experience",
        skills: "#skills",
        projects: "#projects",
        contact: "#contact"

    };

    if (commands[value]) {

        document
            .querySelector(
                commands[value]
            )
            ?.scrollIntoView({
                behavior: "smooth"
            });

        return;
    }

    if (
        value === "theme"
    ) {

        document
            .getElementById(
                "themeToggle"
            )
            ?.click();

        return;
    }

    if (
        value === "resume"
    ) {

        document
            .querySelector(
                ".resume-btn"
            )
            ?.click();

        return;
    }

    console.log(
        "Unknown command:",
        command
    );

}

/* =====================================================
   SCROLL TO TOP BUTTON
===================================================== */

function initScrollTop() {

    let button =
        document.getElementById(
            "scrollTop"
        );

    if (!button) {

        button =
            document.createElement(
                "button"
            );

        button.id = "scrollTop";

        button.innerHTML =
            '<i class="fas fa-arrow-up"></i>';

        document.body.appendChild(
            button
        );

    }

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 600
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );

    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}

/* =====================================================
   MOBILE MENU
===================================================== */

function initMobileMenu() {

    let mobileBtn =
        document.querySelector(
            ".mobile-menu"
        );

    let navLinks =
        document.querySelector(
            ".nav-links"
        );

    if (
        !mobileBtn ||
        !navLinks
    ) return;

    mobileBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "open"
            );

        }
    );

    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "open"
                    );

                }
            );

        });

}

/* =====================================================
   AI ASSISTANT
===================================================== */

function initAIAssistant() {

    let button =
        document.getElementById(
            "ai-assistant"
        );

    if (!button) {

        button =
            document.createElement(
                "div"
            );

        button.id =
            "ai-assistant";

        button.innerHTML =
            '<i class="fas fa-robot"></i>';

        document.body.appendChild(
            button
        );

    }

    let widget =
        document.querySelector(
            ".chat-widget"
        );

    if (!widget) {

        widget =
            document.createElement(
                "div"
            );

        widget.className =
            "chat-widget";

        widget.innerHTML = `

        <div class="chat-header">
            Portfolio Assistant
        </div>

        <div class="chat-messages">
            <div class="message">
                👋 Ask me about projects,
                skills or experience.
            </div>
        </div>

        <div class="chat-input">
            <input
              id="chatInput"
              placeholder="Ask something..."
            />
            <button id="sendChat">
                ➤
            </button>
        </div>

        `;

        document.body.appendChild(
            widget
        );

    }

    button.addEventListener(
        "click",
        () => {

            widget.style.display =
                widget.style.display ===
                "flex"
                    ? "none"
                    : "flex";

        }
    );

    setTimeout(() => {

        const sendBtn =
            document.getElementById(
                "sendChat"
            );

        const input =
            document.getElementById(
                "chatInput"
            );

        const messages =
            document.querySelector(
                ".chat-messages"
            );

        if (
            !sendBtn ||
            !input ||
            !messages
        ) return;

        const sendMessage =
            () => {

                const text =
                    input.value.trim();

                if (!text) return;

                appendMessage(
                    messages,
                    "You",
                    text
                );

                const response =
                    getBotResponse(
                        text
                    );

                setTimeout(() => {

                    appendMessage(
                        messages,
                        "AI",
                        response
                    );

                }, 500);

                input.value = "";

            };

        sendBtn.addEventListener(
            "click",
            sendMessage
        );

        input.addEventListener(
            "keydown",
            e => {

                if (
                    e.key === "Enter"
                ) {
                    sendMessage();
                }

            }
        );

    }, 200);

}

function appendMessage(
    container,
    sender,
    text
) {

    const div =
        document.createElement(
            "div"
        );

    div.className =
        "chat-message";

    div.innerHTML =
        `<strong>${sender}:</strong> ${text}`;

    container.appendChild(div);

    container.scrollTop =
        container.scrollHeight;

}

function getBotResponse(message) {

    const msg =
        message.toLowerCase();

    if (
        msg.includes("project")
    ) {

        return "I have built portfolio websites, AI projects, web applications and full-stack solutions.";

    }

    if (
        msg.includes("skill")
    ) {

        return "My core skills include HTML, CSS, JavaScript, React, Node.js, MongoDB and UI/UX design.";

    }

    if (
        msg.includes("experience")
    ) {

        return "I have experience building modern web applications and solving real-world problems.";

    }

    if (
        msg.includes("contact")
    ) {

        return "Use the contact section below to reach me.";

    }

    return "That's interesting. Feel free to explore my portfolio sections.";

}

/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

function initKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        (e) => {

            if (
                e.altKey &&
                e.key === "1"
            ) {

                document
                    .querySelector(
                        "#home"
                    )
                    ?.scrollIntoView({
                        behavior:
                            "smooth"
                    });

            }

            if (
                e.altKey &&
                e.key === "2"
            ) {

                document
                    .querySelector(
                        "#projects"
                    )
                    ?.scrollIntoView({
                        behavior:
                            "smooth"
                    });

            }

            if (
                e.altKey &&
                e.key === "3"
            ) {

                document
                    .querySelector(
                        "#contact"
                    )
                    ?.scrollIntoView({
                        behavior:
                            "smooth"
                    });

            }

        }
    );

}

/* =====================================================
   QUICK SEARCH
===================================================== */

function searchPortfolio(query) {

    const sections =
        document.querySelectorAll(
            "section"
        );

    query =
        query.toLowerCase();

    sections.forEach(section => {

        const text =
            section.innerText
                .toLowerCase();

        if (
            text.includes(query)
        ) {

            section.scrollIntoView({

                behavior:
                    "smooth"

            });

        }

    });

}
/* =====================================================
   PART 4
   GITHUB API
   TESTIMONIALS
   VANILLA TILT
   LAZY LOADING
   PERFORMANCE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initGitHubStats();
    initTestimonialSlider();
    initVanillaTilt();
    initLazyLoading();
    initAdvancedInteractions();
    initPerformanceMonitoring();

});

/* =====================================================
   GITHUB API INTEGRATION
===================================================== */

async function initGitHubStats() {

    const username = "YOUR_GITHUB_USERNAME";

    const repoCount =
        document.getElementById(
            "repoCount"
        );

    const followers =
        document.getElementById(
            "followers"
        );

    if (!repoCount || !followers)
        return;

    try {

        const response =
            await fetch(
                `https://api.github.com/users/${username}`
            );

        if (!response.ok)
            throw new Error(
                "GitHub API failed"
            );

        const data =
            await response.json();

        animateNumber(
            repoCount,
            data.public_repos
        );

        animateNumber(
            followers,
            data.followers
        );

    } catch (error) {

        console.error(
            "GitHub Stats Error:",
            error
        );

        repoCount.textContent =
            "--";

        followers.textContent =
            "--";

    }

}

function animateNumber(
    element,
    target
) {

    let current = 0;

    const increment =
        Math.max(
            1,
            Math.floor(target / 50)
        );

    const timer =
        setInterval(() => {

            current += increment;

            if (
                current >= target
            ) {

                current = target;

                clearInterval(timer);

            }

            element.textContent =
                current;

        }, 25);

}

/* =====================================================
   TESTIMONIAL AUTO SLIDER
===================================================== */

function initTestimonialSlider() {

    const slider =
        document.querySelector(
            ".testimonial-slider"
        );

    if (!slider) return;

    let scrollPosition = 0;

    setInterval(() => {

        const card =
            slider.querySelector(
                ".testimonial"
            );

        if (!card) return;

        scrollPosition +=
            card.offsetWidth + 30;

        if (
            scrollPosition >
            slider.scrollWidth -
                slider.clientWidth
        ) {

            scrollPosition = 0;

        }

        slider.scrollTo({

            left:
                scrollPosition,

            behavior:
                "smooth"

        });

    }, 4000);

}

/* =====================================================
   VANILLA TILT
===================================================== */

function initVanillaTilt() {

    if (
        typeof VanillaTilt ===
        "undefined"
    ) {

        console.warn(
            "VanillaTilt missing"
        );

        return;

    }

    VanillaTilt.init(

        document.querySelectorAll(
            ".glass-card, .project-card, .tech-card"
        ),

        {

            max: 8,

            speed: 400,

            glare: true,

            "max-glare": 0.15,

            scale: 1.02

        }

    );

}

/* =====================================================
   LAZY IMAGE LOADING
===================================================== */

function initLazyLoading() {

    const images =
        document.querySelectorAll(
            "img"
        );

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const img =
                                entry.target;

                            img.loading =
                                "lazy";

                            observer.unobserve(
                                img
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.1
            }

        );

    images.forEach(img => {

        observer.observe(img);

    });

}

/* =====================================================
   ADVANCED CARD INTERACTIONS
===================================================== */

function initAdvancedInteractions() {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const rotateY =
                    (
                        x /
                        rect.width -
                        0.5
                    ) *
                    10;

                const rotateX =
                    (
                        y /
                        rect.height -
                        0.5
                    ) *
                    -10;

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}

/* =====================================================
   PERFORMANCE OBSERVER
===================================================== */

function initPerformanceMonitoring() {

    if (
        "PerformanceObserver" in
        window
    ) {

        const observer =
            new PerformanceObserver(
                list => {

                    list
                        .getEntries()
                        .forEach(entry => {

                            if (
                                entry.duration >
                                100
                            ) {

                                console.log(
                                    "Slow Task:",
                                    entry.name
                                );

                            }

                        });

                }
            );

        try {

            observer.observe({

                entryTypes: [
                    "measure",
                    "navigation"
                ]

            });

        } catch (err) {

            console.warn(
                "Performance Observer unsupported"
            );

        }

    }

}

/* =====================================================
   PAGE VISIBILITY API
===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            console.log(
                "Portfolio hidden"
            );

        } else {

            console.log(
                "Portfolio active"
            );

        }

    }
);

/* =====================================================
   COPY EMAIL FEATURE
===================================================== */

const emailLinks =
    document.querySelectorAll(
        ".copy-email"
    );

emailLinks.forEach(link => {

    link.addEventListener(
        "click",
        async e => {

            e.preventDefault();

            const email =
                link.dataset.email;

            if (!email) return;

            try {

                await navigator
                    .clipboard
                    .writeText(email);

                link.innerText =
                    "Copied!";

                setTimeout(() => {

                    link.innerText =
                        email;

                }, 1500);

            } catch {

                console.warn(
                    "Clipboard unavailable"
                );

            }

        }
    );

});

/* =====================================================
   SECTION VIEW TRACKER
===================================================== */

const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        console.log(
                            "Viewed:",
                            entry.target.id
                        );

                    }

                }
            );

        },

        {
            threshold: 0.4
        }

    );

document
    .querySelectorAll("section")
    .forEach(section => {

        sectionObserver.observe(
            section
        );

    });

/* =====================================================
   EASTER EGG
===================================================== */

let secretKeys = [];

document.addEventListener(
    "keydown",
    e => {

        secretKeys.push(
            e.key.toLowerCase()
        );

        if (
            secretKeys.length > 10
        ) {

            secretKeys.shift();

        }

        const code =
            secretKeys.join("");

        if (
            code.includes("portfolio")
        ) {

            document.body.classList.add(
                "cyberpunk"
            );

            console.log(
                "🚀 Secret Mode Activated"
            );

        }

    }
);

/* =====================================================
   WELCOME MESSAGE
===================================================== */

setTimeout(() => {

    console.log(`
%cWelcome to the Portfolio 🚀
Built with HTML, CSS, JavaScript,
GSAP, ScrollTrigger and modern UI.
`,
    "color:#7c3aed;font-size:14px;font-weight:bold;"
    );

}, 1500);

/* =====================================================
   FINAL INITIALIZATION COMPLETE
===================================================== */

console.log(
    "Portfolio V2 Initialized Successfully"
);