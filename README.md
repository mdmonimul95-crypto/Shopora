# Shopora – Software Requirement Specification (SRS)

**Project Name:** Shopora  
**Project Type:** AI-Powered E-commerce Platform  
**Industry:** E-commerce & Online Retail  
**Document Type:** Software Requirement Specification  
**Version:** 1.0  
**Last Updated:** September 2026  

---

# 1. Project Overview

## 1.1 Introduction

Shopora is a modern AI-powered multi-vendor e-commerce platform designed to provide a complete online shopping experience for customers, sellers, and administrators.

The platform covers the complete e-commerce workflow, including product discovery, product management, shopping cart, wishlist, checkout, payment, order management, inventory management, coupons, order tracking, and administration.

Shopora also introduces AI-powered capabilities to improve both customer and seller experiences.

The platform is designed around three major user roles:

- Customer
- Seller
- Admin

Each role will have its own dashboard and permissions according to its responsibilities.

---

## 1.2 Project Vision

The primary vision of Shopora is to create a smart, secure, scalable, and user-friendly e-commerce ecosystem where:

- Customers can easily discover and purchase products.
- Sellers can manage their products, inventory, orders, and store activities.
- Administrators can manage the entire platform.
- AI can assist sellers with product content generation.
- AI can assist customers with product discovery and recommendations.
- Real-time communication can be used for important order and inventory updates.

---

## 1.3 Target Users

Shopora is intended for:

- Small and medium-sized businesses
- Individual entrepreneurs
- Small brands
- Online retailers
- E-commerce businesses
- Store administrators
- End consumers

---

# 2. Objectives

The main objectives of Shopora are:

## 2.1 Customer Objectives

- Provide a simple and convenient online shopping experience.
- Allow customers to search and filter products.
- Allow customers to view detailed product information.
- Allow customers to manage their shopping cart.
- Allow customers to maintain a wishlist.
- Provide a structured checkout process.
- Allow customers to place orders.
- Provide order history and order tracking.
- Provide personalized product recommendations.
- Provide AI-powered shopping assistance.

---

## 2.2 Seller Objectives

- Allow sellers to create and manage products.
- Allow sellers to upload product images.
- Allow sellers to manage pricing and stock.
- Allow sellers to manage categories and brands.
- Allow sellers to view customer orders related to their products.
- Allow sellers to monitor inventory.
- Provide coupon and discount management.
- Provide sales and earnings information.
- Provide AI-powered product description and tag generation.

---

## 2.3 Admin Objectives

- Provide centralized platform management.
- Manage customers and sellers.
- Manage products.
- Manage categories and brands.
- Manage orders.
- Manage inventory.
- Manage coupons and discounts.
- Monitor platform activities.
- Provide sales and order analytics.
- Manage AI and real-time platform features.

---

## 2.4 Technical Objectives

- Use PostgreSQL for reliable relational data storage.
- Use Prisma ORM for database access and schema management.
- Use a structured REST API architecture.
- Maintain proper relationships between users, products, orders, and order items.
- Use transactions for critical order operations.
- Build a responsive user interface.
- Maintain scalable and maintainable project architecture.

---

# 3. User Roles

Shopora contains three primary user roles:

1. Customer
2. Seller
3. Admin

---

## 3.1 Customer

A customer is an end user who visits Shopora to discover and purchase products.

### Customer Permissions

Customers can:

- Register an account.
- Log in and log out.
- Browse products.
- Search products.
- Filter products.
- View product details.
- Add products to cart.
- Update cart quantity.
- Remove products from cart.
- Add products to wishlist.
- Remove products from wishlist.
- Apply available coupons.
- Enter shipping information.
- Select a payment method.
- Place an order.
- View order history.
- View individual order details.
- Track order status.
- Receive order updates.
- View personalized product recommendations.
- Use AI shopping assistance.

---

## 3.2 Seller

A seller is a user who sells products through the Shopora marketplace.

### Seller Permissions

Sellers can:

- Access the seller dashboard.
- Create products.
- Edit products.
- Delete products.
- Upload product images.
- Manage product pricing.
- Manage product stock.
- Manage product status.
- Manage categories.
- Manage brands.
- View products belonging to their store.
- View orders containing their products.
- Monitor inventory.
- Manage coupons.
- View earnings.
- View sales information.
- Use AI product description tools.
- View relevant store analytics.

### Seller Ownership

Each product must be associated with a seller through the seller's user ID.

The relationship is:

User/Seller → Product → OrderItems → Order

This allows the system to identify which seller owns a product and which orders contain that seller's products.

---

## 3.3 Admin

The admin is responsible for managing the complete Shopora platform.

### Admin Permissions

Admins can:

- Access the admin dashboard.
- Manage users.
- Manage sellers.
- Manage customers.
- Manage products.
- Manage categories.
- Manage brands.
- Manage orders.
- Manage inventory.
- Manage coupons.
- Monitor reviews.
- Access AI tools.
- View reports and analytics.
- Manage notifications.
- Manage platform settings.
- Monitor overall platform activities.

---

# 4. Functional Requirements

Functional requirements define what the Shopora system must do.

---

## 4.1 User Authentication

The system shall provide:

- User registration.
- User login.
- User logout.
- User session management.
- Role-based access.
- Customer authentication.
- Seller authentication.
- Admin authentication.

Each authenticated user will have an associated role:

- Customer
- Seller
- Admin

---

## 4.2 Product Catalog Management

The system shall provide a structured product catalog.

Each product may contain:

- Product ID
- Product name
- SKU
- Short description
- Full description
- Category
- Brand
- Regular price
- Sale price
- Stock quantity
- Low-stock alert threshold
- Stock status
- Product images
- Product status
- Seller information
- Created date
- Updated date

Sellers and administrators shall be able to manage product information according to their permissions.

---

## 4.3 Product Search and Filtering

Customers shall be able to:

- Search products using keywords.
- Browse products by category.
- Browse products by brand.
- Filter products by price.
- Filter products by availability.
- Filter products using relevant product attributes.

The search system should provide relevant results based on customer input.

---

## 4.4 Shopping Cart

Customers shall be able to:

- Add products to cart.
- Increase product quantity.
- Decrease product quantity.
- Remove products.
- View subtotal.
- View shipping cost.
- View total amount.

The system shall recalculate cart totals whenever product quantities change.

---

## 4.5 Wishlist

Customers shall be able to:

- Add products to wishlist.
- Remove products from wishlist.
- View saved products.
- Move from wishlist to shopping cart where applicable.

---

## 4.6 Checkout

The checkout process shall contain structured steps.

### Checkout Information

The customer shall provide:

- Full name
- Email
- Phone
- Address
- City
- State/Division
- Postal code
- Country
- Delivery information
- Payment method

The checkout process shall display:

- Product information
- Quantity
- Subtotal
- Shipping cost
- Total amount

---

## 4.7 Payment

The platform is designed to support payment integration.

The planned system can support payment methods such as:

- Cash on Delivery
- Online payment gateway

Online payment gateway integration may include services such as:

- Stripe
- SSLCommerz

The currently implemented order flow supports:

```text
Payment Method: COD
Payment Status: PENDING