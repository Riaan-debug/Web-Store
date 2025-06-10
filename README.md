# Fitness Gear Web Store

A modern web store built with React, Redux, and React-Bootstrap. This project allows users to browse and purchase fitness gear, register and log in, manage their cart, select shipment and payment options, and get help and support.

## Features
- Browse a variety of fitness products with images and details
- Add products to cart (only when logged in)
- Cart management: update quantity, remove items, clear cart
- User registration and login with validation (Formik & Yup)
- "Forgot password?" feature for password reset
- Shipment selection (Standard, Express, Pickup)
- **Payment options:** Credit Card, EFT, Pay on Delivery
  - Fake credential fields for Credit Card and EFT (required for checkout)
- Checkout with shipping progress stepper
- Help page with shipping, returns, and support info
- Responsive, attractive UI with React-Bootstrap
- **Back to Top** bar on all main pages (never overlaps content)
- Professional, consistent design and navigation
- All data stored in Redux and localStorage (no backend required)

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone the repository or download the project folder.
2. Open a terminal in the project directory.
3. Run:
   ```bash
   npm install
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Submission Note
- **Do NOT include the `node_modules` folder in your submission.**
- Make sure `package.json` and `package-lock.json` are present.

### Folder Structure
- `src/components/` — Reusable UI components (Header, ProductCard, BackToTop, etc.)
- `src/pages/` — Main pages (Store, Cart, Register, Login, Help, Landing)
- `src/redux/` — Redux store and slices
- `src/utils/` — Utility functions (validation)
- `src/assets/` and `src/images/` — Images and static assets

## Technologies Used
- React
- Redux Toolkit
- React-Bootstrap
- Formik & Yup (form handling and validation)
- uuid (unique IDs)

## Author
Riaan van Rensburg

---
For any questions or support, email: support@fitnessstore.co.za
