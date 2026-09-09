/* Sally's Legal Apparel — app controller: rendering, navigation, cart, events.
 * Depends on: SLAData, SLAOrders, SLAIcons, SLAComponents, SLAViews, SLAModals, SLA (store). */
(function () {
  'use strict';

  var S = window.SLA.state;

  /* ---------- RENDER ---------- */

  function renderChrome() {
    document.getElementById('announce-root').innerHTML = window.SLAComponents.announcementBar();
    document.getElementById('header-root').innerHTML = window.SLAComponents.siteHeader();
    document.getElementById('footer-root').innerHTML = window.SLAComponents.siteFooter();
    document.getElementById('wa-root').innerHTML = window.SLAComponents.whatsappButton();
    syncHeaderScroll();
  }

  function renderView() {
    var V = window.SLAViews;
    var html = '';
    var title = "Sally's Legal Apparel | Legal Outfitter for the Bar & Bench";
    if (S.page === 'home') { html = V.homeView(); }
    else if (S.page === 'shop') { html = V.shopView(); title = 'Shop All Legal Apparel | ' + title; }
    else if (S.page === 'product-detail') { html = V.productDetailView(); }
    else if (S.page === 'checkout') { html = V.checkoutView(); title = 'Secure Checkout | ' + title; }
    else if (S.page === 'our-story') { html = V.ourStoryView(); title = 'Our Story | ' + title; }
    document.getElementById('view-root').innerHTML = html;
    if (S.page === 'product-detail') {
      var p = window.SLAData.getProduct(S.selectedProductId);
      if (p) title = p.name + " | Sally's Legal Apparel";
    }
    document.title = title;
  }

  function renderOverlays() {
    var C = window.SLAComponents;
    var M = window.SLAModals;
    document.getElementById('overlay-root').innerHTML =
      C.cartDrawer() + C.wishlistDrawer() + M.quickViewModal() + M.searchModal() +
      M.sizeGuideModal() + M.accountModal() + M.policyModal();
    var locked = S.cartOpen || S.wishlistOpen || S.quickViewId || S.searchOpen ||
      S.sizeGuideOpen || S.accountOpen || S.policyOpen || S.mobileMenuOpen;
    document.body.classList.toggle('no-scroll', !!locked);
  }

  function render() {
    renderChrome();
    renderView();
    renderOverlays();
  }
  window.SLA.render = render;

  function updateShopResults() {
    var host = document.getElementById('shop-results');
    if (host) host.innerHTML = window.SLAViews.shopResultsHTML();
    var clearBtn = document.getElementById('shop-clear-btn');
    if (clearBtn) clearBtn.style.display = S.shop.search ? '' : 'none';
  }

  function updateSearchResults() {
    var host = document.getElementById('search-results');
    if (host) host.innerHTML = window.SLAModals.searchResultsHTML();
  }

  function syncHeaderScroll() {
    var header = document.getElementById('main-header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------- NAVIGATION ---------- */

  function navigate(page, category) {
    if (category) S.shopCategory = category;
    else if (page === 'shop') S.shopCategory = 'All';
    if (page === 'shop') S.shop = { search: '', sort: 'featured', inStockOnly: false };
    S.page = page;
    S.checkout = null;
    S.mobileMenuOpen = false;
    render();
    scrollTop();
  }

  function gotoSection(id) {
    S.mobileMenuOpen = false;
    if (S.page !== 'home') {
      S.page = 'home';
      S.checkout = null;
      render();
      setTimeout(function () { scrollToId(id); }, 150);
    } else {
      render();
      scrollToId(id);
    }
  }

  function selectProduct(id) {
    var p = window.SLAData.getProduct(id);
    if (!p) { navigate('shop', 'All'); return; }
    S.selectedProductId = p.id;
    S.detail = { colorName: p.colours[0].name, size: p.sizes[0], quantity: 1, image: p.colours[0].image || p.images[0], tab: 'details' };
    S.page = 'product-detail';
    S.checkout = null;
    S.quickViewId = null;
    S.searchOpen = false;
    S.wishlistOpen = false;
    S.mobileMenuOpen = false;
    try {
      var stored = localStorage.getItem('sallys_legal_recently_viewed');
      var ids = stored ? JSON.parse(stored) : [];
      var updated = [p.id].concat(ids.filter(function (x) { return x !== p.id; })).slice(0, 12);
      localStorage.setItem('sallys_legal_recently_viewed', JSON.stringify(updated));
    } catch (e) { /* ignore */ }
    render();
    scrollTop();
  }

  /* ---------- CART & WISHLIST ---------- */

  function mergeAddToCart(product, colorName, size, quantity) {
    var found = null;
    for (var i = 0; i < S.cart.length; i++) {
      var raw = S.cart[i];
      var pid = raw.product ? raw.product.id : raw.productId;
      var cn = raw.selectedColor ? raw.selectedColor.name : raw.colorName;
      var sz = raw.selectedSize || raw.size;
      if (pid === product.id && cn === colorName && sz === size) { found = raw; break; }
    }
    if (found) {
      found.quantity = (found.quantity || 1) + (quantity || 1);
    } else {
      S.cart.push({ productId: product.id, colorName: colorName, size: size, quantity: quantity || 1 });
    }
    window.SLA.saveCart();
  }

  function addDefaultToCart(product) {
    var colorName = window.SLAComponents.cardColor(product);
    mergeAddToCart(product, colorName, product.sizes[0], 1);
  }

  function buyNow(product, colorName, size, quantity) {
    mergeAddToCart(product, colorName, size, quantity);
    S.cartOpen = false;
    S.quickViewId = null;
    S.page = 'checkout';
    S.checkout = null;
    render();
    scrollTop();
  }

  function toggleWishlist(id) {
    var i = S.wishlist.indexOf(id);
    if (i === -1) S.wishlist.push(id);
    else S.wishlist.splice(i, 1);
    window.SLA.saveWishlist();
    render();
  }

  function orderViaWhatsApp(product, colorName, size, qty) {
    var total = S.currency === 'USD'
      ? '$' + (product.priceUSD * qty).toLocaleString('en-US')
      : 'TSh ' + (product.priceTZS * qty).toLocaleString('en-US');
    var message = 'Hello Sally\'s Legal Apparel, I would like to order:\n' + product.name +
      '\nColour: ' + colorName + '\nSize: ' + size + '\nQuantity: ' + qty + '\nTotal: ' + total;
    window.open(window.SLA.whatsappLink(message), '_blank', 'noopener,noreferrer');
  }

  /* ---------- ACCOUNT / TRACKING ---------- */

  function openAccount(tab, orderNumber) {
    S.accountTab = tab || 'account';
    S.mobileMenuOpen = false;
    if (S.accountTab === 'tracking') {
      var q = orderNumber || S.trackingOrderNumber || '';
      S.tracking = { query: q, result: null, error: null };
      if (q) doTrackingSearch(q);
    }
    S.accountOpen = true;
    renderOverlays();
    renderChrome();
  }

  function doTrackingSearch(term) {
    var query = (term !== undefined ? term : (S.tracking ? S.tracking.query : '') || '').trim();
    if (!query) {
      S.tracking = { query: '', result: null, error: 'Please enter a valid order number or M-Pesa reference.' };
      return;
    }
    var result = window.SLAOrders.findOrder(query);
    if (result) {
      S.tracking = { query: result.orderNumber, result: result, error: null };
    } else {
      S.tracking = { query: query, result: null, error: 'No order record found matching "' + query + '". Check the format (e.g. SLA-849201) or try one of the sample orders below.' };
    }
  }

  /* ---------- CHECKOUT ---------- */

  function setErr(inputId, errId, message) {
    var input = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (err) err.textContent = message || '';
    if (input) input.classList.toggle('input-error', !!message);
  }

  function submitCheckout() {
    var name = document.getElementById('co-name').value.trim();
    var phone = document.getElementById('co-phone').value.trim();
    var email = document.getElementById('co-email').value.trim();
    var city = document.getElementById('co-city').value;
    var address = document.getElementById('co-address').value.trim();
    var notes = document.getElementById('co-notes').value.trim();
    var mpesaRef = document.getElementById('co-mpesa').value.trim();

    var valid = true;
    if (!name) { setErr('co-name', 'err-co-name', 'Full Name / Counsel Title is required'); valid = false; }
    else setErr('co-name', 'err-co-name', '');
    if (!phone) { setErr('co-phone', 'err-co-phone', 'Phone Number (M-Pesa enabled) is required'); valid = false; }
    else setErr('co-phone', 'err-co-phone', '');
    if (!email || email.indexOf('@') === -1) { setErr('co-email', 'err-co-email', 'Valid email address is required'); valid = false; }
    else setErr('co-email', 'err-co-email', '');
    if (!address) { setErr('co-address', 'err-co-address', 'Delivery address or Chambers name is required'); valid = false; }
    else setErr('co-address', 'err-co-address', '');
    if (!valid) return;

    var btn = document.getElementById('place-order-btn');
    if (btn) { btn.disabled = true; btn.classList.add('btn-disabled'); btn.innerHTML = '<span>PROCESSING ORDER...</span>'; }

    setTimeout(function () {
      var t = window.SLA.cartTotals();
      var orderNum = 'SLA-' + Math.floor(100000 + Math.random() * 900000);
      var ref = mpesaRef || ('MP-' + Math.floor(10000000 + Math.random() * 90000000));
      var order = {
        orderNumber: orderNum,
        fullName: name,
        phone: phone,
        email: email,
        city: city,
        address: address,
        deliveryNotes: notes,
        paymentMethod: 'M-PESA',
        mpesaReference: ref,
        items: S.cart.map(function (raw) {
          var it = window.SLAOrders.resolveItem(raw);
          return { productId: it.product.id, colorName: it.color.name, size: it.size, quantity: it.quantity };
        }),
        subtotalTZS: t.subTZS,
        deliveryFeeTZS: t.feeTZS,
        totalTZS: t.totalTZS,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'received',
        estimatedDelivery: city.toLowerCase().indexOf('dar') !== -1 ? 'Today by 16:30 EAT' : 'Tomorrow by 14:00 EAT',
        courierName: "Sally's Atelier Chambers Dedicated Courier",
        courierPhone: '+255 754 000 112',
        trackingSteps: [
          { title: 'Order Placed & M-Pesa Confirmed', subtitle: 'Payment verified for Lipa Till 50777411 (Ref: ' + (mpesaRef || 'VERIFIED') + ')', timestamp: 'Just Now', completed: true, current: true },
          { title: 'Chambers Atelier Tailoring & Yoke Inspection', subtitle: 'Robes scheduled for pressing, sizing check, and regalia packing', timestamp: 'Next in Queue', completed: false },
          { title: 'Dispatched for Chamber Delivery', subtitle: 'Assigned courier to ' + address + ', ' + city, timestamp: 'Pending Dispatch', completed: false },
          { title: 'Delivered to Chambers / Registry', subtitle: 'Signed for upon receipt by Counsel', timestamp: 'Pending Delivery', completed: false }
        ]
      };
      window.SLAOrders.saveOrder(order);
      S.cart = [];
      window.SLA.saveCart();
      S.checkout = order;
      render();
      scrollTop();
    }, 600);
  }

  /* ---------- CLICK DELEGATION ---------- */

  function onAction(action, el, ev) {
    var d = el.dataset;
    switch (action) {
      case 'navigate': navigate(d.page, d.category || undefined); break;
      case 'goto-section': gotoSection(d.target); break;
      case 'scroll-to': scrollToId(d.target); break;
      case 'select-product': selectProduct(d.id); break;
      case 'quick-view': {
        var p = window.SLAData.getProduct(d.id);
        if (p) {
          S.quickView = { colorName: p.colours[0].name, size: p.sizes[0] || 'Standard', quantity: 1, image: p.colours[0].image || p.images[0] };
          S.quickViewId = p.id;
          renderOverlays();
        }
        break;
      }
      case 'close-quickview': S.quickViewId = null; renderOverlays(); break;
      case 'qv-color': S.quickView.colorName = d.value; S.quickView.image = null; renderOverlays(); break;
      case 'qv-size': S.quickView.size = d.value; renderOverlays(); break;
      case 'qv-image': S.quickView.image = d.src; renderOverlays(); break;
      case 'qv-qty': S.quickView.quantity = Math.max(1, (S.quickView.quantity || 1) + parseInt(d.delta, 10)); renderOverlays(); break;
      case 'qv-add': {
        var qa = window.SLAData.getProduct(S.quickViewId);
        if (qa) {
          mergeAddToCart(qa, S.quickView.colorName || qa.colours[0].name, S.quickView.size || qa.sizes[0], S.quickView.quantity || 1);
          S.cartOpen = true;
          renderChrome(); renderOverlays();
        }
        break;
      }
      case 'qv-buy': {
        var qb = window.SLAData.getProduct(S.quickViewId);
        if (qb) buyNow(qb, S.quickView.colorName || qb.colours[0].name, S.quickView.size || qb.sizes[0], S.quickView.quantity || 1);
        break;
      }
      case 'qv-whatsapp': {
        var qw = window.SLAData.getProduct(S.quickViewId);
        if (qw) orderViaWhatsApp(qw, S.quickView.colorName || qw.colours[0].name, S.quickView.size || qw.sizes[0], S.quickView.quantity || 1);
        break;
      }
      case 'qv-full': { var qf = S.quickViewId; S.quickViewId = null; selectProduct(qf); break; }
      case 'card-color': window.SLAComponents.setCardColor(d.id, d.color); renderView(); break;
      case 'add-to-cart': {
        var pa = window.SLAData.getProduct(d.id);
        if (pa) { addDefaultToCart(pa); S.wishlistOpen = false; S.cartOpen = true; render(); }
        break;
      }
      case 'toggle-wishlist': toggleWishlist(d.id); break;
      case 'wishlist-remove':
        S.wishlist = S.wishlist.filter(function (x) { return x !== d.id; });
        window.SLA.saveWishlist(); render(); break;
      case 'toggle-currency': S.currency = (S.currency === 'TZS' ? 'USD' : 'TZS'); render(); break;
      case 'set-currency': if (S.currency !== d.value) { S.currency = d.value; render(); } break;
      case 'open-cart': S.cartOpen = true; renderChrome(); renderOverlays(); break;
      case 'close-cart': S.cartOpen = false; renderOverlays(); break;
      case 'open-wishlist': S.wishlistOpen = true; renderChrome(); renderOverlays(); break;
      case 'close-wishlist': S.wishlistOpen = false; renderOverlays(); break;
      case 'open-search':
        S.searchOpen = true; S.mobileMenuOpen = false; renderChrome(); renderOverlays();
        setTimeout(function () { var i = document.getElementById('global-search-input'); if (i) i.focus(); }, 50);
        break;
      case 'close-search': S.searchOpen = false; renderOverlays(); break;
      case 'search-term':
        S.searchQuery = d.value; renderOverlays();
        setTimeout(function () { var i = document.getElementById('global-search-input'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 50);
        break;
      case 'search-clear': S.searchQuery = ''; renderOverlays(); break;
      case 'search-view-all':
        var sq = S.searchQuery || '';
        S.searchOpen = false; S.searchQuery = '';
        navigate('shop', 'All');
        S.shop.search = sq;
        renderView();
        break;
      case 'open-size-guide': S.sizeGuideOpen = true; renderOverlays(); break;
      case 'close-size-guide': S.sizeGuideOpen = false; renderOverlays(); break;
      case 'size-tab': S.sizeTab = d.value; renderOverlays(); break;
      case 'open-account': openAccount(d.tab || 'account'); break;
      case 'close-account': S.accountOpen = false; renderOverlays(); break;
      case 'account-tab':
        S.accountTab = d.value;
        if (d.value === 'tracking' && (!S.tracking || !S.tracking.result) && S.trackingOrderNumber) {
          S.tracking = { query: S.trackingOrderNumber, result: null, error: null };
          doTrackingSearch(S.trackingOrderNumber);
        }
        renderOverlays();
        break;
      case 'account-signout': S.signedInEmail = ''; renderOverlays(); break;
      case 'open-policy': S.policyTab = d.tab || 'contact'; S.policyOpen = true; S.mobileMenuOpen = false; renderChrome(); renderOverlays(); break;
      case 'close-policy': S.policyOpen = false; renderOverlays(); break;
      case 'policy-tab': S.policyTab = d.value; renderOverlays(); break;
      case 'cart-qty': {
        var ci = parseInt(d.index, 10);
        var raw = S.cart[ci];
        if (raw) {
          raw.quantity = (raw.quantity || 1) + parseInt(d.delta, 10);
          if (raw.quantity <= 0) S.cart.splice(ci, 1);
          window.SLA.saveCart();
        }
        render();
        break;
      }
      case 'cart-remove': S.cart.splice(parseInt(d.index, 10), 1); window.SLA.saveCart(); render(); break;
      case 'proceed-checkout':
        S.cartOpen = false; S.page = 'checkout'; S.checkout = null;
        render(); scrollTop();
        break;
      case 'track-order': openAccount('tracking', d.value); break;
      case 'tracking-pill':
        S.trackingOrderNumber = d.value;
        S.tracking = { query: d.value, result: null, error: null };
        doTrackingSearch(d.value);
        renderOverlays();
        break;
      case 'tracking-clear':
        S.tracking = { query: '', result: null, error: null };
        S.trackingOrderNumber = '';
        renderOverlays();
        break;
      case 'mobile-menu': S.mobileMenuOpen = (d.open === '1'); renderChrome(); renderOverlays(); break;
      case 'copy': copyText(d.text || '', el); break;
      case 'print': window.print(); break;
      case 'shop-category': S.shopCategory = d.value; renderView(); break;
      case 'shop-reset':
        S.shopCategory = 'All'; S.shop.search = ''; S.shop.sort = 'featured'; S.shop.inStockOnly = false;
        renderView();
        break;
      case 'shop-clear-search': S.shop.search = ''; renderView(); break;
      case 'detail-color': S.detail.colorName = d.value; S.detail.image = null; renderView(); break;
      case 'detail-size': S.detail.size = d.value; renderView(); break;
      case 'detail-image': S.detail.image = d.src; renderView(); break;
      case 'detail-qty': S.detail.quantity = Math.max(1, (S.detail.quantity || 1) + parseInt(d.delta, 10)); renderView(); break;
      case 'detail-tab': S.detail.tab = d.value; renderView(); break;
      case 'detail-add': {
        var da = window.SLAData.getProduct(S.selectedProductId);
        if (da) {
          mergeAddToCart(da, S.detail.colorName || da.colours[0].name, S.detail.size || da.sizes[0], S.detail.quantity || 1);
          S.cartOpen = true;
          renderChrome(); renderOverlays();
        }
        break;
      }
      case 'detail-buy': {
        var db = window.SLAData.getProduct(S.selectedProductId);
        if (db) buyNow(db, S.detail.colorName || db.colours[0].name, S.detail.size || db.sizes[0], S.detail.quantity || 1);
        break;
      }
      case 'detail-whatsapp': {
        var dw = window.SLAData.getProduct(S.selectedProductId);
        if (dw) orderViaWhatsApp(dw, S.detail.colorName || dw.colours[0].name, S.detail.size || dw.sizes[0], S.detail.quantity || 1);
        break;
      }
      default: break;
    }
  }

  function copyText(text, el) {
    function done() {
      if (!el) return;
      var original = el.innerHTML;
      el.classList.add('copied');
      el.innerHTML = '<span>Copied ' + window.SLA.esc(text) + '</span>';
      setTimeout(function () { el.classList.remove('copied'); el.innerHTML = original; }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
      done();
    }
  }

  /* ---------- GLOBAL LISTENERS ---------- */

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-action]') : null;
    if (!el) return;
    onAction(el.dataset.action, el, ev);
  });

  /* Keyboard access for card-style buttons rendered as divs */
  document.addEventListener('keydown', function (ev) {
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target && ev.target.matches && ev.target.matches('[role="button"][data-action]')) {
      ev.preventDefault();
      onAction(ev.target.dataset.action, ev.target, ev);
    }
    if (ev.key === 'Escape') {
      if (S.quickViewId) { S.quickViewId = null; renderOverlays(); }
      else if (S.searchOpen) { S.searchOpen = false; renderOverlays(); }
      else if (S.sizeGuideOpen) { S.sizeGuideOpen = false; renderOverlays(); }
      else if (S.accountOpen) { S.accountOpen = false; renderOverlays(); }
      else if (S.policyOpen) { S.policyOpen = false; renderOverlays(); }
      else if (S.cartOpen) { S.cartOpen = false; renderOverlays(); }
      else if (S.wishlistOpen) { S.wishlistOpen = false; renderOverlays(); }
      else if (S.mobileMenuOpen) { S.mobileMenuOpen = false; renderChrome(); renderOverlays(); }
    }
  });

  document.addEventListener('submit', function (ev) {
    var id = ev.target && ev.target.id;
    if (id === 'checkout-form') { ev.preventDefault(); submitCheckout(); }
    else if (id === 'tracking-form') {
      ev.preventDefault();
      var input = document.getElementById('tracking-input');
      S.tracking = S.tracking || { query: '', result: null, error: null };
      S.tracking.query = input ? input.value : '';
      doTrackingSearch(S.tracking.query);
      renderOverlays();
    }
    else if (id === 'signin-form') {
      ev.preventDefault();
      var email = document.getElementById('signin-email');
      if (email && email.value) { S.signedInEmail = email.value.trim(); renderOverlays(); }
    }
  });

  document.addEventListener('input', function (ev) {
    var id = ev.target && ev.target.id;
    if (id === 'shop-search-input') {
      S.shop.search = ev.target.value;
      updateShopResults();
    } else if (id === 'global-search-input') {
      S.searchQuery = ev.target.value;
      updateSearchResults();
    }
  });

  document.addEventListener('change', function (ev) {
    var id = ev.target && ev.target.id;
    if (id === 'shop-sort-select') { S.shop.sort = ev.target.value; updateShopResults(); }
    else if (id === 'shop-stock-checkbox') { S.shop.inStockOnly = ev.target.checked; updateShopResults(); }
    else if (id === 'co-city') {
      var label = document.getElementById('summary-city');
      if (label) label.textContent = ev.target.value;
    }
  });

  window.addEventListener('scroll', syncHeaderScroll, { passive: true });

  /* ---------- INIT ---------- */
  S.tracking = { query: '', result: null, error: null };
  S.searchQuery = '';
  S.sizeTab = 'standard';
  render();
})();
