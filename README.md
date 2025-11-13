# 🍔 Foodu Backend

**Foodu Backend** is a production-ready, modular **Node.js REST API** built with **Express** and **Knex.js** for SQL databases. It supports a full food delivery ecosystem: **Client**, **Restaurant**, **Driver**, and **Admin** modules. The backend is designed for scalability, maintainability, and real-time operations.

---

## 🚀 Key Features

### 1. User Module
- **Users**: Manage Admins, Clients, RestaurantOwners, and Drivers  
- **Profiles**: Gender, birthdate, language, preferences  
- **Devices & Sessions**: Track login devices, sessions, and activity  
- **Wallet & Transactions**: Handle credit/debit operations with history  
- **Authentication**: JWT-based login, role-based access control  

### 2. Restaurant Module
- **Restaurant Management**: CRUD operations for restaurants and menus  
- **Menu Categories & Items**: Organize products and pricing  
- **Restaurant Payouts**: Track earnings, commissions, and payout statuses  
- **Status Management**: Open/Closed/Suspended  
- **Ratings & Reviews**: Customer feedback integration  

### 3. Delivery Module
- **Drivers & Vehicles**: Manage driver profiles and vehicles  
- **Delivery Requests**: Track order status from Pending → Delivered  
- **Real-time Tracking**: Lat/Lng updates, speed, route tracking  
- **Earnings & Commissions**: Driver payments with bonuses  
- **Availability**: Online, Offline, Busy statuses  

### 4. Client Module
- **Orders & Cart**: Create, update, track orders with multiple items  
- **Address Management**: Add, update, or select delivery addresses  
- **Payments**: Wallet, Card, or Cash options  
- **Ratings**: Rate drivers and restaurants  
- **Loyalty & Rewards**: Points and promotions  

### 5. Admin Dashboard Module
- **User Management**: Ban/unban, verification, warnings  
- **Analytics Reports**: Total orders, revenue, top restaurants/drivers  
- **Fraud Detection**: Risk scoring for suspicious orders  
- **Support Tickets**: Open, InProgress, Resolved, Closed  

### 6. Shared Services
- **Notifications**: Push notifications for order updates, promotions, support  
- **Promotions**: Discount campaigns, validity, and min order value rules  
- **Commission Management**: Global commission rules for drivers and restaurants  

---

## 🧩 Entity & Relationship Summary

### **User & Wallet**
- User → Wallet → Transaction  
- UserProfile linked to User  
- Device & Session track login activity  

### **Restaurant**
- RestaurantOwner → Restaurant → MenuCategory → MenuItem  
- RestaurantPayout tracks payments to owners  
- Ratings & Reviews linked to Restaurant & Driver  

### **Delivery**
- Driver → Vehicle → DeliveryRequest → Order  
- DriverLocation tracks real-time positions  
- DriverEarning tracks payments, bonuses, and commissions  

### **Client**
- Client → Address  
- Client → Cart → CartItem → MenuItem  
- Client → Order → OrderItem → MenuItem → Restaurant  
- Payment associated with Order  
- Ratings linked to Drivers and Restaurants  

### **Admin**
- Admin → UserManagement → User actions  
- Admin → AnalyticsReport → Orders, Revenue, Top Restaurants/Drivers  
- Admin → FraudDetection → Risk scoring for Orders  
- Admin → SupportTicket → User inquiries  

### **Shared Services**
- Notification → User  
- Promotion → applicable to orders/restaurants  
- Commission → Driver / Restaurant  
- RealTimeTracking → Order & Driver  

---

## 🗂 Folder Structure

```text
foodu-backend/
├── src/
│   ├── config/        # DB, environment, and global configuration
│   ├── controllers/   # API logic for each module
│   ├── middlewares/   # Auth, error handling, logging
│   ├── models/        # Database table schemas
│   ├── routes/        # API routes per module
│   ├── services/      # Notifications, payments, tracking, business logic
│   └── utils/         # Helper functions, validators
├── .env               # Environment variables
├── package.json
└── README.md
