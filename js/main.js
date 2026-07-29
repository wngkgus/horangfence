document.addEventListener('DOMContentLoaded', function () {
  // header scroll shadow
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  // gallery filter
  var tabs = document.querySelectorAll('.gallery-tab');
  var items = document.querySelectorAll('.gallery-item');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var f = tab.getAttribute('data-filter');
      items.forEach(function (item) {
        var cat = item.getAttribute('data-cat');
        item.style.display = (f === 'all' || f === cat) ? '' : 'none';
      });
    });
  });

  // lightbox
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var full = item.getAttribute('data-full');
        var alt = item.querySelector('img') ? item.querySelector('img').alt : '';
        lightboxImg.src = full;
        lightboxImg.alt = alt;
        lightbox.classList.add('is-open');
      });
    });
    var close = function () {
      lightbox.classList.remove('is-open');
      lightboxImg.src = '';
    };
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
});
