# 🎨 SyncBoard - Collaborative Whiteboard for Visual Creativity

<div align="center">

### Draw, sketch, and brainstorm together in real-time ✨

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-green?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)](https://prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 🚀 Live Demo - See in action! 

![SyncBoard Demo](./apps/web/public/drw-demo.gif) 
![SyncBoard Collaboration Demo](./apps/web/public/drw-collaboration-demo.gif) 

## 📖 Overview

SyncBoard is a modern, full-featured collaborative whiteboard application that enables teams to create, share, and collaborate on visual content in real-time. Built with cutting-edge technologies and an AI-assisted shape generator, it provides a seamless drawing and diagramming experience for teams who think visually.

## ✨ Key Features

### 🎨 **Drawing & Design Tools**
- 🖊️ **Natural Drawing**: Fluid, hand-drawn strokes with pencil tool
- 📐 **Geometric Shapes**: Rectangles, circles, diamonds, lines, and arrows
- 📝 **Text Tools**: Add and edit text directly on the canvas
- 🧽 **Eraser Tool**: Clean and precise erasing capabilities
- 🎯 **Selection Tool**: Select, move, and manipulate objects
- 🖐️ **Hand Tool**: Pan and navigate around the canvas

### 🤖 **AI Shape Generator**
- ⚡ **Natural Language Prompts**: Instantly generate shapes, custom layouts, and diagrams using natural text prompts.
- 🔮 **Gemini Integration**: Powered by Google's Gemini 2.5 Flash model for ultra-fast generation, auto-flattening, and insertion.
- 🔄 **Collaborative Broadcasts**: AI-generated drawings are automatically broadcasted in real-time to all collaborators in the room.

### 👥 **Real-time Collaboration**
- ⚡ **Live Collaboration**: Multiple users can draw simultaneously
- 👀 **Live Cursors**: See where other users are working in real-time
- 👤 **User Presence**: Track who's online and active in the room
- 🔄 **Instant Sync**: Zero-latency synchronization across all devices
- 💾 **Auto-save**: Automatic saving with IndexedDB for offline persistence

### 🔐 **User Management & Security**
- 🔑 **Authentication**: Secure login with NextAuth.js supporting both credentials (email/password) and Google OAuth provider.
- 👤 **User Profiles**: Personalized user accounts and settings
- 🏠 **Room Management**: Create and join private drawing rooms
- 🔒 **Anonymous Drawing**: Option to draw without registration

### 🎛️ **Advanced Features**
- 🔍 **Zoom Controls**: Zoom in/out for detailed work
- 📸 **Screenshot Export**: Export canvas as PNG images
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🌓 **Dark Theme**: Beautiful dark space-theme interface for comfortable drawing
- ⚙️ **Properties Panel**: Customize shapes, colors, and properties

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[React 19](https://react.dev/)** - UI library with latest features
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication with OAuth (Google)
- **[Google Generative AI SDK](https://github.com/google/generative-ai-js)** - Integrates Gemini 2.5 Flash for the AI canvas tools

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[WebSockets (ws)](https://github.com/websockets/ws)** - Real-time communication
- **[Prisma](https://prisma.io/)** - Database ORM and schema management
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[JWT](https://jwt.io/)** - Secure token-based authentication

### DevOps & Tools
- **[Turborepo](https://turbo.build/)** - Monorepo management and build system
- **[Docker](https://www.docker.com/)** - Containerization and deployment
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting

## 🏗️ Architecture

```
syncboard/
├── apps/
│   ├── web/                 # Next.js frontend application & API routes
│   └── ws-backend/          # WebSocket server for real-time features
├── packages/
│   ├── db/                  # Prisma database schema and client
│   ├── ui/                  # Shared React components
│   ├── common/              # Shared utilities and types
│   ├── backend-common/      # Backend utilities
│   ├── eslint-config/       # ESLint configurations
│   └── typescript-config/   # TypeScript configurations
├── docker/                  # Docker configurations
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **pnpm**
- **PostgreSQL** (or use Docker)
- **Docker & Docker Compose** (optional, for containerized setup)

### 🔧 Installation

#### Option 1: Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Rish-tech1/syncboard
cd syncboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy example environment files
cp .env.example .env

# Configure your environment variables:
# - DATABASE_URL (PostgreSQL connection string)
# - NEXTAUTH_SECRET (for NextAuth.js sessions)
# - NEXTAUTH_URL (normally http://localhost:3000)
# - GOOGLE_CLIENT_ID (Google Cloud Console OAuth app client ID)
# - GOOGLE_CLIENT_SECRET (Google Cloud Console OAuth app client secret)
# - JWT_SECRET (for WebSocket client authorization)
# - GEMINI_API_KEY (Google AI Studio API key)
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
cd packages/db && npx prisma migrate dev
```

5. **Start the development servers**
```bash
# Start all services (web app + WebSocket server)
npm run dev

# Or start individual services:
npm run start:web        # Frontend (port 3000)
npm run start:websocket  # WebSocket server (port 8080)
```

#### Option 2: Docker Development

1. **Clone and configure**
```bash
git clone https://github.com/Rish-tech1/syncboard
cd syncboard
cp .env.example .env
```

2. **Start with Docker Compose**
```bash
docker-compose up -d
```

3. **Access the application**
- Frontend: http://localhost:3000
- WebSocket Server: ws://localhost:8080
- PostgreSQL: localhost:5432

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all development servers |
| `npm run build` | Build all applications for production |
| `npm run start` | Start production servers |
| `npm run lint` | Run ESLint across all packages |
| `npm run format` | Format code with Prettier |
| `npm run db:generate` | Generate Prisma client |

## 🎯 Usage

### Creating a Drawing Session

1. **Sign up/Login**: Create a credentials account or log in instantly using Google OAuth.
2. **Create a room** with a custom name
3. **Share the room link** with collaborators
4. **Start drawing** with the intuitive toolbar or use the AI panel

### Drawing Tools

- **🎯 Select**: Click and drag to select objects
- **🖐️ Hand**: Pan around the canvas
- **⭕ Circle**: Draw perfect circles
- **⬜ Rectangle**: Create rectangular shapes
- **💎 Diamond**: Draw diamond shapes
- **📏 Line**: Draw straight lines
- **➡️ Arrow**: Create directional arrows
- **✏️ Pencil**: Free-hand drawing
- **📝 Text**: Add text annotations
- **🧽 Eraser**: Remove elements

### 🤖 AI Canvas Commands
To use the AI Shape Generator, click on the Floating AI Prompt Box on the canvas:
1. Type a natural instruction (e.g., `"Draw a website wireframe with a header, footer, sidebar, and content area"`).
2. Hit enter.
3. SyncBoard will generate and render the coordinates/shapes directly onto your active canvas, syncing it to everyone else in the workspace.

## 🔧 Configuration

### Environment Variables

Configure these in the unified `.env` file at the root of the project:

```env
# Database connection URL
DATABASE_URL="postgres://username:password@localhost:5432/syncboard"

# Secrets for JWT and NextAuth
JWT_SECRET="your-jwt-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"



# Gemini API Key (needed for AI shape generation feature)
GEMINI_API_KEY="your-gemini-api-key"
```

## 🚀 Deployment

### Production Build

```bash
# Build all applications
npm run build

# Start production servers
npm run start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📈 Performance

- **Real-time sync**: <50ms latency for most operations
- **Concurrent users**: Supports 100+ users per room
- **Canvas size**: Unlimited canvas with efficient viewport rendering
- **Offline support**: IndexedDB persistence for offline drawing

## 🔒 Security

- JWT-based WebSocket authentication
- CSRF protection with NextAuth.js
- Google OAuth 2.0 security integration
- SQL injection prevention with Prisma

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **tldraw** - Inspiration for the drawing experience
- **Figma** - UI/UX inspiration
- **Vercel** - Deployment platform
- **Open Source Community** - Amazing tools and libraries

## 📞 Support

- 📧 **Email**: [jainrishabh8153@gmail.com](mailto:jainrishabh8153@gmail.com)

---

<div align="center">

**Made with ❤️ by Rishabh**

⭐ Star this repo if you found it helpful!

</div>
