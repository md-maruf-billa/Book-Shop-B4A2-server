# Book Shop Backend

##### Live URL- https://bookshopa2.vercel.app/

## **Contents**

-   [Overview](#overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Folder Structure](#folder-structure)
-   [Setup Instructions](#setup-instructions)
-   [API Endpoints](#api-endpoints)
-   [API Explanation](#api-explanation)

## **Overview**

Book Shop is a RESTful API application built using **Express** and **TypeScript**. It integrates **MongoDB** with **Mongoose** to manage book inventory and orders. The project emphasizes scalability, data integrity, and an organized structure.

## **Features**

-   **CRUD Operations** for managing books and orders.
-   **Inventory Management**:
    -   Automatically updates stock levels upon order placement.
    -   Tracks product availability.
-   **Mongoose Schema Validation with zod** for data integrity.
-   **Search and Filter**:
    -   Query books by title, author, or category.
-   **Order Revenue Calculation**:
    -   Aggregates total revenue using MongoDB pipelines.
-   Detailed **Error Responses** with stack traces for debugging.

## **Technologies Used**

-   **Backend**: Express.js, Node.js, TypeScript
-   **Database**: MongoDB, Mongoose (Mongoose for ORM)
-   **Other Tools**: dotenv, body-parser, zod validator
-   **Development**: ts-node-dev for hot-reloading

## **Folder Structure**

```
book-shop/
|---src/
|        |--- app/
|        |       |--books/
|        |       |        |--- book.interface.ts
|        |       |        |--- book.schema.ts
|        |       |        |--- book.validation.ts
|        |       |        |--- book.route.ts
|        |       |        |--- book.controller.ts
|        |       |        |___ book.services.ts
|        |       |--orders/
|        |       |        |--- book.interface.ts
|        |       |        |--- book.schema.ts
|        |       |        |--- book.validation.ts
|        |       |        |--- book.route.ts
|        |       |        |--- book.controller.ts
|        |       |        |___ book.services.ts
|        |       |--user/
|        |       |        |--- user.interface.ts
|        |       |        |--- user.schema.ts
|        |       |        |--- user.validation.ts
|        |       |        |--- user.route.ts
|        |       |        |--- user.controller.ts
|        |       |        |___ user.services.ts
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

PORT = 5000
DATABASE_URI= db url
BCRYPT_SOLT=10

 JWT_ACCESS_SECRET= access secret
JWT_REFRESH_SECRET= refresh secret
JWT_ACCESS_EXPIRES_IN= 1d
JWT_REFRESH_EXPIRES_IN=15d
CLOUD_NAME= cloudinary cloud name
CLOUD_API_KEY= cloud api key
CLOUD_SECRET= cloud secret

# surjo pay env
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=https://mahidbooksfrontend.vercel.app/verify-order
```

### **4. Start the Server (For Development)**

```
npm run start:dev

// The API runs on

http://localhost:5000
```
`Note` For your testing purposes provide postman json file in the root directory.

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

-   Endpoint: /api/products,
-   Method: _POST_,
-   Request Body:

```
// You need to send form data like this-
{
  "title": string,
  "author": string,
  "price": number,
  "category": string,
  "description": string,
  "quantity": number,
  "publishYear": number,
  "exchangeable": "Exchangeable" | "No Exchangeable"
};
```

`You recived this type response..`

```
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

#### **2. Get All Books**

-   Endpoint: /api/products
-   Method: _GET_, Query
-   Queries: searchTerm,sort,filter,page,limit,skip (optional): Search by _title_, _author_, or _category_.

```
# You recived this type of respones
{
  "message": "Books retrieved successfully",
  "status": true,
  "data": [ ...listOfBooks ]
}
```

#### **2. Get a Specific Book**

-   Endpoint: /api/products/:_bookId_
-   Method: _GET_
-   Params : `bookId` as `string`.

```
# You recived this type of respones
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

-   Endpoint: /api/products/update-book/:_bookId_
-   Method: _PUT_
-   Request Body: (Book details to update)
- Params - `bookId` as `string`

```
// You need to send this type of from data
{
  "price": 15,
  "quantity": 25,
}
```

#### **5. Delete a Book**

-   Endpoint: /api/products/:_bookId_
-   Method: _DELETE_
-   Params: `bookId` as `string`

```
{
  "message": "Book deleted successfully",
  "status": true,
  "data": {}
}
```

#### **6. Order a Book**

-   Endpoint: /api/orders
-   Method: POST
-   Logic:
    When an order is placed, automatic reduce the quantity in the product model.
    If quantity goes to zero, automatic set inStock to false.

```typescript
// Need to this type of data
{
    "email": string,
    "product": string,
    "quantity": number,
    "price": number,
    "address":string,
    "orderNote":string (optional)
}
```


## **Contributing**

Contributions are welcome! Please fork the repository and submit a pull request. I will accept at first at possible.
