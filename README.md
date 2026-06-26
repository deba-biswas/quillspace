# QuillSpace

> A modern full-stack blogging platform built with React, Node.js, Express.js, and MongoDB.

QuillSpace is a responsive blogging platform that enables users to create, publish, edit, and manage articles through an intuitive interface. It features secure authentication, a rich-text editor, image uploads, and a clean, modern design to deliver a seamless writing experience.

---

## Features

- User authentication (Sign Up & Login)
- Create, edit, and delete blog posts
- Rich-text editor powered by Quill
- Cover image upload support
- Personalized dashboard for managing posts
- Responsive user interface
- Modern and clean design
- RESTful API architecture
- MongoDB database integration

---

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Tailwind CSS v4
- Lucide React
- Quill Editor

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- CORS
- dotenv

---

## Project Structure

```text
QuillSpace
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── uploads/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── package.json
│   ├── server.js
│   └── ...
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/deba-biswas/quillspace.git

cd quillspace
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quillspace
JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm start
```

or

```bash
node server.js
```

The backend will run at:

```
http://localhost:5000
```

---

## Frontend Setup

Open a new terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## Environment Variables

Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quillspace
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Posts

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

### Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| PUT | `/api/users/:id` | Update user details
| PUT | `/api/users/:id/password` | Update user password

---


## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Author

**Debangshu**

- GitHub: https://github.com/deba-biswas/
- LinkedIn: https://linkedin.com/in/debangshu-biswas/

---

## Acknowledgements

- React
- Vite
- Tailwind CSS
- Express.js
- MongoDB
- Quill
- Lucide Icons