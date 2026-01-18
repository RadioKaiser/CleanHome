// ===== BURGER =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const navOverlay = document.getElementById("navOverlay");

burger.onclick = () => {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
    navOverlay.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
};

// Закрытие при клике на overlay
navOverlay.onclick = () => {
    nav.classList.remove("active");
    burger.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
};

// Закрытие при клике на ссылку
document.querySelectorAll(".nav a").forEach(link => {
    link.onclick = () => {
        nav.classList.remove("active");
        burger.classList.remove("active");
        navOverlay.classList.remove("active");
        document.body.style.overflow = "";
    };
});

// ===== SLIDER =====
const slides = document.getElementById("slides");
let index = 0;

document.getElementById("next").onclick = () => {
    index = (index + 1) % slides.children.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
};

document.getElementById("prev").onclick = () => {
    index = (index - 1 + slides.children.length) % slides.children.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
};

// ===== MODAL =====
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const phoneInput = document.getElementById("phone");
const form = document.querySelector(".modal-form");

// ВСЕ кнопки открытия popup
document.querySelectorAll("#openModal, .contact-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            phoneInput.focus();
        }, 200);
    });
});

// закрытие
closeModal.onclick = () => closePopup();

modal.onclick = e => {
    if (e.target === modal) closePopup();
};

function closePopup() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// ===== STARS INIT =====
document.querySelectorAll('.review-stars').forEach(stars => {
    const rating = parseFloat(stars.dataset.rating);
    stars.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        if (i <= rating) {
            star.classList.add('filled');
        }
        stars.appendChild(star);
    }
});

// ===== FORM VALIDATION + SHAKE + SUCCESS =====
form.addEventListener("submit", e => {
    e.preventDefault();

    const phone = phoneInput.value.trim();
    const phoneRegex = /^(\+375|80)(29|25|44|33)\d{7}$/;

    if (!phoneRegex.test(phone)) {
        modal.classList.add("shake");
        phoneInput.focus();

        setTimeout(() => {
            modal.classList.remove("shake");
        }, 400);

        return;
    }

    showSuccess();
});

function showSuccess() {
    form.style.display = "none";

    const success = document.createElement("div");
    success.className = "popup-success";
    success.innerHTML = `
        <div class="checkmark">✓</div>
        <p>Заявка отправлена!<br>Мы свяжемся с вами в ближайшее время</p>
    `;

    document.querySelector(".modal-content").appendChild(success);

    setTimeout(() => {
        success.remove();
        form.reset();
        form.style.display = "block";
        closePopup();
    }, 3000);
}
// PRICE COUNT ANIMATION - removed (prices section removed)

// ===== SMOOTH PAGE TRANSITIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Плавный переход при загрузке страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in-out';
        document.body.style.opacity = '1';
    }, 10);
});

// Плавные переходы для всех ссылок
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Если это ссылка на другую страницу (не якорь и не внешняя ссылка)
            if (href && (href === 'index.html' || href === 'pricing.html' || 
                href.startsWith('index.html#') || href.startsWith('pricing.html#'))) {
                
                // Если это переход на другую страницу (не просто якорь на текущей)
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const targetPage = href.split('#')[0];
                
                if (targetPage && targetPage !== currentPage) {
                    e.preventDefault();
                    
                    // Плавное исчезновение
                    document.body.style.transition = 'opacity 0.4s ease-out';
                    document.body.style.opacity = '0';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 400);
                }
            }
        });
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами с классом animate-on-scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Анимация для карточек отзывов с задержкой
document.addEventListener('DOMContentLoaded', () => {
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
});
