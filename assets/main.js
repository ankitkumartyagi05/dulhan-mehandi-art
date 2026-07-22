/* Dulhan Mehndi Art — shared script */
var PHOTO_FILES = [
  "Classic Jaali & Vines Grid.jpg",
  "Classic_Bridal_Cuff_Art.jpg",
  "Contemporary_Minimalist_Henna.jpg",
  "Divine Heritage Bridal Art.jpg",
  "Ethereal_Peacock_Motif_Design.jpg",
  "Exquisite Paisley Symphony.jpg",
  "Graceful Floral Festoon.jpg",
  "Graceful_Vine_Forearm_Art.jpg",
  "Imperial vase and carving mehandi_.jpg",
  "Intricate_Radha_Krishna_Saga.jpg",
  "Majestic_Mandala_Hand_Art.jpg",
  "Mandala of prosperity.jpg",
  "marriage ceremony epic Mehndi_.jpg",
  "Mehandi tools_.jpg",
  "Motherhood & Beyond.jpg",
  "Motif Bridal Mehndi.jpg",
  "Palatial grace bridal_(1).jpg",
  "Palatial grace bridal_.jpg",
  "Royal Emerald Bridal Symphony.png",
  "Royal Heritage Jharokha.png",
  "Royal Lotus Architecture.jpg",
  "Royal_Elephant_Couture_Design.jpg",
  "Shagun.jpg",
  "Subtle Elegance Forearm Mesh.jpg",
  "Symmetrical_Geometric_Jaali.jpg",
  "The Blossoming Bride.jpg",
  "The Divine Swastika & Initials Bridal Saga.jpg",
  "the peacock pavilion.jpg",
  "The Royal Elephant Procession.jpg",
  "The Royal Wedding Saga.jpg",
  "The Vintage Palace Tapestry.jpg",
  "Traditional_Floral_Mesh_Design.jpg"
];
var VIDEO_FILES = [
  {file: "Enchanted Bridal Flow.mp4", title: "Enchanted Bridal Flow"},
  {file: "Ethereal Bridal Motion.mp4", title: "Ethereal Bridal Motion"},
  {file: "Exquisite_Paisley_Symphony_Motion.mp4", title: "Exquisite Paisley Symphony Motion"},
  {file: "Golden Hour Henna Glitter.mp4", title: "Golden Hour Henna Glitter"},
  {file: "Majestic Intricacies Canvas.mp4", title: "Majestic Intricacies Canvas"},
  {file: "Masterpiece Couture Chronicle.mp4", title: "Masterpiece Couture Chronicle"},
  {file: "Radha_Krishna_Saga_Art.mp4", title: "Radha Krishna Saga Art"},
  {file: "Royal Festive Silhouette.mp4", title: "Royal Festive Silhouette"},
  {file: "Royal_Emerald_Bridal_Tradition.mp4", title: "Royal Emerald Bridal Tradition"},
  {file: "Symmetrical_Geometric_Jaali_Flow.mp4", title: "Symmetrical Geometric Jaali Flow"},
  {file: "The Dynamic Dulhan Portrait.mp4", title: "The Dynamic Dulhan Portrait"},
  {file: "Traditional Rhythm & Stains.mp4", title: "Traditional Rhythm & Stains"},
  {file: "Traditional_Mehndi_Rhythm_Flow.mp4", title: "Traditional Mehndi Rhythm Flow"}
];
var PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#F3E9D5"/><g fill="none" stroke="#8E1F41" stroke-width="2"><circle cx="200" cy="200" r="70"/><circle cx="200" cy="200" r="45"/><circle cx="200" cy="200" r="18"/><path d="M200 110c12 16 28 16 36 32-16 8-24 24-36 28-12-4-20-20-36-28 8-16 24-16 36-32ZM200 290c12-16 28-16 36-32-16-8-24-24-36-28-12 4-20 20-36 28 8 16 24 16 36 32Z"/></g><text x="200" y="365" font-family="Georgia" font-size="20" fill="#6B4A2E" text-anchor="middle">Dulhan Mehndi Art</text></svg>');

/* mobile menu */
var menuBtn = document.getElementById('menuBtn'), navLinks = document.getElementById('navLinks');
if (menuBtn) {
  menuBtn.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', function(e){
    if (e.target.tagName === 'A') { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); }
  });
}

/* footer year */
var yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

/* landing-page gallery preview fallbacks */
document.querySelectorAll('img[data-ph]').forEach(function(img){
  img.onerror = function(){ this.onerror = null; this.src = PLACEHOLDER; };
});

/* gallery page */
var photoGrid = document.getElementById('photoGrid');
if (photoGrid) {
  PHOTO_FILES.forEach(function(file, i){
    var fig = document.createElement('figure');
    var img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = 'Mehndi design by Dulhan Mehndi Art — ' + file.replace(/_/g, ' ').replace(/\.(jpg|png)$/i, '');
    img.src = encodeURI('assets/photos/' + file);
    img.dataset.full = img.src;
    img.onerror = function(){ this.onerror = null; this.src = PLACEHOLDER; this.dataset.full = ''; };
    fig.appendChild(img);
    fig.addEventListener('click', function(){ openLightbox(i); });
    photoGrid.appendChild(fig);
  });

  var lightbox = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg');
  var lbIndex = 0;
  function openLightbox(i){
    lbIndex = i;
    var img = photoGrid.children[i].querySelector('img');
    lbImg.src = img.dataset.full || img.src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){ lightbox.classList.remove('open'); document.body.style.overflow = ''; }
  function stepLightbox(d){
    lbIndex = (lbIndex + d + PHOTO_FILES.length) % PHOTO_FILES.length;
    var img = photoGrid.children[lbIndex].querySelector('img');
    lbImg.src = img.dataset.full || img.src;
  }
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', function(){ stepLightbox(-1); });
  document.getElementById('lbNext').addEventListener('click', function(){ stepLightbox(1); });
  lightbox.addEventListener('click', function(e){ if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e){
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
}

var videoGrid = document.getElementById('videoGrid');
if (videoGrid) {
  VIDEO_FILES.forEach(function(video){
    var card = document.createElement('div');
    card.className = 'vframe';
    var vid = document.createElement('video');
    vid.controls = true;
    vid.preload = 'metadata';
    vid.setAttribute('playsinline', '');
    vid.title = video.title;
    vid.src = encodeURI('assets/videos/' + video.file);
    card.appendChild(vid);
    var caption = document.createElement('p');
    caption.textContent = video.title;
    card.appendChild(caption);
    videoGrid.appendChild(card);
  });
}

/* contact form -> WhatsApp */
var form = document.getElementById('bookForm');
if (form) {
  form.addEventListener('submit', function(e){
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

