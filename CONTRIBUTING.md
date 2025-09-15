# Contribution Guide | 贡献指南

Thank you for your interest in the FemRes project! We welcome all forms of contributions, whether you're a developer, designer, content editor, or feminist researcher.

感谢您对 FemRes 项目的关注！我们欢迎所有形式的贡献，无论您是开发者、设计师、内容编辑还是女性主义研究者。

## 🌟 Ways to Contribute | 贡献方式

### 1. Content Contribution | 内容贡献

#### Recommend Content | 推荐内容
- Send email to / 发送邮件至 submissions@femres.org
- Include the following / 包含以下信息：
  - Content title / 内容标题
  - Author information / 作者信息
  - Content summary / 内容简介
  - Related links / 相关链接
  - Reason for recommendation / 推荐理由
  - Topic category / 所属主题分类

#### Content Quality Standards | 内容质量标准
- **Authority | 权威性**: From credible scholars, institutions, or organizations / 来自可信的学者、机构或组织
- **Relevance | 相关性**: Related to feminism and gender equality / 与女性主义、性别平等主题相关
- **Diversity | 多样性**: Reflects different cultural backgrounds and perspectives / 体现不同文化背景和观点
- **Timeliness | 时效性**: Content has contemporary significance / 内容具有现实意义
- **Accessibility | 可访问性**: Content is easy to access and understand / 内容易于获取和理解

#### Bilingual Content | 双语内容
- **Creating English Versions | 创建英文版本**: Help translate Chinese content to English / 帮助将中文内容翻译成英文
- **File Naming | 文件命名**: Use `-en.md` suffix for English versions / 英文版本使用 `-en.md` 后缀
- **Content Structure | 内容结构**: Maintain same format and metadata as Chinese version / 保持与中文版本相同的格式和元数据

### 2. Code Contribution | 代码贡献

#### Development Environment Setup | 开发环境设置

1. Fork the project to your GitHub account / Fork 项目到您的 GitHub 账户
2. Clone project locally / 克隆项目到本地：
   ```bash
   git clone https://github.com/YOUR_USERNAME/femres.git
   cd femres/femres-app
   ```
3. Install dependencies / 安装依赖：
   ```bash
   npm install
   npm install -g wrangler  # For full backend features / 如需完整后端功能
   ```
4. Start development server / 启动开发服务器：
   ```bash
   # Basic development mode (static content) / 基础开发模式（静态内容）
   npm run dev

   # Full feature mode (requires Cloudflare setup) / 完整功能模式（需要 Cloudflare 设置）
   wrangler pages dev dist/ --d1=DB=your-db-name
   ```
5. To test full features (user auth, comments, etc.) / 如需测试完整功能（用户认证、评论系统等）：
   - Refer to `DEPLOYMENT.md` for Cloudflare D1 setup / 参考 `DEPLOYMENT.md` 设置 Cloudflare D1 数据库
   - Run `npm run build` to build project / 运行 `npm run build` 构建项目
   - Use wrangler local development environment / 使用 wrangler 本地开发环境

#### Code Standards | 代码规范

- **TypeScript**: Use TypeScript for development, ensure type safety / 使用 TypeScript 进行开发，确保类型安全
- **ESLint**: Follow project's ESLint configuration / 遵循项目的 ESLint 配置
- **Prettier**: Use Prettier for code formatting / 使用 Prettier 进行代码格式化
- **Naming Convention | 命名规范**: Use meaningful variable and function names / 使用有意义的变量和函数名
- **Comments | 注释**: Add necessary comments for complex logic / 为复杂逻辑添加必要的注释

#### 新架构特性

本项目现已升级为全栈应用，包含以下技术栈：

**前端技术**：
- Astro 5.13（SSR + Islands Architecture）
- React 18.3（动态组件）
- TypeScript + Tailwind CSS 4.1

**后端技术**：
- Cloudflare Workers（无服务器计算）
- Cloudflare D1（SQLite 边缘数据库）
- JWT 认证 + bcrypt 密码加密

**核心功能模块**：
- 用户认证系统（`src/pages/api/auth/`）
- 评论讨论系统（`src/pages/api/comments/`）
- 内容互动功能（`src/pages/api/interactions/`）
- 状态管理（`src/store/authStore.ts`）

**贡献时请注意**：
- API 开发：遵循 RESTful 设计原则
- 数据库操作：使用 `src/lib/database.ts` 中的工具函数
- 认证相关：确保 JWT 令牌验证和权限控制
- 前端状态：使用 Zustand store 管理用户状态
- React 组件：使用 TypeScript 接口定义 props

#### 提交规范

使用 Conventional Commits 格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型 (type)**:
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式化（不影响功能）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 其他修改

**示例**:
```
feat(search): add advanced search filters

- Add topic-based filtering
- Add date range selector
- Improve search result display

Closes #123
```

### 3. 设计贡献

#### UI/UX 改进
- 提供设计建议和原型
- 改进用户体验流程
- 优化响应式设计
- 提升无障碍访问性

#### 品牌设计
- Logo 和视觉标识设计
- 图标设计
- 插图和图形素材
- 品牌指南制定

### 4. Translation Contribution | 翻译贡献

We are working to make FemRes support more languages:

我们正在努力让 FemRes 支持更多语言：

