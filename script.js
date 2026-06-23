// Python Projects 
// Java Projects
// MC Projects

const projects = [
  {
    title: "Password Manager",
    description: "A secure password management app built with Python and Tkinter. It comes with a password generator, strength checker, and an encrypted vault to store all your credentials locally.",
    category: "python",
    tags: ["Python", "2026"],
    date: "2026",
    link: "https://github.com/VelumPrismic/PasswordManager"
  },
  {
    title: "Python Bot",
    description: "A useful Discord Bot made with Python. It's features include the standard moderation tools, auto threads, sticky messages, etc.",
    category: "python",
    tags: ["Python", "2026"],
    date: "2026",
    link: "https://github.com/VelumPrismic/DiscordBot",
    video: ""
  },
  {
    title: "LiteBrowse",
    description: "LiteBrowse is a web-based SQLite database explorer built with FastAPI that lets users upload, browse, search, sort, and edit database files through a dark-themed browser interface.",
    category: "python",
    tags: ["Python", "SQLite", "2026"],
    date: "2026",
    link: "https://github.com/VelumPrismic/LiteBrowse"
  },
  {
    title: "Block Blast Remake",
    description: "A remake of the popular mobile game 'Block Blast' in Java.",
    category: "java",
    tags: ["Java", "2026"],
    date: "2026",
    link: "https://github.com/VelumPrismic/BlockBlastRemake"
  },
  {
    title: "Random Weapons",
    description: "An all-in-one plugin that has a couple of weapons made using Java. It's main focus is to show VFX + SFX Work.",
    category: "minecraft",
    tags: ["Minecraft", "Java", "2026"],
    date: "2026",
    link: "",
    video: "https://www.youtube.com/watch?v=TZ7B7Exs9Nk"
  },
  {
    title: "Cutscenes",
    description: "A plugin to make cutscenes in Vanilla Minecraft.",
    category: "minecraft",
    tags: ["Minecraft", "Java", "Commission", "2026"],
    date: "2026",
    link: "",
    video: "https://www.youtube.com/watch?v=qtBsWj-aNYY"
  },
  {
    title: "Courier",
    description: "A plugin that uses Discords Bot API to add linking accounts, showing online players, and more. It has a highly customizable config.yml file to allow for a lot of different use cases.",
    category: "minecraft",
    tags: ["Minecraft", "Java", "SQLite", "2025"],
    date: "2025",
    link: "https://github.com/VelumPrismic/Courier"
  },
];

const experience = [
    {
    server: "Shyft",
    role: "Founder",
    period: "2026 - Present",
    description: "Shyft is an MMORPG Minecraft Server where I was responsible for architecting and developing the server's core systems including combat, dungeons, quests, player progression (levels, ascensions, stats, races, traits, clans), custom mobs, mining, economy and ensuring stability and delivering new features iteratively based on playtesting feedback.",
    demo: true
  },
  {
    server: "CoreBreak",
    role: "Lead Developer",
    period: "2025 - 2026",
    description: "Corebreak is a PvP Minecraft Server where I led the design and implementation of the server's foundational systems from combat mechanics and quest loops to player progression (prestige, stats, tiers, trinkets, generators), custom items, dual-currency economy, daily rewards, playtime milestones, island exploration, kill streaks, player profiles, and boosters while continuously iterating on stability and features based on playtester feedback.",
    demo: true
  },
];

function renderExperience() {
  const timeline = document.querySelector('.timeline');
  timeline.innerHTML = experience.map(exp => `
    <div class="timeline-item reveal">
      <div class="timeline-content">
        <div class="timeline-period">${exp.period}</div>
        <h3>${exp.server} • ${exp.role}</h3>
        <p>${exp.description}</p>
        ${exp.demo ? `<button class="demo-btn" onclick="requestDemo('${exp.server}')">Request Demo</button>` : ''}
      </div>
    </div>
  `).join('');
}

