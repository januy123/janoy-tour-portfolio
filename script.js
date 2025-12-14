// ===== INTRO FADE =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== FADE IN ON SCROLL =====
const faders = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

faders.forEach(fade => observer.observe(fade));

// ===== JOURNAL TOGGLE =====
function toggleJournal(card) {
    const content = card.querySelector('.journal-content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

// ===== CURSOR GLOW =====
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ===== STAR PARTICLES =====
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        d: Math.random() * 0.5
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00eaff';

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
    });

    moveStars();
}

function moveStars() {
    stars.forEach(star => {
        star.y += star.d;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

setInterval(drawStars, 30);

// ===== PARALLAX GALAXY =====
window.addEventListener('scroll', () => {
    document.querySelector('.galaxy').style.transform =
        `translateY(${window.scrollY * 0.2}px)`;
});


// ===== TYPEWRITER EFFECT =====
const text = [
    "BS Information Technology Student",
    "Holy Cross of Davao College"
];

let index = 0;
let charIndex = 0;
const speed = 80;
const typedText = document.getElementById("typed-text");

function typeEffect() {
    if (charIndex < text[index].length) {
        typedText.textContent += text[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, speed);
    } else {
        setTimeout(eraseEffect, 2000);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typedText.textContent = text[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, speed / 2);
    } else {
        index = (index + 1) % text.length;
        setTimeout(typeEffect, 500);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);


// ===== ITINERARY SLIDES =====
const slides = {};

document.querySelectorAll('.itinerary-day').forEach(day => {
    const dayId = day.id;
    slides[dayId] = {
        imgs: day.querySelectorAll('.day-slide'),
        index: 0
    };
    slides[dayId].imgs[0].classList.add('active'); // show first
});

function changeSlide(dayId, n) {
    const day = slides[dayId];
    day.imgs[day.index].classList.remove('active');
    day.index = (day.index + n + day.imgs.length) % day.imgs.length;
    day.imgs[day.index].classList.add('active');
}

// ===== IMAGE LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.day-slide').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

function closeLightbox() {
    lightbox.style.display = 'none';
}


function openJournalModal(imgSrc, title, contentHTML){
    const modal = document.getElementById('journalModal');
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-content').innerHTML = contentHTML;
    modal.style.display = 'flex';
}

function closeJournalModal(){
    const modal = document.getElementById('journalModal');
    modal.style.display = 'none';
}


// ===== REVEAL FADE-IN/OUT ON SCROLL =====
const revealElements = document.querySelectorAll('.fade, .fade-item, .scroll-fade');

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top;
        const elBottom = rect.bottom;

        // Check if element is partially visible
        if (elBottom > 0 && elTop < windowHeight) {
            el.classList.add('show'); // fade in
        } else {
            el.classList.remove('show'); // fade out
        }
    });
}

// Trigger on scroll, resize, and initial load
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('resize', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// TARGET ALL ELEMENTS NA MAY FADE EFFECT
const scrollFadeElements = document.querySelectorAll('.fade, .fade-item, .scroll-fade');

function handleScrollFade() {
    const windowHeight = window.innerHeight;

    scrollFadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top;
        const elBottom = rect.bottom;

        // fade in kapag kahit bahagya visible, fade out kapag wala sa viewport
        if (elBottom > 0 && elTop < windowHeight) {
            el.classList.add('visible'); // fade in
        } else {
            el.classList.remove('visible'); // fade out
        }
    });
}

// I-trigger sa scroll, resize at load
window.addEventListener('scroll', handleScrollFade);
window.addEventListener('resize', handleScrollFade);
window.addEventListener('load', handleScrollFade);

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    // Shrink navbar
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Highlight active link
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
