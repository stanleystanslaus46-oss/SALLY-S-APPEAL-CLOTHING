/* Sally's Legal Apparel — catalogue data (converted from src/data/products.ts).
 * Globals: window.SLAData = { PRODUCTS, CATEGORIES, LOOKBOOK_IMAGES, SOCIAL_POSTS,
 *   HERO_IMAGE, ROBE_HERO, SHIRT_HERO, WIG_HERO, STARTER_BUNDLE_HERO, BRIEFCASE_HERO,
 *   getProduct, TILL_NUMBER, WHATSAPP_NUMBER, CONTACT }
 */
(function () {
  'use strict';

  var IMG = 'assets/images/';
  var U = function (id) { return 'https://images.unsplash.com/' + id + '?q=80&w=1200&auto=format&fit=crop'; };

  var robeMannequinImg = IMG + 'court_robe_mannequin_1788766580436.jpg';
  var shirtEditorialImg = IMG + 'court_formal_shirt_1788766624725.jpg';
  var wigBandsImg = IMG + 'wig_and_bands_editorial_1788766600740.jpg';
  var heroAdvocateImg = IMG + 'hero_legal_advocate_1788766557023.jpg';
  var advocateStarterBundleImg = IMG + 'advocate_starter_bundle_1788768175887.jpg';
  var counselBriefcaseImg = IMG + 'counsel_leather_briefcase_1788768192069.jpg';
  var advocateBarJacketImg = IMG + 'advocate_bar_jacket_1788768212087.jpg';
  var femaleCourtJabotImg = IMG + 'female_court_jabot_1788768238134.jpg';
  var judicialBenchRobeImg = IMG + 'judicial_bench_robe_1788768253246.jpg';
  var courtRobeNavyImg = IMG + 'court_robe_navy_1788771917618.jpg';
  var courtRobeGreyImg = IMG + 'court_robe_grey_1788771933358.jpg';
  var briefcaseBlackImg = IMG + 'briefcase_black_1788771948678.jpg';
  var briefcaseTanImg = IMG + 'briefcase_tan_1788771962335.jpg';

  var PRODUCTS = [
    {
      id: 'sla-001',
      name: 'Advocate Barathea Silk Court Robe',
      subtitle: 'High Court & Court of Appeal Specification',
      category: 'Court Robes',
      priceTZS: 680000,
      priceUSD: 260,
      description: 'Bespoke advocate court robe tailored from genuine Super 140s English Barathea wool with hand-fluted pleating along the yoke and deep winged sleeves. Designed for enduring courtroom presence, optimal drape, and effortless breathability during prolonged hearings.',
      courtDetails: 'Adheres strictly to the Advocates Act and High Court of Tanzania Practice Directions. Tailored with traditional cord and button fastenings at the back shoulder.',
      fabric: 'Super 140s Barathea Wool & Mulberry Silk Faille Trim',
      images: [robeMannequinImg, heroAdvocateImg, U('photo-1594938298603-c8148c4dae35')],
      colours: [
        { name: 'Ceremonial Black', hex: '#0E0E10', image: robeMannequinImg },
        { name: 'Midnight Navy', hex: '#16243B', image: courtRobeNavyImg },
        { name: 'Charcoal Grey', hex: '#3A3C40', image: courtRobeGreyImg }
      ],
      sizes: ['38R (50")', '40R (52")', '42R (54")', '44R (56")', '46R (58")', 'Bespoke Custom'],
      inStock: true,
      featured: true,
      tag: 'BAR & BENCH SIGNATURE'
    },
    {
      id: 'sla-002',
      name: 'Judicial Silk Master Robe',
      subtitle: 'Judge & Senior Counsel Edition',
      category: 'Court Robes',
      priceTZS: 950000,
      priceUSD: 365,
      description: 'Distinguished judicial gown crafted with hand-gathered rosette sleeves, pure silk damask facings, and satin-finished flap cuffs. The premier ceremonial attire for the Bench and Senior Advocates of Tanzania.',
      courtDetails: 'Compliant with High Court, Commercial Court, and Court of Appeal of Tanzania protocols.',
      fabric: 'Pure Silk Damask & Fine Worsted Wool',
      images: [robeMannequinImg, U('photo-1507679799987-c73779587ccf')],
      colours: [
        { name: 'Judicial Black', hex: '#0a0a0c', image: robeMannequinImg },
        { name: 'Appellate Crimson Trim', hex: '#4A1521', image: robeMannequinImg }
      ],
      sizes: ['40R', '42R', '44R', '46R', 'Bespoke'],
      inStock: true,
      featured: true,
      tag: 'SENIOR COUNSEL'
    },
    {
      id: 'sla-003',
      name: 'Bespoke Wing-Collar Court Tunic Shirt',
      subtitle: 'Egyptian Giza Cotton with Detachable Collar Studs',
      category: 'Court Shirts',
      priceTZS: 185000,
      priceUSD: 72,
      description: 'Crisp, structured court tunic shirt made from two-ply 120s Egyptian cotton. Engineered with a clean tunic band designed specifically for detachable stiff wing collars and traditional advocate tabs.',
      courtDetails: 'Includes front and back brass collar studs and mother-of-pearl button placket.',
      fabric: '100% Two-Ply Giza Egyptian Cotton (120s count)',
      images: [shirtEditorialImg, U('photo-1620012253295-c15c429f6d4d')],
      colours: [
        { name: 'Pure Court White', hex: '#FFFFFF', image: shirtEditorialImg },
        { name: 'Ivory Cream', hex: '#F9F6F0', image: shirtEditorialImg }
      ],
      sizes: ['15.0"', '15.5"', '16.0"', '16.5"', '17.0"', '17.5"'],
      inStock: true,
      featured: true,
      tag: 'COURT ESSENTIAL'
    },
    {
      id: 'sla-004',
      name: 'Advocate Traditional Horsehair Barrister Wig',
      subtitle: 'Hand-Woven English Craftsmanship',
      category: 'Wigs',
      priceTZS: 820000,
      priceUSD: 315,
      description: 'Authentic ceremonial judicial wig expertly crafted by master wigmakers using treated natural horsehair. Features tight architectural curls, twin tail ribbons, and an interior cotton net crown that naturally conforms to head contours.',
      courtDetails: 'Delivered in a bespoke engraved metal carriage tin lined with protective velvet.',
      fabric: 'Pure Hand-Tied White Horsehair on Linen Mesh',
      images: [wigBandsImg, U('photo-1589829545856-d10d557cf95f')],
      colours: [
        { name: 'Ceremonial White', hex: '#F5F5F7', image: wigBandsImg },
        { name: 'Antique Ecru', hex: '#EAE5DB', image: wigBandsImg }
      ],
      sizes: ['55 cm (6 3/4)', '56 cm (6 7/8)', '57 cm (7)', '58 cm (7 1/8)', '59 cm (7 1/4)', '60 cm (7 3/8)'],
      inStock: true,
      featured: true,
      tag: 'HAND-WOVEN'
    },
    {
      id: 'sla-005',
      name: 'Pure Linen Advocate Bands (Pair of 2)',
      subtitle: 'Crisp Starched Courtroom Neckwear',
      category: 'Bands',
      priceTZS: 55000,
      priceUSD: 22,
      description: 'Pair of traditional starched court bands hand-cut from Irish linen. Finished with reinforced tape strings for secure tying behind the advocate tunic collar band.',
      courtDetails: 'Conforms to Tanzanian and Commonwealth courtroom attire standards.',
      fabric: '100% Bleached Irish Linen, Mercerised Cotton Tie-Strings',
      images: [wigBandsImg, shirtEditorialImg],
      colours: [
        { name: 'Starch White', hex: '#FFFFFF', image: wigBandsImg },
        { name: 'Natural Off-White', hex: '#FAF9F6', image: wigBandsImg }
      ],
      sizes: ['Standard (10")', 'Long (12")'],
      inStock: true,
      featured: true,
      tag: 'BESTSELLER'
    },
    {
      id: 'sla-006',
      name: 'Advocate Three-Piece Courtroom Suit',
      subtitle: 'Savile Row Cut in Tropical Wool',
      category: 'Suits & Formalwear',
      priceTZS: 750000,
      priceUSD: 290,
      description: 'Impeccably tailored three-piece suit comprising a structured two-button jacket, high-waisted single-pleat trousers, and a classic horseshoe waistcoat engineered to show court bands cleanly under advocate robes.',
      courtDetails: 'Designed specifically for tropical courtroom climates with half-canvassed construction and breathable cupro lining.',
      fabric: 'Super 130s All-Weather Tropical Merino Wool',
      images: [U('photo-1594938298603-c8148c4dae35'), U('photo-1507679799987-c73779587ccf')],
      colours: [
        { name: 'Midnight Navy', hex: '#161F2E', image: U('photo-1594938298603-c8148c4dae35') },
        { name: 'Graphite Charcoal', hex: '#262626', image: U('photo-1594938298603-c8148c4dae35') },
        { name: 'Classic Jet Black', hex: '#0B0B0C', image: U('photo-1594938298603-c8148c4dae35') }
      ],
      sizes: ['38R', '40R', '42R', '44R', '46R', '48R'],
      inStock: true,
      featured: true,
      tag: 'TAILORED EDIT'
    },
    {
      id: 'sla-007',
      name: 'Full-Grain Leather Advocate Counsel Bag',
      subtitle: 'Handcrafted Vegetable-Tanned Briefcase',
      category: 'Bags',
      priceTZS: 420000,
      priceUSD: 160,
      description: 'Solid brass lockable counsel briefcase designed to transport court briefs, case files, legal tablets, and personal seal. Features reinforced handles and dedicated interior compartments for advocate bands and notebook.',
      courtDetails: 'Capacity accommodates up to 4 thick law folders (A4 and Foolscap formats).',
      fabric: 'Full-Grain Florentine Vegetable-Tanned Cowhide',
      images: [counselBriefcaseImg, U('photo-1553062407-98eeb64c6a62'), U('photo-1548036328-c9fa89d128fa')],
      colours: [
        { name: 'Mahogany Brown', hex: '#3E2723', image: counselBriefcaseImg },
        { name: 'Onyx Black', hex: '#111111', image: briefcaseBlackImg },
        { name: 'British Tan', hex: '#794028', image: briefcaseTanImg }
      ],
      sizes: ['One Size (16" x 12" x 5")'],
      inStock: true,
      featured: false,
      tag: 'HERITAGE LEATHER'
    },
    {
      id: 'sla-008',
      name: 'Advocate Robe Bag with Embroidered Monogram',
      subtitle: 'Ceremonial Damask Velvet Carrying Bag',
      category: 'Bags',
      priceTZS: 120000,
      priceUSD: 46,
      description: 'Traditional heavy velvet advocate robe bag with drawstring silk cord and gold brass aglets. Protects legal gowns and collars during commute between chambers and courtrooms.',
      courtDetails: 'Available in traditional Tanzanian Junior Counsel Blue or Senior Counsel Crimson.',
      fabric: 'Heavy Cotton Velvet with Braided Silk Cord',
      images: [U('photo-1589829545856-d10d557cf95f')],
      colours: [
        { name: 'Advocate Royal Blue', hex: '#1A2B49', image: U('photo-1589829545856-d10d557cf95f') },
        { name: 'Senior Counsel Red', hex: '#631322', image: U('photo-1589829545856-d10d557cf95f') }
      ],
      sizes: ['Standard Robe Size (30" x 24")'],
      inStock: true,
      featured: false
    },
    {
      id: 'sla-009',
      name: 'Stiff Wing Collars (Set of 3)',
      subtitle: 'Classic High Starched Court Collars',
      category: 'Accessories',
      priceTZS: 75000,
      priceUSD: 29,
      description: 'Trio of detachable starched linen-cotton wing collars for legal tunic shirts. Features precision rear and front stud buttonholes to hold advocate bands firmly in position.',
      courtDetails: 'Hand washable and starchable, conforming to standard judicial collar sizes.',
      fabric: 'Three-Ply Starched Cotton Piqué',
      images: [shirtEditorialImg, wigBandsImg],
      colours: [{ name: 'Crisp White', hex: '#FFFFFF', image: shirtEditorialImg }],
      sizes: ['15.0"', '15.5"', '16.0"', '16.5"', '17.0"'],
      inStock: true,
      featured: false
    },
    {
      id: 'sla-010',
      name: 'Gold Scales of Justice Advocate Cufflinks',
      subtitle: 'Solid Sterling Silver with 18K Gold Vermeil',
      category: 'Accessories',
      priceTZS: 95000,
      priceUSD: 38,
      description: 'Meticulously crafted commemorative cufflinks displaying the balanced scales of justice. Polished high-sheen finish with swivel t-bar closure.',
      courtDetails: "Supplied in an embossed Sally's Legal Apparel presentation case.",
      fabric: '925 Sterling Silver, 18K Yellow Gold Vermeil',
      images: [U('photo-1617038260897-41a1f14a8ca0')],
      colours: [
        { name: '18K Gold Vermeil', hex: '#C5A880', image: U('photo-1617038260897-41a1f14a8ca0') },
        { name: 'Rhodium Silver', hex: '#D8D8DC', image: U('photo-1617038260897-41a1f14a8ca0') }
      ],
      sizes: ['One Size (18mm)'],
      inStock: true,
      featured: false,
      tag: 'DISTINCTION'
    },
    {
      id: 'sla-011',
      name: 'Advocate Formal Collarette Bib with Bands',
      subtitle: 'Women Advocate Court Neckwear',
      category: 'Bands',
      priceTZS: 85000,
      priceUSD: 33,
      description: 'Designed specifically for female advocates and judges. High-neck starched cotton bib collarette with attached pleated bands and adjustable rear velcro neck fastener for effortless courtroom preparation.',
      courtDetails: 'High Court and Subordinate Courts approved attire.',
      fabric: 'Fine Pima Cotton with Soft Silk-Blend Neck Lining',
      images: [femaleCourtJabotImg, wigBandsImg, heroAdvocateImg],
      colours: [{ name: 'Court White', hex: '#FFFFFF', image: femaleCourtJabotImg }],
      sizes: ['Small (13"-14")', 'Medium (14"-15")', 'Large (15"-16")'],
      inStock: true,
      featured: false,
      tag: 'FEMALE ADVOCATE'
    },
    {
      id: 'sla-012',
      name: 'Ceremonial Brass Collar Stud Set',
      subtitle: 'Front & Back Threaded Studs in Velvet Pouch',
      category: 'Accessories',
      priceTZS: 35000,
      priceUSD: 14,
      description: 'Pair of precision turned brass collar studs (one long stem for front closure and court bands, one short flat-back stud for the back neckband).',
      courtDetails: 'Rust-resistant solid brass designed for lifelong service in legal practice.',
      fabric: 'Solid Turned Brass with Anti-Tarnish Coating',
      images: [U('photo-1617038260897-41a1f14a8ca0')],
      colours: [
        { name: 'Polished Brass', hex: '#D4AF37', image: U('photo-1617038260897-41a1f14a8ca0') },
        { name: 'Silver Nickel', hex: '#C0C0C0', image: U('photo-1617038260897-41a1f14a8ca0') }
      ],
      sizes: ['Standard 2-Piece Set'],
      inStock: true,
      featured: false
    },
    {
      id: 'sla-013',
      name: 'Advocate Admittance & Pupillage Starter Package',
      subtitle: 'Complete 7-Piece Master Ceremonial Kit',
      category: 'Court Robes',
      priceTZS: 1850000,
      priceUSD: 710,
      description: "The definitive Sally's Legal Apparel all-in-one ceremonial package for newly admitted Advocates of the High Court and pupillage candidates. Includes a bespoke Super 140s Barathea court robe, handcrafted traditional horsehair barrister wig, personalized engraved metal wig carriage tin, two Egyptian Giza cotton tunic shirts, three detachable wing collars, two pairs of Irish linen court bands, and a monogrammed velvet robe bag.",
      courtDetails: 'Complies with all statutory specifications under the Advocates Act and High Court Admittance Ceremony regulations. Custom-sized to your exact measurements.',
      fabric: 'Super 140s Barathea Wool, Pure Horsehair, 120s Giza Cotton & Irish Linen',
      images: [advocateStarterBundleImg, robeMannequinImg, wigBandsImg, shirtEditorialImg],
      colours: [{ name: 'Ceremonial Black & White', hex: '#0E0E10', image: advocateStarterBundleImg }],
      sizes: ['Standard Package (38"-42")', 'Executive Package (44"-48")', 'Bespoke Made-to-Measure'],
      inStock: true,
      featured: true,
      isNew: true,
      tag: 'SIGNATURE BUNDLE'
    },
    {
      id: 'sla-014',
      name: 'Judicial Appellate High Court Bench Robe',
      subtitle: 'High Court Judge & Appellate Justice Specification',
      category: 'Court Robes',
      priceTZS: 1350000,
      priceUSD: 520,
      description: 'Supreme ceremonial judicial robe hand-tailored from genuine pure silk damask and heavy tropical wool. Adorned with ornate gold bullion and scarlet velvet facings, gathered rosette sleeves, and full sweeping train engineered for ceremonial bench sittings.',
      courtDetails: 'Exclusively tailored for High Court Judges, Justices of Appeal, and Resident Magistrates in full accordance with Judicial Service Commission protocol.',
      fabric: 'Mulberry Silk Damask, Fine Worsted Wool, Crimson Velvet Trim',
      images: [judicialBenchRobeImg, robeMannequinImg],
      colours: [
        { name: 'Appellate Gold & Black', hex: '#111113', image: judicialBenchRobeImg },
        { name: 'Judicial Crimson Velvet', hex: '#4A1521', image: judicialBenchRobeImg }
      ],
      sizes: ['40R', '42R', '44R', '46R', 'Custom Bench Measure'],
      inStock: true,
      featured: true,
      isNew: true,
      tag: 'BENCH MASTERPIECE'
    },
    {
      id: 'sla-015',
      name: 'Advocate Traditional Horseshoe Court Waistcoat',
      subtitle: 'Deep-Cut Horseshoe Bar Vest for Court Bands',
      category: 'Suits & Formalwear',
      priceTZS: 280000,
      priceUSD: 110,
      description: 'Specialized court waistcoat tailored with the distinctive low-scooped horseshoe front silhouette to display white advocate court bands and tunic collars cleanly beneath advocate robes. Features matte silk-covered front buttons, welted watch pockets, and adjustable back cinch strap.',
      courtDetails: 'Essential courtroom attire for male advocates appearing before the High Court and Court of Appeal.',
      fabric: 'Super 130s All-Weather Tropical Merino Wool & Cupro Back',
      images: [advocateBarJacketImg, U('photo-1594938298603-c8148c4dae35')],
      colours: [
        { name: 'Courtroom Jet Black', hex: '#0A0A0C', image: advocateBarJacketImg },
        { name: 'Midnight Charcoal', hex: '#1C1C1F', image: advocateBarJacketImg }
      ],
      sizes: ['38R', '40R', '42R', '44R', '46R'],
      inStock: true,
      featured: true,
      isNew: true,
      tag: 'BAR ESSENTIAL'
    },
    {
      id: 'sla-016',
      name: 'Executive Counsel Full-Grain Leather Briefcase',
      subtitle: 'Handcrafted Dual-Lock Barrister Litigation Bag',
      category: 'Bags',
      priceTZS: 520000,
      priceUSD: 200,
      description: 'Heavyweight, structured advocate briefcase handcrafted from thick Florentine vegetable-tanned cowhide. Outfitted with twin 3-digit solid brass combination locks, padded carrying handle, expanding interior litigation dividers for A4 law briefs, laptop compartment, and document docket.',
      courtDetails: 'Engineered to withstand daily transit between chambers, registries, and courtroom benches.',
      fabric: 'Full-Grain Vegetable-Tanned Cowhide Leather, Solid Turned Brass Locks',
      images: [counselBriefcaseImg, U('photo-1553062407-98eeb64c6a62')],
      colours: [
        { name: 'Dark Mahogany', hex: '#2A1810', image: counselBriefcaseImg },
        { name: 'Classic Onyx Black', hex: '#0F0F10', image: counselBriefcaseImg }
      ],
      sizes: ['Standard Litigation Size (17" x 12.5" x 6")'],
      inStock: true,
      featured: true,
      isNew: true,
      tag: 'CHAMBERS CLASSIC'
    },
    {
      id: 'sla-017',
      name: 'Female Advocate Pleated French Lace Court Jabot',
      subtitle: 'Hand-Fluted Bib with French Floral Lace Neckwear',
      category: 'Bands',
      priceTZS: 115000,
      priceUSD: 45,
      description: 'Exquisite court neckwear crafted exclusively for female advocates, state attorneys, and magistrates. Features hand-fluted pure white starched cotton pleats overlaid with delicate French floral lace and secured with a soft silk-lined neckband and discreet rear fastener.',
      courtDetails: 'Court-approved neckwear for all courtroom levels, offering an elegant feminine alternative to traditional wing collar bands.',
      fabric: '100% Starched Pima Cotton with Imported French Cotton Lace',
      images: [femaleCourtJabotImg, wigBandsImg],
      colours: [
        { name: 'Pristine Court White', hex: '#FFFFFF', image: femaleCourtJabotImg },
        { name: 'Soft Natural Ivory', hex: '#F9F8F5', image: femaleCourtJabotImg }
      ],
      sizes: ['Small (13"-14")', 'Medium (14"-15")', 'Large (15"-16")'],
      inStock: true,
      featured: true,
      isNew: true,
      tag: 'FEMALE ADVOCATE'
    },
    {
      id: 'sla-018',
      name: 'Double French Cuff Court Tunic Shirt',
      subtitle: 'Egyptian Cotton with Convertible Tunic Collar & Cufflink Cuffs',
      category: 'Court Shirts',
      priceTZS: 210000,
      priceUSD: 80,
      description: 'Immaculate formal court shirt tailored from high-thread-count 140s two-ply Egyptian cotton. Features a tunic collar band ready for detachable wing collars, reinforced front stud holes, double French cuffs for advocate cufflinks, and concealed button placket.',
      courtDetails: 'Designed to keep you cool and dignified through marathon chamber conferences and courtroom submissions.',
      fabric: '140s Two-Ply Giza Egyptian Cotton',
      images: [shirtEditorialImg, U('photo-1620012253295-c15c429f6d4d')],
      colours: [{ name: 'Crisp White', hex: '#FFFFFF', image: shirtEditorialImg }],
      sizes: ['15.0"', '15.5"', '16.0"', '16.5"', '17.0"', '17.5"'],
      inStock: true,
      featured: false,
      isNew: true,
      tag: 'FRENCH CUFF'
    },
    {
      id: 'sla-019',
      name: 'Engraved Metallic Judicial Wig Carriage Tin Box',
      subtitle: 'Antique Brass & Black Lacquer Protective Box',
      category: 'Wigs',
      priceTZS: 220000,
      priceUSD: 85,
      description: 'Traditional barrister wig carriage box crafted from lightweight metal with durable black lacquer and hand-painted gold filigree borders. Interior lined with lush crimson velvet to protect delicate horsehair curls. Includes custom engraved brass nameplate with advocate name.',
      courtDetails: 'Authentic Commonwealth barrister tradition. Prevents crushing and moisture damage during transit.',
      fabric: 'Enamelled Tinplate with Solid Brass Fittings & Velvet Lining',
      images: [advocateStarterBundleImg, wigBandsImg],
      colours: [{ name: 'Black & Gold Filigree', hex: '#1C1B1A', image: advocateStarterBundleImg }],
      sizes: ['Standard Wig Carriage (8.5" x 6.5" x 4")'],
      inStock: true,
      featured: false,
      isNew: true,
      tag: 'PERSONALIZED'
    },
    {
      id: 'sla-020',
      name: 'Advocate Water-Resistant Robe Travel Carrier',
      subtitle: 'Dual-Compartment Registry Garment Bag',
      category: 'Bags',
      priceTZS: 195000,
      priceUSD: 75,
      description: 'Reinforced waterproof ballistic canvas garment bag specifically designed for traveling advocates. Features dual internal hanger clamps for legal robes and formal suits, separate zipped pockets for barrister wigs, bands, and collars, and full-grain leather carry handles.',
      courtDetails: 'Fits overhead airplane compartments and provides weather-proof protection when commuting between regional registries.',
      fabric: '1200D Waterproof Canvas with Full-Grain Leather Trim',
      images: [counselBriefcaseImg, robeMannequinImg],
      colours: [
        { name: 'Chambers Navy & Brown', hex: '#131B2A', image: counselBriefcaseImg },
        { name: 'Onyx Black', hex: '#0B0B0C', image: counselBriefcaseImg }
      ],
      sizes: ['Standard Garment (40" x 24")'],
      inStock: true,
      featured: false,
      isNew: true,
      tag: 'TRAVEL ESSENTIAL'
    }
  ];

  var CATEGORIES = [
    { id: 'robes', name: 'COURT ROBES', description: 'Professional robes and courtroom attire.', categoryKey: 'Court Robes', image: judicialBenchRobeImg, badge: 'Senior & Junior Counsel' },
    { id: 'shirts', name: 'COURT SHIRTS', description: 'Formal shirts designed for legal professionals.', categoryKey: 'Court Shirts', image: shirtEditorialImg, badge: '100% Egyptian Cotton' },
    { id: 'suits', name: 'SUITS & FORMALWEAR', description: 'Professional formal clothing.', categoryKey: 'Suits & Formalwear', image: advocateBarJacketImg, badge: 'Savile-Cut Wool' },
    { id: 'wigs-bands', name: 'WIGS & BANDS', description: 'Traditional and modern legal accessories.', categoryKey: 'Wigs', image: wigBandsImg, badge: 'Handcrafted Tradition' }
  ];

  var LOOKBOOK_IMAGES = [
    { url: advocateStarterBundleImg, title: 'The Admittance Package', subtitle: 'Barathea Robe, Barrister Wig & Tin Regalia' },
    { url: judicialBenchRobeImg, title: 'Bench & Appellate Majesty', subtitle: 'Pure Damask Silk & Rosette Sleeves' },
    { url: counselBriefcaseImg, title: 'Florentine Counsel Briefcase', subtitle: 'Full-Grain Vegetable-Tanned Brass Lock' },
    { url: femaleCourtJabotImg, title: 'Feminine Court Decorum', subtitle: 'French Floral Lace Court Jabot & Bib' },
    { url: advocateBarJacketImg, title: 'Chambers Horseshoe Waistcoat', subtitle: 'Savile-Row Tropical Wool Bar Vest' }
  ];

  var SOCIAL_POSTS = [
    { image: advocateStarterBundleImg, caption: 'Official admittance ceremonial package for newly sworn Advocates. Complete with Barathea gown and horsehair wig. @sallys_legal_apparel', likes: '2,840' },
    { image: judicialBenchRobeImg, caption: 'Judicial damask silk bench robe handcrafted for High Court ceremony. Uncompromising craftsmanship.', likes: '1,984' },
    { image: counselBriefcaseImg, caption: 'Solid brass twin-lock counsel litigation briefcase. Handcrafted in vegetable-tanned Florentine leather.', likes: '1,450' },
    { image: femaleCourtJabotImg, caption: 'Hand-fluted female advocate court bib with delicate French lace jabot. Chambers refinement.', likes: '2,110' },
    { image: advocateBarJacketImg, caption: 'Three-piece advocate horseshoe waistcoat and bar jacket. Cut to showcase court bands effortlessly.', likes: '1,720' },
    { image: wigBandsImg, caption: 'Hand-tied English horsehair barrister wigs in custom engraved metal carriage tins. Delivered across East Africa.', likes: '3,210' }
  ];

  function getProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return PRODUCTS[0];
  }

  window.SLAData = {
    PRODUCTS: PRODUCTS,
    CATEGORIES: CATEGORIES,
    LOOKBOOK_IMAGES: LOOKBOOK_IMAGES,
    SOCIAL_POSTS: SOCIAL_POSTS,
    HERO_IMAGE: heroAdvocateImg,
    ROBE_HERO: robeMannequinImg,
    SHIRT_HERO: shirtEditorialImg,
    WIG_HERO: wigBandsImg,
    STARTER_BUNDLE_HERO: advocateStarterBundleImg,
    BRIEFCASE_HERO: counselBriefcaseImg,
    getProduct: getProduct,
    TILL_NUMBER: '50777411',
    WHATSAPP_NUMBER: '255687262017',
    CONTACT: {
      phone: '+255 687 262 017',
      phoneHref: '+255687262017',
      email: 'advsallybnjamin@gmail.com',
      addressLines: ['668C+QRQ Palestina, Shekilango Rd', 'Dar es Salaam, Tanzania', 'P.O. Box 7192, Dar es Salaam'],
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=668C%2BQRQ+Palestina%2C+Shekilango+Rd%2C+Dar+es+Salaam%2C+Tanzania',
      instagram: 'https://instagram.com/legal___apparel',
      instagramHandle: '@legal___apparel'
    }
  };
})();