function renderProjects() {
  const grid = document.querySelector('.projects-grid');
  const sorted = [...projects].sort((a, b) => (b.date || '0').localeCompare(a.date || '0'));
  grid.innerHTML = sorted.map(p => `
    <div class="project-card" data-category="${p.category}" data-year="${p.date}">
      <div class="card-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tags">
          ${p.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="card-links">
          ${p.link ? `<a href="${p.link}" class="card-link" target="_blank">GitHub</a>` : ''}
          ${p.video ? `<a href="${p.video}&autoplay=1" class="card-link" target="_blank">Showcase</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

renderProjects();
renderExperience();

function updateClock() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const gmt8 = new Date(utc + 8 * 3600000);
  let h = gmt8.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const m = String(gmt8.getMinutes()).padStart(2, '0');
  document.getElementById('clock').innerHTML = `${h}<span class="colon">:</span>${m} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);

const tabButtons = document.querySelectorAll('.tab-btn');
const projectCards = document.querySelectorAll('.project-card');
const yearSelect = document.getElementById('yearFilter');

const years = [...new Set(projects.map(p => p.date).filter(Boolean))].sort().reverse();
years.forEach(y => {
  const opt = document.createElement('option');
  opt.value = y;
  opt.textContent = y;
  yearSelect.appendChild(opt);
});

const noResults = document.querySelector('.no-results');

function filterProjects() {
  const activeTab = document.querySelector('.tab-btn.active');
  const categoryFilter = activeTab.dataset.filter;
  const yearFilter = yearSelect.value;
  let visibleCount = 0;

  projectCards.forEach((card, i) => {
    const categoryMatch = categoryFilter === 'all' || card.dataset.category === categoryFilter;
    const yearMatch = yearFilter === 'all' || card.dataset.year === yearFilter;
    const match = categoryMatch && yearMatch;

    card.classList.toggle('hidden', !match);
    if (match) {
      visibleCount++;
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = `fadeSlideUp 0.3s ${i * 0.03}s ease both`;
    }
  });

  noResults.classList.toggle('hidden', visibleCount > 0);
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProjects();
  });
});

yearSelect.addEventListener('change', filterProjects);

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});

const DISCORD_USERNAME = 'VelumPrismic';
const DISCORD_USER_ID = '593013320819146753'; 
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1518829328887185550/G4ZAlxR-TOE-LcPV7hIJu8lUG6zfRJL9W_BrOe67Qvo1g70MhiaI9xy0_d0MiVKUcy1_'; 
const toast = document.getElementById('toast');

const DEMO_COOLDOWN = 60000;

const modalOverlay = document.getElementById('demo-modal');
const modalInput = document.getElementById('demo-input');
const modalSubmit = document.getElementById('demo-submit');
const modalCancel = document.getElementById('demo-cancel');

function openModal() {
  return new Promise(resolve => {
    modalOverlay.classList.add('open');
    modalInput.value = '';
    modalInput.focus();

    function close(value) {
      modalOverlay.classList.remove('open');
      resolve(value);
    }

    modalSubmit.onclick = () => {
      const val = modalInput.value.trim();
      if (val) close(val);
    };
    modalCancel.onclick = () => close(null);
    modalInput.onkeydown = e => {
      if (e.key === 'Enter') modalSubmit.click();
      if (e.key === 'Escape') modalCancel.click();
    };
  });
}

function sendDemo(serverName, discord) {
  fetch(DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `<@${DISCORD_USER_ID}>`,
      allowed_mentions: { users: [DISCORD_USER_ID] },
      embeds: [{
        title: `Demo Request — ${serverName}`,
        color: 0xC41E3A,
        fields: [
          { name: 'Discord', value: discord, inline: true },
          { name: 'Browser', value: navigator.userAgent.slice(0, 100), inline: true },
          { name: 'Page', value: window.location.href, inline: false }
        ],
        footer: { text: new Date().toLocaleString() }
      }]
    })
  }).then(() => {
    localStorage.setItem(`demo_${serverName}`, Date.now());
    toast.textContent = `Demo request sent for ${serverName}! I'll be in touch.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }).catch(() => {
    toast.textContent = 'Failed to send request. Try again later.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  });
}

function requestDemo(serverName) {
  const last = localStorage.getItem(`demo_${serverName}`);
  if (last && Date.now() - Number(last) < DEMO_COOLDOWN) {
    const remaining = Math.ceil((DEMO_COOLDOWN - (Date.now() - Number(last))) / 1000);
    toast.textContent = `Please wait ${remaining}s before requesting another demo.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    return;
  }
  if (!DISCORD_WEBHOOK) {
    toast.textContent = 'Demo requests are not configured yet.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    return;
  }
  openModal().then(discord => {
    if (discord) sendDemo(serverName, discord);
  });
}

document.querySelectorAll('.discord-link').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(DISCORD_USERNAME).then(() => {
      toast.textContent = `Copied my Discord Username to clipboard (${DISCORD_USERNAME})`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });
});
