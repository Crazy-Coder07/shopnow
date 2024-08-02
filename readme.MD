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

