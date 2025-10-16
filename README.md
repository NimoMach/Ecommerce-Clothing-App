# Ecommerce Clothing App


> A full-stack responsive ecommerce clothing application with user authentication, product browsing, cart & checkout, order management, and an admin panel.

---

## Demo

Add links/screenshots/gif of the app here.

* Live: [Link](https://ishop-frontend-five.vercel.app/)

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
├─ /admin                # admin
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


## Admin page on login

<img width="200" height="200" alt="Screenshot 2025-10-09 120652" src="https://github.com/user-attachments/assets/4adcdb6a-1ef7-4638-a330-f52cc6489a68" />
<img width="200" height="200" alt="Screenshot 2025-10-09 120707" src="https://github.com/user-attachments/assets/74041bcd-8926-4bc7-bfd0-c833460f54d2" />
<img width="200" height="200" alt="Screenshot 2025-10-09 120752" src="https://github.com/user-attachments/assets/09b314e3-4bf2-4bc6-a40d-258a2f7783e5" />


---

## Contact

Maintainer — NimoMach
