/* =========================================================
   BLUWIN — site scripts
   1. Intro: blinds open to reveal the site
   2. Scroll reveal
   3. Finish (swatch) picker
   4. Enquiry form (front-end only)
   ========================================================= */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Intro ---------- */
  var INTRO_MS = 3900; // keep in sync with the CSS timings
  var introTimer;

  function buildSlats(intro) {
    var wrap = intro.querySelector('.intro__slats');
    if (!wrap || wrap.children.length) return;
    var count = window.innerWidth < 700 ? 9 : 12;
    for (var i = 0; i < count; i++) {
      var slat = document.createElement('div');
      slat.className = 'intro__slat';
      slat.style.setProperty('--i', i);
      wrap.appendChild(slat);
    }
  }

  function playIntro() {
    var intro = document.getElementById('intro');
    if (!intro) return;
    if (reduceMotion) { intro.hidden = true; return; }

    // Restart: clone the node so every CSS animation runs again
    var fresh = intro.cloneNode(true);
    intro.parentNode.replaceChild(fresh, intro);
    fresh.hidden = false;
    buildSlats(fresh);
    document.body.classList.add('is-loading');

    // Re-run hero entrance animations
    document.querySelectorAll('.rise').forEach(function (el) {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });

    clearTimeout(introTimer);
    introTimer = setTimeout(function () {
      fresh.hidden = true;
      document.body.classList.remove('is-loading');
    }, INTRO_MS);
  }

  /* ---------- 2. Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- 3. Finish picker ---------- */
  function initSwatches() {
    var group = document.querySelector('[data-swatches]');
    if (!group) return;
    var name = document.querySelector('[data-finish-name]');
    var note = document.querySelector('[data-finish-note]');
    var tint = document.querySelector('[data-finish-tint]');

    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.swatch');
      if (!btn) return;
      group.querySelectorAll('.swatch').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      if (name) name.textContent = btn.dataset.name;
      if (note) note.textContent = btn.dataset.note;
      if (tint) tint.style.backgroundColor = btn.dataset.color;
    });
  }

  /* ---------- 4. Forms ----------
     Front-end only. Connect to your backend, Formspree,
     Google Forms or a WhatsApp link before going live. */
  function initForms() {
    document.querySelectorAll('form[data-enquiry]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var note = form.querySelector('.form__note');
        if (!form.checkValidity()) { form.reportValidity(); return; }
        if (note) note.textContent = 'Thank you. Our team will call you to confirm your visit.';
        form.reset();
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    playIntro();
    initReveal();
    initSwatches();
    initForms();

    var replay = document.querySelector('[data-replay-intro]');
    if (replay) replay.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'instant' });
      playIntro();
    });

    var year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
