# Sally's Legal Apparel — Online Store

Premium legal apparel and accessories for advocates and legal professionals:
court robes, wing-collar shirts, tailored suiting, ceremonial wigs, bands,
briefcases and regalia. Built with **pure HTML, CSS and JavaScript** — no
frameworks, no build step, no dependencies.

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

> Google Fonts (Cormorant Garamond + Manrope) load from a CDN; everything else
> runs fully offline from local files.

## Project structure

```
index.html          App shell (mount points + script tags)
css/
  styles.css        Complete design system (replaces Tailwind)
js/
  icons.js          Inline SVG icon library (replaces lucide-react)
  data.js           Product catalogue, categories, lookbook, social posts
  orders.js         Sample orders + order storage / lookup helpers
  store.js          Global state, cart/wishlist persistence, formatting
  components.js     Header, footer, product cards, cart & wishlist drawers
  views.js          Home, shop, product detail, checkout, our story
  modals.js         Quick view, search, size guide, account, tracking, policies
  app.js            Rendering, navigation, checkout flow, event delegation
assets/
  logo.svg          Brand mark (favicon)
  images/           Product & editorial photography
```

## Features

- **Home** — hero, trust strip, collections, The Edit, brand identity,
  lookbook, Instagram feed
- **Shop** — category filters, live search, in-stock toggle, sorting
  (featured / newest / price)
- **Product pages** — image gallery, colour/size/qty selection, M-Pesa box,
  spec accordions, related items, recently viewed
- **Cart & wishlist** — slide-over drawers, persisted in `localStorage`
- **Checkout** — validated chambers/delivery form, M-Pesa Lipa Till
  `50777411` payment flow, printable order confirmation
- **Order tracking** — look up by order number, M-Pesa reference or phone;
  includes demo orders `SLA-849201`, `SLA-739182`, `SLA-602477`
- **Extras** — quick view, global search, size guide, counsel account modal,
  shipping/returns/delivery-area policies, WhatsApp ordering,
  TZS/USD currency switcher

## Notes

- Cart, wishlist, placed orders and recently-viewed items persist via
  `localStorage` (`sallys_legal_cart`, `sallys_legal_wishlist`,
  `sallys_legal_orders`, `sallys_legal_recently_viewed`).
- Product data saved by the previous React version is auto-migrated on load
  (items are re-resolved against the live catalogue by product id).
- Official M-Pesa Lipa number: **50777411** · WhatsApp: **+255 687 262 017**.
