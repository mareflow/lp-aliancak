document.addEventListener('DOMContentLoaded', () => {
    
    // Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const splashLogo = document.getElementById('splash-logo');
    const skipSplashBtn = document.getElementById('skip-splash');
    
    if (splashScreen) {
        let t1, t2, t3, t4;
        
        const endSplash = () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            splashScreen.classList.add('hide');
            document.body.classList.remove('no-scroll');
        };

        if (skipSplashBtn) {
            skipSplashBtn.addEventListener('click', endSplash);
        }

        // Step 1: Show text
        t1 = setTimeout(() => {
            splashText.classList.add('show');
        }, 300);

        // Step 2: Hide text, show logo
        t2 = setTimeout(() => {
            splashText.classList.remove('show');
            t3 = setTimeout(() => {
                splashLogo.classList.add('show');
            }, 1200); // Wait for text to fade out
        }, 3800); // Read time for text

        // Step 3: Hide splash screen
        t4 = setTimeout(endSplash, 7500); // Total time
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle FontAwesome icon (bars to x)
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                } else if (item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right, .animate-fade-left');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Form Submit (Prevent default for demonstration)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }

    // Raio-X Interaction
    const hotspots = document.querySelectorAll('.hotspot');
    const infoCards = document.querySelectorAll('.info-card');
    const defaultCard = document.getElementById('info-default');

    if (hotspots.length > 0) {
        let lockedHotspot = null;

        const activateHotspot = (hotspot) => {
            hotspots.forEach(h => h.classList.remove('active'));
            infoCards.forEach(c => c.classList.remove('active'));
            
            if (hotspot) {
                hotspot.classList.add('active');
                const targetId = hotspot.getAttribute('data-target');
                const targetCard = document.getElementById(targetId);
                if (targetCard) {
                    targetCard.classList.add('active');
                }
            } else if (defaultCard) {
                defaultCard.classList.add('active');
            }
        };

        hotspots.forEach(hotspot => {
            hotspot.addEventListener('mouseenter', () => {
                if (!lockedHotspot) activateHotspot(hotspot);
            });
            
            hotspot.addEventListener('mouseleave', () => {
                if (!lockedHotspot) activateHotspot(null);
            });

            hotspot.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents document click from firing
                if (lockedHotspot === hotspot) {
                    // Unlock if clicking the same hotspot
                    lockedHotspot = null;
                } else {
                    lockedHotspot = hotspot;
                    activateHotspot(hotspot);
                }
            });
        });

        // Click outside to deselect
        document.addEventListener('click', (e) => {
            if (lockedHotspot) {
                lockedHotspot = null;
                activateHotspot(null);
            }
        });
    }

    // Infinite Marquee Logic
    const marqueeTrack = document.getElementById('marquee-track');
    if (marqueeTrack) {
        marqueeTrack.innerHTML += marqueeTrack.innerHTML;
    }

    // Projetos Slider Logic
    const sliderTrack = document.getElementById('projetos-slider');
    const slides = document.querySelectorAll('.projeto-slide');
    const prevBtn = document.getElementById('prev-projeto');
    const nextBtn = document.getElementById('next-projeto');
    const dotsContainer = document.getElementById('projetos-dots');
    const pauseBtn = document.getElementById('slider-pause-btn');
    const pauseText = document.getElementById('slider-pause-text');
    const mobilePauseBtn = document.getElementById('mobile-pause-btn');
    const sliderContainer = document.querySelector('.slider-container');
    const portfolioSection = document.getElementById('portfolio');
    
    if (sliderTrack && slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        let isManuallyPaused = false;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            if (dotsContainer) dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        function startInterval() {
            clearInterval(slideInterval);
            if (!isManuallyPaused) {
                slideInterval = setInterval(nextSlide, 5000);
            }
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            if (!isManuallyPaused) {
                startInterval();
            }
        }
        
        function updatePauseBtnUI(paused) {
            // Update desktop button
            if (pauseBtn) {
                const icon = pauseBtn.querySelector('i');
                if (paused) {
                    pauseBtn.classList.add('paused');
                    if (icon) icon.className = 'fas fa-play';
                    if (pauseText) pauseText.textContent = 'Continuar';
                    pauseBtn.setAttribute('title', 'Retomar rotação automática');
                    pauseBtn.setAttribute('aria-label', 'Retomar rotação automática');
                } else {
                    pauseBtn.classList.remove('paused');
                    if (icon) icon.className = 'fas fa-pause';
                    if (pauseText) pauseText.textContent = 'Pausar';
                    pauseBtn.setAttribute('title', 'Pausar rotação automática');
                    pauseBtn.setAttribute('aria-label', 'Pausar rotação automática');
                }
            }

            // Update mobile floating button
            if (mobilePauseBtn) {
                const mobileIcon = mobilePauseBtn.querySelector('i');
                if (paused) {
                    mobilePauseBtn.classList.add('paused');
                    if (mobileIcon) mobileIcon.className = 'fas fa-play';
                    mobilePauseBtn.setAttribute('title', 'Retomar rotação automática');
                    mobilePauseBtn.setAttribute('aria-label', 'Retomar rotação automática');
                } else {
                    mobilePauseBtn.classList.remove('paused');
                    if (mobileIcon) mobileIcon.className = 'fas fa-pause';
                    mobilePauseBtn.setAttribute('title', 'Pausar rotação automática');
                    mobilePauseBtn.setAttribute('aria-label', 'Pausar rotação automática');
                }
            }
        }
        
        function togglePause() {
            if (isManuallyPaused) {
                isManuallyPaused = false;
                updatePauseBtnUI(false);
                startInterval();
            } else {
                isManuallyPaused = true;
                clearInterval(slideInterval);
                updatePauseBtnUI(true);
            }
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', togglePause);
        }

        if (mobilePauseBtn) {
            mobilePauseBtn.addEventListener('click', togglePause);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }
        
        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        sliderTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetInterval();
            }
        }, { passive: true });

        // Hover pause on desktop
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                if (!isManuallyPaused) {
                    clearInterval(slideInterval);
                }
            });
            sliderContainer.addEventListener('mouseleave', () => {
                if (!isManuallyPaused) {
                    startInterval();
                }
            });
        }

        // Floating controls visibility management for mobile
        const floatingElements = [prevBtn, nextBtn, mobilePauseBtn].filter(Boolean);
        function updateFloatingControlsVisibility() {
            if (!portfolioSection || window.innerWidth > 992) {
                floatingElements.forEach(el => el.classList.remove('in-view'));
                return;
            }
            const rect = portfolioSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const isVisible = (rect.top < windowHeight * 0.85) && (rect.bottom > windowHeight * 0.15);
            
            floatingElements.forEach(el => {
                if (isVisible) {
                    el.classList.add('in-view');
                } else {
                    el.classList.remove('in-view');
                }
            });
        }

        window.addEventListener('scroll', updateFloatingControlsVisibility, { passive: true });
        window.addEventListener('resize', updateFloatingControlsVisibility, { passive: true });
        updateFloatingControlsVisibility();
        
        // Start auto play
        startInterval();
    }

    // QR Code Modal Logic
    const qrcodeModal = document.getElementById('qrcode-modal');
    const openQrcodeBtn = document.getElementById('open-qrcode-modal');
    const closeQrcodeBtn = document.getElementById('close-qrcode-modal');
    const qrcodeOverlay = document.getElementById('qrcode-modal-overlay');

    if (qrcodeModal && openQrcodeBtn) {
        const openModal = () => {
            qrcodeModal.classList.add('active');
            qrcodeModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('no-scroll');
        };

        const closeModal = () => {
            qrcodeModal.classList.remove('active');
            qrcodeModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('no-scroll');
        };

        openQrcodeBtn.addEventListener('click', openModal);

        if (closeQrcodeBtn) closeQrcodeBtn.addEventListener('click', closeModal);
        if (qrcodeOverlay) qrcodeOverlay.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && qrcodeModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
