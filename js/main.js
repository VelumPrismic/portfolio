const projectsData = [
    {
        id: 1,
        title: "Auction House",
        category: "java",
        image: 'images/thumbnails/auction-house-thumbnail.png',
        description: "A plugin that allows players to sell and buy items in a virtual auction house.",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "youtube", url: "https://www.youtube.com/embed/_UFEEtPRjBY", caption: "Showcase" }
        ]
    },
    {
        id: 2,
        title: "Bank System",
        category: "java",
        image: 'images/thumbnails/bank-system-thumbnail.png',
        description: "A banking system to hold the coins of players. Complete with a interest system (and bank upgrades) that gives players coins every hour.",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "youtube", url: "https://www.youtube.com/embed/F2RnfgDcTLU", caption: "Showcase" }
        ]
    },
    {
        id: 3,
        title: "Particle Testing Plugin",
        category: "java",
        image: 'images/no-thumbnail.png',
        description: "A plugin for particle testing (sound effects as well).",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "youtube", url: "https://www.youtube.com/embed/z3AcDyZPXB4", caption: "Item Showcase" },
            { type: "youtube", url: "https://www.youtube.com/embed/MoKtQ4IVk", caption: "Boss Attacks Showcase" },
        ]
    },
    {
        id: 4,
        title: "Reset Map Plugin",
        category: "java",
        image: 'images/no-thumbnail.png',
        description: "A plugin to reset worlds to the previous state.",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "youtube", url: "https://www.youtube.com/embed/9GxZOujKnuw", caption: "Showcase" }
        ]
    },
    {
        id: 5,
        title: "Minions Plugin",
        category: "java",
        image: 'images/thumbnails/minions-thumbnail.png',
        description: "A plugin that mimics Hypixel Skyblock Minion System. (More barebones and less polished)",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "youtube", url: "https://www.youtube.com/embed/UCkQRis2BDw", caption: "Showcase" }
        ]
    },
    {
        id: 6,
        title: "Disguise Plugin",
        category: "java",
        image: 'images/thumbnails/disguise-thumbnail.png',
        description: "A plugin that allows you to change your skin, your name and your rank. (Ranks hook up with LuckPerms API)",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "youtube", url: "https://www.youtube.com/embed/XEyYZYUgTHw", caption: "Showcase" }
        ]
    },
    {
        id: 7,
        title: "Portfolio Website",
        category: "web",
        image: 'images/thumbnails/portfolio-thumbnail.png',
        description: "The website you're currently on!",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "image", url: "images/thumbnails/portfolio-thumbnail.png", caption: "Showcase" }
        ]
    },    

];

const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    loadProjects('all');
    initSmoothScroll();
    initStickyHeader();
    addMinecraftSounds();
    init3DHoverEffects();
    addDiscordAlerts();
    initParticleControls();
});

function initParticleControls() {
    const particleButton = document.getElementById('particle-test-btn');
    if (particleButton) {
        particleButton.addEventListener('click', showAllParticles);
    }
}

function initParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    container.innerHTML = '';
    window.particles = [];
    window.particleCount = 40;
    window.animationFrameId = null;
    
    const createParticle = (x, y, depth, velX, velY) => {
        const particle = document.createElement('div');
        particle.className = 'minecraft-particle';
        
        const size = 1 + Math.random() * 3;
        const scale = 0.5 + depth * 0.5;
        const actualSize = size * scale;
        
        particle.style.width = `${actualSize}px`;
        particle.style.height = `${actualSize}px`;
        particle.style.backgroundColor = '#ffffff';
        particle.style.boxShadow = `0 0 ${2 + depth * 3}px rgba(255, 255, 255, ${0.3 + depth * 0.4})`;
        particle.style.opacity = 0.3 + depth * 0.7;
        particle.style.transform = `translateZ(${depth * 20}px)`;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        const lifespan = 5000 + Math.random() * 7000;
        
        const particleObj = {
            element: particle,
            x,
            y,
            velX: velX || (Math.random() - 0.5) * 0.4,
            velY: velY || (Math.random() - 0.5) * 0.4,
            size: actualSize,
            depth,
            lifespan,
            birth: Date.now(),
            wobbleOffset: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.5 + Math.random() * 2
        };
        
        window.particles.push(particleObj);
        container.appendChild(particle);
        
        return particleObj;
    };
    
    for (let i = 0; i < window.particleCount; i++) {
        createParticle(
            Math.random() * 100,
            Math.random() * 100,
            Math.random(),
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4
        );
    }
    
    function update() {
        const now = Date.now();
        const deadParticles = [];
        
        window.particles.forEach((p, idx) => {
            const age = now - p.birth;
            if (age > p.lifespan) {
                deadParticles.push(idx);
                return;
            }
            
            const lifeRatio = age / p.lifespan;
            
            // Add some wobble to movement
            const wobble = Math.sin(now * 0.001 * p.wobbleSpeed + p.wobbleOffset) * 0.05;
            
            p.velY += (Math.random() - 0.48) * 0.01; // Slight upward bias
            p.velX += (Math.random() - 0.5) * 0.01;
            
            // Dampen velocity over time
            p.velX *= 0.99;
            p.velY *= 0.99;
            
            p.x += p.velX + wobble;
            p.y += p.velY;
            
            // Wrap around screen edges with some randomness
            if (p.x < -5) p.x = 105 - Math.random() * 10;
            if (p.x > 105) p.x = -5 + Math.random() * 10;
            if (p.y < -5) p.y = 105 - Math.random() * 10;
            if (p.y > 105) p.y = -5 + Math.random() * 10;
            
            p.element.style.left = `${p.x}%`;
            p.element.style.top = `${p.y}%`;
            p.element.style.opacity = (1 - lifeRatio) * (0.3 + p.depth * 0.7);
        });
        
        // Remove dead particles from end to start
        for (let i = deadParticles.length - 1; i >= 0; i--) {
            const idx = deadParticles[i];
            if (window.particles[idx] && window.particles[idx].element) {
                container.removeChild(window.particles[idx].element);
                window.particles.splice(idx, 1);
            }
        }
        
        // Add new particles occasionally
        if (window.particles.length < 100 && Math.random() < 0.1) {
            createParticle(
                Math.random() * 100,
                Math.random() * 100,
                Math.random(),
                (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.4
            );
        }
        
        window.animationFrameId = requestAnimationFrame(update);
    }
    
    update();
}

function showAllParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    if (window.animationFrameId) {
        cancelAnimationFrame(window.animationFrameId);
    }
    
    container.innerHTML = '';
    window.particles = [];
    
    const burstParticles = () => {
        const center = { x: 50, y: 50 };
        const count = 150;
        
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 30;
            const speed = 0.5 + Math.random() * 2;
            
            const x = center.x + Math.cos(angle) * (Math.random() * 5);
            const y = center.y + Math.sin(angle) * (Math.random() * 5);
            
            const velX = Math.cos(angle) * speed * (0.5 + Math.random() * 0.5);
            const velY = Math.sin(angle) * speed * (0.5 + Math.random() * 0.5);
            
            const depth = Math.random();
            
            const particle = document.createElement('div');
            particle.className = 'minecraft-particle';
            
            const baseSize = 1 + Math.random() * 3;
            const scale = 0.5 + depth * 0.5;
            const size = baseSize * scale;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = '#ffffff';
            particle.style.boxShadow = `0 0 ${2 + depth * 4}px rgba(255, 255, 255, ${0.4 + depth * 0.6})`;
            particle.style.opacity = 0.4 + depth * 0.6;
            particle.style.transform = `translateZ(${depth * 30}px)`;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            window.particles.push({
                element: particle,
                x,
                y,
                velX,
                velY,
                size,
                depth,
                drag: 0.97 + Math.random() * 0.02,
                gravity: 0.02 * (1 - depth * 0.5),
                wobble: {
                    speed: 0.5 + Math.random() * 2,
                    offset: Math.random() * Math.PI * 2,
                    magnitude: 0.05 + Math.random() * 0.1
                },
                birth: Date.now(),
                lifespan: 2000 + Math.random() * 3000
            });
            
            container.appendChild(particle);
        }
    };
    
    function update() {
        const now = Date.now();
        const deadParticles = [];
        
        window.particles.forEach((p, idx) => {
            const age = now - p.birth;
            if (age > p.lifespan) {
                deadParticles.push(idx);
                return;
            }
            
            const lifeRatio = age / p.lifespan;
            
            // Add some wobble and physics
            const wobble = Math.sin(now * 0.001 * p.wobble.speed + p.wobble.offset) * p.wobble.magnitude;
            
            p.velY += p.gravity;
            p.velX += wobble;
            
            // Apply drag
            p.velX *= p.drag;
            p.velY *= p.drag;
            
            p.x += p.velX;
            p.y += p.velY;
            
            p.element.style.left = `${p.x}%`;
            p.element.style.top = `${p.y}%`;
            p.element.style.opacity = (1 - lifeRatio * 0.8) * (0.4 + p.depth * 0.6);
        });
        
        // Remove dead particles
        for (let i = deadParticles.length - 1; i >= 0; i--) {
            const idx = deadParticles[i];
            if (window.particles[idx]?.element) {
                container.removeChild(window.particles[idx].element);
                window.particles.splice(idx, 1);
            }
        }
        
        if (window.particles.length > 0) {
            window.animationFrameId = requestAnimationFrame(update);
        } else {
            initParticles();
        }
    }
    
    burstParticles();
    update();
    playSound('click');
}

