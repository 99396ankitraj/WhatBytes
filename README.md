# Whatbytes Frontend Assignment

This is a Next.js 15+ application built for the Whatbytes backend/frontend assignment. It features a responsive product listing, filtering, search, and a shopping cart with persistent state.

## 🚀 Live Demo

**Deployment URL:** [https://whatbytes-assignment-rho.vercel.app](https://whatbytes-assignment-rho.vercel.app)  
*(Note: Please deploy to Vercel to get your specific URL)*

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (with LocalStorage persistence)
- **Icons:** Lucide React
- **Language:** TypeScript

## ✨ Features

- **Product Listing:** Dynamic grid layout (3 cols on desktop, responsive).
- **Filtering:** 
  - Category filters (Sidebar).
  - Price range slider (Sidebar).
  - Search functionality (Header).
  - **URL-based state**: Filters update the URL (e.g. `/?category=Electronics&maxPrice=500`).
- **Product Detail:** Large image, ratings, quantity selector.
- **Cart:** Add/Remove items, update quantities, order summary.
- **Persistence:** Cart items are saved in browser LocalStorage.
- **Design:** Royal Blue theme matching the provided mockup.

## 🏃‍♂️ How to Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Open:**
   Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

- `src/app`: App Router pages (`page.tsx`, `layout.tsx`, `cart/page.tsx`, etc).
- `src/components`: Reusable UI components (`Header`, `Sidebar`, `ProductCard`, etc).
- `src/store`: Zustand store for Cart state.
- `src/data`: Mock product data.

---
Submitted by: Vinay
