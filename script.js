// 1. Canvas ani Bubbles setup
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

let bubbles = [];
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 10 + 5; 
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#64ffda';
        ctx.shadowBlur = 20; 
        ctx.shadowColor = '#64ffda';
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        if (Math.sqrt(dx*dx + dy*dy) < 100) {
            this.x -= dx * 0.05; this.y -= dy * 0.05;
        }
        this.x += this.speedX; this.y += this.speedY;
        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
}
for(let i = 0; i < 40; i++) bubbles.push(new Bubble());
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(b => { b.update(); b.draw(); });
    requestAnimationFrame(animate);
}
animate();

// 2. Navigation Control Elements
const exploreBtn = document.getElementById('exploreBtn');
const projectsBtn = document.getElementById('projectsBtn');
const connectBtnHero = document.getElementById('connectBtnHero');

const heroSection = document.querySelector('.hero-container');
const aboutSection = document.getElementById('about');
const skillsSection = document.getElementById('skills');
const educationSection = document.getElementById('education');
const experienceSection = document.getElementById('experience');
const projectsSection = document.getElementById('projects');
const certificationsSection = document.getElementById('certifications');
const connectSection = document.getElementById('connect');

function showPortfolioLayout() {
    heroSection.style.display = 'none';
    if(aboutSection) aboutSection.style.display = 'flex';
    if(skillsSection) skillsSection.style.display = 'flex';
    if(educationSection) educationSection.style.display = 'flex';
    if(experienceSection) experienceSection.style.display = 'flex';
    if(projectsSection) projectsSection.style.display = 'flex';
    if(certificationsSection) certificationsSection.style.display = 'flex';
    if(connectSection) connectSection.style.display = 'flex';
}

// Flow 1: Complete Chain Auto Scroll 
exploreBtn.addEventListener('click', () => {
    showPortfolioLayout();
    window.scrollTo(0, 0);

    // Skills 
    setTimeout(() => {
        if(skillsSection) skillsSection.scrollIntoView({ behavior: 'smooth' });

        // Education 
        setTimeout(() => {
            if(educationSection) educationSection.scrollIntoView({ behavior: 'smooth' });

            // Experience 
            setTimeout(() => {
                if(experienceSection) experienceSection.scrollIntoView({ behavior: 'smooth' });

                // Projects 
                setTimeout(() => {
                    if(projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });

                    // Certifications 
                    setTimeout(() => {
                        if(certificationsSection) certificationsSection.scrollIntoView({ behavior: 'smooth' });

                        // Let's Connect 
                        setTimeout(() => {
                            if(connectSection) connectSection.scrollIntoView({ behavior: 'smooth' });
                        }, 2000); 

                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);
});

// Flow 2: Direct Projects Button Click
projectsBtn.addEventListener('click', () => {
    showPortfolioLayout();
    setTimeout(() => {
        if(projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

// Flow 3: Direct Let's Connect Button Click
connectBtnHero.addEventListener('click', () => {
    showPortfolioLayout();
    setTimeout(() => {
        if(connectSection) connectSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

// 3. Scroll Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('page-visible');

            const popElements = entry.target.querySelectorAll('.pop-element');
            popElements.forEach((el, index) => {
                setTimeout(() => { el.classList.add('element-anim'); }, 200 + (index * 250));
            });

            const dropElements = entry.target.querySelectorAll('.drop-element');
            dropElements.forEach((el, index) => {
                setTimeout(() => { el.classList.add('drop-anim'); }, 500 + (index * 250));
            });

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

if(aboutSection) observer.observe(aboutSection);
if(skillsSection) observer.observe(skillsSection);
if(educationSection) observer.observe(educationSection);
if(experienceSection) observer.observe(experienceSection);
if(projectsSection) observer.observe(projectsSection);
if(certificationsSection) observer.observe(certificationsSection);
if(connectSection) observer.observe(connectSection);


// code blocking
document.addEventListener('contextmenu', event => event.preventDefault()); 

document.addEventListener('keydown', event => {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U 
    if (event.keyCode === 123 || 
        (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74)) || 
        (event.ctrlKey && event.keyCode === 85)) {
        event.preventDefault();
    }
});