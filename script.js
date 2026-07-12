document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion du menu de navigation mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fermer le menu mobile lors d'un clic sur un lien
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Navbar Background on Scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Si on a défilé jusqu'à cette section
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current) && current !== '') {
                a.classList.add('active');
            }
        });
    });

    // 4. Animation d'apparition au scroll (Scroll Reveal)
    const fadeElements = document.querySelectorAll('.card, .timeline-item, .about-grid > div');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Ajoute une petite animation via CSS si on voulait, 
            // Ici on gère juste l'opacité et transform dans le CSS
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    // Initialisation du style avant animation
    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        appearOnScroll.observe(el);
    });

    // 5. Gestion du formulaire de contact (Simulation)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Envoi en cours...';
            btn.disabled = true;
            
            // Simulation d'envoi
            setTimeout(() => {
                btn.textContent = 'Message envoyé !';
                btn.style.background = '#00f3ff';
                btn.style.color = '#000';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }

    // 6. Typewriter Effect
    const typewriterText = "Étudiante en BTS SIO option SISR";
    const typewriterElement = document.getElementById('typewriter-text');
    let i = 0;
    
    if (typewriterElement) {
        function typeWriter() {
            if (i < typewriterText.length) {
                typewriterElement.innerHTML += typewriterText.charAt(i);
                i++;
                setTimeout(typeWriter, 80); // Vitesse de frappe
            }
        }
        // Démarrer l'effet après un court délai
        setTimeout(typeWriter, 800);
    }
});
