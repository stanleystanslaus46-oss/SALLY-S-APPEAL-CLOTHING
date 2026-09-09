/* Sally's Legal Apparel — page views (converted from src/components page/section components).
 * Globals: window.SLAViews = { homeView, shopView, shopResultsHTML, productDetailView, checkoutView, ourStoryView } */
(function () {
  'use strict';

  function icon(name, cls, sw) { return window.SLAIcons.icon(name, cls, sw); }
  function esc(s) { return window.SLA.esc(s); }
  function productCard(p) { return window.SLAComponents.productCard(p); }

  /* ================= HOME ================= */

  function heroView() {
    var H = window.SLAData.HERO_IMAGE;
    return '' +
    '<section class="hero">' +
      '<div class="hero-inner">' +
        '<div class="hero-copy">' +
          '<div class="eyebrow">Legal Outfitters</div>' +
          '<h1 class="hero-title">DRESSED FOR<br>THE BAR &amp;<br><span class="italic-light">The Bench.</span></h1>' +
          '<p class="hero-sub">Professional legal apparel designed for presence, confidence and distinction within the court of law.</p>' +
          '<div class="hero-cta">' +
            '<button type="button" data-action="navigate" data-page="shop" class="btn-dark btn-lg">Shop Collection</button>' +
            '<button type="button" data-action="scroll-to" data-target="the-edit-section" class="btn-outline btn-lg">Explore The Edit</button>' +
          '</div>' +
          '<div class="hero-index">01 — 06 / THE COURT COLLECTION</div>' +
        '</div>' +
        '<div class="hero-media">' +
          '<img src="' + H + '" alt="Sally\'s Legal Apparel - Court Robe &amp; Advocate Attire" referrerpolicy="no-referrer">' +
          '<div class="hero-fade"></div>' +
          '<div class="hero-accent"><div class="hero-accent-line"></div><div class="hero-accent-text">Premium Materials</div></div>' +
          '<div class="hero-card">' +
            '<div class="hero-card-kicker">New Arrival</div>' +
            '<div class="hero-card-title">The Presidential Robe</div>' +
            '<div class="hero-card-sub">Premium Wool Blend</div>' +
            '<div class="hero-card-row"><span class="hero-card-price">Tsh 1,250,000</span>' +
              '<button type="button" data-action="select-product" data-id="sla-001" class="link-underline">View Detail</button></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function trustStrip() {
    return '' +
    '<div class="trust">' +
      '<div class="trust-item">' + icon('shield', 'ic-sm') + '<span>Professional Standard</span></div>' +
      '<div class="trust-item">' + icon('award', 'ic-sm') + '<span>Quality Materials</span></div>' +
      '<div class="trust-item">' + icon('scale', 'ic-sm') + '<span>Made For Bar &amp; Bench</span></div>' +
      '<div class="trust-item"><span class="m-dot">M</span><span>M-PESA Available</span></div>' +
    '</div>';
  }

  function collectionsGrid() {
    var cats = window.SLAData.CATEGORIES.map(function (cat, i) {
      return '' +
      '<div class="collection-card" data-action="navigate" data-page="shop" data-category="' + esc(cat.categoryKey) + '" role="button" tabindex="0">' +
        '<div class="collection-media"><img src="' + cat.image + '" alt="' + esc(cat.name) + '" loading="lazy" referrerpolicy="no-referrer">' +
          '<div class="collection-num">0' + (i + 1) + '</div>' +
          (cat.badge ? '<div class="collection-badge">' + esc(cat.badge) + '</div>' : '') +
        '</div>' +
        '<div class="collection-body"><div><h3>' + esc(cat.name) + '</h3>' +
          '<p>' + esc(cat.description) + '</p></div>' +
          '<div class="collection-arrow">' + icon('arrowUpRight', 'ic-sm') + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    return '' +
    '<section id="collections-section" class="section">' +
      '<div class="wrap">' +
        '<div class="section-head"><div><div class="eyebrow">01 / COLLECTIONS</div>' +
          '<h2 class="section-title">The essentials of professional presence.</h2></div>' +
          '<p class="section-side">Engineered to meet the solemn dignity and statutory codes of the Bar and Bench.</p></div>' +
        '<div class="collections-grid">' + cats + '</div>' +
      '</div>' +
    '</section>';
  }

  function theEdit() {
    var products = window.SLAData.PRODUCTS.slice(0, 6).map(productCard).join('');
    return '' +
    '<section id="the-edit-section" class="section">' +
      '<div class="wrap">' +
        '<div class="section-head"><div><div class="eyebrow">02 / THE EDIT</div>' +
          '<h2 class="section-title">Selected for the modern legal professional.</h2></div>' +
          '<p class="section-side">A curated capsule of premier advocate gowns, starched court neckwear, tailored suiting, and ceremonial wigs.</p></div>' +
        '<div class="grid-edit">' + products + '</div>' +
        '<div class="center-cta"><button type="button" data-action="navigate" data-page="shop" class="btn-dark btn-lg">View The Full Collection ' + icon('arrowRight', 'ic-sm') + '</button></div>' +
      '</div>' +
    '</section>';
  }

  function theIdentity() {
    return '' +
    '<section class="section"><div class="wrap"><div class="identity-grid">' +
      '<div><div class="identity-media"><img src="' + window.SLAData.ROBE_HERO + '" alt="Advocate Robe Craftsmanship by Sally\'s Legal Apparel" loading="lazy" referrerpolicy="no-referrer">' +
        '<div class="identity-tag">HAND-PLEATED YOKE ARCHITECTURE</div></div></div>' +
      '<div class="identity-copy">' +
        '<div class="eyebrow">03 / THE IDENTITY</div>' +
        '<h2 class="section-title">Presence begins with what you wear.</h2>' +
        '<div class="identity-text"><p>Sally&#39;s Legal Apparel exists to provide refined, professional apparel for advocates and legal professionals.</p>' +
        '<p>In the courtroom, your attire communicates respect for the judicature, unwavering authority, and personal discipline. Every gown, wing collar tunic, and starched band is handcrafted to honor the storied tradition of the Bar and Bench while embracing modern ergonomic tailoring.</p></div>' +
        '<div class="identity-points">' +
          '<div class="identity-point">' + icon('scale', 'ic-md') + '<div><h4>Court Directives</h4><p>Fully certified for High Court &amp; Court of Appeal</p></div></div>' +
          '<div class="identity-point">' + icon('award', 'ic-md') + '<div><h4>Heritage Fabrics</h4><p>Super 140s wool &amp; pure Egyptian two-ply cotton</p></div></div>' +
        '</div>' +
        '<div><button type="button" data-action="navigate" data-page="our-story" class="btn-dark btn-lg">Discover Our Story ' + icon('arrowRight', 'ic-sm') + '</button></div>' +
      '</div>' +
    '</div></div></section>';
  }

  function lookbook() {
    var L = window.SLAData.LOOKBOOK_IMAGES;
    function plate(img, label, title, sub, aspectClass) {
      return '<div class="look-group"><div class="look-media ' + aspectClass + '"><img src="' + img + '" alt="' + esc(title) + '" loading="lazy" referrerpolicy="no-referrer">' +
        '<div class="look-label">' + label + '</div></div>' +
        '<div class="look-caption"><h3>' + esc(title) + '</h3><p>' + esc(sub) + '</p></div></div>';
    }
    return '' +
    '<section class="section"><div class="wrap">' +
      '<div class="section-head"><div><div class="eyebrow">04 / LOOKBOOK</div>' +
        '<h2 class="section-title">The sartorial codes of advocacy.</h2></div>' +
        '<p class="section-side">An editorial study in form, proportion, and quiet judicial authority.</p></div>' +
      '<div class="look-grid">' +
        '<div class="look-main">' + plate(L[0].url, 'PLATE I / SALLY’S ATELIER', L[0].title, L[0].subtitle, 'aspect-portrait') + '</div>' +
        '<div class="look-side">' +
          plate(L[1].url, 'PLATE II / ROBING DETAIL', L[1].title, L[1].subtitle, 'aspect-landscape') +
          plate(L[2].url, 'PLATE III / FORMAL SHIRTING', L[2].title, L[2].subtitle, 'aspect-landscape') +
        '</div>' +
        '<div class="look-bottom">' + plate(L[3].url, 'PLATE IV / REGALIA', L[3].title, L[3].subtitle, 'aspect-wide') + '</div>' +
        '<div class="look-bottom">' + plate(L[4].url, 'PLATE V / JUDICIAL TRADITION', L[4].title, L[4].subtitle, 'aspect-wide') + '</div>' +
      '</div>' +
    '</div></section>';
  }

  function socialSection() {
    var C = window.SLAData.CONTACT;
    var posts = window.SLAData.SOCIAL_POSTS.map(function (post) {
      return '' +
      '<a class="social-tile" href="' + C.instagram + '" target="_blank" rel="noopener noreferrer" aria-label="View Instagram post">' +
        '<img src="' + post.image + '" alt="Sally\'s Legal Apparel Instagram Feed" loading="lazy" referrerpolicy="no-referrer">' +
        '<div class="social-overlay"><div class="social-overlay-top"><span class="gold-text">@legal___apparel</span>' +
          '<div class="social-likes">' + icon('heart', 'ic-xs fill-current') + '<span>' + post.likes + '</span></div></div>' +
          '<p>' + esc(post.caption) + '</p><div class="social-cta">TAP TO VIEW ON IG</div></div>' +
      '</a>';
    }).join('');
    return '' +
    '<section class="section"><div class="wrap">' +
      '<div class="section-head"><div><div class="eyebrow">05 / SOCIAL</div>' +
        '<h2 class="section-title">Follow the collection.</h2></div>' +
        '<a class="ig-link" href="' + C.instagram + '" target="_blank" rel="noopener noreferrer">' +
          window.SLAIcons.instagramMark('ic-sm') + '<span>' + C.instagramHandle + '</span>' + icon('external', 'ic-xs dim') + '</a></div>' +
      '<div class="social-grid">' + posts + '</div>' +
    '</div></section>';
  }

  function homeView() {
    return heroView() + trustStrip() + collectionsGrid() + theEdit() + theIdentity() + lookbook() + socialSection();
  }

  /* ================= SHOP ================= */

  var CATEGORY_TABS = ['All', 'Court Robes', 'Court Shirts', 'Suits & Formalwear', 'Wigs', 'Bands', 'Bags', 'Accessories'];

  function filteredProducts() {
    var S = window.SLA.state;
    var list = window.SLAData.PRODUCTS.filter(function (p) {
      if (S.shopCategory !== 'All' && p.category !== S.shopCategory) return false;
      if (S.shop.inStockOnly && !p.inStock) return false;
      var q = S.shop.search.trim().toLowerCase();
      if (q) {
        var hay = (p.name + ' ' + p.category + ' ' + p.description + ' ' + (p.subtitle || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    var sort = S.shop.sort;
    list.sort(function (a, b) {
      if (sort === 'price-low') return a.priceTZS - b.priceTZS;
      if (sort === 'price-high') return b.priceTZS - a.priceTZS;
      if (sort === 'newest') return b.id.localeCompare(a.id);
      return ((b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    });
    return list;
  }

  function shopResultsHTML() {
    var S = window.SLA.state;
    var list = filteredProducts();
    var grid;
    if (list.length === 0) {
      grid = '<div class="shop-empty"><h3>No matching apparel found</h3>' +
        '<p>We couldn&#39;t find any legal attire matching &quot;' + esc(S.shop.search) + '&quot; in ' + esc(S.shopCategory) + '. Try clearing your filters.</p>' +
        '<button type="button" data-action="shop-reset" class="btn-dark">RESET ALL FILTERS</button></div>';
    } else {
      grid = '<div class="grid-shop">' + list.map(productCard).join('') + '</div>';
    }
    return '' +
    '<div class="shop-count"><span>Showing ' + list.length + ' ' + (list.length === 1 ? 'item' : 'items') + '</span>' +
      (S.shopCategory !== 'All' ? '<span class="shop-count-cat">Category: ' + esc(S.shopCategory) + '</span>' : '') + '</div>' +
    grid;
  }

  function shopView() {
    var S = window.SLA.state;
    var pills = CATEGORY_TABS.map(function (tab) {
      return '<button type="button" data-action="shop-category" data-value="' + esc(tab) + '" class="pill' + (S.shopCategory === tab ? ' pill-on' : '') + '">' + esc(tab) + '</button>';
    }).join('');
    return '' +
    '<div class="page-shop"><div class="wrap">' +
      '<div class="page-head"><div class="eyebrow">ATELIER CATALOGUE</div>' +
        '<h1 class="page-title">The Complete Legal Collection</h1>' +
        '<p class="page-sub">Bespoke court robes, silk judicial gowns, wing-collar tunic shirts, ceremonial wigs, and tailored attire made for the Bar &amp; the Bench.</p></div>' +
      '<div class="pill-row">' + pills + '</div>' +
      '<div class="shop-toolbar">' +
        '<div class="shop-search">' + icon('search', 'ic-sm dim') +
          '<input id="shop-search-input" type="text" placeholder="Search robes, shirts, wigs, collar sizes..." value="' + esc(S.shop.search) + '" autocomplete="off">' +
          '<button type="button" id="shop-clear-btn" data-action="shop-clear-search" class="mini-icon-btn" style="display:' + (S.shop.search ? '' : 'none') + '">' + icon('x', 'ic-xs') + '</button>' +
        '</div>' +
        '<div class="shop-controls">' +
          '<label class="stock-toggle"><input id="shop-stock-checkbox" type="checkbox"' + (S.shop.inStockOnly ? ' checked' : '') + '><span>In Stock Only</span></label>' +
          '<div class="sort-wrap"><span class="sort-label">' + icon('sort', 'ic-xs') + ' Sort:</span>' +
            '<select id="shop-sort-select">' +
              '<option value="featured"' + (S.shop.sort === 'featured' ? ' selected' : '') + '>Featured</option>' +
              '<option value="newest"' + (S.shop.sort === 'newest' ? ' selected' : '') + '>Newest</option>' +
              '<option value="price-low"' + (S.shop.sort === 'price-low' ? ' selected' : '') + '>Price: Low to High</option>' +
              '<option value="price-high"' + (S.shop.sort === 'price-high' ? ' selected' : '') + '>Price: High to Low</option>' +
            '</select></div>' +
        '</div>' +
      '</div>' +
      '<div id="shop-results">' + shopResultsHTML() + '</div>' +
    '</div></div>';
  }

  /* ================= PRODUCT DETAIL ================= */

  function detailState(p) {
    var d = window.SLA.state.detail;
    var color = window.SLAComponents.colorByName(p, d.colorName || p.colours[0].name);
    return {
      color: color,
      size: d.size || p.sizes[0],
      qty: d.quantity || 1,
      image: d.image || color.image || p.images[0],
      tab: d.tab || 'details'
    };
  }

  function productDetailView() {
    var S = window.SLA.state;
    var p = window.SLAData.getProduct(S.selectedProductId);
    if (!p) return '';
    var st = detailState(p);
    var wishlisted = S.wishlist.indexOf(p.id) !== -1;
    var C = window.SLAComponents;

    var thumbs = p.images.length > 1 ? '<div class="detail-thumbs">' + p.images.map(function (img, idx) {
      return '<button type="button" data-action="detail-image" data-src="' + esc(img) + '" class="detail-thumb' + (st.image === img ? ' thumb-on' : '') + '">' +
        '<img src="' + esc(img) + '" alt="' + esc(p.name) + ' view ' + (idx + 1) + '" referrerpolicy="no-referrer"></button>';
    }).join('') + '</div>' : '';

    var colorBtns = p.colours.map(function (col) {
      var on = st.color.name === col.name;
      var light = (col.hex === '#FFFFFF' || col.hex === '#F9F6F0' || col.hex === '#FAF9F6' || col.hex === '#F9F8F5' || col.hex === '#FAF9F6' || col.hex === '#F5F5F7');
      return '<button type="button" data-action="detail-color" data-value="' + esc(col.name) + '" class="color-dot' + (on ? ' color-on' : '') + '" style="background-color:' + col.hex + '" title="' + esc(col.name) + '" aria-label="Select ' + esc(col.name) + '">' +
        (on ? icon('check', 'ic-xs' + (light ? ' dark-check' : ' light-check')) : '') + '</button>';
    }).join('');

    var sizeBtns = p.sizes.map(function (sz) {
      return '<button type="button" data-action="detail-size" data-value="' + esc(sz) + '" class="size-btn' + (st.size === sz ? ' size-on' : '') + '">' + esc(sz) + '</button>';
    }).join('');

    function accordion(id, ic, title, body) {
      var open = st.tab === id;
      return '<div class="accordion">' +
        '<button type="button" data-action="detail-tab" data-value="' + id + '" class="accordion-head">' +
          '<span class="accordion-title">' + icon(ic, 'ic-sm gold-dark') + esc(title) + '</span><span>' + (open ? '−' : '+') + '</span></button>' +
        (open ? '<div class="accordion-body">' + body + '</div>' : '') + '</div>';
    }

    var sameCategory = window.SLAData.PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; });
    var others = window.SLAData.PRODUCTS.filter(function (x) { return x.category !== p.category && x.id !== p.id; });
    var related = sameCategory.concat(others).slice(0, 4);

    var recentIds = [];
    try {
      var stored = localStorage.getItem('sallys_legal_recently_viewed');
      var ids = stored ? JSON.parse(stored) : [];
      recentIds = ids.filter(function (id) { return id !== p.id; }).slice(0, 4);
    } catch (e) { /* ignore */ }
    var recent = recentIds.map(function (id) { return window.SLAData.getProduct(id); }).filter(Boolean);

    return '' +
    '<div class="page-detail"><div class="wrap">' +
      '<nav class="breadcrumb"><button type="button" data-action="navigate" data-page="shop" data-category="' + esc(p.category) + '">Shop</button>' +
        icon('chevronRight', 'ic-xs dim') + '<span class="crumb-cat">' + esc(p.category) + '</span>' +
        icon('chevronRight', 'ic-xs dim') + '<span class="crumb-current">' + esc(p.name) + '</span></nav>' +
      '<div class="detail-grid">' +
        '<div class="detail-gallery">' + thumbs +
          '<div class="detail-stage"><img src="' + esc(st.image) + '" alt="' + esc(p.name) + '" referrerpolicy="no-referrer">' +
            (p.tag ? '<div class="detail-tag">' + esc(p.tag) + '</div>' : '') +
            '<div class="detail-collection-tag">SALLY&#39;S COURT COLLECTION</div></div>' +
        '</div>' +
        '<div class="detail-info">' +
          '<div class="detail-top-meta"><span>' + esc(p.category) + '</span>' +
            (p.inStock ? '<span class="avail">Available for Chamber Delivery</span>' : '<span class="made-to-order">Made to Order (5 Days)</span>') + '</div>' +
          '<h1 class="detail-name">' + esc(p.name) + '</h1>' +
          (p.subtitle ? '<p class="detail-subtitle">' + esc(p.subtitle) + '</p>' : '') +
          '<div class="detail-price">' + window.SLA.productPrice(p) + '</div>' +
          '<p class="detail-desc">' + esc(p.description) + '</p>' +
          '<div class="detail-opt"><div class="detail-opt-head"><span class="opt-label">COLOUR:</span><span class="opt-value">' + esc(st.color.name) + '</span></div>' +
            '<div class="color-row">' + colorBtns + '</div></div>' +
          '<div class="detail-opt"><div class="detail-opt-head"><span class="opt-label">SIZE:</span>' +
            '<button type="button" data-action="open-size-guide" class="size-guide-btn">' + icon('ruler', 'ic-xs') + '<span>SIZE GUIDE</span></button></div>' +
            '<div class="size-row">' + sizeBtns + '</div></div>' +
          '<div class="detail-qty-row"><span class="opt-label">QUANTITY:</span>' +
            '<div class="qty-box qty-lg"><button type="button" data-action="detail-qty" data-delta="-1">−</button><span>' + st.qty + '</span><button type="button" data-action="detail-qty" data-delta="1">+</button></div></div>' +
          '<div class="detail-actions">' +
            '<button type="button" data-action="detail-whatsapp" class="btn-whatsapp">' + icon('message', 'ic-sm') + '<span>ORDER VIA WHATSAPP</span></button>' +
            '<div class="detail-actions-2">' +
              '<button type="button" data-action="detail-add" class="btn-outline-dark">' + icon('bag', 'ic-sm') + '<span>ADD TO BAG</span></button>' +
              '<button type="button" data-action="detail-buy" class="btn-dark">BUY NOW ' + icon('arrowRight', 'ic-sm') + '</button>' +
            '</div>' +
            '<button type="button" data-action="toggle-wishlist" data-id="' + p.id + '" class="btn-wish' + (wishlisted ? ' btn-wish-on' : '') + '">' +
              icon('heart', 'ic-xs' + (wishlisted ? ' fill-current' : '')) + '<span>' + (wishlisted ? 'SAVED IN WISHLIST' : 'SAVE TO WISHLIST') + '</span></button>' +
          '</div>' +
          '<div class="mpesa-box"><div class="mpesa-box-head"><span>OFFICIAL M-PESA CHECKOUT</span><span class="verified">INSTANT VERIFICATION</span></div>' +
            C.mpesaBadge('md', true) +
            '<p>Pay instantly via Vodacom M-Pesa. Use Lipa No. 50777411 during checkout or on your mobile device.</p></div>' +
          '<div class="accordions">' +
            accordion('details', 'scale', 'Courtroom Specifications & Fabric',
              '<p><strong>Court Directives:</strong> ' + esc(p.courtDetails || 'Manufactured in compliance with the High Court of Tanzania Practice Directions and Commonwealth Advocate standards.') + '</p>' +
              '<p><strong>Fabric Composition:</strong> ' + esc(p.fabric || 'Super 140s pure wool / Egyptian cotton.') + '</p>' +
              '<p><strong>Atelier Note:</strong> Every robe yoke and sleeve fluting is hand-pleated to ensure enduring drape and dignity in open court.</p>') +
            accordion('shipping', 'truck', 'Shipping & Chambers Delivery',
              '<p><strong>Dar es Salaam:</strong> Same-day or next-day personal delivery to law firms, High Court registry, or judicial chambers.</p>' +
              '<p><strong>Upcountry (Arusha, Dodoma, Mwanza, Mbeya, Zanzibar):</strong> 1 to 2 business days via express courier with real-time tracking.</p>' +
              '<p><strong>East Africa (Kenya, Uganda, Rwanda):</strong> 2 to 4 business days for East African Court of Justice advocates.</p>') +
            accordion('returns', 'rotateCcw', 'Fittings & Tailoring Guarantee',
              '<p>We provide complimentary hem and sleeve adjustments at our Dar es Salaam atelier for any advocate robes within 14 days of purchase.</p>') +
          '</div>' +
        '</div>' +
      '</div>' +
      (related.length > 0 ?
        '<div class="related"><div class="related-head"><div><span class="related-kicker">FROM THE SAME CATEGORY (' + esc(p.category.toUpperCase()) + ')</span>' +
          '<h3>YOU MAY ALSO LIKE</h3></div>' +
          '<button type="button" data-action="navigate" data-page="shop" data-category="' + esc(p.category) + '" class="link-underline">View Full Collection</button></div>' +
          '<div class="grid-related">' + related.map(productCard).join('') + '</div></div>' : '') +
      (recent.length > 0 ?
        '<div class="related"><div class="related-head"><div><span class="related-kicker dim">CONTINUE BROWSING</span><h3>RECENTLY VIEWED</h3></div></div>' +
          '<div class="grid-related">' + recent.map(productCard).join('') + '</div></div>' : '') +
    '</div></div>';
  }

  /* ================= CHECKOUT ================= */

  var CITY_OPTIONS = [
    'Dar es Salaam', 'Arusha', 'Dodoma', 'Mwanza', 'Zanzibar', 'Mbeya', 'Morogoro', 'Tanga',
    'Other Tanzania', 'Kenya / Uganda / Rwanda'
  ];
  var CITY_LABELS = {
    'Dar es Salaam': 'Dar es Salaam (Chambers / High Court / Registry)',
    'Arusha': 'Arusha (High Court / EACJ / Regional)',
    'Dodoma': 'Dodoma (Court of Appeal / Bunge / Government)',
    'Mwanza': 'Mwanza (Lake Zone Chambers)',
    'Zanzibar': 'Zanzibar (Vuga High Court / Stone Town)',
    'Mbeya': 'Mbeya (Southern Highlands)',
    'Morogoro': 'Morogoro',
    'Tanga': 'Tanga',
    'Other Tanzania': 'Other Upcountry Tanzania Destination',
    'Kenya / Uganda / Rwanda': 'East Africa Regional Express'
  };

  function checkoutView() {
    var S = window.SLA.state;
    if (S.checkout) return confirmationView(S.checkout);
    if (S.cart.length === 0) {
      return '<div class="checkout-empty"><h2>Your shopping bag is empty</h2>' +
        '<p>Please add court robes or legal apparel to your bag before proceeding to checkout.</p>' +
        '<button type="button" data-action="navigate" data-page="shop" class="btn-dark">RETURN TO SHOP</button></div>';
    }
    var t = window.SLA.cartTotals();
    var money = window.SLA.money;
    var R = window.SLAOrders.resolveItem;
    var lines = S.cart.map(function (raw) {
      var it = R(raw);
      if (!it) return '';
      return '<div class="summary-line"><div class="summary-thumb"><img src="' + esc(it.color.image || it.product.images[0]) + '" alt="' + esc(it.product.name) + '" referrerpolicy="no-referrer"></div>' +
        '<div class="summary-line-body"><div class="summary-line-name">' + esc(it.product.name) + '</div>' +
        '<div class="summary-line-meta">' + esc(it.color.name) + ' • ' + esc(it.size) + ' × ' + it.quantity + '</div></div>' +
        '<div class="summary-line-price">' + money(it.product.priceTZS * it.quantity, it.product.priceUSD * it.quantity) + '</div></div>';
    }).join('');
    var cityOpts = CITY_OPTIONS.map(function (c) {
      return '<option value="' + esc(c) + '"' + (c === 'Dar es Salaam' ? ' selected' : '') + '>' + esc(CITY_LABELS[c]) + '</option>';
    }).join('');
    return '' +
    '<div class="page-checkout"><div class="wrap">' +
      '<button type="button" data-action="open-cart" class="back-link">' + icon('chevronLeft', 'ic-sm') + '<span>Modify Shopping Bag</span></button>' +
      '<div class="page-head"><div class="eyebrow gold-eyebrow">SECURE CHECKOUT</div>' +
        '<h1 class="page-title">Chambers Order &amp; Delivery Details</h1></div>' +
      '<form id="checkout-form" novalidate><div class="checkout-grid">' +
        '<div class="checkout-left">' +
          '<div class="panel"><h3 class="panel-h"><span class="step-no">1</span><span>CUSTOMER INFORMATION</span></h3>' +
            '<div class="form-grid">' +
              '<div class="field full"><label>Full Name / Counsel Title *</label>' +
                '<input type="text" id="co-name" placeholder="e.g. Adv. Stanley M. Stanslaus"><p class="field-err" id="err-co-name"></p></div>' +
              '<div class="field"><label>Phone Number (M-Pesa enabled) *</label>' +
                '<input type="tel" id="co-phone" placeholder="e.g. 0687 262 017 / +255 687..."><p class="field-err" id="err-co-phone"></p></div>' +
              '<div class="field"><label>Email Address *</label>' +
                '<input type="email" id="co-email" placeholder="counsel@lawfirm.co.tz"><p class="field-err" id="err-co-email"></p></div>' +
            '</div></div>' +
          '<div class="panel"><h3 class="panel-h"><span class="step-no">2</span><span>DELIVERY DESTINATION (TANZANIA &amp; EAST AFRICA)</span></h3>' +
            '<div class="form-grid">' +
              '<div class="field full"><label>City / Region *</label><select id="co-city">' + cityOpts + '</select></div>' +
              '<div class="field full"><label>Chambers Building / Street Address / Registry Room *</label>' +
                '<input type="text" id="co-address" placeholder="e.g. 4th Floor, NIC Life House, Sokoine Drive"><p class="field-err" id="err-co-address"></p></div>' +
              '<div class="field full"><label>Delivery Notes / Robe Sizing Notes (Optional)</label>' +
                '<textarea id="co-notes" rows="2" placeholder="Special instructions for chamber clerk, preferred delivery time or exact height..."></textarea></div>' +
            '</div></div>' +
          '<div class="panel panel-pay"><div class="panel-h split"><h3><span class="step-no">3</span><span>PAYMENT METHOD</span></h3>' +
            '<div class="official-lipa">' + icon('shield', 'ic-sm green') + '<span>OFFICIAL LIPA NO.</span></div></div>' +
            '<div class="pay-box">' +
              '<div class="pay-top"><div class="pay-brand">' + window.SLAComponents.mpesaLogoOfficial() +
                '<div><div class="pay-brand-sub">LIPA NA M-PESA</div><div class="pay-brand-till">TILL NO: 50777411</div></div></div>' +
                '<button type="button" data-action="copy" data-text="50777411" class="copy-btn">' + icon('copy', 'ic-xs') + '<span>Copy Till No.</span></button></div>' +
              '<p class="pay-note">Make payment directly to our official business Lipa number <strong>50777411</strong> (Sally&#39;s Legal Apparel). You can provide your M-Pesa transaction reference number below or complete payment immediately after placing the order.</p>' +
              '<div class="field"><label>M-Pesa Transaction ID / Reference (Optional if paying immediately after)</label>' +
                '<input type="text" id="co-mpesa" class="mono-upper" placeholder="e.g. QKH78921KL"></div>' +
            '</div></div>' +
        '</div>' +
        '<div class="checkout-right"><div class="panel summary-panel">' +
          '<h3 class="panel-h">ORDER SUMMARY (' + window.SLA.cartCount() + ' items)</h3>' +
          '<div class="summary-lines">' + lines + '</div>' +
          '<div class="totals">' +
            '<div class="total-row"><span>Subtotal</span><span class="mono">' + money(t.subTZS, t.subUSD) + '</span></div>' +
            '<div class="total-row"><span>Chambers Delivery (<span id="summary-city">Dar es Salaam</span>)</span><span class="mono" id="summary-fee">' +
              (t.feeTZS === 0 ? '<span class="free-green">FREE</span>' : money(t.feeTZS, t.feeUSD)) + '</span></div>' +
            '<div class="total-row grand"><span>Total Amount</span><span class="mono">' + money(t.totalTZS, t.totalUSD) + '</span></div>' +
          '</div>' +
          '<div class="summary-pay"><span>Payment Method</span>' + window.SLAComponents.mpesaBadge('sm', true) + '</div>' +
          '<div class="place-wrap"><button type="submit" id="place-order-btn" class="btn-dark btn-block btn-lg">PLACE ORDER ' + icon('arrowRight', 'ic-sm') + '</button>' +
          '<p class="place-note">Instant confirmation via M-Pesa &amp; WhatsApp</p></div>' +
        '</div></div>' +
      '</div></form>' +
    '</div></div>';
  }

  function confirmationView(order) {
    var itemsHtml = order.items.map(function (raw) {
      var it = window.SLAOrders.resolveItem(raw);
      if (!it) return '';
      return '<div class="confirm-line"><div><span class="confirm-item-name">' + esc(it.product.name) + '</span>' +
        '<span class="confirm-item-meta">(' + esc(it.color.name) + ', ' + esc(it.size) + ') × ' + it.quantity + '</span></div>' +
        '<span class="mono">TSh ' + (it.product.priceTZS * it.quantity).toLocaleString('en-US') + '</span></div>';
    }).join('');
    var waHref = 'https://wa.me/255687262017?text=' + encodeURIComponent('Hello Sally\'s Legal Apparel, I have placed order ' + order.orderNumber + ' for TSh ' + order.totalTZS.toLocaleString('en-US') + ' via M-Pesa.');
    return '' +
    '<div class="page-confirm"><div class="wrap-narrow"><div class="panel confirm-panel">' +
      '<div class="confirm-head"><div class="confirm-badge">' + icon('checkCircle', 'ic-lg green') + '</div>' +
        '<div class="eyebrow gold-eyebrow">ORDER RECEIVED • PENDING M-PESA CONFIRMATION</div>' +
        '<h1 class="confirm-title">Thank you, Counsel.</h1>' +
        '<p class="confirm-ref">Order Reference: <span class="mono-strong">' + esc(order.orderNumber) + '</span></p></div>' +
      '<div class="pay-instructions">' +
        '<div class="pay-instructions-head">' + window.SLAComponents.mpesaBadge('lg', false) + '<span class="official-tag">OFFICIAL LIPA NA M-PESA</span></div>' +
        '<div class="till-row"><span class="till-label">LIPA TILL NUMBER:</span>' +
          '<div class="till-value"><span>50777411</span>' +
          '<button type="button" data-action="copy" data-text="50777411" class="mini-icon-btn gold-dark" title="Copy Till Number">' + icon('copy', 'ic-sm') + '</button></div></div>' +
        '<div class="till-row"><span class="till-label">AMOUNT TO PAY:</span><span class="till-amount">TSh ' + order.totalTZS.toLocaleString('en-US') + '</span></div>' +
        '<div class="pay-steps"><p class="pay-steps-h">How to complete payment on your phone:</p>' +
          '<p>1. Dial <span class="mono-strong">*150*00#</span> (Vodacom M-Pesa)</p>' +
          '<p>2. Select <strong>4: Lipa kwa M-Pesa</strong></p>' +
          '<p>3. Select <strong>1: Weka Namba ya Kampuni / Till</strong></p>' +
          '<p>4. Enter Till Number: <span class="mono-strong">50777411</span> (Sally&#39;s Legal Apparel)</p>' +
          '<p>5. Enter Amount: <span class="mono-strong">' + order.totalTZS.toLocaleString('en-US') + '</span></p>' +
          '<p>6. Enter your PIN to confirm.</p></div>' +
      '</div>' +
      '<div class="confirm-cols">' +
        '<div><h4>Delivery Destination</h4><p class="confirm-name">' + esc(order.fullName) + '</p><p>' + esc(order.address) + '</p><p>' + esc(order.city) + ', Tanzania</p><p class="mono">' + esc(order.phone) + '</p></div>' +
        '<div><h4>Dispatch Timeline</h4><p>Dar es Salaam Chambers: Same day / Next day</p><p>Upcountry Courts: 1-2 business days</p>' +
        '<p class="confirm-email-note">Confirmation sent to <span>' + esc(order.email) + '</span></p></div>' +
      '</div>' +
      '<div class="confirm-items"><h4>Ordered Apparel (' + order.items.length + ')</h4>' + itemsHtml + '</div>' +
      '<div class="confirm-actions">' +
        '<button type="button" data-action="track-order" data-value="' + esc(order.orderNumber) + '" class="btn-dark">' + icon('truck', 'ic-sm gold') + '<span>TRACK SHIPPING STATUS LIVE</span></button>' +
        '<a class="btn-whatsapp" href="' + waHref + '" target="_blank" rel="noopener noreferrer"><span>CONFIRM ON WHATSAPP</span></a>' +
        '<button type="button" data-action="navigate" data-page="shop" class="btn-outline">CONTINUE SHOPPING</button>' +
      '</div>' +
    '</div></div></div>';
  }

  /* ================= OUR STORY ================= */

  function ourStoryView() {
    var C = window.SLAData.CONTACT;
    return '' +
    '<div class="page-story"><div class="wrap">' +
      '<div class="story-intro"><div class="eyebrow gold-eyebrow">ATELIER HERITAGE • SALLY&#39;S LEGAL APPAREL</div>' +
        '<h1 class="story-title">Crafting the dignity of the Bar &amp; the Bench.</h1>' +
        '<p class="story-lead">Founded in Dar es Salaam, Sally&#39;s Legal Apparel was established with a singular, uncompromising vision: to elevate courtroom dress in Tanzania and East Africa into a distinguished expression of sartorial excellence and legal heritage.</p></div>' +
      '<div class="story-split">' +
        '<div class="story-text"><h2>The Advocate&#39;s Armour</h2>' +
          '<p>When an advocate steps into the courtroom, every detail of attire signals respect for the administration of justice. The weight of the barathea wool, the clean fall of the pleated yoke, the crisp starch of the Irish linen bands—these are not mere ornaments, but centuries of solemn tradition.</p>' +
          '<p>We collaborate with master tailors and traditional English wigmakers to ensure every gown and peruke meets both the statutory requirements of the Advocates Act and the demanding climate of tropical courtrooms.</p>' +
          '<div><button type="button" data-action="navigate" data-page="shop" class="btn-dark">VIEW ROBES &amp; ATTIRE</button></div></div>' +
        '<div><div class="story-media"><img src="' + window.SLAData.ROBE_HERO + '" alt="Sally\'s Legal Apparel Robe Details" referrerpolicy="no-referrer">' +
          '<div class="story-tag">DAR ES SALAAM ATELIER</div></div></div>' +
      '</div>' +
      '<div class="pillars">' +
        '<div class="pillar">' + icon('scale', 'ic-lg gold-dark') + '<h3>Statutory Conformity</h3><p>Every garment is designed in strict compliance with the High Court of Tanzania Practice Directions, the East African Court of Justice, and Commonwealth judicial norms.</p></div>' +
        '<div class="pillar">' + icon('award', 'ic-lg gold-dark') + '<h3>Finest Natural Fibers</h3><p>We exclusively employ Super 140s English barathea wool, two-ply Giza Egyptian cotton for tunic shirts, and genuine woven horsehair for ceremonial wigs.</p></div>' +
        '<div class="pillar">' + icon('shield', 'ic-lg gold-dark') + '<h3>Chambers Fitting Service</h3><p>Our tailoring specialists provide on-site chamber measurements and consultations for law firms and judicial registries across Dar es Salaam.</p></div>' +
      '</div>' +
      '<div class="panel story-contact"><div class="story-contact-grid">' +
        '<div><div class="eyebrow gold-eyebrow">VISIT THE ATELIER</div>' +
          '<h2 class="section-title">Chambers Location &amp; Direct Inquiries</h2>' +
          '<div class="story-contact-lines">' +
            '<div class="story-line">' + icon('mapPin', 'ic-sm gold-dark') + '<span>668C+QRQ Palestina, Shekilango Rd, Dar es Salaam, Tanzania</span></div>' +
            '<div class="story-line">' + icon('phone', 'ic-sm gold-dark') + '<a href="tel:' + C.phoneHref + '">' + C.phone + '</a></div>' +
            '<div class="story-line">' + icon('mail', 'ic-sm gold-dark') + '<a href="mailto:' + C.email + '">' + C.email + '</a></div>' +
          '</div>' +
          '<div class="story-contact-btns">' +
            '<a class="btn-dark" href="' + C.mapsUrl + '" target="_blank" rel="noopener noreferrer">GET DIRECTIONS ' + icon('external', 'ic-xs') + '</a>' +
            '<button type="button" data-action="open-policy" data-tab="contact" class="btn-outline-dark">ATELIER DETAILS</button>' +
          '</div></div>' +
        '<div><div class="story-contact-media"><img src="' + window.SLAData.HERO_IMAGE + '" alt="Sally\'s Legal Apparel Atelier" loading="lazy" referrerpolicy="no-referrer"></div>' +
          '<div class="story-mpesa">' + window.SLAComponents.mpesaBadge('md', true) + '</div></div>' +
      '</div></div>' +
    '</div></div>';
  }

  window.SLAViews = {
    homeView: homeView,
    shopView: shopView,
    shopResultsHTML: shopResultsHTML,
    filteredProducts: filteredProducts,
    productDetailView: productDetailView,
    checkoutView: checkoutView,
    ourStoryView: ourStoryView
  };
})();
