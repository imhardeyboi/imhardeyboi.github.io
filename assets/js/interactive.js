/* Shared interactive layer for imhardeyboi.github.io — added Nov 2026.
   Vanilla JS, every feature guards for its elements so pages without a
   feature simply skip it. No content or links are changed by this file. */
(function () {
  'use strict';

  /* ---- Scroll reveal ---- */
  /* Auto-reveal page sections/cards that have no AOS attribute */
  document.querySelectorAll('main section, main .project-card, .highlights .card').forEach(function (el) {
    if (!el.hasAttribute('data-aos') && !el.classList.contains('reveal')) el.classList.add('reveal');
  });
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Dark / light theme toggle (persists) ---- */
  var KEY = 'site-theme';
  try {
    if (localStorage.getItem(KEY) === 'dark') document.body.classList.add('dark');
  } catch (e) { /* storage unavailable — ignore */ }
  document.querySelectorAll('#theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dark = document.body.classList.toggle('dark');
      try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
      btn.textContent = dark ? '☀️ Light' : '🌙 Dark';
    });
    btn.textContent = document.body.classList.contains('dark') ? '☀️ Light' : '🌙 Dark';
  });

  /* ---- Project filter (projects page) ---- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.project-card[data-category]');
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = f === 'all' || card.getAttribute('data-category') === f;
          card.classList.toggle('hidden-by-filter', !show);
        });
      });
    });
  }

  /* ---- Count-up metrics (dashboard) ---- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        cio.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var start = null;
        var dur = 1200;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.round(target * p) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Kill-chain stepper (FIN7 page) ---- */
  var kcSteps = document.querySelectorAll('.kc-step');
  var kcDetails = document.querySelectorAll('.kc-detail');
  if (kcSteps.length && kcDetails.length) {
    kcDetails.forEach(function (d, i) { d.style.display = i === 0 ? '' : 'none'; });
    kcSteps.forEach(function (step) {
      step.addEventListener('click', function () {
        kcSteps.forEach(function (s) { s.classList.remove('active'); });
        step.classList.add('active');
        var id = step.getAttribute('data-target');
        kcDetails.forEach(function (d) { d.style.display = d.id === id ? '' : 'none'; });
      });
    });
  }

  /* ---- Topology explorer (network page) ---- */
  var topoBtns = document.querySelectorAll('.topo-btn');
  var topoDetails = document.querySelectorAll('.topo-detail');
  if (topoBtns.length && topoDetails.length) {
    topoDetails.forEach(function (d, i) { d.style.display = i === 0 ? '' : 'none'; });
    topoBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        topoBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var id = btn.getAttribute('data-target');
        topoDetails.forEach(function (d) { d.style.display = d.id === id ? '' : 'none'; });
      });
    });
  }

  /* ---- ACL demo: toggle ACL 101 on/off, ping results update ---- */
  var aclToggle = document.getElementById('acl-toggle');
  var pingRows = document.getElementById('ping-rows');
  if (aclToggle && pingRows) {
    var renderPings = function (on) {
      var hr = on
        ? '<span class="blocked">0/4 — BLOCKED · Destination host unreachable</span>'
        : '<span class="ok">4/4 received</span>';
      pingRows.innerHTML =
        '<li><span>Sales → Admin</span><span class="ok">4/4 received</span></li>' +
        '<li><span>Admin → Sales</span><span class="ok">4/4 received</span></li>' +
        '<li><span>HR → Admin</span>' + hr + '</li>';
      aclToggle.classList.toggle('on', on);
      aclToggle.querySelector('.acl-state').textContent = on ? 'ACL 101: ON — HR → Admin blocked' : 'ACL 101: OFF — all traffic allowed';
    };
    aclToggle.addEventListener('click', function () {
      renderPings(!aclToggle.classList.contains('on'));
    });
    renderPings(true); /* lab result: ACL enforced */
  }

  /* ---- Simulated Wazuh alert feed (replay of the real lab detection) ---- */
  var feed = document.getElementById('alert-feed');
  if (feed) {
    var alerts = [
      { sev: 7, cls: 'sev-7', text: 'netcat listening for incoming connections — Ubuntu 10.71.88.235:4444' },
      { sev: 5, cls: 'sev-5', text: 'Wazuh agent connected — Ubuntu endpoint 10.71.88.235' },
      { sev: 7, cls: 'sev-7', text: 'Multiple nc-on-4444 events in Discover — histogram spike' },
      { sev: 3, cls: 'sev-3', text: 'SSH session opened from Kali 10.71.88.165 to Ubuntu endpoint' },
      { sev: 7, cls: 'sev-7', text: 'Rule local_rules.xml triggered — unauthorised Netcat process' }
    ];
    var idx = 0;
    var pushAlert = function () {
      var a = alerts[idx % alerts.length];
      idx += 1;
      var li = document.createElement('li');
      var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      li.innerHTML = '<span class="sev ' + a.cls + '">LVL ' + a.sev + '</span><span>' + a.text + '</span><span class="alert-time">' + time + '</span>';
      feed.prepend(li);
      while (feed.children.length > 5) feed.removeChild(feed.lastChild);
    };
    pushAlert();
    setInterval(pushAlert, 5000);
  }

  /* ---- Severity meter fills on scroll into view ---- */
  var meterFill = document.querySelector('.sev-meter .fill');
  if (meterFill) {
    var fill = function () { meterFill.style.width = meterFill.getAttribute('data-level') + '%'; };
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { fill(); mio.disconnect(); } });
      }, { threshold: 0.4 });
      mio.observe(meterFill);
    } else { fill(); }
  }

  /* ---- Terminal typing (Wazuh page) ---- */
  var term = document.querySelector('.terminal-body[data-lines]');
  if (term) {
    var lines = JSON.parse(term.getAttribute('data-lines'));
    var li = 0, ci = 0, out = '';
    var cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    var type = function () {
      if (li >= lines.length) { term.appendChild(cursor); return; }
      var line = lines[li];
      if (ci <= line.text.length) {
        term.innerHTML = out + line.text.slice(0, ci) + (line.alert ? '' : '');
        term.appendChild(cursor);
        ci += 1;
        setTimeout(type, line.alert ? 0 : 34);
      } else {
        out += (line.alert ? '<span class="t-alert">' + line.text + '</span>' : line.text) + '\n';
        li += 1; ci = 0;
        setTimeout(type, 450);
      }
    };
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { tio.disconnect(); type(); }
      });
    }, { threshold: 0.4 });
    tio.observe(term);
  }

  /* ---- Back to top ---- */
  var btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('header.navbar');
  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
