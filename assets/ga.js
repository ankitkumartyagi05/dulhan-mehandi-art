/* Google Analytics 4 loader — Dulhan Mehndi Art
   HOW TO ACTIVATE:
   1. Create a GA4 property at https://analytics.google.com
   2. Replace G-XXXXXXXXXX below with your real Measurement ID.
   That's it — this file stays inactive until a real ID is set,
   so the placeholder never fires bogus requests. */
(function () {
  var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
})();

