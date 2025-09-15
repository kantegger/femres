# FemRes - Feminist Content Aggregation Platform | 女性主义内容聚合平台

<div align="center">
  <h1>🌸 FemRes</h1>
  <p>
    <strong>EN:</strong> Gathering Global Feminist Voices, Advancing Gender Equality<br>
    <strong>中文:</strong> 汇聚全球女性主义声音，推动性别平等事业发展
  </p>
  <p><strong>🌍 Visit | 访问网站：<a href="https://femres.org">femres.org</a></strong></p>
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![Astro](https://img.shields.io/badge/Astro-5.13-orange.svg)](https://astro.build/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4.svg)](https://tailwindcss.com/)
  [![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020.svg)](https://pages.cloudflare.com/)
  [![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
</div>

## 📖 Project Introduction | 项目简介

**[English](#english) | [中文](#chinese)**

<div id="english">

### English

FemRes is an open-source feminist content aggregation platform dedicated to gathering high-quality feminist content globally, including books, articles, videos, podcasts, and academic papers. Now upgraded to a **complete full-stack application** with user authentication, real-time comments, and community interaction features.

</div>

<div id="chinese">

### 中文

FemRes 是一个开源的女性主义内容聚合平台，致力于汇聚全球优质女性主义内容，包括书籍、文章、视频、播客和学术论文。现已升级为**完整的全栈应用**，支持用户认证、实时评论和社区互动功能。

</div>

### ✨ Core Features | 核心特色

- **🎯 Smart Content Aggregation | 智能内容聚合** - AI + Manual Review / AI技术与人工审核相结合
- **🌍 Bilingual Support | 双语支持** - Full English & Chinese Content / 完整的中英文内容支持
- **🏷️ Precise Classification | 精准分类体系** - 8 Core Topics / 8大核心主题，多维度标签系统
- **🌐 Diverse Content | 多元内容形式** - Books, Articles, Videos, Podcasts, Films / 书籍、文章、视频、播客、电影
- **👤 User System | 用户系统** - Complete Authentication / 完整的注册、登录、个人资料功能
- **💬 Real-time Comments | 实时评论** - Multi-layer Discussion / 支持多层回复和点赞的讨论系统
- **⭐ Content Interaction | 内容互动** - Real-time Likes & Bookmarks / 实时点赞计数、收藏、书签
- **📄 Smart Pagination | 智能分页** - Optimized Browsing (12/page) / 优化的分页浏览（12项/页）
- **🎬 Mixed Layout | 混合布局** - Enhanced Reading Experience / 混合卡片布局，提升阅读体验
- **🎭 Hover Interactions | 悬浮交互** - Contextual UI Elements / 视频播放按钮、播客音频波形等仅悬浮时显示
- **📱 Responsive Design | 响应式设计** - Desktop & Mobile / 完美适配桌面端和移动端
- **🌙 Dark Mode | 深色模式** - Comfortable Reading / 提供舒适的阅读体验
- **⚡ High Performance | 高性能部署** - Cloudflare Pages + D1 Database / 基于 Cloudflare 的全栈架构

### 🎯 Core Topics | 核心主题

- 💼 **Workplace Equality | 职场平等** - Eliminating gender discrimination / 消除职场性别歧视
- 🌸 **Bodily Autonomy | 身体自主** - Women's right to choose / 维护女性对自己身体的决定权
- 📚 **Education Rights | 教育权利** - Equal access to education / 确保所有性别平等接受教育
- 🗳️ **Political Participation | 政治参与** - Women's representation / 提高女性在政治决策中的代表性
- 👨‍👩‍👧‍👦 **Family Roles | 家庭角色** - Redefining responsibilities / 重新定义家庭责任分配
- 🛡️ **Gender Violence | 性别暴力** - Addressing all forms / 关注并制止各种形式的性别暴力
- 📺 **Media Representation | 媒体表征** - Critiquing stereotypes / 批判媒体中的性别刻板印象
- 👩‍🎓 **Historical Figures | 历史人物** - Rediscovering women / 重新发现历史上的杰出女性

## 🚀 Quick Start | 快速开始

### Prerequisites | 前置要求

- Node.js 18+
- npm or yarn / npm 或 yarn
- Cloudflare account (for full deployment) / Cloudflare 账户（用于完整部署）

### Local Development | 本地开发

1. **Clone Project | 克隆项目**
   ```bash
   git clone https://github.com/kantegger/femres.git
   cd femres/femres-app
   ```

2. **Install Dependencies | 安装依赖**
   ```bash
   npm install
   npm install -g wrangler  # For Cloudflare development / 用于 Cloudflare 开发
   ```

3. **Start Development Server | 启动开发服务器**
   ```bash
   # Basic development mode (no backend) / 基础开发模式（无后端功能）
   npm run dev

   # Or use Cloudflare local environment (full features) / 或使用 Cloudflare 本地环境（完整功能）
   npm run build  # Build first / 先构建
   wrangler pages dev dist/ --d1=DB=your-db-name --compatibility-date=2025-09-11 --compatibility-flag=nodejs_compat
   ```

4. **Access Application | 访问应用**

   Open browser and visit / 打开浏览器访问 `http://localhost:4321` or / 或 `http://localhost:8788`

### 🌐 完整部署

如需部署带有用户认证、评论系统等完整功能的版本，请参考 [femres-app/DEPLOYMENT.md](femres-app/DEPLOYMENT.md) 获取详细的 Cloudflare Pages + D1 数据库部署指南。

**主要部署步骤：**
1. 创建 Cloudflare D1 数据库
2. 配置环境变量和数据库连接
3. 初始化数据库 schema
4. 部署到 Cloudflare Pages

## 🆕 最新功能

### 📖 内容更新
- **电影分析新增**：《芭比》(2023) - 后现代女性主义分析
- **电影分析新增**：《前程似锦的女孩》(2020) - 反强奸文化批判

### ⚡ 功能优化
- **简化登录流程**：移除用户名输入，登录只需邮箱和密码
- **实时用户名编辑**：个人中心支持点击即编辑用户名，支持 Enter 确认、Escape 取消
- **实时点赞计数**：通过 `/api/likes/count` API 实现动态点赞数显示
- **智能分页系统**：书籍和文章页面支持12项/页的优化分页
- **混合卡片布局**：文章页面前2项使用完整卡片，其余使用紧凑卡片
- **悬浮式交互**：视频播放按钮和播客音频波形仅在鼠标悬浮时显示
- **主题自动折叠**：电影页面等超过20个主题标签时自动折叠

### 🎨 界面改进
- **紧凑登录按钮**：登录按钮改为纯图标设计，节省导航栏空间
- **去除干扰元素**：移除文章卡片的"最新"闪烁标识
- **优化视觉层次**：视频缩略图播放按钮弱化处理，不遮挡关键内容
- **即时编辑体验**：用户名编辑采用内联方式，无需跳转页面
- **响应式优化**：所有新组件完美适配移动端和桌面端

## 🏗️ 技术架构

### 前端技术栈

- **[Astro 5.13](https://astro.build/)** - 现代全栈框架，SSR + Islands Architecture
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的JavaScript
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - 实用优先的CSS框架
- **[React 18.3](https://reactjs.org/)** - 动态组件和状态管理

### 后端与部署

- **[Cloudflare Pages](https://pages.cloudflare.com/)** - 全栈部署平台
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)** - SQLite 边缘数据库
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - 无服务器计算环境

### 核心功能

- **用户认证系统** - JWT 令牌 + Web Crypto API 密码加密（Cloudflare 兼容）
- **简化登录流程** - 邮箱+密码登录，移除用户名输入
- **实时用户名编辑** - 个人中心内联编辑用户名功能
- **实时互动系统** - 支持多层回复和实时点赞计数 API
- **智能分页系统** - 服务端与客户端混合分页（12项/页）
- **混合卡片布局** - 文章页首2项使用完整卡片，其余使用紧凑卡片
- **悬浮式交互** - 视频播放按钮和播客音波仅在悬浮时显示
- **主题自动折叠** - 超过20个主题时自动折叠显示
- **紧凑UI设计** - 登录按钮采用纯图标设计节省空间
- **状态管理** - Zustand + 本地存储持久化
- **内容管理** - Astro Content Collections
- **API 架构** - RESTful API 设计

### 项目结构

```
femres-app/
├── src/
│   ├── components/          # 组件库
│   │   ├── Layout.astro     # 基础布局
│   │   ├── Header.astro     # 页面头部
│   │   ├── Footer.astro     # 页面底部
│   │   ├── Discussion.tsx   # 评论系统 (React)
│   │   ├── UserMenu.tsx     # 用户菜单 (React)
│   │   ├── InteractionButtons.tsx # 点赞收藏按钮 (React)
│   │   ├── ArticleCard.astro # 完整文章卡片
│   │   ├── ArticleCard2.astro # 紧凑文章卡片
│   │   └── *Card.astro      # 其他内容卡片组件
│   ├── pages/               # 页面路由和 API
│   │   ├── index.astro      # 首页
│   │   ├── api/             # API 端点
│   │   │   ├── auth/        # 认证 API
│   │   │   │   ├── login.ts    # 用户登录（邮箱+密码）
│   │   │   │   ├── register.ts # 用户注册
│   │   │   │   ├── me.ts       # 获取当前用户
│   │   │   │   └── update-username.ts # 更新用户名
│   │   │   ├── comments/    # 评论 API
│   │   │   ├── likes/       # 实时点赞计数 API
│   │   │   └── interactions/ # 互动 API
│   │   ├── books/           # 书籍页面（含分页）
│   │   ├── articles/        # 文章页面（混合布局+分页）
│   │   ├── films/           # 电影页面（含主题折叠）
│   │   ├── videos/          # 视频页面
│   │   ├── podcasts/        # 播客页面
│   │   ├── papers/          # 论文页面
│   │   └── profile/         # 用户资料页面
│   ├── content/             # 内容集合 (Markdown)
│   │   ├── books/           # 书籍数据
│   │   ├── articles/        # 文章数据
│   │   ├── films/           # 电影数据（含《芭比》《前程似锦的女孩》）
│   │   ├── videos/          # 视频数据
│   │   ├── podcasts/        # 播客数据
│   │   └── papers/          # 论文数据
│   ├── lib/                 # 工具库
│   │   ├── database.ts      # 数据库操作
│   │   └── auth.ts          # 认证工具
│   ├── store/               # 状态管理
│   │   └── authStore.ts     # 用户状态 (Zustand)
│   └── styles/              # 样式文件
├── public/                  # 静态资源
├── schema.sql               # 数据库 Schema
├── wrangler.toml            # Cloudflare 配置
├── DEPLOYMENT.md            # 部署指南
└── astro.config.mjs         # Astro 配置
```

## 🤝 How to Contribute | 如何贡献

We welcome all forms of contributions! Whether you're a developer, designer, content editor, or feminist researcher, you can contribute to this project.

我们欢迎所有形式的贡献！无论你是开发者、设计师、内容编辑还是女性主义研究者，都可以为这个项目贡献力量。

### Ways to Contribute | 贡献方式

1. **Content Contribution | 内容贡献** - Recommend quality feminist content / 推荐优质女性主义内容
2. **Code Contribution | 代码贡献** - Fix bugs, add new features / 修复bug、添加新功能
3. **Design Contribution | 设计贡献** - Improve UI/UX / 改进用户界面和用户体验
4. **Documentation | 文档贡献** - Improve project docs / 完善项目文档
5. **Translation | 翻译贡献** - Help with internationalization / 帮助项目国际化
6. **Bilingual Content | 双语内容** - Create English versions of Chinese content / 创建中文内容的英文版本

### Contribution Process | 贡献流程

1. Fork this project / Fork 这个项目
2. Create your feature branch / 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. Commit your changes / 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch / 推送到分支 (`git push origin feature/AmazingFeature`)
5. Create a Pull Request / 创建一个 Pull Request

For detailed contribution guidelines, see / 详细的贡献指南请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📧 Contact Us | 联系我们

- **General Inquiries | 通用咨询**: info@femres.org
- **Content Submissions | 内容投稿**: submissions@femres.org
- **Partnerships | 合作事宜**: partnership@femres.org
- **Volunteer Applications | 志愿者申请**: volunteer@femres.org
- **Project Website | 项目网站**: [femres.org](https://femres.org)

## 📄 License | 开源协议

This project is open source under the [MIT License](LICENSE), which means you can freely use, modify, and distribute this project.

本项目基于 [MIT 协议](LICENSE) 开源，这意味着你可以自由地使用、修改和分发这个项目。

## 🙏 Acknowledgments | 致谢

Thanks to everyone contributing to gender equality, especially:

感谢所有为性别平等事业做出贡献的人们，特别是：

- All volunteers contributing content and code / 所有贡献内容和代码的志愿者
- Feminist scholars and activists / 女性主义学者和活动家们
- Open source community support / 开源社区的支持
- All users and promoters of this platform / 所有使用和推广这个平台的用户

## 🌟 Support the Project | 支持项目

If this project helps you, please give us a ⭐️!

如果这个项目对你有帮助，请给我们一个 ⭐️！

You can also support us by / 你也可以通过以下方式支持我们：

- 🐦 Follow us on / 关注我们的 [Twitter](https://x.com/FeministR32240)
- 📧 Subscribe to our mailing list / 订阅我们的邮件列表
- 📢 Recommend this platform to friends / 向朋友推荐这个平台
- 💡 Suggest improvements / 提出改进建议
- 🤝 Become a contributor / 成为项目贡献者

---

<div align="center">
  <strong>Together for Gender Equality | 让我们一起为性别平等而努力 💪</strong>
</div>