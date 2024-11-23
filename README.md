# Book Shop Backend
##### Live URL- https://bookshopa2.vercel.app/

## **Contents**
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [API Explanation](#api-explanation)
- [Future Update and Contributing](#future-improvements)




## **Overview**
Book Shop  is a RESTful API application built using **Express** and **TypeScript**. It integrates **MongoDB** with **Mongoose** to manage book inventory and orders. The project emphasizes scalability, data integrity, and an organized structure.



## **Features**
- **CRUD Operations** for managing books and orders.
- **Inventory Management**:
  - Automatically updates stock levels upon order placement.
  - Tracks product availability.
- **Mongoose Schema Validation with zod** for data integrity.
- **Search and Filter**:
  - Query books by title, author, or category.
- **Order Revenue Calculation**:
  - Aggregates total revenue using MongoDB pipelines.
- Detailed **Error Responses** with stack traces for debugging.


## **Technologies Used**
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: MongoDB, Mongoose (Mongoose for ORM)
- **Other Tools**: dotenv, body-parser, zod validator
- **Development**: ts-node-dev for hot-reloading


## **Folder Structure**
```
book-shop/
|---src/
|        |--- app/
|        |       |--books/
|        |       |        |--- book.interface.ts
|        |       |        |--- book.schema.ts
|        |       |        |--- book.route.ts
|        |       |        |--- book.controller.ts
|        |       |        |___ book.services.ts
|        |       |--orders/
|        |       |        |--- book.interface.ts
|        |       |        |--- book.schema.ts
|        |       |        |--- book.route.ts
|        |       |        |--- book.controller.ts
|        |       |        |___ book.services.ts
|        |       |__config/     # Database and environment variable configuration
|        |--- app.ts
|        |___ server.ts
|── .env                     
├── package.json        
├── tsconfig.json        
└── README.md   

```
---
## **Setup Instructions**

### **1. Clone the Repository**
```
git clone https://github.com/md-maruf-billa/Book-Shop-B4A2-server.git
```
### **2. Install Dependencies**
```
npm install
```
### 3. Set up Environment Variables
```
// Create a .env file in the root directory and add this

PORT=5000
DB_USERNAME = your db user name
DB_PASSWORD = your db password
```
### **4. Start the Server (For Development)**
```
npm run start:dev

// The API runs on 

http://localhost:5000
```
## **API Endpoints**
```
    Products (Books):
        POST--> /api/products - Add a new book.
        GET -->/api/products - Retrieve all books (with optional search).
        GET--> /api/products/:productId - Retrieve a specific book by ID.
        PUT--> /api/products/:productId - Update a specific book.
        DELETE--> /api/products/:productId - Delete a book.

    Orders:
        POST--> /api/orders - Place an order for a book.
        GET--> /api/orders/revenue - Calculate total revenue from all orders.
```
## **API Explanation**
#### 1. Add a Book

- Endpoint: /api/products, 
- Method: *POST*, 
- Request Body:
```
// Book info from frontend
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 10,
  "category": "Fiction",
  "description": "A story about the American dream.",
  "quantity": 100,
  "inStock": true
}

// Response: validate data by using zod and save in database

{
  "message": "Book created successfully",
  "success": true,
  "data": { 
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": 10,
      "category": "Fiction",
      "description": "A story about the American dream.",
      "quantity": 100,
      "inStock": true,
      "isDeleted":false,
      "createdAt":"2024-11-22T16:44:25.622Z",
      "updatedAt":"2024-11-22T16:44:25.622Z"
   }
}
```
#### **2. Retrieve All Books**

- Endpoint: /api/products
- Method: *GET*, Query
- Parameters: searchTerm (optional): Search by *title*, *author*, or *category*.
```
{
  "message": "Books retrieved successfully",
  "status": true,
  "data": [ ...listOfBooks ]
}
```

#### **2.  Get a Specific Book**

- Endpoint: /api/products/:*productId*
- Method: *GET*
- Response: The details of a specific book by ID.
```
{
  "message": "Book retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z",
  }
}
```
#### **4. Update a Book**
- Endpoint: /api/products/:*productId*
- Method: *PUT*
- Request Body: (Book details to update)
```
// updated data from frontend
{
  "price": 15,
  "quantity": 25,
}

// Response: Success message and updated book details.
{
  "message": "Book updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 15,  // Price updated
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 25,  // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z",  // Updated timestamp
  }
}
```
#### **5. Delete a Book**
- Endpoint: /api/products/:*productId*
- Method: *DELETE*
- Response: Success message confirming the book has been deleted.
```
{
  "message": "Book deleted successfully",
  "status": true,
  "data": {}
}
```
#### **6. Order a Book**
- Endpoint: /api/orders
- Method: POST
-  Logic:
When an order is placed, automatic reduce the quantity in the product model.
If  quantity goes to zero, automatic set inStock to false.
```
//From frontend Request Body
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 30
}
// Send Response: Success message confirming the order.
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 30,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z",
  }
}
```

#### **7. Calculate Revenue Of Orders**
- Endpoint: /api/orders/revenue
- Method: GET.
- Response: The total revenue from all orders.
```
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 450  // Total revenue calculated from all orders
  }
}
```
## **Future Improvements**

- Implement user authentication for managing orders.
- Add pagination and sorting for book listings.
- Include a front-end interface for better user interaction.
-  Add unit and integration tests for API endpoints.

## **Contributing**

Contributions are welcome!  Please fork the repository and submit a pull request. I will accept at first at possible.


