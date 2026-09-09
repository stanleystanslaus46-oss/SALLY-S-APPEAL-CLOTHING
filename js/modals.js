/* Sally's Legal Apparel — modals (converted from src/components modal components).
 * Globals: window.SLAModals = { quickViewModal, searchModal, searchResultsHTML, sizeGuideModal, accountModal, trackingViewHTML, policyModal } */
(function () {
  'use strict';

  function icon(name, cls, sw) { return window.SLAIcons.icon(name, cls, sw); }
  function esc(s) { return window.SLA.esc(s); }

  /* ================= QUICK VIEW ================= */

  function quickViewModal() {
    var S = window.SLA.state;
    var p = S.quickViewId ? window.SLAData.getProduct(S.quickViewId) : null;
    if (!p) return '';
    var q = S.quickView;
    var color = window.SLAComponents.colorByName(p, q.colorName || p.colours[0].name);
    var size = q.size || p.sizes[0] || 'Standard';
    var qty = q.quantity || 1;
    var image = q.image || color.image || p.images[0];

    var thumbs = p.images.length > 1 ? '<div class="qv-thumbs">' + p.images.map(function (img) {
      return '<button type="button" data-action="qv-image" data-src="' + esc(img) + '" class="qv-thumb' + (image === img ? ' thumb-on' : '') + '">' +
        '<img src="' + esc(img) + '" alt="thumbnail" referrerpolicy="no-referrer"></button>';
    }).join('') + '</div>' : '';

    var colorBtns = p.colours.map(function (col) {
      var on = color.name === col.name;
      var light = (col.hex === '#FFFFFF' || col.hex === '#F9F6F0' || col.hex === '#FAF9F6' || col.hex === '#F9F8F5' || col.hex === '#F5F5F7');
      return '<button type="button" data-action="qv-color" data-value="' + esc(col.name) + '" class="color-dot' + (on ? ' color-on' : '') + '" style="background-color:' + col.hex + '" title="' + esc(col.name) + '" aria-label="Select colour ' + esc(col.name) + '">' +
        (on ? icon('check', 'ic-xs' + (light ? ' dark-check' : ' light-check')) : '') + '</button>';
    }).join('');

    var sizeBtns = p.sizes.map(function (sz) {
      return '<button type="button" data-action="qv-size" data-value="' + esc(sz) + '" class="size-btn' + (size === sz ? ' size-on' : '') + '">' + esc(sz) + '</button>';
    }).join('');

    return '' +
    '<div class="modal-root" role="dialog" aria-modal="true" aria-labelledby="quickview-title">' +
      '<div class="backdrop" data-action="close-quickview"></div>' +
      '<div class="modal-box modal-lg">' +
        '<button type="button" data-action="close-quickview" class="modal-close" aria-label="Close Quick View">' + icon('x', 'ic-md') + '</button>' +
        '<div class="qv-grid">' +
          '<div class="qv-media"><div class="qv-stage"><img src="' + esc(image) + '" alt="' + esc(p.name) + '" referrerpolicy="no-referrer"></div>' + thumbs + '</div>' +
          '<div class="qv-info">' +
            '<div><div class="qv-meta"><span>' + esc(p.category) + '</span>' + (p.tag ? '<span class="qv-tag">' + esc(p.tag) + '</span>' : '') + '</div>' +
            '<h3 id="quickview-title" class="qv-title">' + esc(p.name) + '</h3>' +
            (p.subtitle ? '<p class="qv-sub">' + esc(p.subtitle) + '</p>' : '') +
            '<div class="qv-price">' + window.SLA.productPrice(p) + '</div>' +
            '<p class="qv-desc">' + esc(p.description) + '</p>' +
            '<div class="detail-opt"><div class="detail-opt-head"><span class="opt-label">COLOUR:</span><span class="opt-value">' + esc(color.name) + '</span></div>' +
              '<div class="color-row">' + colorBtns + '</div></div>' +
            '<div class="detail-opt"><div class="detail-opt-head"><span class="opt-label">SIZE:</span><span class="opt-value">' + esc(size) + '</span></div>' +
              '<div class="size-row">' + sizeBtns + '</div></div>' +
            '<div class="detail-qty-row"><span class="opt-label">QUANTITY:</span>' +
              '<div class="qty-box"><button type="button" data-action="qv-qty" data-delta="-1" aria-label="Decrease quantity">' + icon('minus', 'ic-xs') + '</button><span>' + qty + '</span><button type="button" data-action="qv-qty" data-delta="1" aria-label="Increase quantity">' + icon('plus', 'ic-xs') + '</button></div></div>' +
            '</div>' +
            '<div class="qv-actions">' +
              '<button type="button" data-action="qv-whatsapp" class="btn-whatsapp">' + icon('message', 'ic-sm') + '<span>ORDER VIA WHATSAPP</span></button>' +
              '<div class="qv-actions-2">' +
                '<button type="button" data-action="qv-add" class="btn-outline-dark">' + icon('bag', 'ic-sm') + '<span>ADD TO BAG</span></button>' +
                '<button type="button" data-action="qv-buy" class="btn-dark">BUY NOW ' + icon('arrowRight', 'ic-sm') + '</button>' +
              '</div>' +
              '<div class="qv-foot"><button type="button" data-action="qv-full" class="gold-link">View full court specifications &amp; fabric details →</button>' +
                '<span class="mono-sub">LIPA NO. 50777411</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ================= SEARCH ================= */

  var POPULAR_SEARCHES = ['Advocate Barathea Court Robe', 'Wing-Collar Tunic Shirt', 'Barrister Horsehair Wig', 'Pure Linen Bands', 'Full-Grain Counsel Bag'];

  function searchResultsHTML() {
    var q = (window.SLA.state.searchQuery || '').trim();
    if (!q) {
      return '<div class="search-popular"><div class="search-label">POPULAR SEARCHES</div><div class="search-pills">' +
        POPULAR_SEARCHES.map(function (term) {
          return '<button type="button" data-action="search-term" data-value="' + esc(term) + '">' + esc(term) + '</button>';
        }).join('') + '</div></div>';
    }
    var ql = q.toLowerCase();
    var results = window.SLAData.PRODUCTS.filter(function (p) {
      return p.name.toLowerCase().indexOf(ql) !== -1 ||
        p.category.toLowerCase().indexOf(ql) !== -1 ||
        p.description.toLowerCase().indexOf(ql) !== -1;
    });
    if (results.length === 0) {
      return '<div class="search-none">No legal apparel found matching &quot;' + esc(q) + '&quot;. Try searching for &quot;Robe&quot;, &quot;Shirt&quot;, or &quot;Wig&quot;.</div>';
    }
    var rows = results.slice(0, 5).map(function (p) {
      return '<div class="search-row" data-action="select-product" data-id="' + p.id + '" role="button" tabindex="0">' +
        '<img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" referrerpolicy="no-referrer">' +
        '<div class="search-row-body"><div class="search-row-cat">' + esc(p.category) + '</div><div class="search-row-name">' + esc(p.name) + '</div></div>' +
        '<div class="search-row-price">' + window.SLA.productPrice(p) + '</div></div>';
    }).join('');
    return '<div class="search-results-head"><span>' + results.length + ' results</span>' +
      '<button type="button" data-action="search-view-all">View all in Shop →</button></div>' + rows;
  }

  function searchModal() {
    var S = window.SLA.state;
    if (!S.searchOpen) return '';
    var q = S.searchQuery || '';
    return '' +
    '<div class="modal-root modal-top" role="dialog" aria-modal="true" aria-label="Search">' +
      '<div class="backdrop" data-action="close-search"></div>' +
      '<div class="modal-box modal-md">' +
        '<div class="search-bar">' + icon('search', 'ic-md gold-dark') +
          '<input id="global-search-input" type="text" placeholder="Search robes, shirts, wigs, collar sizes..." value="' + esc(q) + '" autocomplete="off">' +
          (q ? '<button type="button" data-action="search-clear" class="mini-icon-btn">' + icon('x', 'ic-sm') + '</button>' : '') +
          '<button type="button" data-action="close-search" class="esc-btn">ESC</button></div>' +
        '<div class="search-body" id="search-results">' + searchResultsHTML() + '</div>' +
      '</div>' +
    '</div>';
  }

  /* ================= SIZE GUIDE ================= */

  function sizeTable(head, rows) {
    return '<div class="table-wrap"><table class="size-table"><thead><tr>' +
      head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr' + (r.hl ? ' class="hl-row"' : '') + '>' + r.cells.map(function (c, i) {
          return i === 0 ? '<td class="row-h">' + c + '</td>' : '<td>' + c + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  function sizeGuideModal() {
    var S = window.SLA.state;
    if (!S.sizeGuideOpen) return '';
    var tab = S.sizeTab || 'standard';
    function tabBtn(id, label) {
      return '<button type="button" data-action="size-tab" data-value="' + id + '" class="mtab' + (tab === id ? ' mtab-on' : '') + '">' + label + '</button>';
    }
    var body = '';
    if (tab === 'standard') {
      body = '<div class="mbody"><div class="mbody-head"><span class="mtitle">Standard Apparel Measurement Matrix</span><span class="msub">Inches &amp; Centimeters</span></div>' +
        '<p class="mnote">Use this benchmark table for standard courtroom apparel, suits, jackets, and tunic garments. For traditional advocate robes, finished length is measured from nape of neck to calf.</p>' +
        sizeTable(['Size', 'Chest', 'Length', 'Shoulder Width'], [
          { cells: ['S', '36&quot; - 38&quot; (91 - 96 cm)', '48&quot; (122 cm)', '17.5&quot; (44 cm)'] },
          { cells: ['M', '38&quot; - 40&quot; (96 - 101 cm)', '50&quot; (127 cm)', '18.0&quot; (46 cm)'] },
          { cells: ['L', '40&quot; - 42&quot; (101 - 107 cm)', '52&quot; (132 cm)', '18.5&quot; (47 cm)'] },
          { cells: ['XL', '42&quot; - 44&quot; (107 - 112 cm)', '54&quot; (137 cm)', '19.5&quot; (49 cm)'] },
          { cells: ['XXL', '44&quot; - 48&quot; (112 - 122 cm)', '56&quot; (142 cm)', '20.5&quot; (52 cm)'] }
        ]) + '</div>';
    } else if (tab === 'robes') {
      body = '<div class="mbody"><span class="mtitle">Advocate Court Robes — Height &amp; Length Guide</span>' +
        '<p class="mnote">Judicial robes are designed to finish approximately 8 to 10 inches above floor level, allowing clean movement when standing at the bar or bowing before the bench.</p>' +
        sizeTable(['Robe Size', 'Advocate Height', 'Finished Robe Length', 'Recommended Chest'], [
          { cells: ['38R (50&quot;)', '5&#39;3&quot; - 5&#39;6&quot; (160 - 168 cm)', '50 inches (127 cm)', '36&quot; - 38&quot;'] },
          { cells: ['40R (52&quot;)', '5&#39;7&quot; - 5&#39;9&quot; (170 - 175 cm)', '52 inches (132 cm)', '38&quot; - 40&quot;'] },
          { cells: ['42R (54&quot;)', '5&#39;10&quot; - 6&#39;0&quot; (178 - 183 cm)', '54 inches (137 cm)', '40&quot; - 42&quot;'] },
          { cells: ['44R (56&quot;)', '6&#39;1&quot; - 6&#39;3&quot; (185 - 190 cm)', '56 inches (142 cm)', '42&quot; - 44&quot;'] },
          { cells: ['46R (58&quot;)', '6&#39;4&quot;+ (192 cm+)', '58 inches (147 cm)', '44&quot; - 48&quot;'] },
          { hl: true, cells: ['Bespoke Custom', 'Custom measurements taken at our atelier (668C+QRQ Palestina, Shekilango Rd, Dar es Salaam).', '', ''] }
        ]) + '</div>';
    } else if (tab === 'shirts') {
      body = '<div class="mbody"><span class="mtitle">Court Tunic Shirts &amp; Detachable Wing Collars</span>' +
        '<p class="mnote">Measure around the base of the neck where the shirt collar band fastens with collar studs. Add half an inch for natural breathing room.</p>' +
        sizeTable(['Collar Size', 'Exact Neck Measure', 'Sleeve Length', 'Chest Size'], [
          { cells: ['15.0&quot; (38 cm)', '14.5&quot; - 15.0&quot;', '33.5&quot;', '36&quot; - 38&quot;'] },
          { cells: ['15.5&quot; (39 cm)', '15.0&quot; - 15.5&quot;', '34.0&quot;', '38&quot; - 40&quot;'] },
          { cells: ['16.0&quot; (41 cm)', '15.5&quot; - 16.0&quot;', '34.5&quot;', '40&quot; - 42&quot;'] },
          { cells: ['16.5&quot; (42 cm)', '16.0&quot; - 16.5&quot;', '35.0&quot;', '42&quot; - 44&quot;'] },
          { cells: ['17.0&quot; (43 cm)', '16.5&quot; - 17.0&quot;', '35.5&quot;', '44&quot; - 46&quot;'] },
          { cells: ['17.5&quot; (44.5 cm)', '17.0&quot; - 17.5&quot;', '36.0&quot;', '46&quot; - 48&quot;'] }
        ]) + '</div>';
    } else {
      body = '<div class="mbody"><span class="mtitle">Ceremonial Horsehair Judicial Wigs</span>' +
        '<p class="mnote">Measure head circumference directly above the eyebrows and ears using a flexible tailor&#39;s tape. Barrister wigs feature internal adjusters for stability.</p>' +
        sizeTable(['Wig Size (cm)', 'Hat Size (UK/US)', 'Head Circumference (Inches)'], [
          { cells: ['55 cm', '6 3/4', '21.5&quot;'] },
          { cells: ['56 cm', '6 7/8', '22.0&quot;'] },
          { cells: ['57 cm', '7', '22.4&quot;'] },
          { cells: ['58 cm', '7 1/8', '22.8&quot;'] },
          { cells: ['59 cm', '7 1/4', '23.2&quot;'] },
          { cells: ['60 cm', '7 3/8', '23.6&quot;'] }
        ]) + '</div>';
    }
    return '' +
    '<div class="modal-root" role="dialog" aria-modal="true" aria-label="Size Guide">' +
      '<div class="backdrop" data-action="close-size-guide"></div>' +
      '<div class="modal-box modal-lg modal-scroll">' +
        '<div class="modal-head"><div class="modal-head-brand"><div class="modal-head-ic">' + icon('ruler', 'ic-sm') + '</div>' +
          '<div><div class="modal-kicker">ATELIER MEASUREMENT BENCHMARK</div><h3 class="modal-title">SIZE GUIDE</h3></div></div>' +
          '<button type="button" data-action="close-size-guide" class="icon-btn" aria-label="Close Size Guide">' + icon('x', 'ic-md') + '</button></div>' +
        '<div class="mtabs">' + tabBtn('standard', 'Standard Sizes (S - XXL)') + tabBtn('robes', 'Court Robe Lengths') + tabBtn('shirts', 'Court Shirts &amp; Collars') + tabBtn('wigs', 'Barrister Wigs') + '</div>' +
        body +
        '<div class="assist-note">' + icon('help', 'ic-md gold-dark') +
          '<div><span class="assist-h">Need bespoke measurements or personal chamber fitting?</span>' +
          'Visit our Dar es Salaam atelier at 668C+QRQ Palestina, Shekilango Rd, Dar es Salaam, Tanzania or message us on WhatsApp at <strong>+255 687 262 017</strong> for tailoring guidance.</div></div>' +
        '<div class="modal-foot-center"><button type="button" data-action="close-size-guide" class="btn-dark">CLOSE SIZE GUIDE</button></div>' +
      '</div>' +
    '</div>';
  }

  /* ================= ORDER TRACKING ================= */

  function statusBadge(status) {
    var map = {
      delivered: { label: 'DELIVERED TO CHAMBERS', cls: 'st-delivered', ic: 'checkCircle' },
      dispatched: { label: 'OUT FOR COURIER TRANSIT', cls: 'st-dispatched', ic: 'truck' },
      tailoring: { label: 'ATELIER TAILORING & QUALITY PASS', cls: 'st-tailoring', ic: 'clock' },
      received: { label: 'ORDER RECEIVED & M-PESA LOGGED', cls: 'st-received', ic: 'package' }
    };
    var s = map[status] || map.received;
    return '<span class="status-badge ' + s.cls + '">' + icon(s.ic, 'ic-xs') + '<span>' + s.label + '</span></span>';
  }

  function defaultSteps(order) {
    var st = order.status || 'received';
    return [
      { title: 'Order Placed & M-Pesa Confirmed', subtitle: 'Payment verified for Till 50777411 (Ref: ' + (order.mpesaReference || 'VERIFIED') + ')', timestamp: order.date + ', 09:00 EAT', completed: true },
      { title: 'Chambers Atelier Tailoring & Quality Pass', subtitle: 'Hand-fluting, pressing and regalia calibration in Dar es Salaam Atelier', timestamp: order.date + ', 14:00 EAT', completed: st !== 'received' },
      { title: 'Dispatched for Chambers Delivery', subtitle: 'In transit to ' + order.address + ', ' + order.city, timestamp: (st === 'dispatched' || st === 'delivered') ? 'Dispatched' : 'Scheduled', completed: (st === 'dispatched' || st === 'delivered'), current: st === 'dispatched' },
      { title: 'Delivered to Chambers / High Court Registry', subtitle: 'Received and signed for by Counsel', timestamp: st === 'delivered' ? 'Delivered' : 'Pending', completed: st === 'delivered', current: st === 'delivered' }
    ];
  }

  function trackingResultHTML(order) {
    var cur = window.SLA.state.currency;
    var steps = order.trackingSteps && order.trackingSteps.length ? order.trackingSteps : defaultSteps(order);
    var stepsHtml = steps.map(function (step) {
      var dotCls = step.completed ? (step.current ? 'dot-current' : 'dot-done') : 'dot-todo';
      return '<div class="track-step"><div class="track-dot ' + dotCls + '">' +
          (step.completed ? icon('check', 'ic-xs light-check') : '<span class="dot-mini"></span>') + '</div>' +
        '<div class="track-step-body"><div class="track-step-head"><h5>' + esc(step.title) + '</h5><span class="track-time">' + esc(step.timestamp) + '</span></div>' +
        '<p>' + esc(step.subtitle) + '</p></div></div>';
    }).join('');
    var itemsHtml = order.items.map(function (raw) {
      var it = window.SLAOrders.resolveItem(raw);
      if (!it) return '';
      var price = cur === 'USD'
        ? '$' + (it.product.priceUSD * it.quantity).toLocaleString('en-US')
        : 'TSh ' + (it.product.priceTZS * it.quantity).toLocaleString('en-US');
      return '<div class="track-item"><img src="' + esc(it.color.image || it.product.images[0]) + '" alt="' + esc(it.product.name) + '" referrerpolicy="no-referrer">' +
        '<div class="track-item-body"><h6>' + esc(it.product.name) + '</h6>' +
        '<div class="track-item-meta"><span>Color: <strong>' + esc(it.color.name) + '</strong></span><span>•</span>' +
        '<span>Size: <strong>' + esc(it.size) + '</strong></span><span>•</span><span>Qty: <strong>' + it.quantity + '</strong></span></div>' +
        '<div class="track-item-cat">' + esc(it.product.category) + '</div></div>' +
        '<div class="track-item-price">' + price + '</div></div>';
    }).join('');
    var total = cur === 'USD'
      ? '$' + Math.round(order.totalTZS / 2600).toLocaleString('en-US')
      : 'TSh ' + order.totalTZS.toLocaleString('en-US');
    return '' +
    '<div class="track-result">' +
      '<div class="track-banner"><div><div class="track-banner-kicker"><span>OFFICIAL LEGAL DISPATCH</span><span>•</span><span>CHAMBERS CONSIGNMENT</span></div>' +
        '<div class="track-banner-ref"><h3>' + esc(order.orderNumber) + '</h3>' +
        '<button type="button" data-action="copy" data-text="' + esc(order.orderNumber) + '" class="mini-icon-btn light" title="Copy Order Reference">' + icon('copy', 'ic-sm') + '</button></div>' +
        '<p class="track-banner-sub">' + esc(order.fullName) + ' • ' + esc(order.date) + ' • ' + esc(order.city) + '</p></div>' +
        '<div>' + statusBadge(order.status) + '</div></div>' +
      '<div class="track-body">' +
        '<div class="track-info-strip">' +
          '<div class="track-info">' + icon('clock', 'ic-sm gold-dark') + '<div><span class="track-info-label">Estimated Delivery</span><span class="track-info-value">' + esc(order.estimatedDelivery || 'To be confirmed') + '</span></div></div>' +
          '<div class="track-info">' + icon('truck', 'ic-sm gold-dark') + '<div><span class="track-info-label">Courier</span><span class="track-info-value">' + esc(order.courierName || 'Atelier Courier') + '</span></div></div>' +
          '<div class="track-info">' + icon('phone', 'ic-sm gold-dark') + '<div><span class="track-info-label">Courier Line</span><span class="track-info-value">' + esc(order.courierPhone || '+255 754 000 112') + '</span></div></div>' +
        '</div>' +
        '<div class="track-timeline"><div class="track-section-h">CONSIGNMENT TIMELINE</div>' + stepsHtml + '</div>' +
        '<div class="track-grid">' +
          '<div class="track-card"><div class="track-card-h gold2">' + icon('mapPin', 'ic-sm') + '<span>Consignment Destination</span></div>' +
            '<div class="track-dest-name">' + esc(order.fullName) + '</div><div>' + esc(order.address) + '</div>' +
            '<div class="mono">' + esc(order.city) + ', Tanzania</div><div class="mono dim">Recipient Contact: ' + esc(order.phone) + '</div>' +
            (order.deliveryNotes ? '<div class="track-note">Chambers Note: &quot;' + esc(order.deliveryNotes) + '&quot;</div>' : '') + '</div>' +
          '<div class="track-card"><div class="track-card-head"><div class="track-card-h green">' + icon('shield', 'ic-sm') + '<span>M-Pesa Settlement Log</span></div>' +
            window.SLAComponents.mpesaLogoOfficial() + '</div>' +
            '<div class="track-kv"><span>Payment Gateway:</span><span class="kv-strong">Lipa na M-Pesa</span></div>' +
            '<div class="track-kv"><span>Official Till Number:</span><span class="kv-strong">50777411</span></div>' +
            (order.mpesaReference ? '<div class="track-kv"><span>Transaction Reference:</span><span class="kv-green">' + esc(order.mpesaReference) + '</span></div>' : '') +
            '<div class="track-kv total"><span>Settled Total:</span><span class="mono">' + total + '</span></div></div>' +
        '</div>' +
        '<div class="track-items"><div class="track-section-h">ITEMS IN THIS CONSIGNMENT (' + order.items.length + ')</div>' +
          '<div class="track-items-list">' + itemsHtml + '</div></div>' +
        '<div class="track-actions"><button type="button" data-action="tracking-clear" class="back-link">← Track Another Consignment</button>' +
          '<button type="button" data-action="print" class="btn-outline-dark">Print Consignment Slip</button></div>' +
      '</div>' +
    '</div>';
  }

  function trackingViewHTML() {
    var T = window.SLA.state.tracking || { query: '', result: null, error: null };
    var stored = window.SLAOrders.getStoredOrders();
    var samples = window.SLAOrders.SAMPLE_ORDERS.map(function (s) {
      var label = s.status === 'dispatched' ? 'In Transit' : (s.status === 'tailoring' ? 'Tailoring' : 'Delivered');
      return '<button type="button" data-action="tracking-pill" data-value="' + esc(s.orderNumber) + '" class="track-pill"><span>' + esc(s.orderNumber) + '</span><span class="track-pill-status">(' + label + ')</span></button>';
    }).join('');
    var storedPills = stored.length > 0 ?
      '<div class="track-pills-row"><span class="track-pills-label green-strong">Your Recent Orders:</span>' +
      stored.map(function (o) {
        return '<button type="button" data-action="tracking-pill" data-value="' + esc(o.orderNumber) + '" class="track-pill track-pill-own">' + esc(o.orderNumber) + ' (' + esc(String(o.fullName).split(' ')[0]) + ')</button>';
      }).join('') + '</div>' : '';
    return '' +
    '<div class="tracking">' +
      '<div class="panel track-search-panel">' +
        '<div class="track-search-head"><div><h4>Official Consignment &amp; Robe Tracking</h4>' +
          '<p>Input your Order Reference (e.g. <span class="mono-strong">SLA-849201</span>) or M-Pesa transaction reference.</p></div>' +
          '<div class="guard-badge">' + icon('shield', 'ic-sm green') + '<span>Chambers Dispatch Guard</span></div></div>' +
        '<form id="tracking-form" class="track-form"><div class="track-input-wrap">' + icon('search', 'ic-sm dim-abs') +
          '<input id="tracking-input" type="text" placeholder="e.g. SLA-849201, SLA-739182, or M-Pesa Ref" value="' + esc(T.query || '') + '" autocomplete="off">' +
          (T.query ? '<button type="button" data-action="tracking-clear" class="clear-btn">CLEAR</button>' : '') + '</div>' +
          '<button type="submit" class="btn-dark">TRACK ORDER ' + icon('chevronRight', 'ic-sm') + '</button></form>' +
        '<div class="track-pills-row"><span class="track-pills-label">Test Demo Orders:</span>' + samples + '</div>' +
        storedPills +
      '</div>' +
      (T.error ? '<div class="track-error">' + icon('alertCircle', 'ic-md') + '<div><p class="track-error-h">' + esc(T.error) + '</p>' +
        '<p class="track-error-sub">For urgent verification of an unconfirmed order, please reach our Dar es Salaam Chambers Desk directly at ' +
        '<a href="' + window.SLA.whatsappLink('Hello Sally\'s Legal Apparel, inquiring about my order') + '" target="_blank" rel="noopener noreferrer">WhatsApp +255 687 262 017</a>.</p></div></div>' : '') +
      (T.result ? trackingResultHTML(T.result) : '') +
    '</div>';
  }

  /* ================= ACCOUNT ================= */

  function accountModal() {
    var S = window.SLA.state;
    if (!S.accountOpen) return '';
    var tab = S.accountTab || 'account';
    var stored = window.SLAOrders.getStoredOrders();
    var wide = tab === 'tracking' ? ' modal-wide' : '';
    var body = '';
    if (tab === 'tracking') {
      body = '<div id="tracking-host">' + trackingViewHTML() + '</div>';
    } else if (S.signedInEmail) {
      var orders = (stored.length > 0 ? stored : window.SLAOrders.SAMPLE_ORDERS).slice(0, 3);
      var rows = orders.map(function (o) {
        var first = o.items[0] ? window.SLAOrders.resolveItem(o.items[0]) : null;
        return '<div class="recent-order"><div><div class="recent-order-ref">' + esc(o.orderNumber) + '</div>' +
          '<div class="recent-order-item">' + esc(first ? first.product.name : 'Legal Regalia') + '</div></div>' +
          '<button type="button" data-action="tracking-pill" data-value="' + esc(o.orderNumber) + '">Track</button></div>';
      }).join('');
      body = '<div class="signedin">' +
        '<div class="signedin-badge">' + icon('shield', 'ic-lg green') + '</div>' +
        '<h4>Welcome, Counsel</h4>' +
        '<p>Authenticated Advocate profile: <span class="mono-strong">' + esc(S.signedInEmail) + '</span></p>' +
        '<p class="dim-sm">Your chambers sizing archive and High Court admittance records are synchronized.</p>' +
        '<div class="recent-box"><div class="recent-box-head"><span>' + icon('package', 'ic-sm gold-dark') + ' Recent Chambers Consignments</span>' +
          '<button type="button" data-action="account-tab" data-value="tracking" class="gold-link">Track All ' + icon('chevronRight', 'ic-xs') + '</button></div>' +
          '<div>' + rows + '</div></div>' +
        '<div class="signedin-actions"><button type="button" data-action="account-tab" data-value="tracking" class="btn-dark">Track Active Orders</button>' +
        '<button type="button" data-action="account-signout" class="btn-outline">Sign Out</button></div></div>';
    } else {
      body = '<form id="signin-form" class="signin-form">' +
        '<div><h4>Counsel Chambers Profile</h4><p class="signin-sub">Sign in with your legal chambers credentials to access saved measurements and court orders.</p></div>' +
        '<div class="field"><label>Advocate / Judicial Email</label><div class="input-ic">' + icon('mail', 'ic-sm dim-abs') +
          '<input type="email" id="signin-email" required placeholder="counsel@chambers.co.tz"></div></div>' +
        '<div class="field"><label>Password</label><div class="input-ic">' + icon('lock', 'ic-sm dim-abs') +
          '<input type="password" id="signin-password" required placeholder="••••••••"></div></div>' +
        '<div><button type="submit" class="btn-dark btn-block">SIGN IN TO CHAMBERS PROFILE</button></div>' +
        '<div class="signin-foot"><span>Need to check consignment progress?</span>' +
          '<button type="button" data-action="account-tab" data-value="tracking" class="track-link">' + icon('truck', 'ic-xs gold-dark') + ' Track Consignment</button></div>' +
      '</form>';
    }
    return '' +
    '<div class="modal-root" role="dialog" aria-modal="true" aria-label="Account">' +
      '<div class="backdrop" data-action="close-account"></div>' +
      '<div class="modal-box modal-scroll' + wide + '">' +
        '<div class="account-tabs">' +
          '<div class="account-tabs-left">' +
            '<button type="button" data-action="account-tab" data-value="account" class="mtab' + (tab === 'account' ? ' mtab-on' : '') + '">' + icon('user', 'ic-sm gold-dark') + '<span>Counsel Account</span></button>' +
            '<button type="button" data-action="account-tab" data-value="tracking" class="mtab' + (tab === 'tracking' ? ' mtab-on' : '') + '">' + icon('truck', 'ic-sm gold-dark') + '<span>Track Consignment</span>' +
              (stored.length > 0 ? '<span class="green-dot"></span>' : '') + '</button>' +
          '</div>' +
          '<button type="button" data-action="close-account" class="icon-btn" aria-label="Close dialog">' + icon('x', 'ic-md') + '</button>' +
        '</div>' +
        '<div class="modal-body-pad">' + body + '</div>' +
      '</div>' +
    '</div>';
  }

  /* ================= POLICY ================= */

  function policyModal() {
    var S = window.SLA.state;
    if (!S.policyOpen) return '';
    var tab = S.policyTab || 'contact';
    var C = window.SLAData.CONTACT;
    function tabBtn(id, label) {
      return '<button type="button" data-action="policy-tab" data-value="' + id + '" class="mtab' + (tab === id ? ' mtab-on' : '') + '">' + label + '</button>';
    }
    var body = '';
    if (tab === 'contact') {
      body = '<div class="policy-grid-2">' +
        '<div class="policy-card"><div class="policy-card-h">' + icon('mapPin', 'ic-sm gold-dark') + '<span>Physical Atelier Location</span></div>' +
          '<p class="policy-strong">Sally&#39;s Legal Atelier &amp; Chambers</p>' +
          '<p>668C+QRQ Palestina, Shekilango Rd<br><span class="gold-dark-text">Dar es Salaam, Tanzania</span><br>P.O. Box 7192, Dar es Salaam, Tanzania</p>' +
          '<div class="policy-map"><a href="' + C.mapsUrl + '" target="_blank" rel="noopener noreferrer"><span>Open in Google Maps</span>' + icon('external', 'ic-xs') + '</a></div></div>' +
        '<div class="policy-card"><div class="policy-card-h">' + icon('clock', 'ic-sm gold-dark') + '<span>Business &amp; Fitting Hours</span></div>' +
          '<div class="hours-rows"><div><span>Monday – Friday:</span><span class="kv-strong">08:00 – 18:00 EAT</span></div>' +
          '<div><span>Saturday:</span><span class="kv-strong">09:00 – 14:00 EAT</span></div>' +
          '<div class="gold-dark-text"><span>Sunday &amp; Court Recess:</span><span class="kv-strong">By Judicial Appointment</span></div></div>' +
          '<p class="dim-sm">*Emergency admissions and Call-to-the-Bar robing appointments available.</p></div></div>' +
        '<div class="policy-card"><span class="mtitle">Direct Contact Channels</span><div class="contact-channels">' +
          '<a href="tel:' + C.phoneHref + '" class="channel">' + icon('phone', 'ic-sm gold-dark') + '<div><div class="channel-label">Chambers Phone</div><div class="channel-value">' + C.phone + '</div></div></a>' +
          '<a href="' + window.SLA.whatsappLink('Hello Sally\'s Legal Apparel, I would like to inquire about court apparel.') + '" target="_blank" rel="noopener noreferrer" class="channel">' + icon('message', 'ic-sm wa-green') + '<div><div class="channel-label">Official WhatsApp</div><div class="channel-value">' + C.phone + '</div></div></a>' +
          '<a href="mailto:' + C.email + '" class="channel">' + icon('mail', 'ic-sm gold-dark') + '<div><div class="channel-label">Orders &amp; Inquiries</div><div class="channel-value small">' + C.email + '</div></div></a>' +
        '</div></div>';
    } else if (tab === 'delivery-areas') {
      body = '<div class="mbody"><span class="mtitle">Jurisdictional Delivery Coverage</span>' +
        '<p class="mnote">Sally&#39;s Legal Apparel provides dedicated courier and chambers delivery across Tanzania and the broader East African Community (EAC).</p>' +
        '<div class="policy-card"><div class="policy-zone-h"><span>1. Dar es Salaam Same-Day Chambers Express</span><span class="free-green">Same Day (Within 4 Hours)</span></div>' +
          '<p>Direct hand-delivery to law offices, chambers, and registry desks across: <strong>Kivukoni, Posta CBD, Upanga, Oysterbay, Masaki, Mikocheni, Sinza, Kinondoni, and Ilala.</strong></p></div>' +
        '<div class="policy-card"><div class="policy-zone-h"><span>2. Nationwide Tanzania Registered Courier</span><span class="gold-dark-text">24 to 48 Hours</span></div>' +
          '<p>Insured, tracked consignments delivered to High Court registries and law chambers in: <strong>Arusha, Dodoma (Parliament &amp; High Court), Mwanza, Zanzibar (Unguja &amp; Pemba), Mbeya, Tanga, Morogoro, Moshi, Iringa, Tabora, and Kigoma.</strong></p></div>' +
        '<div class="policy-card"><div class="policy-zone-h"><span>3. East African Community Regional Dispatch</span><span class="dim-sm">3 to 5 Business Days</span></div>' +
          '<p>Dedicated dispatch for counsel appearing before the East African Court of Justice (EACJ) across Kenya, Uganda, and Rwanda.</p></div></div>';
    } else if (tab === 'shipping') {
      body = '<div class="mbody"><span class="mtitle">Official Shipping &amp; Packaging Policy</span><div class="policy-card policy-prose">' +
        '<div><h5>1. Protective Judicial Packaging</h5><p>Every court gown and ceremonial robe is carefully pressed, inspected, and shipped in a heavy-duty, dustproof breathable garment bag with an contoured wooden hanger to prevent yoke creasing. Barrister wigs are housed in velvet-lined metal carrying tins.</p></div>' +
        '<div><h5>2. Payment Verification &amp; Dispatch Timeline</h5><p>Orders confirmed via <strong>Vodacom Lipa na M-Pesa Till 50777411</strong> before 14:00 EAT are dispatched the same day for Dar es Salaam clients and within 24 hours for upcountry regional couriers.</p></div>' +
        '<div><h5>3. Consignment Tracking</h5><p>Upon dispatch, counsel receives a dedicated tracking number via SMS and WhatsApp. Status can be tracked live in our online portal using the Order Tracking feature.</p></div>' +
      '</div></div>';
    } else {
      body = '<div class="mbody"><span class="mtitle">Returns, Exchanges &amp; Atelier Adjustment Guarantee</span><div class="policy-card policy-prose">' +
        '<div><h5>1. 7-Day Exchange Guarantee</h5><p>Standard, non-customized court apparel (such as court shirts, collars, bands, and off-the-rack robes) may be exchanged within 7 days of receipt, provided the garments are unworn, unwashed, and in original packaging with tags intact.</p></div>' +
        '<div><h5>2. Complimentary Atelier Hem &amp; Sleeve Adjustment</h5><p>We understand that court regalia must drape impeccably. We offer complimentary hem length, sleeve adjustment, and button repositioning at our Shekilango Rd atelier (Palestina, Dar es Salaam) within 14 days of purchase.</p></div>' +
        '<div><h5>3. Custom &amp; Bespoke Robes</h5><p>Garments made to personalized judicial measurements or monogrammed with initials are non-refundable, but our master tailors will alter and refine the garment until the fit satisfies the advocate.</p></div>' +
      '</div></div>';
    }
    return '' +
    '<div class="modal-root" role="dialog" aria-modal="true" aria-label="Business and Policy Information">' +
      '<div class="backdrop" data-action="close-policy"></div>' +
      '<div class="modal-box modal-lg modal-scroll">' +
        '<div class="modal-head"><div><span class="modal-kicker">SALLY&#39;S LEGAL APPAREL • CHAMBERS DESK</span>' +
          '<h3 class="modal-title">Business &amp; Policy Information</h3></div>' +
          '<button type="button" data-action="close-policy" class="icon-btn" aria-label="Close modal">' + icon('x', 'ic-md') + '</button></div>' +
        '<div class="mtabs">' + tabBtn('contact', 'Contact &amp; Location') + tabBtn('delivery-areas', 'Delivery Areas') + tabBtn('shipping', 'Shipping Policy') + tabBtn('returns', 'Returns &amp; Adjustments') + '</div>' +
        body +
        '<div class="policy-foot"><a href="' + window.SLA.whatsappLink('Hello Sally\'s Legal Apparel, I have a question regarding shipping and courtroom apparel.') + '" target="_blank" rel="noopener noreferrer" class="wa-link">' + icon('message', 'ic-sm') + '<span>Chat on WhatsApp (+255 687 262 017)</span></a>' +
          '<button type="button" data-action="close-policy" class="btn-dark">Close</button></div>' +
      '</div>' +
    '</div>';
  }

  window.SLAModals = {
    quickViewModal: quickViewModal,
    searchModal: searchModal,
    searchResultsHTML: searchResultsHTML,
    sizeGuideModal: sizeGuideModal,
    accountModal: accountModal,
    trackingViewHTML: trackingViewHTML,
    policyModal: policyModal,
    statusBadge: statusBadge
  };
})();
