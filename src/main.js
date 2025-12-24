/**
 * Virtuo-Trackx Full Script
 * Includes: GSAP, Lenis, SplitType, Mobile Menu, FAQ, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Инициализация Lenis (Плавный скролл)
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Анимации GSAP + SplitType
    gsap.registerPlugin(ScrollTrigger);

    // Проверка и инициализация SplitType для заголовка Hero
    const heroTitle = document.querySelector('.split-text');
    if (heroTitle && typeof SplitType !== 'undefined') {
        const text = new SplitType(heroTitle, { types: 'words,chars' });
        
        gsap.from(text.chars, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.02,
            ease: "power4.out",
            delay: 0.5
        });
    }

    // Анимация появления всех секций при скролле
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 4. Мобильное меню
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.mobile-nav__link');

    if (burger && menu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            menu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('burger--active');
                menu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 5. FAQ Аккордеон
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq__trigger');
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('faq__item--active');
            
            // Закрываем все открытые
            faqItems.forEach(i => i.classList.remove('faq__item--active'));
            
            // Если не был активен — открываем
            if (!isActive) {
                item.classList.add('faq__item--active');
            }
        });
    });

    // 6. Валидация телефона (только цифры и +)
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d+]/g, '');
        });
    }

    // 7. Математическая Капча и Форма
    const captchaText = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha-answer');
    
    if (captchaText) {
        let n1 = Math.floor(Math.random() * 10);
        let n2 = Math.floor(Math.random() * 5);
        let result = n1 + n2;
        captchaText.textContent = `${n1} + ${n2} = `;
        
        const form = document.getElementById('ai-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (parseInt(captchaInput.value) !== result) {
                alert('Пожалуйста, решите математический пример правильно.');
                return;
            }

            const btn = form.querySelector('button');
            const successMsg = document.getElementById('form-success');
            
            btn.textContent = 'Отправка...';
            btn.disabled = true;

            // Имитация AJAX
            setTimeout(() => {
                form.reset();
                btn.textContent = 'Отправлено!';
                successMsg.classList.remove('hidden');
                
                // Обновляем капчу для следующего раза
                n1 = Math.floor(Math.random() * 10);
                n2 = Math.floor(Math.random() * 5);
                result = n1 + n2;
                captchaText.textContent = `${n1} + ${n2} = `;
            }, 1500);
        });
    }

    // 8. Cookie Popup
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');
    
    if (cookiePopup && !localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookiePopup.classList.remove('hidden');
        }, 3000);

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookiePopup.classList.add('hidden');
        });
    }

    // 9. Смена стиля Header при скролле
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
});