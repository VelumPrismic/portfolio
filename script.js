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
const toast = document.getElementById('toast');

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
