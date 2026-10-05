# EventPulse – Interactive Event Booking Portal

EventPulse is a modern, responsive single-page web application designed for discovering, filtering, and booking technical events, conferences, and workshops. Built with **HTML5**, **CSS3**, and **Vanilla JavaScript**, it emphasizes clean DOM manipulation, responsive grid layouts, and client-side data persistence.

---

## 📌 Features

- **Dynamic Event Rendering**: Generates and updates event cards dynamically from a JavaScript data store using clean DOM operations.
- **Real-Time Search & Category Filtering**: Instant multi-condition client-side filtering via category selectors and responsive input listeners.
- **Interactive Modal Checkout**: Clean reservation flow capturing user credentials with native HTML5 form validation.
- **Persistent State Management**: Uses browser `localStorage` with JSON serialization to preserve booked tickets across sessions.
- **Responsive Layout**: Fluid UI architected with CSS Grid (`auto-fill`, `minmax`) and Flexbox, fully adaptable from mobile to desktop screens.

---

## 🛠️ Tech Stack

- **Markup**: HTML5 (Semantic elements, custom `data-*` attributes, native forms)
- **Styling**: CSS3 (CSS Grid, Flexbox, smooth transitions, dark-mode design system)
- **Scripting**: JavaScript ES6+ (DOM manipulation, Array methods: `.filter()`, `.forEach()`, LocalStorage API)

---

## 📁 Project Structure

```text
eventpulse-web/
├── index.html        # Semantic page layout and modal markup
├── style.css         # Responsive styling, Grid/Flexbox architecture, and theme
└── script.js         # Event handlers, search/filter algorithms, and persistence logic
