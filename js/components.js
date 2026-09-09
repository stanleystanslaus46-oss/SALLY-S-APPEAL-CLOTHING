/* Sally's Legal Apparel — shared HTML components (converted from src/components/*).
 * Globals: window.SLAComponents = { ... } */
(function () {
  'use strict';

  function icon(name, cls, sw) { return window.SLAIcons.icon(name, cls, sw); }
  function esc(s) { return window.SLA.esc(s); }

  /* Per-card colour selection (session-only, mirrors ProductCard local state). */
  var cardColors = {};
  function cardColor(product) {
    return cardColors[product.id] || product.colours[0].name;
  }
  function setCardColor(id, colorName) { cardColors[id] = colorName; }
  function colorByName(product, name) {
    for (var i = 0; i < product.colours.length; i++) {
      if (product.colours[i].name === name) return product.colours[i];
    }
    return product.colours[0];
  }

  /* ---------- Brand logo (converted from Logo.tsx) ---------- */
  var logoUid = 0;
  function logoSVG(variant, size) {
    var isLight = variant === 'light';
    var fill = isLight ? '#FFFFFF' : '#1A1A1A';
    var maskId = 'sla_mask_' + (++logoUid);
    var sizeClass = size === 'sm' ? 'logo-sm' : (size === 'lg' ? 'logo-lg' : 'logo-md');
    return '' +
    '<svg class="sla-logo ' + sizeClass + '" viewBox="0 0 1000 520" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sally\'s Legal Apparel Official Logo">' +
      '<defs><mask id="' + maskId + '">' +
        '<rect width="1000" height="520" fill="white"/>' +
        '<rect x="30" y="225" width="940" height="70" fill="black"/>' +
      '</mask></defs>' +
      '<g mask="url(#' + maskId + ')" fill="' + fill + '">' +
        '<path d="M 285 105 C 285 45 230 25 175 25 C 105 25 65 65 65 140 C 65 210 115 240 185 260 C 235 275 255 295 255 335 C 255 385 215 415 165 415 C 105 415 65 375 65 325 L 145 325 C 145 355 165 365 180 365 C 200 365 215 350 215 335 C 215 290 170 270 115 250 C 75 235 45 200 45 145 C 45 70 95 15 175 15 C 245 15 305 60 305 130 Z"/>' +
        '<path d="M 415 20 H 510 V 325 L 635 260 V 415 H 415 Z"/>' +
        '<path d="M 770 20 H 820 L 945 415 H 850 L 825 320 H 760 L 735 415 H 645 Z M 795 110 L 775 240 H 815 Z"/>' +
      '</g>' +
      '<text x="500" y="267" text-anchor="middle" font-family="\'Manrope\', sans-serif" font-size="31" font-weight="700" letter-spacing="0.22em" fill="' + fill + '">SALLY&#39;S LEGAL APPAREL</text>' +
    '</svg>';
  }

  /* ---------- M-PESA badges (converted from MPesaBadge.tsx) ---------- */
  function mpesaBadge(size, showLipaNo) {
    var till = window.SLAData.TILL_NUMBER;
    return '<span class="mpesa-badge">' +
      '<span class="mpesa-pill">M-PESA</span>' +
      (showLipaNo === false ? '' : '<span class="mpesa-lipa ' + (size === 'sm' ? 'mpesa-lipa-sm' : '') + '">LIPA NO. ' + till + '</span>') +
    '</span>';
  }

  function mpesaLogoOfficial() {
    return '<span class="mpesa-official">' +
      window.SLAIcons.mpesaShield('mpesa-shield') +
      '<span class="mpesa-official-text">M-PESA</span>' +
    '</span>';
  }

  /* ---------- Announcement bar ---------- */
  function announcementBar() {
    var c = window.SLA.state.currency;
    return '' +
    '<div class="announce">' +
      '<div class="announce-left">' +
        '<span class="announce-brand">LEGAL OUTFITTERS</span>' +
        '<span class="announce-dot">•</span>' +
        '<span class="announce-sub">DAR ES SALAAM ATELIER • HIGH COURT &amp; BAR ATTIRE</span>' +
      '</div>' +
      '<div class="announce-right">' +
        '<div class="announce-till"><span class="announce-muted">OFFICIAL M-PESA TILL:</span>' +
        '<span class="announce-tillno">50777411</span></div>' +
        '<div class="announce-currency">' +
          '<button type="button" data-action="set-currency" data-value="TZS" class="' + (c === 'TZS' ? 'cur-active' : '') + '">TZS</button>' +
          '<span class="announce-slash">/</span>' +
          '<button type="button" data-action="set-currency" data-value="USD" class="' + (c === 'USD' ? 'cur-active' : '') + '">USD</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ---------- Header ---------- */
  function siteHeader() {
    var S = window.SLA.state;
    var cartN = window.SLA.cartCount();
    var wishN = S.wishlist.length;
    var active = S.page;
    return '' +
    '<div class="topnote">' + icon('sparkle', 'ic-xs gold') +
      '<span>Tanzanian Legal Outfitters • Nationwide Delivery via M-PESA • Dar es Salaam Chambers</span>' +
    '</div>' +
    '<header id="main-header" class="site-header">' +
      '<div class="wrap header-inner">' +
        '<div class="header-left">' +
          '<button type="button" id="header-logo-btn" data-action="navigate" data-page="home" class="logo-btn" aria-label="Sally\'s Legal Apparel - Return to Homepage">' +
            logoSVG('dark', 'md') +
          '</button>' +
        '</div>' +
        '<nav class="header-nav" aria-label="Main Navigation">' +
          '<button type="button" data-action="navigate" data-page="shop" class="nav-link' + (active === 'shop' ? ' nav-active' : '') + '">Shop</button>' +
          '<button type="button" data-action="goto-section" data-target="collections-section" class="nav-link">Collections</button>' +
          '<button type="button" data-action="goto-section" data-target="the-edit-section" class="nav-link">The Edit</button>' +
          '<button type="button" data-action="navigate" data-page="our-story" class="nav-link' + (active === 'our-story' ? ' nav-active' : '') + '">Our Story</button>' +
        '</nav>' +
        '<div class="header-right">' +
          '<button type="button" data-action="toggle-currency" class="currency-toggle hide-sm" title="Toggle currency display">' + S.currency + '</button>' +
          '<button type="button" data-action="open-search" class="icon-btn" aria-label="Search Legal Apparel">' + icon('search', 'ic-md') + '</button>' +
          '<button type="button" data-action="open-wishlist" class="icon-btn badge-wrap" aria-label="Saved Items">' + icon('heart', 'ic-md') +
            (wishN > 0 ? '<span class="count-pill">' + wishN + '</span>' : '') + '</button>' +
          '<button type="button" data-action="open-account" data-tab="tracking" class="track-btn hide-lg" title="Track Consignment Status">' + icon('truck', 'ic-sm gold-dark') + '<span>Track Order</span></button>' +
          '<button type="button" data-action="open-account" data-tab="account" class="icon-btn hide-sm" aria-label="Client Account / Chambers Service">' + icon('user', 'ic-md') + '</button>' +
          '<button type="button" data-action="open-cart" class="icon-btn badge-wrap" aria-label="Shopping Bag, ' + cartN + ' items">' + icon('bag', 'ic-md') +
            (cartN > 0 ? '<span class="count-pill-lg">' + cartN + '</span>' : '') + '</button>' +
          '<button type="button" data-action="mobile-menu" data-open="1" class="icon-btn show-mobile" aria-label="Open Mobile Menu">' + icon('menu', 'ic-md') + '</button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    mobileDrawer();
  }

  function mobileDrawer() {
    var S = window.SLA.state;
    if (!S.mobileMenuOpen) return '';
    return '' +
    '<div class="drawer-root" role="dialog" aria-modal="true">' +
      '<div class="backdrop" data-action="mobile-menu" data-open="0"></div>' +
      '<div class="drawer-panel mobile-panel">' +
        '<div>' +
          '<div class="mobile-head">' + logoSVG('dark', 'sm') +
            '<button type="button" data-action="mobile-menu" data-open="0" class="icon-btn" aria-label="Close Menu">' + icon('x', 'ic-md') + '</button>' +
          '</div>' +
          '<nav class="mobile-nav">' +
            '<button type="button" data-action="navigate" data-page="home">Home</button>' +
            '<button type="button" data-action="navigate" data-page="shop">Shop All Apparel</button>' +
            '<button type="button" data-action="goto-section" data-target="collections-section">Collections</button>' +
            '<button type="button" data-action="goto-section" data-target="the-edit-section">The Edit</button>' +
            '<button type="button" data-action="navigate" data-page="our-story">Our Story</button>' +
          '</nav>' +
          '<div class="mobile-links">' +
            '<button type="button" data-action="open-account" data-tab="tracking">' + icon('truck', 'ic-sm') + '<span>Track Consignment</span></button>' +
            '<button type="button" data-action="open-account" data-tab="account">' + icon('user', 'ic-sm') + '<span>Counsel Account</span></button>' +
            '<button type="button" data-action="toggle-currency">' + icon('sort', 'ic-sm') + '<span>Currency: ' + window.SLA.state.currency + ' (tap to switch)</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="mobile-foot">' +
          '<div class="mobile-till">OFFICIAL M-PESA TILL: <strong>50777411</strong></div>' +
          '<div class="mobile-note">Dar es Salaam Atelier • Mon–Sat</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ---------- Footer ---------- */
  function siteFooter() {
    var C = window.SLAData.CONTACT;
    var year = new Date().getFullYear();
    return '' +
    '<footer class="site-footer">' +
      '<div class="wrap footer-grid">' +
        '<div class="footer-top">' +
          '<div class="footer-col">' +
            logoSVG('light', 'md') +
            '<div class="footer-brand-sub">Sally&#39;s Legal Atelier &amp; Chambers</div>' +
            '<div class="footer-contact-line">' + icon('mapPin', 'ic-sm gold2') +
              '<span>668C+QRQ Palestina, Shekilango Rd<br><strong>Dar es Salaam, Tanzania</strong><br>P.O. Box 7192, Dar es Salaam</span>' +
            '</div>' +
            '<div class="footer-mini-links">' +
              '<button type="button" data-action="open-policy" data-tab="contact">Atelier Details</button>' +
              '<span class="footer-dot">•</span>' +
              '<a href="' + C.mapsUrl + '" target="_blank" rel="noopener noreferrer">Google Maps ↗</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<span class="footer-h">Chambers Hotline &amp; Hours</span>' +
            '<div class="footer-links">' +
              '<a href="tel:' + C.phoneHref + '">' + icon('phone', 'ic-sm gold2') + '<span>' + C.phone + '</span></a>' +
              '<a class="wa-green" href="' + window.SLA.whatsappLink('Hello Sally\'s Legal Apparel, I would like to inquire about court apparel.') + '" target="_blank" rel="noopener noreferrer">' + icon('message', 'ic-sm') + '<span>WhatsApp: ' + C.phone + '</span></a>' +
              '<a href="mailto:' + C.email + '">' + icon('mail', 'ic-sm gold2') + '<span>' + C.email + '</span></a>' +
            '</div>' +
            '<div class="footer-hours">' +
              '<div class="footer-hours-h">' + icon('clock', 'ic-xs gold2') + '<span>Business Hours (EAT):</span></div>' +
              '<div class="footer-hours-body">Mon – Fri: 08:00 – 18:00<br>Sat: 09:00 – 14:00<br>Sun: Emergency Court Appointments</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<span class="footer-h">Jurisdiction &amp; Delivery</span>' +
            '<div class="footer-links">' +
              '<div class="footer-contact-line">' + icon('truck', 'ic-sm gold2') + '<span><strong>Dar es Salaam:</strong> Same-day chambers express (CBD, Upanga, Oysterbay, Masaki, Mikocheni, Sinza).</span></div>' +
              '<div class="footer-contact-line">' + icon('shield', 'ic-sm gold2') + '<span><strong>Nationwide (24–48h):</strong> Arusha, Dodoma, Mwanza, Zanzibar, Mbeya, Tanga, Morogoro, Moshi.</span></div>' +
            '</div>' +
            '<div class="footer-policy-links">' +
              '<button type="button" data-action="open-policy" data-tab="delivery-areas">• View All Delivery Areas</button>' +
              '<button type="button" data-action="open-policy" data-tab="shipping">• Official Shipping Policy</button>' +
              '<button type="button" data-action="open-policy" data-tab="returns">• Returns &amp; Atelier Adjustment Policy</button>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<div class="footer-tillbox">' +
              '<div class="footer-tillbox-h">Official Judicial Settlement</div>' +
              '<div class="footer-tillbox-row"><span>M-PESA LIPA NO.</span><span class="footer-tillno">50777411</span></div>' +
              '<p>Vodacom M-Pesa Buy Goods &amp; Services till for swift verification and instant dispatch.</p>' +
            '</div>' +
            '<button type="button" data-action="open-account" data-tab="tracking" class="footer-track">' + icon('truck', 'ic-sm') + '<span>Track Consignment</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p>© ' + year + ' Sally&#39;s Legal Apparel. All Rights Reserved. Regulated Court Outfitter.</p>' +
          '<div class="footer-bottom-links">' +
            '<button type="button" data-action="open-policy" data-tab="shipping">Shipping Policy</button><span>•</span>' +
            '<button type="button" data-action="open-policy" data-tab="returns">Returns Guarantee</button><span>•</span>' +
            '<button type="button" data-action="open-policy" data-tab="contact">Physical Location</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  /* ---------- Product card (converted from ProductCard.tsx) ---------- */
  function productCard(product) {
    var S = window.SLA.state;
    var wishlisted = S.wishlist.indexOf(product.id) !== -1;
    var selColor = colorByName(product, cardColor(product));
    var activeImage = selColor.image || product.images[0];
    var swatches = product.colours.map(function (col) {
      var on = selColor.name === col.name;
      return '<button type="button" data-action="card-color" data-id="' + product.id + '" data-color="' + esc(col.name) + '"' +
        ' class="swatch' + (on ? ' swatch-on' : '') + '" style="background-color:' + col.hex + '" title="' + esc(col.name) + '" aria-label="Select ' + esc(col.name) + '"></button>';
    }).join('');
    return '' +
    '<div class="product-card">' +
      '<div class="product-media">' +
        '<img src="' + esc(activeImage) + '" alt="' + esc(product.name) + '" loading="lazy" referrerpolicy="no-referrer" data-action="select-product" data-id="' + product.id + '">' +
        (product.tag ? '<div class="product-tag">' + esc(product.tag) + '</div>' : '') +
        '<button type="button" data-action="toggle-wishlist" data-id="' + product.id + '" class="wish-btn' + (wishlisted ? ' wish-on' : '') + '" aria-label="' + (wishlisted ? 'Remove from wishlist' : 'Add to wishlist') + '">' +
          icon('heart', 'ic-xs' + (wishlisted ? ' fill-current' : '')) +
        '</button>' +
        '<div class="product-actions">' +
          '<button type="button" data-action="quick-view" data-id="' + product.id + '" class="pa-quick">' + icon('search', 'ic-xs') + '<span>Quick View</span></button>' +
          '<button type="button" data-action="add-to-cart" data-id="' + product.id + '" class="pa-add" title="Add default size to bag" aria-label="Add to bag">' + icon('bag', 'ic-xs') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="product-body">' +
        '<div class="product-meta"><span>' + esc(product.category) + '</span>' +
          (product.inStock ? '<span class="in-stock">In Stock</span>' : '') + '</div>' +
        '<h4 class="product-name" data-action="select-product" data-id="' + product.id + '">' + esc(product.name) + '</h4>' +
        '<div class="product-price">' + window.SLA.productPrice(product) + '</div>' +
        (product.colours.length > 0 ?
          '<div class="product-colors"><span class="colors-label">Colours:</span>' + swatches + '</div>' : '') +
      '</div>' +
    '</div>';
  }

  /* ---------- Cart drawer (converted from CartDrawer.tsx) ---------- */
  function cartDrawer() {
    var S = window.SLA.state;
    if (!S.cartOpen) return '';
    var R = window.SLAOrders.resolveItem;
    var t = window.SLA.cartTotals();
    var money = window.SLA.money;
    var itemsHtml;
    if (S.cart.length === 0) {
      itemsHtml = '<div class="drawer-empty">' + icon('bag', 'ic-xl faint') +
        '<p class="drawer-empty-title">Your bag is empty</p>' +
        '<p class="drawer-empty-text">Explore our collections of advocate robes, wing-collar shirts, and judicial wigs.</p>' +
        '<button type="button" data-action="close-cart" class="btn-dark">START SHOPPING</button></div>';
    } else {
      itemsHtml = S.cart.map(function (raw, idx) {
        var it = R(raw);
        if (!it) return '';
        var img = it.color.image || it.product.images[0];
        return '' +
        '<div class="cart-line">' +
          '<div class="cart-thumb"><img src="' + esc(img) + '" alt="' + esc(it.product.name) + '" referrerpolicy="no-referrer"></div>' +
          '<div class="cart-line-body">' +
            '<div>' +
              '<div class="cart-line-top"><h4>' + esc(it.product.name) + '</h4>' +
                '<button type="button" data-action="cart-remove" data-index="' + idx + '" class="mini-icon-btn" aria-label="Remove item">' + icon('trash', 'ic-xs') + '</button></div>' +
              '<div class="cart-line-meta"><span class="dot" style="background-color:' + it.color.hex + '"></span>' + esc(it.color.name) +
                '<span>•</span><span>Size: ' + esc(it.size) + '</span></div>' +
            '</div>' +
            '<div class="cart-line-bottom">' +
              '<div class="qty-box">' +
                '<button type="button" data-action="cart-qty" data-index="' + idx + '" data-delta="-1" aria-label="Decrease quantity">' + icon('minus', 'ic-xs') + '</button>' +
                '<span>' + it.quantity + '</span>' +
                '<button type="button" data-action="cart-qty" data-index="' + idx + '" data-delta="1" aria-label="Increase quantity">' + icon('plus', 'ic-xs') + '</button>' +
              '</div>' +
              '<div class="cart-line-price">' + money(it.product.priceTZS * it.quantity, it.product.priceUSD * it.quantity) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }
    var footerHtml = '';
    if (S.cart.length > 0) {
      footerHtml = '' +
      '<div class="drawer-foot cart-foot">' +
        '<div class="totals">' +
          '<div class="total-row"><span>Subtotal</span><span class="mono">' + money(t.subTZS, t.subUSD) + '</span></div>' +
          '<div class="total-row"><span>Estimated Delivery</span><span class="mono">' +
            (t.feeTZS === 0 ? '<span class="free-green">FREE (Dar es Salaam)</span>' : money(t.feeTZS, t.feeUSD)) + '</span></div>' +
          '<div class="total-row grand"><span>Total</span><span class="mono">' + money(t.totalTZS, t.totalUSD) + '</span></div>' +
        '</div>' +
        '<div class="mpesa-strip">' + mpesaBadge('sm', true) + '<span class="mono-sub">INSTANT LIPA</span></div>' +
        '<button type="button" data-action="proceed-checkout" class="btn-dark btn-block">PROCEED TO CHECKOUT ' + icon('arrowRight', 'ic-sm') + '</button>' +
        '<button type="button" data-action="close-cart" class="btn-text">CONTINUE SHOPPING</button>' +
      '</div>';
    }
    return '' +
    '<div class="drawer-root" role="dialog" aria-modal="true" aria-label="Shopping Bag">' +
      '<div class="backdrop" data-action="close-cart"></div>' +
      '<div class="drawer-panel">' +
        '<div class="drawer-head">' +
          '<div class="drawer-title">' + icon('bag', 'ic-md') + '<h3>Your Shopping Bag</h3>' +
            '<span class="count-pill-lg">' + window.SLA.cartCount() + '</span></div>' +
          '<button type="button" data-action="close-cart" class="icon-btn" aria-label="Close Bag">' + icon('x', 'ic-md') + '</button>' +
        '</div>' +
        '<div class="drawer-body">' + itemsHtml + '</div>' +
        footerHtml +
      '</div>' +
    '</div>';
  }

  /* ---------- Wishlist drawer (converted from WishlistDrawer.tsx) ---------- */
  function wishlistDrawer() {
    var S = window.SLA.state;
    if (!S.wishlistOpen) return '';
    var products = S.wishlist
      .map(function (id) { return window.SLAData.getProduct(id); })
      .filter(function (p) { return !!p; });
    var listHtml;
    if (products.length === 0) {
      listHtml = '<div class="drawer-empty">' + icon('heart', 'ic-xl faint') +
        '<p class="drawer-empty-title">Your wishlist is empty</p>' +
        '<p class="drawer-empty-text">Save advocate gowns, shirts, or accessories to review later.</p></div>';
    } else {
      listHtml = products.map(function (p) {
        return '' +
        '<div class="wish-line">' +
          '<img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" referrerpolicy="no-referrer" data-action="select-product" data-id="' + p.id + '">' +
          '<div class="wish-line-body">' +
            '<div class="wish-cat">' + esc(p.category) + '</div>' +
            '<h4 data-action="select-product" data-id="' + p.id + '">' + esc(p.name) + '</h4>' +
            '<div class="wish-price">' + window.SLA.productPrice(p) + '</div>' +
            '<div class="wish-line-actions">' +
              '<button type="button" data-action="add-to-cart" data-id="' + p.id + '">' + icon('bag', 'ic-xs') + '<span>Move to Bag</span></button>' +
              '<button type="button" data-action="wishlist-remove" data-id="' + p.id + '" class="mini-icon-btn" title="Remove">' + icon('trash', 'ic-xs') + '</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }
    return '' +
    '<div class="drawer-root" role="dialog" aria-modal="true" aria-label="Saved Items">' +
      '<div class="backdrop" data-action="close-wishlist"></div>' +
      '<div class="drawer-panel">' +
        '<div class="drawer-head">' +
          '<div class="drawer-title">' + icon('heart', 'ic-md gold-dark') + '<h3>Saved Regalia</h3>' +
            '<span class="count-pill-gold">' + products.length + '</span></div>' +
          '<button type="button" data-action="close-wishlist" class="icon-btn">' + icon('x', 'ic-md') + '</button>' +
        '</div>' +
        '<div class="drawer-body">' + listHtml + '</div>' +
        '<div class="drawer-foot"><button type="button" data-action="close-wishlist" class="btn-dark btn-block">CONTINUE BROWSING</button></div>' +
      '</div>' +
    '</div>';
  }

  /* ---------- Floating WhatsApp button ---------- */
  function whatsappButton() {
    if (window.SLA.state.page === 'checkout') return '';
    return '' +
    '<aside class="wa-float" aria-label="Contact Customer Support">' +
      '<a href="' + window.SLA.whatsappLink('Hello Sally\'s Legal Apparel, I would like to inquire about legal attire and court robes.') + '" target="_blank" rel="noopener noreferrer" aria-label="Chat with Sally\'s Legal Apparel on WhatsApp">' +
        window.SLAIcons.whatsappMark('wa-mark') +
        '<span class="wa-tip">Chat on WhatsApp</span>' +
      '</a>' +
    '</aside>';
  }

  window.SLAComponents = {
    logoSVG: logoSVG,
    mpesaBadge: mpesaBadge,
    mpesaLogoOfficial: mpesaLogoOfficial,
    announcementBar: announcementBar,
    siteHeader: siteHeader,
    siteFooter: siteFooter,
    productCard: productCard,
    cartDrawer: cartDrawer,
    wishlistDrawer: wishlistDrawer,
    whatsappButton: whatsappButton,
    cardColor: cardColor,
    setCardColor: setCardColor,
    colorByName: colorByName
  };
})();
