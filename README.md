# 🌌 DeltaAI - Into the unknown

DeltaAI is a high-performance, minimalist conversational AI platform. Built with the MERN stack and powered by Google's Gemini API, it features a sleek dark-mode interface, secure authentication, and seamless code-handling capabilities.

## Features

* **Advanced AI Conversation:** Powered by the `gemini-2.5` model for fast, contextual, and accurate responses.
* **Modern UI/UX:** A premium, dark-themed interface inspired by leading AI platforms, featuring the `Outfit` font for a    clean, geometric look.
* **Smart Code Blocks:** Real-time Markdown rendering with syntax highlighting and a one-click "Copy Code" feature.
* **Session Persistence:** Chat histories are securely saved to MongoDB and instantly synced when you log in.
* **Secure Authentication:** End-to-end user identity management powered by Clerk.
* **Responsive Design:** Fully optimized for both desktop and mobile experiences.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* TypeScript
* Material-UI (MUI)
* Clerk (Authentication)
* React Markdown & Syntax Highlighter

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* Google Generative AI SDK (Gemini API)
* TypeScript

## 🚀 Getting Started

Follow these steps to set up DeltaAI on your local machine.

### Prerequisites
* Node.js installed
* MongoDB account/cluster set up
* Clerk account for authentication
* Google AI Studio account (for Gemini API Key)

### 1. Clone the repository

```bash

git clone [https://github.com/geekyanimesh/DeltaAI.git](https://github.com/geekyanimesh/DeltaAI.git)

cd DeltaAI

2. Setup the Backend

cd backend
npm install

Create a .env file in the backend directory:

PORT=5000
MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=your_clerk_secret_key

Start the backend server:
npm run dev

3. Setup the Frontend
cd frontend
npm install

Create a .env file in the frontend directory:
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Start the Vite development server:
npm run dev

🧠 Usage
Open http://localhost:5173 in your browser.

Sign up or Log in using Clerk.

Start chatting with DeltaAI!

Try asking for code snippets to see the syntax highlighting and copy feature in action.

👨‍💻 Author
Animesh Kumar | Full Stack Developer

GitHub: @geekyanimesh
