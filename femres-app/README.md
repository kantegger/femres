# FemRes - 女性主义资源聚合平台

**FemRes** is a comprehensive feminist content aggregation platform that provides high-quality, diverse feminist-related content through AI-driven curation and community collaboration. Built as a full-stack application with user authentication, real-time interactions, and community features.

## ✨ Core Features

- **Content Aggregation**: Books, articles, videos, podcasts, and research papers
- **User Authentication**: Complete registration, login, and profile management
- **Real-time Interactions**: Comments with nested replies and real-time like counts
- **Content Interaction**: Like and bookmark functionality with personal collections
- **Advanced Search**: Multi-topic categorization and intelligent filtering
- **Responsive Design**: Mobile-first with dark mode support
- **Personalized Recommendations**: AI-driven content suggestions

## 🛠️ Technical Stack

### Frontend
- **Framework**: Astro 5.13 + TypeScript
- **Architecture**: Server-Side Rendering (SSR) with Islands Architecture
- **Interactive Components**: React 18.3 for dynamic features
- **Styling**: Tailwind CSS 4.1
- **State Management**: Zustand with localStorage persistence

### Backend
- **Runtime**: Cloudflare Workers (serverless)
- **Database**: Cloudflare D1 (SQLite at the edge)
- **Authentication**: JWT tokens + bcrypt password encryption
- **Deployment**: Cloudflare Pages with global CDN

## 🚀 Project Structure

```text
src/
├── components/           # Astro/React components
│   ├── ArticleCard.astro # Article display component
│   ├── ArticleCard2.astro # Compact article display
│   ├── BookCard.astro    # Book display component
│   ├── VideoCard.astro   # Video display component
│   ├── PodcastCard.astro # Podcast display component
│   ├── InteractionButtons.tsx # Like/bookmark functionality
│   ├── SearchBox.tsx     # Search functionality (React island)
│   └── Layout.astro      # Page layouts
├── pages/               # Route pages
│   ├── index.astro      # Homepage
│   ├── books/           # Books section with pagination
│   ├── articles/        # Articles section with pagination
│   ├── films/           # Films section
│   ├── podcasts/        # Podcasts section
│   ├── videos/          # Videos section
│   ├── search.astro     # Search page
│   ├── topics/          # Topic pages
│   └── api/             # API endpoints
│       ├── auth/        # Authentication APIs
│       ├── comments/    # Comment system APIs
│       └── likes/       # Like count APIs
├── content/             # Content collections
│   ├── books/           # Book content markdown files
│   ├── articles/        # Article content markdown files
│   ├── films/           # Film content markdown files
│   ├── podcasts/        # Podcast content markdown files
│   └── videos/          # Video content markdown files
└── styles/              # Global styling files
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📚 Content Categories

### Books (书籍)
Curated feminist literature including theory, fiction, and academic works

### Articles (文章)
Feminist articles, blog posts, and opinion pieces with pagination support

### Films (电影)
Feminist films and cinema analysis including works like:
- **Barbie (2023)** - Postmodern feminist analysis
- **Promising Young Woman (2020)** - Anti-rape culture critique

### Videos (视频)
Educational videos, documentaries, and feminist content

### Podcasts (播客)
Audio content featuring feminist discussions and interviews

## 🎯 Key Features Implemented

### Pagination System
- **Books**: 12 items per page with server-side and client-side pagination
- **Articles**: Mixed layout (first 2 use Card1, remainder use Card2) with 12 items per page
- Navigation with previous/next and page numbers

### Interactive Elements
- **Real-time Like Counts**: API-driven like counts that update in real-time
- **Hover Animations**: Video play buttons and podcast audio waves on hover only
- **Topic Collapse**: Automatic collapse for topic lists > 20 items

### Content Cards
- **ArticleCard**: Full-featured card with featured images and detailed metadata
- **ArticleCard2**: Compact horizontal layout for space efficiency
- **Responsive Design**: All cards adapt to mobile and desktop layouts

## 🌐 Deployment

The application is designed for deployment on Cloudflare Pages with:
- **Edge Computing**: Cloudflare Workers for serverless backend
- **Global CDN**: Fast content delivery worldwide
- **Database**: Cloudflare D1 for edge-optimized data storage

## 📖 Development Guidelines

- Follow Astro best practices with Islands Architecture
- Use React components only for interactive features
- Maintain responsive design with Tailwind CSS
- Implement proper TypeScript typing
- Follow content verification guidelines for all additions

## 🔗 Links

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

---

Built with ❤️ for the feminist community