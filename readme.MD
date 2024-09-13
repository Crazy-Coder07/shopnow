**SHOPNOW==> This is the MERN stack Project

# Deployed Link 
https://aditya-ranjan.cyclic.app/

# Locally Run Backend
npm start


# Technology Used
React- Frontend(UI)
Backend- Node & Express.js
Database-MongoDb (Atlas)
API- Using Express.js

# API using Express
1) for All Category list (Category Api)
     Schema---> categoryModel.js 
     routes---> categoryRoutes.js
     cantrollers----> categoryControllers

2) for All order list (order Api)
     Schema---> orderModel.js 
     routes---> authRoutes.js
     cantrollers----> authControllers

3) for All Product list (Product Api)
     Schema---> productModel.js 
     routes---> productRoutes.js
     cantrollers----> productControllers

4) for All User list (User Api)
     Schema---> userModel.js 
     routes---> authRoutes.js
     cantrollers----> authControllers




# Backend Hierarchy

       ------------> config(DATABASE)
       |
       |
  server.js             |--------middlewares
    |                   |
    |                   | for Protected Routes
    |                  \|/
    |---------------> routes
                      |
                      |---------> controllers
                                   |
                                   |------------> models
                                   |------------> helpers


ShopNow is a responsive e-commerce web application developed using the MERN stack (MongoDB, Express, React, Node.js). It supports two main roles: Users and Admins. The application includes secure user authentication, product filtering, and payment gateway integration to provide a seamless shopping experience.
Features

    User Role:
        Registration and Authentication: Secure user authentication with JWT for registration, login, and password recovery.
        Product Filtering: Filter products by category and price to quickly find desired items.
        Shopping Cart: Add products to the cart and manage quantities.
        Order Placement: Place orders and view order history.
    Admin Role:
        User Management: Manage over 1000+ users including view, edit, and delete user information.
        Product Management: Add, update, or remove products and manage product categories.
        Category Management: Create and manage product categories.
        Order Management: View and update order statuses.
    Payment Gateway:
        Secure Payments: Integrated Braintree payment gateway for processing transactions securely.