function loadProjects(category) {
    projectsGrid.innerHTML = '';
    
    const filteredProjects = category === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === category);
    
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card', 'minecraft-block');
        
        projectCard.innerHTML = `
            <div class="project-img-container">
                <img src="${project.image}" alt="${project.title}" class="project-img zoomable-img">
            </div>
            <div class="project-info">
                <h3 class="minecraft-font">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-category">
                    <span class="category-label ${project.category}">${getCategoryLabel(project.category)}</span>
                </div>
                <div class="project-links">
                    ${project.links.map(link => {
                        if (link.text === "Demo" && project.media && project.media.length > 0) {
                            return `<button class="project-link minecraft-btn show-media-btn" data-project="${project.id}">View Demo</button>`;
                        } else {
                            return `<a href="${link.url}" class="project-link minecraft-btn" target="_blank">${link.text}</a>`;
                        }
                    }).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    initImageZoom();
    initMediaCarousel();
}

function initImageZoom() {
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const imageModal = document.createElement('div');
    imageModal.classList.add('image-modal');
    imageModal.innerHTML = `
        <div class="modal-content">
            <img class="modal-image" src="" alt="Zoomed Image">
        </div>
    `;
    document.body.appendChild(imageModal);

    const zoomableImages = document.querySelectorAll('.zoomable-img');
    const modalImage = imageModal.querySelector('.modal-image');
    
    zoomableImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectCard = img.closest('.project-card');
            if (projectCard) {
                const projectId = parseInt(projectCard.querySelector('.show-media-btn')?.dataset.project);
                if (projectId) {
                    return;
                }
            }
            
            modalImage.src = this.src;
            imageModal.style.display = 'flex';
            if (typeof playSound === 'function') {
                playSound('click');
            }
        });
    });
    
    imageModal.addEventListener('click', function() {
        this.style.display = 'none';
        if (typeof playSound === 'function') {
            playSound('click');
        }
    });
}

function initMediaCarousel() {
    const existingModal = document.querySelector('.media-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const mediaModal = document.createElement('div');
    mediaModal.classList.add('media-modal');
    mediaModal.innerHTML = `
        <div class="media-modal-content">
            <div class="media-container"></div>
            <div class="media-caption"></div>
            <div class="media-nav">
                <button class="media-prev minecraft-btn">&lt;</button>
                <div class="media-counter">1 / 1</div>
                <button class="media-next minecraft-btn">&gt;</button>
            </div>
        </div>
    `;
    document.body.appendChild(mediaModal);
    const showMediaBtns = document.querySelectorAll('.show-media-btn');
    const mediaPrev = mediaModal.querySelector('.media-prev');
    const mediaNext = mediaModal.querySelector('.media-next');
    const mediaContainer = mediaModal.querySelector('.media-container');
    const mediaCaption = mediaModal.querySelector('.media-caption');
    const mediaCounter = mediaModal.querySelector('.media-counter');
    
    let currentProject = null;
    let currentMediaIndex = 0;
    
    function showMedia(projectId, index = 0) {
        currentProject = projectsData.find(p => p.id === projectId);
        if (!currentProject || !currentProject.media || currentProject.media.length === 0) return;
        
        currentMediaIndex = index;
        updateMediaDisplay();
        mediaModal.style.display = 'flex';
        if (typeof playSound === 'function') {
            playSound('click');
        }
    }
    
    function updateMediaDisplay() {
        const media = currentProject.media[currentMediaIndex];
        mediaContainer.innerHTML = '';
        
        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = media.caption || currentProject.title;
            mediaContainer.appendChild(img);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            
            const source = document.createElement('source');
            source.src = media.url;
            source.type = 'video/mp4';
            
            video.appendChild(source);
            mediaContainer.appendChild(video);
        } else if (media.type === 'youtube') {
            const iframe = document.createElement('iframe');
            iframe.src = media.url;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            const iframeContainer = document.createElement('div');
            iframeContainer.className = 'youtube-container';
            iframeContainer.appendChild(iframe);
            
            mediaContainer.appendChild(iframeContainer);

        }
        
        mediaCaption.textContent = media.caption || '';
        mediaCounter.textContent = `${currentMediaIndex + 1} / ${currentProject.media.length}`;
        if (currentProject.media.length <= 1) {
            mediaPrev.style.display = 'none';
            mediaNext.style.display = 'none';
            mediaCounter.style.display = 'none';
        } else {
            mediaPrev.style.display = 'block';
            mediaNext.style.display = 'block';
            mediaCounter.style.display = 'block';
        }
    }
    
    showMediaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.dataset.project);
            showMedia(projectId);
        });
    });
    
    mediaPrev.addEventListener('click', function() {
        if (!currentProject) return;
        
        currentMediaIndex = (currentMediaIndex - 1 + currentProject.media.length) % currentProject.media.length;
        updateMediaDisplay();
        if (typeof playSound === 'function') {
            playSound('click');
        }
    });
    
    mediaNext.addEventListener('click', function() {
        if (!currentProject) return;
        
        currentMediaIndex = (currentMediaIndex + 1) % currentProject.media.length;
        updateMediaDisplay();

        if (typeof playSound === 'function') {
            playSound('click');
        }
    });
    
    mediaModal.addEventListener('click', function(e) {
        if (e.target === mediaModal) {
            mediaModal.style.display = 'none';
      
            const videos = mediaContainer.querySelectorAll('video');
            videos.forEach(video => video.pause());
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (mediaModal.style.display !== 'flex') return;
        
        if (e.key === 'Escape') {
            mediaModal.style.display = 'none';
            const videos = mediaContainer.querySelectorAll('video');
            videos.forEach(video => video.pause());
        } else if (e.key === 'ArrowLeft') {
            mediaPrev.click();
        } else if (e.key === 'ArrowRight') {
            mediaNext.click();
        }
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card minecraft-block';
    card.setAttribute('data-category', project.category);
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
            <span class="project-category">${getCategoryLabel(project.category)}</span>
            <h3 class="project-title minecraft-font">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-links">
                ${project.links.map(link => `<a href="${link.url}" class="project-link minecraft-font">${link.text} <i class="fas fa-arrow-right"></i></a>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

