const projectsData = [
    {
        id: 1,
        title: "Boss Attacks",
        category: "java",
        image: "images/thumbnails/boss-testing-thumbnail.png",
        description: "Used to test out how particles work.",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "streamable", url: "https://streamable.com/jhmxkz", caption: "Thunderstrike: Strikes the player with a bolt of lightning. Almost like a orbital beam." },
            { type: "streamable", url: "https://streamable.com/306slk", caption: "Cacoon: Removes the players ability to walk and strikes them with thunder." },
            { type: "streamable", url: "https://streamable.com/kcojye", caption: "Forbidden Glyphs: Remove options from the player." }
        ]
    },
    {
        id: 2,
        title: "Fishing Simulator",
        category: "java",
        image: 'images/thumbnails/fishing-simulator-thumbnail.png',
        description: "Complete with an fishing index, cosmetic particles (when a fish is caught using a rod), buffs, rarities, and gears.",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "streamable", url: "https://streamable.com/61e6ce", caption: "Fishing Rod Effects - Showcases 2 effects, one for the Mythic Rod rairty and one for the Legendary Rod rarity." },
            { type: "streamable", url: "https://streamable.com/d13zl1", caption: "Fishing Index Showcase" },
            { type: "streamable", url: "https://streamable.com/j6dd0d", caption: "Fishing Gear Showcase" }
        ]
    },
    {
        id: 3,
        title: "Auction House",
        category: "java",
        image: 'images/thumbnails/auction-house-thumbnail.png',
        description: "A plugin that allows players to sell and buy items in a virtual auction house.",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "streamable", url: "https://streamable.com/eqpyw7", caption: "Auction House Showcase" }
        ]
    },
    {
        id: 4,
        title: "Loot Crates",
        category: "skript",
        image: 'images/thumbnails/loot-crate-thumbnail.png',
        description: "Add items into your crate and when right clicked, shoots out the items that was input into the crate.",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "streamable", url: "https://streamable.com/264q9d", caption: "Loot Crate Showcase" }
        ]
    },
    {
        id: 5,
        title: "Portfolio Website",
        category: "web",
        image: 'images/thumbnails/portfolio-thumbnail.png',
        description: "The website you're currently on!",
        links: [
            { text: "Demo", url: "#" }
        ],
        media: [
            { type: "image", url: "images/thumbnails/portfolio-thumbnail.png", caption: "Portfolio Showcase" }
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
});

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "square",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 4
                    }
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.2,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "top",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
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
        } else if (media.type === 'streamable') {
            let videoId = media.url;
            if (media.url.includes('streamable.com/')) {
                const matches = media.url.match(/streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/);
                if (matches && matches[1]) {
                    videoId = matches[1];
                }
            }
            const iframe = document.createElement('iframe');
            iframe.src = `https://streamable.com/e/${videoId}`;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            const iframeContainer = document.createElement('div');
            iframeContainer.className = 'streamable-container';
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