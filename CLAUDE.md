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
- **Authentication**: JWT tokens + Web Crypto API password encryption (Cloudflare compatible)
- **Deployment**: Cloudflare Pages (global CDN)

### Key Features (Implemented)
- **User Authentication**: Complete registration, login, and session management
- **Simplified Login**: Email + password only (username removed from login form)
- **Username Editing**: Inline username editing in user profile with real-time API
- **Discussion System**: Real-time comments with nested replies and likes
- **Content Interaction**: Like and bookmark functionality with user-specific tracking
- **Real-time Like Counts**: API-driven like counts that update dynamically via `/api/likes/count`
- **Pagination System**: Server-side and client-side pagination for books (12/page) and articles (12/page)
- **Mixed Article Layout**: First 2 articles use ArticleCard, remainder use compact ArticleCard2
- **Hover Interactions**: Video play buttons and podcast audio waves show only on hover
- **Topic Collapse**: Automatic collapse for topic lists with > 20 items
- **Compact UI**: Login button uses icon-only design to save space
- **API Layer**: RESTful APIs for auth, comments, user interactions, and profile updates
- **Database**: Fully normalized schema with users, comments, likes, and interactions

## Project Structure (Current)
```
src/
├── components/           # Astro/React components
│   ├── ArticleCard.astro # Full-featured article display
│   ├── ArticleCard2.astro # Compact horizontal article layout
│   ├── BookCard.astro    # Book display with ratings
│   ├── VideoCard.astro   # Video display with hover play button
│   ├── PodcastCard.astro # Podcast display with hover audio waves
│   ├── FilmCard.astro    # Film display with ratings
│   ├── InteractionButtons.tsx # Like/bookmark functionality (React)
│   ├── SearchBox.tsx     # Search functionality (React island)
│   ├── UserContentList.tsx # User's liked/bookmarked content
│   └── Layout.astro      # Page layouts
├── pages/               # Route pages
│   ├── index.astro      # Homepage with featured content
│   ├── books/           # Books section
│   │   ├── index.astro  # Books listing with pagination (12/page)
│   │   └── [slug].astro # Individual book pages
│   ├── articles/        # Articles section
│   │   ├── index.astro  # Articles with mixed layout + pagination
│   │   └── [slug].astro # Individual article pages
│   ├── films/           # Films section
│   │   ├── index.astro  # Films listing with topic collapse
│   │   └── [slug].astro # Individual film pages
│   ├── podcasts/        # Podcasts section
│   │   ├── index.astro  # Podcasts listing
│   │   └── [slug].astro # Individual podcast pages
│   ├── videos/          # Videos section
│   │   ├── index.astro  # Videos listing
│   │   └── [slug].astro # Individual video pages
│   ├── search.astro     # Search page with filters
│   ├── topics/          # Topic-based browsing
│   ├── auth/            # Authentication pages
│   │   ├── login.astro  # Login page
│   │   └── register.astro # Registration page
│   └── api/             # API endpoints
│       ├── auth/        # Authentication APIs
│       │   ├── login.ts    # User login
│       │   ├── register.ts # User registration
│       │   ├── me.ts       # Get current user
│       │   └── update-username.ts # Update username
│       ├── comments/    # Comment system APIs
│       └── likes/       # Real-time like count APIs
├── content/             # Content collections (Markdown)
│   ├── books/           # Book analyses and reviews
│   ├── articles/        # Article content
│   ├── films/           # Film analyses (Barbie, Promising Young Woman)
│   ├── podcasts/        # Podcast content
│   └── videos/          # Video content
└── styles/              # Global styling files
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
- **Cloudflare Workers Compatibility**: Always use Web APIs instead of Node.js-specific libraries (e.g., Web Crypto API instead of bcryptjs)

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
- **CRITICAL: Factual Verification**: ALWAYS search and verify the existence of books, authors, and publications before creating content. Never create fictional books or authors. Use WebSearch to confirm:
  - Author existence and credentials
  - Book title accuracy and publication details
  - ISBN and publication information
  - Publisher and availability
  This prevents hallucination and ensures content authenticity.

### Book Content Writing Style Guidelines
**IMPORTANT: All book content must follow a narrative, essay-style format rather than slide-like bullet points.**

#### Writing Style Requirements:
- **Narrative Flow**: Use flowing, interconnected paragraphs that build upon each other naturally
- **Avoid List Format**: Minimize use of bullet points (•), numbered lists, and excessive subheadings (###)
- **Transitional Language**: Use sophisticated transitions like "尽管...但是", "从...角度来看", "更重要的是", "然而" to connect ideas
- **Literary Quality**: Employ rich, descriptive language with metaphors and imagery (e.g., "科幻文学的浩瀚星空中", "如同璀璨的恒星")
- **Deep Analysis**: Provide in-depth, nuanced analysis rather than superficial summaries
- **Academic Rigor**: Maintain scholarly depth while ensuring readability for general audiences

#### Structure Guidelines:
- **Opening**: Begin with compelling, contextual introduction that situates the work's importance
- **Body**: Organize content in flowing sections that naturally progress from biographical context to thematic analysis to contemporary relevance
- **Integration**: Weave together different analytical threads (theoretical, historical, cultural) within coherent paragraphs
- **Conclusion**: End with reflective synthesis that emphasizes lasting impact and significance

#### Language Characteristics:
- **Conversational Academic**: Balance scholarly rigor with engaging, accessible prose
- **Cultural Sensitivity**: Respect diverse feminist perspectives and cultural contexts
- **Depth over Breadth**: Prefer thorough exploration of key themes over superficial coverage of many topics
- **Concrete Examples**: Ground abstract concepts in specific textual examples and real-world applications

#### What to Avoid:
- Slide-deck style formatting with excessive headers and bullet points
- Dry, encyclopedia-like entries
- Repetitive structural patterns across different books
- Oversimplification of complex theoretical concepts

### Verified Content Added (with search confirmation):

#### Books:
- **Bloodchild** by Octavia Butler (1984) - Verified as Hugo and Nebula Award-winning short story, key work in feminist science fiction exploring gender roles, male pregnancy, and power dynamics. Part of "Bloodchild and Other Stories" collection.
- **Men Explain Things to Me** by Rebecca Solnit (2014) - Verified as influential essay collection that coined the term "mansplaining". Explores gender, power, and voice in contemporary society. Published by Haymarket Books, ISBN: 9781608464661.
- **The Female Eunuch** by Germaine Greer (1970) - Verified as groundbreaking Second Wave feminist text analyzing women's oppression in patriarchal society. Published by MacGibbon & Kee, remains influential in feminist theory. ISBN: 9780007205011.
- **Sister Outsider** by Audre Lorde (1984) - Verified as foundational text for intersectional feminist theory. Collection of 15 essays and speeches exploring race, gender, class, and sexuality intersections. Originally published by The Crossing Press. ISBN: 9781580911863.
- **The Politics of Reality** by Marilyn Frye (1983) - Verified as classic of radical feminist philosophy. Collection of 9 influential essays analyzing oppression, sexism, and feminist theory from philosophical perspective. Published by The Crossing Press. ISBN: 9780895940995.
- **Whipping Girl** by Julia Serano (2007) - Verified as foundational transgender feminist manifesto analyzing transphobia as rooted in sexism. Explores transmisogyny and critiques traditional feminist exclusion of trans women. Published by Seal Press. ISBN: 9781580056229.

#### Films:
- **Barbie (2023)** by Greta Gerwig - Verified as major commercial and cultural phenomenon exploring postmodern feminism, beauty standards, and patriarchal critique. Starred Margot Robbie and Ryan Gosling. IMDB: 6.8, Douban: 8.0. Topics: 后现代女性主义, 美丽标准批判, 父权制批判, 消费文化批判.
- **Promising Young Woman (2020)** by Emerald Fennell - Verified as Academy Award-winning (Best Original Screenplay) feminist thriller addressing rape culture and bystander responsibility. Starred Carey Mulligan. IMDB: 7.5, Douban: 7.7. Topics: 反性暴力, 强奸文化批判, 旁观者责任, MeToo运动.

## Development Commands

All commands are run from the `femres-app/` directory:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build production site to `./dist/`               |
| `npm run preview`         | Preview build locally before deploying          |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### Development Workflow Commands
- **Content Updates**: Add new `.md` files to respective `src/content/` folders
- **Component Updates**: Modify components in `src/components/`
- **API Development**: Add endpoints in `src/pages/api/`
- **Testing**: Manual testing via development server

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