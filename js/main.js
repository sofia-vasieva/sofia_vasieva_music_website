/* ============================================================
   SOFIA VASIEVA — MAIN JAVASCRIPT
   Handles: navigation scroll, mobile menu, music drawer
   ============================================================ */

// ── NAVIGATION: transparent → frosted-glass on scroll ──
const nav = document.querySelector('.nav');
function updateNav() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── MOBILE NAV TOGGLE ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── HERO ENTRANCE ANIMATION ──
const hero = document.querySelector('.hero');
if (hero) {
  setTimeout(() => hero.classList.add('loaded'), 100);
}

/* ============================================================
   MUSIC DRAWER DATA
   ============================================================

   This is where all streaming links for albums and singles live.

   HOW TO UPDATE A LINK:
   Find the entry below (e.g. sky: { ... }) and change the URL string.

   HOW TO ADD A NEW ALBUM OR SINGLE:
   1. Copy one of the existing entries below.
   2. Paste it at the bottom of the list (before the closing }).
   3. Give it a unique key name (e.g. album2, newSingle).
   4. In music.html, add a matching <div class="album-card" data-album="thatKey">.

   LEAVING A LINK EMPTY:
   Just leave the value as an empty string: spotify: ''
   That platform's button will simply not appear in the drawer.

   ============================================================ */
const albums = {

  // ── SKY (SPECIAL EDITION) ──
  skyse: {
    name: 'Sky (Special Edition)',
    year: '31 March 2026',
    cover: 'images/albums/sky-special-edition.png',
    spotify:      '', // UPDATE: add Spotify album link when live
    appleMusic:   '', // UPDATE: add Apple Music link when live
    youtubeMusic: '', // UPDATE: add YouTube Music link when live
    bandcamp:     '', // UPDATE: add Bandcamp link if applicable
    soundcloud:   '',
  },

  // ── SKY (ORIGINAL, 2022) ──
  sky: {
    name: 'Sky',
    year: '2022',
    cover: 'images/albums/sky.png',
    spotify:      'https://open.spotify.com/album/0wvh6Ya2eiq0gS8Y3p2ku6',
    appleMusic:   'https://music.apple.com/gb/album/sky/1651735423',
    youtubeMusic: '', // UPDATE: add YouTube Music link if available
    bandcamp:     '',
    soundcloud:   '',
  },

  // ── SINGLE: STARLIGHT ──
  starlight: {
    name: 'Starlight',
    year: '2022',
    cover: 'images/albums/starlight.png',
    spotify:      'https://open.spotify.com/track/6XGBOUZyXqqghMiWU0dRG4',
    appleMusic:   'https://music.apple.com/us/song/starlight/1650028849',
    youtubeMusic: '',
    bandcamp:     '',
    soundcloud:   '',
  },

  // ── SINGLE: UNDER WATER ──
  underWater: {
    name: 'Under Water',
    year: '2022',
    cover: 'images/albums/under-water.png',
    spotify:      'https://open.spotify.com/track/5gpzUW6FO9XDsdh7SvnX1B',
    appleMusic:   'https://music.apple.com/us/song/under-water/1651342786',
    youtubeMusic: '',
    bandcamp:     '',
    soundcloud:   '',
  },

  // ── TEMPLATE FOR NEW ENTRIES ──
  // album2: {
  //   name: 'Your Title',
  //   year: '2026',
  //   cover: 'images/albums/your-cover.jpg',
  //   spotify:      'https://open.spotify.com/album/...',
  //   appleMusic:   'https://music.apple.com/...',
  //   youtubeMusic: '',
  //   bandcamp:     '',
  //   soundcloud:   '',
  // },

};

/* ============================================================
   DRAWER LOGIC — no editing needed below here
   ============================================================ */
const drawerOverlay = document.getElementById('drawerOverlay');
const drawer        = document.getElementById('albumDrawer');
const drawerClose   = document.getElementById('drawerClose');

