# ✈️ Flight Search & Booking UI

A modern flight search and review application built with **React**, **Amadeus Flight Offers API**, and a clean UI inspired by **MakeMyTrip / Ixigo**.  
The application supports **one-way and round-trip searches**, detailed **layover timelines**, and a structured **flight review flow**.

---

## 🚀 Features

- 🔍 Flight search with origin & destination
- 🧭 One-way and round-trip trip types
- 📅 Departure & return date selection
- 👥 Adult & child traveler handling
- ✈️ Flight cards with airline, duration, stops, and price
- 📍 Timeline-based layover visualization
- 💰 Fare breakup (base + taxes)
- 🎨 Responsive UI with animations

---

## 🧠 Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS + MUI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: Amadeus Flight Offers API

---

## 📁 Project Structure

src/
│
├── api/
│ └── FlightApi.js
  └── cityApi.js
  └── AuthService.js
   
│
├── components/
│ ├── SearchForm.jsx
│ ├── FlightCard.jsx
│ ├── FlightReview.jsx
│ └── CitySearch.jsx
  └── FlightSearch.jsx
  └── Footer.jsx
  └── Navbar.jsx
  └── PriceGraph.jsx
│
├── utils/
│ └── DateUtils.js
│
└── App.jsx


---

## ⚙️ Environment Setup

Create a `.env` file:

VITE_AMADEUS_API_KEY=your_api_key
VITE_AMADEUS_API_SECRET=your_api_secret

> A proxy is used during development to avoid CORS issues.

---

## ▶️ Run the Project

npm install
npm run dev