function getCategoryLabel(category) {
    switch(category) {
        case 'java':
            return 'Java Plugin';
        case 'skript':
            return 'Skript';
        case 'web':
            return 'Website'
        default:
            return category;
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        playSound('click');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
        loadProjects(filterValue);
    });
});

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    playSound('click');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        playSound('click');
    });
});

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initStickyHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
}

function addMinecraftSounds() {
    const sounds = {
        click: new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3'),
        hover: new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3')
    };
    
    for (const sound in sounds) {
        sounds[sound].load();
    }
    document.querySelectorAll('.btn, .filter-btn, .social-link, .contact-option').forEach(button => {
        button.addEventListener('click', () => playSound('click'));
        button.addEventListener('mouseenter', () => playSound('hover'));
    });
    
    window.playSound = function(soundName) {
        if (sounds[soundName]) {
            sounds[soundName].currentTime = 0;
            sounds[soundName].volume = 0.2;
            sounds[soundName].play().catch(e => console.log('Sound play prevented:', e));
        }
    };
}

function addDiscordAlerts() {
    const discordLinks = document.querySelectorAll('a[href*="discord.com"], a[href*="discord"] .fa-discord, .contact-option .fa-discord');
    const discordNotification = document.getElementById('discordNotification');
    const closeDiscordNotification = document.getElementById('closeDiscordNotification');
    
    function showDiscordNotification() {
        playSound('click');
        discordNotification.classList.remove('hide');
        discordNotification.style.display = 'block';
        setTimeout(() => {
            discordNotification.classList.add('show');
        }, 10);
    }

    function hideDiscordNotification() {
        discordNotification.classList.remove('show');
        discordNotification.classList.add('hide');
    
        setTimeout(() => {
            discordNotification.style.display = 'none';

            discordNotification.classList.remove('hide');
        }, 300);
    }

    discordLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showDiscordNotification();
        });
    });
    closeDiscordNotification.addEventListener('click', hideDiscordNotification);
    document.addEventListener('click', function(e) {
        if (discordNotification.style.display === 'block' && 
            !discordNotification.contains(e.target) && 
            !Array.from(discordLinks).some(link => link === e.target || link.contains(e.target))) {
            hideDiscordNotification();
        }
    });
}

function init3DHoverEffects() {
    const cards = document.querySelectorAll('.minecraft-block');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
}

const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            if (i % 2 === 0) {
                playSound('hover');
            }
            i++;
            setTimeout(typeWriter, 150);
        }
    }
    
    setTimeout(typeWriter, 500);
}
document.body.style.cursor = 'url(https://cur.cursors-4u.net/games/gam-11/gam1089.cur), auto';