- **English** - Complete bilingual support / 完整双语支持
- **简体中文 (Simplified Chinese)** - Native support / 原生支持
- **繁体中文 (Traditional Chinese)** - Welcome contributions / 欢迎贡献
- **Other languages** - Welcome contributions / 其他语言欢迎贡献

#### Current Bilingual Implementation | 当前双语实现

**Content Structure | 内容结构:**
- Chinese files: `filename.md` / 中文文件：`filename.md`
- English files: `filename-en.md` / 英文文件：`filename-en.md`
- All 164 content files have both versions / 所有164个内容文件都有中英文版本

**Page Structure | 页面结构:**
- Chinese pages: `/path/` / 中文页面：`/path/`
- English pages: `/en/path/` / 英文页面：`/en/path/`
- Privacy & Terms available in both languages / 隐私政策和使用条款双语支持

## 🚀 Development Workflow | 开发流程

### Branch Strategy | 分支策略

- `main`: Main branch with stable production code / 主分支，包含稳定的生产代码
- `develop`: Development branch with latest dev code / 开发分支，包含最新的开发代码
- `feature/*`: Feature branches for new features / 功能分支，用于开发新功能
- `fix/*`: Fix branches for bug fixes / 修复分支，用于修复bug
- `hotfix/*`: Hotfix branches for urgent fixes / 热修复分支，用于紧急修复

### Pull Request 流程

1. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **开发功能**
   - 编写代码
   - 添加测试（如适用）
   - 更新文档

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**
   - 在 GitHub 上创建 Pull Request
   - 填写详细的描述
   - 选择合适的标签
   - 请求代码审查

### Pull Request 模板

```markdown
## 📝 变更描述

简要描述此次变更的内容

## 🎯 变更类型

- [ ] 新功能 (feat)
- [ ] Bug修复 (fix)
- [ ] 文档更新 (docs)
- [ ] 样式调整 (style)
- [ ] 代码重构 (refactor)
- [ ] 测试相关 (test)
- [ ] 其他 (chore)

## 🔍 测试

描述如何测试这些变更

## 📷 截图

如果涉及UI变更，请提供截图

## ✅ 检查清单

- [ ] 代码遵循项目规范
- [ ] 已进行自测
- [ ] 已添加必要的文档
- [ ] 已考虑向后兼容性
```

## 🧪 测试指南

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行特定测试文件
npm run test -- ComponentName.test.ts

# 运行测试并监听变化
npm run test:watch
```

### 测试类型

- **单元测试**: 测试单个组件或函数
- **集成测试**: 测试组件间的交互
- **端到端测试**: 测试完整的用户流程

## 📋 Issue 模板

### Bug 报告

```markdown
## 🐛 Bug 描述

简要描述遇到的问题

## 🔄 重现步骤

1. 访问 '...'
2. 点击 '....'
3. 向下滚动到 '....'
4. 看到错误

## 🎯 预期行为

描述您期望发生的情况

## 🖼️ 截图

如果适用，添加截图来解释问题

## 🖥️ 环境信息

- 操作系统: [例如 iOS, Windows, macOS]
- 浏览器: [例如 Chrome, Safari]
- 版本: [例如 22]

## 📝 附加信息

添加任何其他关于问题的信息
```

### 功能请求

```markdown
## 🚀 功能描述

简要描述您想要的功能

## 🎯 问题描述

这个功能解决了什么问题？

## 💡 解决方案

描述您希望的解决方案

## 🔄 替代方案

描述您考虑过的任何替代解决方案

## 📝 附加信息

添加任何其他关于功能请求的信息
```

## 👥 社区指南

### 行为准则

请阅读我们的 [行为准则](CODE_OF_CONDUCT.md) 以了解社区期望。

### 沟通渠道

- **GitHub Issues**: 用于bug报告和功能请求
- **GitHub Discussions**: 用于一般讨论和问题
- **Email**: 
  - 一般咨询: info@femres.org
  - 技术问题: volunteer@femres.org

### 获得帮助

如果您需要帮助：

1. 查看现有的 Issues 和 Discussions
2. 搜索文档和 README
3. 创建新的 Discussion 或 Issue
4. 发送邮件至 volunteer@femres.org

## 🏆 贡献者认可

我们重视每一位贡献者的努力！

- 所有贡献者将在 README 中得到认可
- 重要贡献者将获得特殊徽章
- 定期贡献者可以申请成为项目维护者

## 📚 学习资源

### 技术学习

- [Astro 文档](https://docs.astro.build/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

### 女性主义资源

- 推荐阅读我们平台上的优质内容
- 关注相关学术期刊和研究
- 参与女性主义社区讨论

## ❓ 常见问题

### Q: 我不是程序员，可以贡献吗？
A: 当然可以！您可以推荐内容、改进文档、提供设计建议或帮助翻译。

### Q: 如何确保我的贡献被接受？
A: 请遵循贡献指南，与社区积极沟通，并确保您的贡献符合项目目标。

### Q: 可以添加新的内容类型吗？
A: 可以！请先创建 Issue 讨论新内容类型的必要性和实现方案。

### Q: 如何成为项目维护者？
A: 通过持续的高质量贡献和积极的社区参与，我们会邀请优秀的贡献者成为维护者。

---

感谢您为 FemRes 项目做出贡献！让我们一起为性别平等而努力！ 💪