/* Sally's Legal Apparel — sample orders + order storage (converted from src/data/sampleOrders.ts).
 * Globals: window.SLAOrders = { SAMPLE_ORDERS, getStoredOrders, saveOrder, findOrder, normalizeOrderItem } */
(function () {
  'use strict';

  function getProduct(id) {
    return window.SLAData.getProduct(id);
  }

  function item(productId, colorName, size, quantity) {
    var p = getProduct(productId);
    var color = p.colours[0];
    for (var i = 0; i < p.colours.length; i++) {
      if (p.colours[i].name === colorName) { color = p.colours[i]; break; }
    }
    return { productId: p.id, colorName: color.name, size: size, quantity: quantity };
  }

  var SAMPLE_ORDERS = [
    {
      orderNumber: 'SLA-849201',
      fullName: 'Advocate J. Mwakipesile',
      phone: '+255 687 262 017',
      email: 'j.mwakipesile@chambers.co.tz',
      city: 'Dar es Salaam',
      address: 'Suite 4B, Samora Machel Avenue, High Court District',
      deliveryNotes: 'Please deliver to front reception desk or call counsel directly upon arrival.',
      paymentMethod: 'M-PESA',
      mpesaReference: 'QKD82910439',
      subtotalTZS: 1850000,
      deliveryFeeTZS: 0,
      totalTZS: 1850000,
      date: '06 Sep 2026',
      status: 'dispatched',
      estimatedDelivery: 'Today by 15:30 EAT',
      courierName: "Sally's Atelier Dedicated Courier (Driver: Kassim - Bike #TZ-892)",
      courierPhone: '+255 713 400 920',
      items: [item('sla-013', 'Ceremonial Black & White', 'Standard Package (38"-42")', 1)],
      trackingSteps: [
        { title: 'Order Placed & M-Pesa Confirmed', subtitle: 'Lipa na M-Pesa Till 50777411 payment verified (Ref: QKD82910439)', timestamp: '05 Sep 2026, 09:15 EAT', completed: true },
        { title: 'Chambers Atelier Tailoring & Yoke Inspection', subtitle: 'Barathea robe hand-fluting verified, horsehair peruke shaped & set in engraved tin box', timestamp: '05 Sep 2026, 16:40 EAT', completed: true },
        { title: 'Dispatched for Chamber Delivery', subtitle: 'Protective garment carrier out with dedicated courier for Samora Machel Ave', timestamp: '06 Sep 2026, 08:30 EAT', completed: true, current: true },
        { title: 'Delivered to Chambers', subtitle: 'Awaiting signature of receiving Counsel or Chambers Registrar', timestamp: 'Estimated Today by 15:30 EAT', completed: false }
      ]
    },
    {
      orderNumber: 'SLA-739182',
      fullName: 'Lady Justice E. R. Mushi',
      phone: '+255 784 551 230',
      email: 'justice.mushi@judiciary.go.tz',
      city: 'Arusha',
      address: 'Judicial Complex, East African Court of Justice, Arusha',
      deliveryNotes: 'Judicial Chambers wing, 2nd floor, Registrar office.',
      paymentMethod: 'M-PESA',
      mpesaReference: 'QKD71049281',
      subtotalTZS: 1465000,
      deliveryFeeTZS: 0,
      totalTZS: 1465000,
      date: '06 Sep 2026',
      status: 'tailoring',
      estimatedDelivery: 'Tomorrow, 08 Sep 2026',
      courierName: "Sally's Regional Express - Arusha Flight Dispatch",
      courierPhone: '+255 754 000 112',
      items: [
        item('sla-014', 'Appellate Gold & Black', '42R', 1),
        item('sla-017', 'Pristine Court White', 'Medium (14"-15")', 1)
      ],
      trackingSteps: [
        { title: 'Order Placed & M-Pesa Confirmed', subtitle: 'Lipa na M-Pesa Till 50777411 payment verified (Ref: QKD71049281)', timestamp: '06 Sep 2026, 11:20 EAT', completed: true },
        { title: 'Judicial Tailoring & Crimson Velvet Fitting', subtitle: 'Damask silk cut, gold bullion rosette sleeves assembly in Dar es Salaam Atelier', timestamp: '06 Sep 2026, 14:00 EAT', completed: true, current: true },
        { title: 'Regional Courier Dispatch', subtitle: 'Secure packaging in reinforced judicial wardrobe travel carrier', timestamp: 'Scheduled 07 Sep 2026, 09:00 EAT', completed: false },
        { title: 'Delivered to Chambers', subtitle: 'Judicial Complex Registry, Arusha', timestamp: 'Estimated 08 Sep 2026', completed: false }
      ]
    },
    {
      orderNumber: 'SLA-602477',
      fullName: 'Advocate S. B. Kimaro',
      phone: '+255 655 901 334',
      email: 's.kimaro@kimarochambers.co.tz',
      city: 'Dodoma',
      address: 'Court of Appeal Registry Annex, Dodoma',
      deliveryNotes: 'Leave with registry clerk if counsel is in session.',
      paymentMethod: 'M-PESA',
      mpesaReference: 'QKD65512008',
      subtotalTZS: 865000,
      deliveryFeeTZS: 0,
      totalTZS: 865000,
      date: '04 Sep 2026',
      status: 'delivered',
      estimatedDelivery: 'Delivered 05 Sep 2026',
      courierName: "Sally's Regional Express - Dodoma Route",
      courierPhone: '+255 754 000 118',
      items: [
        item('sla-001', 'Ceremonial Black', '42R (54")', 1),
        item('sla-005', 'Starch White', 'Standard (10")', 2)
      ],
      trackingSteps: [
        { title: 'Order Placed & M-Pesa Confirmed', subtitle: 'Lipa na M-Pesa Till 50777411 payment verified (Ref: QKD65512008)', timestamp: '04 Sep 2026, 08:40 EAT', completed: true },
        { title: 'Chambers Atelier Tailoring & Yoke Inspection', subtitle: 'Robe pressed, bands starched and folded in regalia sleeve', timestamp: '04 Sep 2026, 15:10 EAT', completed: true },
        { title: 'Dispatched for Chamber Delivery', subtitle: 'Regional courier departed Dar es Salaam depot', timestamp: '05 Sep 2026, 06:00 EAT', completed: true },
        { title: 'Delivered to Chambers / High Court Registry', subtitle: 'Signed for by Counsel at Dodoma Registry Annex', timestamp: '05 Sep 2026, 13:25 EAT', completed: true, current: true }
      ]
    }
  ];

  var STORAGE_KEY = 'sallys_legal_orders';

  function getStoredOrders() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveOrder(order) {
    try {
      var existing = getStoredOrders();
      var updated = [order].concat(existing.filter(function (o) { return o.orderNumber !== order.orderNumber; }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) { /* storage unavailable */ }
  }

  /* Resolve a stored cart/order item into { product, color, size, quantity }.
   * Supports both the new compact shape { productId, colorName, size, quantity }
   * and the legacy React shape { product, selectedColor, selectedSize, quantity }. */
  function resolveItem(raw) {
    if (!raw) return null;
    var product = raw.product && raw.product.id ? window.SLAData.getProduct(raw.product.id) : window.SLAData.getProduct(raw.productId);
    if (!product) return null;
    var colorName = raw.selectedColor ? raw.selectedColor.name : raw.colorName;
    var color = product.colours[0];
    for (var i = 0; i < product.colours.length; i++) {
      if (product.colours[i].name === colorName) { color = product.colours[i]; break; }
    }
    return {
      product: product,
      color: color,
      size: raw.selectedSize || raw.size || product.sizes[0],
      quantity: raw.quantity || 1
    };
  }

  function findOrder(query) {
    var clean = String(query || '').trim().toUpperCase().replace(/#/g, '');
    if (!clean) return null;
    var stored = getStoredOrders();
    var allOrders = stored.concat(SAMPLE_ORDERS);

    for (var i = 0; i < allOrders.length; i++) {
      var o = allOrders[i];
      if (o.orderNumber.toUpperCase() === clean || o.orderNumber.replace(/[^A-Z0-9]/g, '') === clean) {
        return o;
      }
    }

    for (var j = 0; j < allOrders.length; j++) {
      var p = allOrders[j];
      var digits = clean.replace(/[^0-9]/g, '');
      if ((p.mpesaReference && p.mpesaReference.toUpperCase().indexOf(clean) !== -1) ||
          (p.phone && digits && p.phone.replace(/[^0-9]/g, '').indexOf(digits) !== -1)) {
        return p;
      }
    }

    /* Fallback: any well-formed SLA-XXXXXX code yields a live in-transit status. */
    if (/^SLA-\d{6}$/i.test(clean) || /^SLA\d{6}$/i.test(clean)) {
      var formatted = clean.indexOf('SLA-') === 0 ? clean : 'SLA-' + clean.slice(3);
      return {
        orderNumber: formatted,
        fullName: 'Counsel / Legal Chambers',
        phone: '+255 754 000 000',
        email: 'counsel@chambers.co.tz',
        city: 'Dar es Salaam',
        address: 'High Court Chambers District',
        deliveryNotes: 'Standard judicial dispatch',
        paymentMethod: 'M-PESA',
        mpesaReference: 'MP-' + Math.floor(10000000 + Math.random() * 90000000),
        items: [item('sla-001', 'Ceremonial Black', '40R', 1)],
        subtotalTZS: 650000,
        deliveryFeeTZS: 0,
        totalTZS: 650000,
        date: 'Recent Order',
        status: 'dispatched',
        estimatedDelivery: 'Within 24 Hours',
        courierName: "Sally's Atelier Dedicated Courier",
        courierPhone: '+255 754 000 112',
        trackingSteps: [
          { title: 'Order Placed & M-Pesa Confirmed', subtitle: 'Lipa na M-Pesa Till 50777411 payment confirmed', timestamp: 'Payment Verified', completed: true },
          { title: 'Chambers Atelier Tailoring & Yoke Inspection', subtitle: 'Hand-fluting and judicial inspection complete', timestamp: 'Atelier Approved', completed: true },
          { title: 'Dispatched for Chamber Delivery', subtitle: 'En route with courier in garment travel bag', timestamp: 'In Transit', completed: true, current: true },
          { title: 'Delivered to Chambers', subtitle: 'Awaiting signature of receiving Counsel', timestamp: 'Pending Delivery', completed: false }
        ]
      };
    }

    return null;
  }

  window.SLAOrders = {
    SAMPLE_ORDERS: SAMPLE_ORDERS,
    getStoredOrders: getStoredOrders,
    saveOrder: saveOrder,
    findOrder: findOrder,
    resolveItem: resolveItem
  };
})();
