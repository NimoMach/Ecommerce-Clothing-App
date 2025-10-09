# Ecommerce Clothing App


> A full-stack responsive ecommerce clothing application with user authentication, product browsing, cart & checkout, order management, and an admin panel.

---

## Demo

Add links/screenshots/gif of the app here.

* Live: `https://ecommerce-frontend-orpin-one.vercel.app/`

---

## Features

* User registration & login (JWT / sessions)
* Browse products by categories & filters
* Product details page with image gallery & related products
* Cart: add/remove, update quantities
* Checkout: shipping address, payment integration (Stripe/PayPal are not integrated fully)
* Order history & order details for users (right now only available for COD payment)
* Admin dashboard: CRUD products, manage orders, view analytics
* Search, sorting and pagination
* Responsive UI (mobile-first)
* Role-based access control (user/admin)

---

## Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS
* React Router
* State management: Context API

**Backend**

* Node.js + Express
* MongoDB (Mongoose)
* Authentication: JWT 
* File uploads: Cloudinary / local storage
* Payments: Stripe / PayPal / COD (cash on delivery)

**Dev / Deploy**

* Hosting: Vercel 

---

## Getting Started

### Prerequisites

* Node.js >= 16
* npm or yarn
* MongoDB Atlas account

---

## Folder Structure (suggested)

```
/Ecommerce-App
├─ /frontend                # frontend
│  ├─ /src
|  |  ├─ /assets
│  │  ├─ /components
│  │  ├─ /pages
│  │  ├─ /context
│  │  └─ main.jsx
├─ /backend                # backend
│  ├─ /controllers
│  ├─ /models
│  ├─ /routes
│  ├─ /middleware
│  └─ server.js
├─ README.md
├─ /admin               # frontend
│  ├─ /src
│  │  ├─ /assets
│  │  ├─ /components
│  │  ├─ /pages
│  │  ├─ /context
│  │  └─ main.jsx
```


## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

Maintainer — NimoMach