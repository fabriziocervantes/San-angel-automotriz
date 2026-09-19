(function () {
  'use strict';

  var PHONE = '5216562666605';

  var ALL_CARS = [
    { brand: 'Nissan',    name: 'Nissan Versa Advance', year: 2019, km: 68000,  trans: 'Automático', price: 189000 },
    { brand: 'Chevrolet', name: 'Chevrolet Aveo LT',     year: 2020, km: 54000,  trans: 'Automático', price: 179000 },
    { brand: 'Ford',      name: 'Ford Escape SE',        year: 2018, km: 92000,  trans: 'Automático', price: 249000 },
    { brand: 'Nissan',    name: 'Nissan Sentra Sense',   year: 2021, km: 41000,  trans: 'Automático', price: 279000 },
    { brand: 'Toyota',    name: 'Toyota Corolla LE',     year: 2019, km: 76000,  trans: 'Automático', price: 289000 },
    { brand: 'Chevrolet', name: 'Chevrolet Silverado',   year: 2017, km: 118000, trans: 'Automático', price: 329000 },
    { brand: 'Ford',      name: 'Ford Fiesta S',         year: 2018, km: 83000,  trans: 'Estándar',   price: 139000 },
    { brand: 'Honda',     name: 'Honda CR-V EX',         year: 2018, km: 97000,  trans: 'Automático', price: 319000 },
    { brand: 'Toyota',    name: 'Toyota Hilux SR',       year: 2016, km: 132000, trans: 'Estándar',   price: 299000 }
  ];

  var PRICE_RANGES = [
    { key: 'all', label: 'Todos',           min: 0,      max: Infinity },
    { key: 'a',   label: 'Hasta $200 mil',  min: 0,      max: 200000 },
    { key: 'b',   label: '$200 – $300 mil', min: 200000, max: 300000 },
    { key: 'c',   label: 'Más de $300 mil', min: 300000, max: Infinity }
  ];

  function waLink(text) {
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text);
  }

  var GENERAL_MESSAGE = 'Hola, vi su página y me interesa un auto seminuevo. ¿Me pueden dar informes?';

  document.querySelectorAll('[data-wa-general]').forEach(function (el) {
    el.setAttribute('href', waLink(GENERAL_MESSAGE));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // ---------- Inventory: brand / price filtering ----------
  var state = { brand: 'Todas', range: 'all' };
  var brandChipsEl = document.querySelector('[data-brand-chips]');
  var priceChipsEl = document.querySelector('[data-price-chips]');
  var gridEl = document.querySelector('[data-car-grid]');
  var noResultsEl = document.querySelector('[data-no-results]');

  var BRANDS = ['Todas'].concat(
    ALL_CARS.map(function (c) { return c.brand; }).filter(function (b, i, arr) { return arr.indexOf(b) === i; })
  );

  function money(n) {
    return '$' + n.toLocaleString('es-MX');
  }

  function renderChips(container, items, activeKey, onPick) {
    container.innerHTML = '';
    items.forEach(function (item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip' + (item.key === activeKey ? ' is-active' : '');
      btn.textContent = item.label;
      btn.addEventListener('click', function () { onPick(item.key); });
      container.appendChild(btn);
    });
  }

  function renderCars() {
    var range = PRICE_RANGES.filter(function (r) { return r.key === state.range; })[0] || PRICE_RANGES[0];
    var cars = ALL_CARS.filter(function (c) {
      return (state.brand === 'Todas' || c.brand === state.brand) && c.price >= range.min && c.price < range.max;
    });

    gridEl.innerHTML = '';
    cars.forEach(function (car) {
      var article = document.createElement('article');
      article.className = 'car-card';

      var msg = 'Hola, me interesa el ' + car.name + ' ' + car.year + ' que vi en su página. ¿Sigue disponible?';

      article.innerHTML =
        '<div class="car-photo"><span>' + car.name + '</span></div>' +
        '<div class="car-body">' +
        '  <div>' +
        '    <h3 class="car-name">' + car.name + '</h3>' +
        '    <div class="car-year">' + car.year + '</div>' +
        '  </div>' +
        '  <div class="car-tags">' +
        '    <span>' + car.km.toLocaleString('es-MX') + ' km</span>' +
        '    <span>' + car.trans + '</span>' +
        '  </div>' +
        '  <div class="car-footer">' +
        '    <div class="car-price">' + money(car.price) + '</div>' +
        '    <a class="btn btn-primary" href="' + waLink(msg) + '" target="_blank" rel="noopener">Me interesa</a>' +
        '  </div>' +
        '</div>';

      gridEl.appendChild(article);
    });

    noResultsEl.hidden = cars.length !== 0;
  }

  function renderFilters() {
    renderChips(
      brandChipsEl,
      BRANDS.map(function (b) { return { key: b, label: b }; }),
      state.brand,
      function (key) { state.brand = key; renderFilters(); renderCars(); }
    );
    renderChips(
      priceChipsEl,
      PRICE_RANGES,
      state.range,
      function (key) { state.range = key; renderFilters(); renderCars(); }
    );
  }

  renderFilters();
  renderCars();

  // ---------- Contact form -> WhatsApp ----------
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var msg = 'Hola, soy ' + (data.get('nombre') || '') + '. Mi teléfono es ' + (data.get('telefono') || '') +
        '. Me interesa: ' + (data.get('auto') || 'un auto seminuevo') + '.';
      window.open(waLink(msg), '_blank');
    });
  }

  // ---------- Scroll reveal ----------
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var showAllReveals = function () { revealEls.forEach(function (el) { el.classList.add('is-visible'); }); };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    // Fallback in case an element never intersects (e.g. embedded in an
    // unusual viewport) so content is never stuck invisible.
    setTimeout(showAllReveals, 2500);
  } else {
    showAllReveals();
  }
})();
