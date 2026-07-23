/* Dulhan Mehndi Art — shared script */
(function () {
  'use strict';

  var PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#F3E9D5"/><g fill="none" stroke="#8E1F41" stroke-width="2"><circle cx="200" cy="200" r="70"/><circle cx="200" cy="200" r="45"/><circle cx="200" cy="200" r="18"/><path d="M200 110c12 16 28 16 36 32-16 8-24 24-36 28-12-4-20-20-36-28 8-16 24-16 36-32ZM200 290c12-16 28-16 36-32-16-8-24-24-36-28-12 4-20 20-36 28 8 16 24 16 36 32Z"/></g><text x="200" y="365" font-family="Georgia" font-size="20" fill="#6B4A2E" text-anchor="middle">Dulhan Mehndi Art</text></svg>');

  function enableDeferredFonts() {
    document.querySelectorAll('link[data-deferred-fonts]').forEach(function (fontLink) {
      fontLink.media = 'all';
      fontLink.removeAttribute('data-deferred-fonts');
    });
  }

  function parseJsonScript(id) {
    var el = document.getElementById(id);
    if (!el) return [];
    try {
      var parsed = JSON.parse(el.textContent || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function hydrateLazyVideo(video) {
    if (!video || video.dataset.loaded === '1') return;
    var src = video.getAttribute('data-src');
    if (!src || !/^assets\/videos\/[^?#]+\.(mp4)$/i.test(src)) return;
    video.src = src;
    video.dataset.loaded = '1';
    video.removeAttribute('data-src');
  }

  function observeLazyVideos(scope) {
    var videos = scope.querySelectorAll('video[data-src]');
    if (!videos.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          hydrateLazyVideo(entry.target);
          obs.unobserve(entry.target);
        });
      }, { rootMargin: '240px 0px' });

      videos.forEach(function (video) {
        observer.observe(video);
      });
    } else {
      videos.forEach(hydrateLazyVideo);
    }

    videos.forEach(function (video) {
      if (video.dataset.lazyBound === '1') return;
      video.dataset.lazyBound = '1';
      video.addEventListener('play', function () {
        hydrateLazyVideo(video);
      }, { once: true });
      video.addEventListener('pointerdown', function () {
        hydrateLazyVideo(video);
      }, { once: true, passive: true });
    });
  }

  enableDeferredFonts();

  /* mobile menu */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* footer year */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* landing-page gallery preview fallbacks */
  document.querySelectorAll('img[data-ph]').forEach(function (img) {
    img.onerror = function () {
      this.onerror = null;
      this.src = PLACEHOLDER;
    };
  });

  /* gallery page */
  var photoGrid = document.getElementById('photoGrid');
  if (photoGrid) {
    var PHOTO_FILES = parseJsonScript('photo-files');

    PHOTO_FILES.forEach(function (file, i) {
      var fig = document.createElement('figure');
      fig.dataset.index = String(i);
      fig.setAttribute('role', 'button');
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('aria-label', 'Open image ' + (i + 1));

      var img = document.createElement('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = 'Mehndi design by Dulhan Mehndi Art — ' + file.replace(/_/g, ' ').replace(/\.(jpg|png)$/i, '');
      img.src = encodeURI('assets/photos/' + file);
      img.dataset.full = img.src;
      img.onerror = function () {
        this.onerror = null;
        this.src = PLACEHOLDER;
        this.dataset.full = '';
      };

      fig.appendChild(img);
      photoGrid.appendChild(fig);
    });

    var lightbox = document.getElementById('lightbox');
    var lbImg = document.getElementById('lbImg');
    var lbClose = document.getElementById('lbClose');
    var lbPrev = document.getElementById('lbPrev');
    var lbNext = document.getElementById('lbNext');
    var lbIndex = 0;

    function openLightbox(i) {
      lbIndex = i;
      var img = photoGrid.children[i].querySelector('img');
      lbImg.src = img.dataset.full || img.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function stepLightbox(d) {
      lbIndex = (lbIndex + d + PHOTO_FILES.length) % PHOTO_FILES.length;
      var img = photoGrid.children[lbIndex].querySelector('img');
      lbImg.src = img.dataset.full || img.src;
    }

    if (lightbox && lbImg && lbClose && lbPrev && lbNext && PHOTO_FILES.length) {
      photoGrid.addEventListener('click', function (e) {
        var fig = e.target.closest('figure');
        if (!fig || !photoGrid.contains(fig)) return;
        openLightbox(Number(fig.dataset.index));
      });

      photoGrid.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var fig = e.target.closest('figure');
        if (!fig || !photoGrid.contains(fig)) return;
        e.preventDefault();
        openLightbox(Number(fig.dataset.index));
      });

      lbClose.addEventListener('click', closeLightbox);
      lbPrev.addEventListener('click', function () { stepLightbox(-1); });
      lbNext.addEventListener('click', function () { stepLightbox(1); });
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });

      document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        if (e.key === 'ArrowRight') stepLightbox(1);
      });
    }
  }

  var videoGrid = document.getElementById('videoGrid');
  if (videoGrid) {
    var VIDEO_FILES = parseJsonScript('video-files');

    VIDEO_FILES.forEach(function (video) {
      if (!video || !video.file || !video.title) return;

      var card = document.createElement('div');
      card.className = 'vframe';

      var vid = document.createElement('video');
      vid.controls = true;
      vid.preload = 'none';
      vid.setAttribute('playsinline', '');
      vid.title = video.title;
      vid.setAttribute('data-src', encodeURI('assets/videos/' + video.file));

      card.appendChild(vid);

      var caption = document.createElement('p');
      caption.textContent = video.title;
      card.appendChild(caption);

      videoGrid.appendChild(card);
    });

    observeLazyVideos(videoGrid);
  }

  observeLazyVideos(document);

  /* contact form -> WhatsApp */
  var form = document.getElementById('bookForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('fName').value.trim();
      var phone = document.getElementById('fPhone').value.trim();
      var occ = document.getElementById('fOccasion').value;
      var date = document.getElementById('fDate').value;
      var msg = document.getElementById('fMsg').value.trim();

      var text = 'Namaste! I would like to book a mehndi appointment.\n'
        + '\u2022 Name: ' + name + '\n'
        + '\u2022 Phone: ' + phone + '\n'
        + '\u2022 Occasion: ' + occ
        + (date ? '\n\u2022 Preferred date: ' + date : '')
        + (msg ? '\n\u2022 Details: ' + msg : '');

      window.open('https://wa.me/917428507199?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }
})();
