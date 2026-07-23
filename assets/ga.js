/* Analytics loader — Dulhan Mehndi Art (GA4 + Microsoft Clarity) */
(function () {
  var GA_MEASUREMENT_ID = 'G-8L6H15JS6Q';
  var CLARITY_PROJECT_ID = 'xqeap9612a';

  function loadGtag() {
    if (!GA_MEASUREMENT_ID || window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };

    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(gtagScript);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }

  function loadClarity() {
    if (!CLARITY_PROJECT_ID || window.clarity) return;

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
  }

  function bootAnalytics() {
    loadGtag();
    loadClarity();
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(bootAnalytics, { timeout: 2000 });
  } else {
    window.setTimeout(bootAnalytics, 0);
  }
})();
