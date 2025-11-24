📌 Final Node.js + MongoDB Project – README

📖 Overview

This project is a complete RESTful API built with Node.js, Express, and MongoDB, developed as part of the final module project in the Node.js course.
The system allows business users to create, edit, like, and delete business cards, while admins have extended control and permissions.

The project is fully modular, clean, and built according to all the technical and structural requirements defined in the course instructions.

⸻

🚀 Technologies Used
	•	Node.js
	•	Express.js
	•	MongoDB Atlas
	•	Mongoose
	•	bcryptjs – password hashing
	•	jsonwebtoken (JWT) – authentication
	•	joi – validation
	•	dotenv – environment variables
	•	morgan – request logger
	•	cors – access control
	•	fs – file logging

⸻

📂 Project Structure
project/
│── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── cardController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Card.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── cardRoutes.js
│   ├── utils/
│   │   ├── initialData.js
│   │   ├── fileLogger.js
│   └── index.js
│── .env
│── package.json
│── README.md

🧑‍💼 Users API

1️⃣ Register User

POST /users
Authorization: Public
Creates a new user with hashed password.

Example Body:
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "Aa123456",
  "phone": "050-0000000",
  "isBusiness": true
}
2️⃣ Login User

POST /users/login
Authorization: Public
Returns a signed JWT token.

⸻

3️⃣ Get All Users

GET /users
Authorization: Admin only

⸻

4️⃣ Get User By ID

GET /users/:id
Authorization: Owner OR Admin

⸻

5️⃣ Edit User

PUT /users/:id
Authorization: Owner OR Admin

⸻

6️⃣ Change Business Status

PATCH /users/:id
Authorization: Owner

⸻

7️⃣ Delete User

DELETE /users/:id
Authorization: Owner OR Admin

⸻

💳 Cards API

1️⃣ Get All Cards

GET /cards
Authorization: Public

⸻

2️⃣ Get My Cards

GET /cards/my-cards
Authorization: Business user only

⸻

3️⃣ Get Card by ID

GET /cards/:id
Authorization: Public

⸻

4️⃣ Create Card

POST /cards
Authorization: Business user

⸻

5️⃣ Update Card

PUT /cards/:id
Authorization: Owner OR Admin

⸻

6️⃣ Like / Unlike Card

PATCH /cards/:id
Authorization: Logged-in users

⸻

7️⃣ Delete Card

DELETE /cards/:id
Authorization: Owner OR Admin

⸻

🛡️ Authentication & Authorization
	•	JWT used for all secured routes
	•	Middlewares:
	•	authenticate
	•	requireBusiness
	•	requireAdmin
	•	requireOwnerOrAdmin

⸻

🧪 Data Validation (JOI)

All incoming requests are validated according to the schemas in:
📁 userValidation.js
📁 cardValidation.js

⸻

📚 Extra Features (Bonus)

⭐ 1. Admin can update bizNumber

PATCH /cards/biz-number/:id

⭐ 2. File Logger

All requests with status 400+ saved into date-based logs.

⭐ 3. Account Lock After Failed Logins

After 3 failed attempts → locked for 24 hours.

⸻

🗄️ Initial Data

Project includes:
	•	Regular user
	•	Business user
	•	Admin user
	•	Sample business cards

Located in:
📁 initialData.js

⸻

🎯 Final Notes
	•	All requirements from the lecturer were implemented
	•	Clean modular architecture
	•	Full validation and security
	•	Bonus features included
	•	Ready for submission
