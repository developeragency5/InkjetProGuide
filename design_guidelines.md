# InjetProGuide - E-Commerce Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from leading e-commerce platforms specializing in electronics (Best Buy, B&H Photo, Newegg) combined with modern e-commerce patterns from Shopify and Amazon. This approach prioritizes product visibility, trust-building, and streamlined purchasing flows essential for electronics retail.

---

## Core Design Elements

### Typography
- **Primary Font**: Inter or DM Sans via Google Fonts CDN
- **Headings**: 
  - H1: 3.5rem (56px) / Bold / -0.02em tracking
  - H2: 2.5rem (40px) / Semibold / -0.01em tracking  
  - H3: 1.875rem (30px) / Semibold
  - H4: 1.5rem (24px) / Medium
- **Body Text**: 1rem (16px) / Regular / 1.6 line-height
- **Small Text**: 0.875rem (14px) / Regular
- **Button Text**: 1rem / Semibold / 0.01em tracking

### Layout System
**Spacing Primitives**: Use Tailwind units of **2, 3, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-24
- Grid gaps: gap-4 to gap-8
- Container max-widths: max-w-7xl for content areas

### Component Library

#### Navigation
- **Sticky Header**: Fixed top navigation with shadow on scroll
- **Top Bar**: Thin utility bar with "Free Shipping on Orders $50+" and account links
- **Main Navigation**: Logo left, centered search bar (prominent, 40% width), cart/wishlist icons right
- **Category Menu**: Single-level horizontal menu below header (All Printers, Office Printers, Home Printers, Portable, Accessories)
- **Mobile**: Hamburger menu with slide-out drawer, search icon triggers full-screen search overlay

#### Product Display
- **Product Grid**: 4 columns desktop (grid-cols-4), 3 tablet (md:grid-cols-3), 2 mobile (grid-cols-2)
- **Product Cards**: 
  - Square aspect ratio image container with subtle border
  - Product image with 1:1 ratio, object-fit contain with padding
  - Product name (2 line clamp)
  - Star rating + review count
  - Price (bold, larger) with strikethrough original price if discounted
  - "Add to Cart" button (full width on hover/mobile)
  - Heart icon (top-right) for wishlist
  - Quick view icon on hover

#### Product Detail Page
- **Layout**: Two-column split (md:grid-cols-2)
- **Left Column**: 
  - Large primary image with thumbnail gallery below
  - Image zoom on hover for desktop
  - Swipeable image carousel on mobile
- **Right Column**:
  - Product name (H1)
  - Star rating + reviews link
  - Price with discount badge if applicable
  - Stock status indicator (green dot + text)
  - Quantity selector with +/- buttons
  - "Add to Cart" primary button (large, full width)
  - "Add to Wishlist" secondary button below
  - Key specifications table
  - Shipping info with delivery estimate
- **Below**: Tabbed section (Description, Specifications, Reviews)

#### Shopping Cart
- **Drawer/Sidebar**: Slide-in from right (desktop), full screen (mobile)
- **Cart Items**: Product thumbnail + name + price + quantity controls + remove button
- **Summary Section**: Subtotal, shipping, tax estimates, total (bold, larger)
- **CTAs**: "Continue Shopping" (secondary) + "Proceed to Checkout" (primary, full width)
- **Empty State**: Cart icon + "Your cart is empty" + "Start Shopping" CTA

#### Checkout Flow
**4-Step Process with Progress Indicator**:
1. **Cart Review**: Editable items list + promo code field
2. **Shipping Information**: Form with email, full address fields, phone
3. **Payment Method**: Stripe card input + Cash on Delivery option (radio selection)
4. **Order Confirmation**: Order summary, order number, email confirmation message

**Layout**: Left column (2/3 width) for forms, right column (1/3) sticky order summary

#### Forms
- **Input Fields**: Border style with focus ring, label above, helper text below
- **Validation**: Inline error messages in red beneath fields
- **Required Indicators**: Asterisk (*) in label
- **Button States**: Disabled state with reduced opacity + cursor-not-allowed

#### Authentication
- **Modal Overlay**: Centered card (max-w-md) on dark semi-transparent backdrop
- **Tabs**: "Sign In" / "Sign Up" toggle at top
- **Social Proof**: Small trust indicator below form ("Join 50,000+ customers")
- **Forms**: Email, password fields with show/hide password toggle
- **Footer**: "Forgot password?" link, terms agreement checkbox for signup

#### Footer
- **Multi-Column Layout**: 4 columns desktop (grid-cols-4), stack mobile
- **Columns**: 
  - About Us + contact info
  - Customer Service (Shipping, Returns, FAQ, Support)
  - Quick Links (All Products, Categories, Deals)
  - Newsletter signup form
- **Bottom Bar**: Copyright, payment icons (Visa, Mastercard, Amex), security badges
- **Spacing**: py-16 top padding, dark background contrasts light theme

### Hero Section
- **Full-width banner**: 60vh height desktop, auto mobile
- **Layout**: Split design - large product image right (60%), content left (40%)
- **Content**: 
  - Eyebrow text "New Arrivals" or "Best Sellers"
  - H1 headline showcasing featured printer/promotion
  - Supporting description (2-3 lines)
  - Dual CTAs: "Shop Now" (primary) + "Learn More" (secondary outline)
  - Trust badges row (Free Shipping, Warranty, Support)
- **Background**: Clean gradient or subtle texture, not solid white

### Images Section
1. **Hero Image**: High-quality HP inkjet printer on clean background, professionally lit, show front 3/4 angle. Place on right side of hero section (60% width).
2. **Product Images**: Clean white background product shots, consistent lighting, show printer from multiple angles. Square format (1:1 ratio) for grid consistency.
3. **Category Banners**: Lifestyle images showing printers in home/office environments for category pages. Aspect ratio 16:9 or 21:9 for wider banners.
4. **Feature Icons**: Use Heroicons CDN for UI elements (cart, heart, search, user account, checkmarks, stars).
5. **Trust Badges**: Payment provider logos, security seals, warranty badges in footer and checkout.

### Interactions & Animations
- **Minimal Motion**: Avoid distracting animations
- **Acceptable Animations**:
  - Smooth page transitions (fade in on route change)
  - Cart drawer slide-in/out
  - Button hover states (subtle scale or shadow)
  - Image crossfade on product detail
  - Skeleton loaders for async content
  - Toast notifications slide-in from top-right

### Accessibility
- Maintain WCAG AA contrast ratios throughout
- Focus visible states on all interactive elements
- Semantic HTML structure
- Alt text for all product images
- Keyboard navigation support for cart and checkout
- ARIA labels for icon-only buttons
- Form fields with proper labels and error announcements

---

## Page-Specific Layouts

### Homepage
1. Hero banner with featured printer
2. Category grid (4 columns: Office, Home, Portable, Accessories)
3. Best Sellers product grid (4 items)
4. Value proposition section (3-column: Free Shipping, Warranty, Support)
5. New Arrivals grid (4 items)
6. Email signup CTA banner
7. Footer

### Product Listing
- Filters sidebar (left, 20% width): Price range, brand (HP models), features checkboxes
- Product grid (right, 80% width): 3-4 columns
- Sort dropdown (top-right): Price, Rating, Newest
- Pagination at bottom

### Account Dashboard
- Sidebar navigation (Orders, Wishlist, Profile, Addresses, Payment Methods)
- Main content area showing selected section
- Order history table with status badges