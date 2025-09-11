# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FemRes** is a feminist content aggregation platform that provides high-quality, diverse feminist-related content through AI-driven curation and community collaboration. **Now upgraded to a full-stack application** with user authentication, real-time comments, and community interaction features.

**Core Features:**
- Content aggregation (books, articles, videos, podcasts, papers)
- **Complete user authentication system** (register, login, profiles)
- **Real-time discussion and comments** (with replies and likes)
- **Content interaction features** (likes, bookmarks, personal collections)
- Intelligent personalized recommendations
- Advanced search and filtering
- Multi-topic categorization system

## Technical Architecture

### Frontend Stack
- **Framework**: Astro 5.13 + TypeScript
- **Architecture**: Server-Side Rendering (SSR) with Islands Architecture
- **Interactive Components**: React 18.3 (for dynamic features)
- **Styling**: Tailwind CSS 4.1
- **State Management**: Zustand with localStorage persistence
- **Features**: PWA support, responsive design, dark mode

### Backend Stack
- **Runtime**: Cloudflare Workers (serverless)
- **Architecture**: Full-stack with edge computing
- **Database**: Cloudflare D1 (SQLite at the edge)
- **Authentication**: JWT tokens + bcrypt password encryption
- **Deployment**: Cloudflare Pages (global CDN)

### Key Features (Implemented)
- **User Authentication**: Complete registration, login, and session management
- **Discussion System**: Real-time comments with nested replies and likes
- **Content Interaction**: Like and bookmark functionality with user-specific tracking
- **API Layer**: RESTful APIs for auth, comments, and user interactions
- **Database**: Fully normalized schema with users, comments, likes, and interactions

## Project Structure (Current)
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

## Feminist Theme Categories

### 一、理论流派 (Theoretical Schools)
- **交叉女性主义** (Intersectional Feminism)
- **马克思主义女性主义** (Marxist Feminism)
- **去殖民女性主义** (Decolonial Feminism)
- **存在主义女性主义** (Existentialist Feminism)
- **自由主义女性主义** (Liberal Feminism)
- **激进女性主义** (Radical Feminism)
- **黑人女性主义** (Black Feminism)
- **原住民女性主义** (Indigenous Feminism)
- **跨性别女性主义** (Trans Feminism)
- **生态女性主义** (Ecofeminism)
- **后现代女性主义** (Postmodern Feminism)

### 二、运动议题 (Movement Issues)
- **职场平等** (Workplace Equality)
- **同工同酬** (Equal Pay)
- **玻璃天花板** (Glass Ceiling)
- **生育自主** (Reproductive Autonomy)
- **堕胎权** (Abortion Rights)
- **反性暴力** (Anti-Sexual Violence)
- **政治参与** (Political Participation)
- **法律平等** (Legal Equality)
- **经济赋权** (Economic Empowerment)
- **教育平等** (Education Equality)
- **家庭解放** (Family Liberation)
- **体育平等** (Sports Equality)
- **身体自主** (Bodily Autonomy)
- **数字女性主义** (Digital Feminism)
- **气候正义** (Climate Justice)

### 三、批判领域 (Critical Domains)
- **父权制批判** (Patriarchy Critique)
- **资本主义批判** (Capitalism Critique)
- **媒体表征批判** (Media Representation Critique)
- **宗教父权批判** (Religious Patriarchy Critique)
- **男权运动批判** (Men's Rights Movement Critique)
- **文化批判** (Cultural Critique)
- **反女性主义研究** (Anti-Feminism Studies)
- **学术父权批判** (Academic Patriarchy Critique)
- **语言性别歧视** (Linguistic Sexism)
- **翻译政治** (Politics of Translation)
- **知识殖民批判** (Epistemic Colonialism Critique)

### 四、历史脉络 (Historical Context)
- **第一波女性主义** (First Wave Feminism)
- **第二波女性主义** (Second Wave Feminism)
- **第三波女性主义** (Third Wave Feminism)
- **第四波女性主义** (Fourth Wave Feminism)
- **MeToo运动** (MeToo Movement)
- **中国女权运动** (Chinese Feminist Movement)
- **流行文化女性主义** (Pop Culture Feminism)
- **基督教女性主义** (Christian Feminism)
- **灵性女性主义** (Spiritual Feminism)

### 五、文学与创作 (Literature and Creation)
- **女性文学** (Women's Literature)
- **女性写作** (Women's Writing)
- **女性文学批评** (Feminist Literary Criticism)
- **翻译女性主义** (Feminist Translation Studies)
- **女性叙事学** (Feminist Narratology)

### 六、特殊概念 (Special Concepts)
- **情绪劳动** (Emotional Labor)
- **关怀伦理** (Ethics of Care)
- **女性主义心理学** (Feminist Psychology)
- **女性主义艺术** (Feminist Art)
- **种族与性别** (Race and Gender)

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