function openDrawer(albumKey) {
  const album = albums[albumKey];
  if (!album || !drawerOverlay || !drawer) return;

  // Populate cover image
  const coverEl = document.getElementById('drawerCover');
  if (coverEl) {
    coverEl.innerHTML = `<img src="${album.cover}" alt="${album.name} cover"
      onerror="this.parentElement.innerHTML='<div class=\\'drawer-cover-placeholder\\'>Cover coming soon</div>'">`;
  }

  // Populate title and year
  const nameEl = document.getElementById('drawerName');
  const yearEl = document.getElementById('drawerYear');
  if (nameEl) nameEl.textContent = album.name;
  if (yearEl) yearEl.textContent = album.year;

  // Build streaming links
  const linksEl = document.getElementById('drawerLinks');
  if (linksEl) {
    const links = [];

    if (album.spotify) links.push({
      label: 'Spotify',
      url: album.spotify,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`
    });

    if (album.appleMusic) links.push({
      label: 'Apple Music',
      url: album.appleMusic,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A6.152 6.152 0 000 5.494v13.01c.01.28.02.56.04.84.07.85.29 1.67.7 2.43.7 1.3 1.76 2.15 3.19 2.59.56.17 1.14.26 1.73.28.29.01.58.03.87.03h13c.25 0 .5-.01.75-.03a7.3 7.3 0 001.57-.29 4.9 4.9 0 002.5-1.78c.58-.8.93-1.7 1.07-2.68.05-.32.07-.64.09-.96V6.62c-.01-.17-.01-.33-.02-.5zm-6.427 3.78v5.14c0 .39-.09.76-.28 1.09-.27.47-.67.79-1.19.92-.27.07-.55.1-.83.09-.83-.03-1.52-.65-1.64-1.47-.12-.82.38-1.62 1.18-1.89.31-.1.64-.13.96-.07.21.04.41.09.62.14V7.02c0-.08.01-.16.02-.24.04-.33.24-.52.57-.54.23-.01.46.01.69.04l3.39.54c.33.05.49.22.5.55.01.25 0 .5 0 .75v.55c0 .39-.23.61-.62.57-.98-.12-1.96-.25-2.94-.37-.15-.02-.21.03-.22.18z"/></svg>`
    });

    if (album.youtubeMusic) links.push({
      label: 'YouTube Music',
      url: album.youtubeMusic,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12z"/></svg>`
    });

    if (album.bandcamp) links.push({
      label: 'Bandcamp',
      url: album.bandcamp,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 18.75l7.437-13.5H24l-7.438 13.5z"/></svg>`
    });

    if (album.soundcloud) links.push({
      label: 'SoundCloud',
      url: album.soundcloud,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225c-.15 0-.267.12-.283.27l-.4 2.725.4 2.725c.016.15.133.27.283.27.15 0 .267-.12.283-.27l.45-2.725-.45-2.725c-.016-.15-.133-.27-.283-.27zm1.534-.4c-.183 0-.333.15-.35.333l-.35 3.125.35 3.08c.017.183.167.333.35.333.183 0 .333-.15.35-.333l.4-3.08-.4-3.125c-.017-.183-.167-.333-.35-.333zm10.45-3.6c-.133 0-.25.05-.342.133-.233-2.65-2.45-4.717-5.167-4.717-1.5 0-2.833.567-3.833 1.5-.375.35-.567.733-.583 1.133v10.2c0 .45.367.817.817.817h9.108c.45 0 .817-.367.817-.817V9.325c0-.45-.367-.817-.817-.817z"/></svg>`
    });

    if (links.length === 0) {
      linksEl.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem;font-family:var(--serif);">Streaming links coming soon.</p>';
    } else {
      linksEl.innerHTML = links.map(l =>
        `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="streaming-link">
          ${l.icon}${l.label}
        </a>`
      ).join('');
    }
  }

  drawerOverlay.classList.add('open');
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (!drawerOverlay || !drawer) return;
  drawerOverlay.classList.remove('open');
  drawer.classList.remove('open');
  document.body.style.overflow = '';
}

if (drawerClose)   drawerClose.addEventListener('click', closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

document.querySelectorAll('.album-card[data-album]').forEach(card => {
  card.addEventListener('click', () => openDrawer(card.dataset.album));
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openDrawer(card.dataset.album);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});
