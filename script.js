// Sample Event Data
const eventsData = [
  {
    id: 1,
    title: "Full-Stack Web Dev Summit",
    category: "tech",
    date: "November 15, 2026",
    price: 499,
    description: "Explore the modern React, Node.js, and cloud ecosystems with top architects."
  },
  {
    id: 2,
    title: "Mastering C++ & Memory Optimization",
    category: "workshop",
    date: "November 22, 2026",
    price: 299,
    description: "Hands-on deep dive into pointers, standard templates, and low-latency systems."
  },
  {
    id: 3,
    title: "National 24h Hackathon 2026",
    category: "hackathon",
    date: "December 05, 2026",
    price: 0,
    description: "Compete with 200+ teams to develop AI and web-based solutions for real-world problems."
  },
  {
    id: 4,
    title: "Python Data Analysis Bootcamp",
    category: "workshop",
    date: "December 12, 2026",
    price: 349,
    description: "Learn practical analytics and feature engineering using NumPy and Pandas."
  }
];

// App State
let activeCategory = "all";
let searchQuery = "";
let selectedEvent = null;

// DOM Elements
const eventsGrid = document.getElementById("events-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchBox = document.getElementById("search-box");
const bookingModal = document.getElementById("booking-modal");
const bookingForm = document.getElementById("booking-form");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCount = document.getElementById("cart-count");

const myBookingsBtn = document.getElementById("view-bookings-btn");
const myBookingsModal = document.getElementById("my-bookings-modal");
const closeMyBookings = document.getElementById("close-my-bookings");
const clearAllBookings = document.getElementById("clear-all-bookings");
const bookingsContent = document.getElementById("bookings-content");

// LocalStorage Persistence
function getBookings() {
  return JSON.parse(localStorage.getItem("eventpulse_bookings") || "[]");
}

function saveBookings(bookings) {
  localStorage.setItem("eventpulse_bookings", JSON.stringify(bookings));
  updateBadge();
}

function updateBadge() {
  const list = getBookings();
  cartCount.innerText = list.length;
}

// Render Event Cards
function renderEvents() {
  eventsGrid.innerHTML = "";

  const filtered = eventsData.filter((evt) => {
    const matchesCat = activeCategory === "all" || evt.category === activeCategory;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    eventsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#9ca3af;">No events found.</p>`;
    return;
  }

  filtered.forEach((evt) => {
    const card = document.createElement("div");
    card.className = "event-card";

    const badgeClass = evt.category === "tech" ? "badge-tech" : evt.category === "workshop" ? "badge-workshop" : "badge-hackathon";
    const priceDisplay = evt.price === 0 ? "Free Entry" : `₹${evt.price}`;

    card.innerHTML = `
      <div class="card-body">
        <span class="badge ${badgeClass}">${evt.category}</span>
        <h3>${evt.title}</h3>
        <p class="event-date">📅 ${evt.date}</p>
        <p class="event-desc">${evt.description}</p>
      </div>
      <div class="card-footer">
        <span class="price">${priceDisplay}</span>
        <button class="book-btn" onclick="openBookingModal(${evt.id})">Book Ticket</button>
      </div>
    `;
    eventsGrid.appendChild(card);
  });
}

// Filter Event Listeners
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-category");
    renderEvents();
  });
});

searchBox.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderEvents();
});

// Modal Actions
window.openBookingModal = function (id) {
  selectedEvent = eventsData.find((e) => e.id === id);
  if (!selectedEvent) return;

  document.getElementById("modal-event-title").innerText = selectedEvent.title;
  document.getElementById("modal-event-price").innerText = selectedEvent.price === 0 ? "Free Entry" : `Price: ₹${selectedEvent.price} per ticket`;
  bookingModal.classList.remove("hidden");
};

closeModalBtn.addEventListener("click", () => {
  bookingModal.classList.add("hidden");
});

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = document.getElementById("user-name").value;
  const userEmail = document.getElementById("user-email").value;
  const ticketQty = parseInt(document.getElementById("ticket-qty").value);

  const newBooking = {
    id: Date.now(),
    eventTitle: selectedEvent.title,
    name: userName,
    email: userEmail,
    qty: ticketQty,
    total: selectedEvent.price * ticketQty,
    bookingDate: new Date().toLocaleDateString()
  };

  const currentBookings = getBookings();
  currentBookings.push(newBooking);
  saveBookings(currentBookings);

  bookingForm.reset();
  bookingModal.classList.add("hidden");
  alert(`Ticket successfully booked for ${selectedEvent.title}!`);
});

// My Bookings Dialog
myBookingsBtn.addEventListener("click", () => {
  const list = getBookings();
  bookingsContent.innerHTML = "";

  if (list.length === 0) {
    bookingsContent.innerHTML = `<p style="color:#9ca3af;">No tickets booked yet.</p>`;
  } else {
    list.forEach((b) => {
      const item = document.createElement("div");
      item.className = "booking-item";
      item.innerHTML = `
        <div>
          <strong>${b.eventTitle}</strong><br>
          <small>${b.qty} Ticket(s) • Booked for: ${b.name}</small>
        </div>
        <div style="text-align:right;">
          <strong style="color:#10b981;">${b.total === 0 ? "Free" : "₹" + b.total}</strong><br>
          <small style="color:#9ca3af;">${b.bookingDate}</small>
        </div>
      `;
      bookingsContent.appendChild(item);
    });
  }

  myBookingsModal.classList.remove("hidden");
});

closeMyBookings.addEventListener("click", () => {
  myBookingsModal.classList.add("hidden");
});

clearAllBookings.addEventListener("click", () => {
  saveBookings([]);
  myBookingsModal.classList.add("hidden");
});

// Initial run
updateBadge();
renderEvents();