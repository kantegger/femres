# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FemHub** is a feminist content aggregation platform that provides high-quality, diverse feminist-related content through AI-driven curation and community collaboration.

**Core Features:**
- Content aggregation (books, articles, videos, podcasts, papers)
- Intelligent personalized recommendations
- Advanced search and filtering
- Community interaction and content contribution
- Multi-topic categorization system

## Technical Architecture

### Frontend Stack
- **Framework**: Astro 4.0 + TypeScript
- **Architecture**: Static Site Generation (SSG) with Islands Architecture
- **Interactive Components**: React (for dynamic features)
- **Styling**: Tailwind CSS
- **Features**: PWA support, responsive design

### Backend Stack
- **Runtime**: Node.js + Express/Fastify
- **Architecture**: Microservices
- **Database**: PostgreSQL (primary) + Redis (cache) + Elasticsearch (search)
- **External Integrations**: RSS aggregation, social media APIs, content APIs

### Key Services
- Content Service: Manages content lifecycle
- User Service: Authentication and user management
- Search Service: Full-text search with Elasticsearch
- Recommendation Service: Personalized content recommendations
- Notification Service: User notifications and updates

## Project Structure (Planned)
```
src/
├── components/           # Astro/React components
│   ├── ContentCard.astro # Content display components
│   ├── SearchBox.tsx     # Search functionality (React island)
│   └── Layout.astro      # Page layouts
├── pages/               # Route pages
│   ├── index.astro      # Homepage
│   ├── search.astro     # Search page
│   ├── topics/          # Topic pages
│   └── api/             # API endpoints
├── content/             # Content collections
│   ├── books/           # Book content
│   └── articles/        # Article content
└── styles/              # Styling files
```

## Content Categories
1. **职场平等** (Workplace Equality)
2. **身体自主** (Bodily Autonomy)  
3. **教育权利** (Education Rights)
4. **政治参与** (Political Participation)
5. **家庭角色** (Family Roles)
6. **性别暴力** (Gender Violence)
7. **媒体表征** (Media Representation)
8. **历史人物** (Historical Figures)

## Development Guidelines

### Code Quality & Practices
- **Always read entire files** before making changes to understand full context and avoid duplication or architectural misunderstandings
- **Organize code into separate files** following modularity, proper variable naming, and readability best practices
- **Optimize for readability** - code is read more often than written
- **Run linting after major changes** to catch syntax errors and ensure code quality
- **Never do dummy implementations** - always implement the actual functionality requested

### Development Workflow
- **Commit early and often** at logical milestones, especially for large tasks
- **Create and get approval for Plans** before writing code on new tasks - think through architecture, edge cases, and approach
- **Ask clarifying questions** when tasks are unclear rather than making assumptions
- **Break down large/vague tasks** into smaller subtasks or ask user to help break them down
- **Avoid large refactors** unless explicitly requested

### External Libraries & Dependencies
- **Look up latest syntax and usage** via WebSearch for external libraries to ensure current patterns
- **Debug and fix library issues** rather than skipping or switching libraries
- **When user specifies a library**, persist with debugging rather than suggesting alternatives

### Problem Solving
- **Identify root causes** when facing repeated issues rather than trying random solutions
- **Debug systematically** instead of throwing solutions at the wall

### UI/UX Work
- **Create aesthetically pleasing and user-friendly designs** following UI/UX best practices
- **Focus on interaction patterns and micro-interactions** for engaging user experiences

## Content Guidelines
- **Quality First**: All content must pass AI + human review for quality and accuracy
- **Source Authority**: Prioritize content from credible feminist scholars, organizations, and publications
- **Diversity**: Ensure content represents diverse feminist perspectives and voices
- **Compliance**: Strict adherence to content moderation and copyright policies

## Development Commands

*To be added when project structure is established. Will likely include:*
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Code linting
- `npm test` - Run tests

## Key Considerations

### Content Aggregation
- RSS feed integration for automatic content collection
- Quality scoring algorithm for content ranking
- Multi-language support (Chinese primary, English secondary)
- Real-time content monitoring and updates

### User Experience
- Fast loading with static generation
- Mobile-first responsive design
- Accessibility compliance
- Progressive Web App features

### Deployment Strategy
- Cost-optimized approach using free/low-cost services
- Cloudflare Pages for frontend hosting
- Supabase for backend services (early stage)
- GitHub-based content management system