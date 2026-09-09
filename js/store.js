/* Sally's Legal Apparel — global store: state, persistence, helpers.
 * Globals: window.SLA = { state, ...actions } */
(function () {
  'use strict';

  function load(key, fallback) {
    try {
      var saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function persist(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* storage unavailable */ }
  }

  var state = {
    page: 'home',               // home | shop | product-detail | checkout | our-story
    shopCategory: 'All',
    selectedProductId: null,
    currency: 'TZS',            // TZS | USD
    cart: load('sallys_legal_cart', []),
    wishlist: load('sallys_legal_wishlist', []),
    cartOpen: false,
    wishlistOpen: false,
    searchOpen: false,
    sizeGuideOpen: false,
    accountOpen: false,
    accountTab: 'account',      // account | tracking
    trackingOrderNumber: '',
    quickViewId: null,
    policyOpen: false,
    policyTab: 'contact',
    mobileMenuOpen: false,
    signedInEmail: '',
    checkout: null,             // placed order confirmation object
    shop: { search: '', sort: 'featured', inStockOnly: false },
    detail: { colorName: null, size: null, quantity: 1, image: null, tab: 'details' },
    quickView: { colorName: null, size: null, quantity: 1, image: null }
  };

  function money(tzs, usd) {
    if (state.currency === 'USD') return '$' + Number(usd).toLocaleString('en-US');
    return 'TSh ' + Number(tzs).toLocaleString('en-US');
  }

  function productPrice(product) {
    return money(product.priceTZS, product.priceUSD);
  }

  function deliveryFee(subtotalTZS, subtotalUSD) {
    if (subtotalTZS === 0) return { tzs: 0, usd: 0 };
    if (subtotalTZS > 300000 || subtotalUSD > 120) return { tzs: 0, usd: 0 };
    return { tzs: 15000, usd: 6 };
  }

  function cartCount() {
    return state.cart.reduce(function (sum, raw) {
      return sum + (raw.quantity || 1);
    }, 0);
  }

  function cartTotals() {
    var R = window.SLAOrders.resolveItem;
    var subTZS = 0, subUSD = 0;
    state.cart.forEach(function (raw) {
      var it = R(raw);
      if (!it) return;
      subTZS += it.product.priceTZS * it.quantity;
      subUSD += it.product.priceUSD * it.quantity;
    });
    var fee = deliveryFee(subTZS, subUSD);
    return { subTZS: subTZS, subUSD: subUSD, feeTZS: fee.tzs, feeUSD: fee.usd, totalTZS: subTZS + fee.tzs, totalUSD: subUSD + fee.usd };
  }

  function saveCart() { persist('sallys_legal_cart', state.cart); }
  function saveWishlist() { persist('sallys_legal_wishlist', state.wishlist); }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function whatsappLink(message) {
    return 'https://wa.me/' + window.SLAData.WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  window.SLA = {
    state: state,
    load: load,
    persist: persist,
    money: money,
    productPrice: productPrice,
    deliveryFee: deliveryFee,
    cartCount: cartCount,
    cartTotals: cartTotals,
    saveCart: saveCart,
    saveWishlist: saveWishlist,
    esc: esc,
    whatsappLink: whatsappLink,
    render: function () {} // replaced by app.js
  };
})();
