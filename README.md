# FemRes - 女性主义内容聚合平台

<div align="center">
  <h1>🌸 FemRes</h1>
  <p>汇聚全球女性主义声音，推动性别平等事业发展</p>
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![Astro](https://img.shields.io/badge/Astro-5.13-orange.svg)](https://astro.build/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4.svg)](https://tailwindcss.com/)
</div>

## 📖 项目简介

FemRes 是一个开源的女性主义内容聚合平台，致力于汇聚全球优质女性主义内容，包括书籍、文章、视频、播客和学术论文。我们相信知识和信息的力量能够推动社会变革，通过智能化的内容筛选和分类，为关注性别平等的每一个人提供丰富的学习资源。

### ✨ 核心特色

- **🎯 智能内容聚合** - AI技术与人工审核相结合，筛选高质量内容
- **🏷️ 精准分类体系** - 8大核心主题，多维度标签系统
- **🌐 多元内容形式** - 涵盖书籍、文章、视频、播客、学术论文
- **📱 响应式设计** - 完美适配桌面端和移动端
- **🌙 深色模式支持** - 提供舒适的阅读体验
- **🚀 高性能** - 基于Astro的静态站点生成，加载速度极快

### 🎯 核心主题

- 💼 **职场平等** - 消除职场性别歧视，推动同工同酬
- 🌸 **身体自主** - 维护女性对自己身体的决定权
- 📚 **教育权利** - 确保所有性别平等接受教育的机会
- 🗳️ **政治参与** - 提高女性在政治决策中的代表性
- 👨‍👩‍👧‍👦 **家庭角色** - 重新定义家庭责任分配
- 🛡️ **性别暴力** - 关注并制止各种形式的性别暴力
- 📺 **媒体表征** - 批判媒体中的性别刻板印象
- 👩‍🎓 **历史人物** - 重新发现历史上的杰出女性

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/kantegger/femres.git
   cd femres
   ```

2. **安装依赖**
   ```bash
   cd femhub-app
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   
   打开浏览器访问 `http://localhost:4321`

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🏗️ 技术架构

### 前端技术栈

- **[Astro 5.13](https://astro.build/)** - 现代静态站点生成器
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的CSS框架
- **[React](https://reactjs.org/)** - 动态组件（Islands Architecture）

### 项目结构

```
femhub-app/
├── src/
│   ├── components/          # 组件库
│   │   ├── Header.astro     # 页面头部
│   │   ├── Footer.astro     # 页面底部
│   │   └── ContentCard.astro # 内容卡片
│   ├── layouts/             # 布局模板
│   │   └── Layout.astro     # 基础布局
│   ├── pages/               # 页面路由
│   │   ├── index.astro      # 首页
│   │   ├── about.astro      # 关于页面
│   │   ├── contact.astro    # 联系页面
│   │   ├── books/           # 书籍页面
│   │   ├── articles/        # 文章页面
│   │   ├── videos/          # 视频页面
│   │   ├── podcasts/        # 播客页面
│   │   └── papers/          # 论文页面
│   ├── content/             # 内容集合
│   │   ├── books/           # 书籍数据
│   │   ├── articles/        # 文章数据
│   │   └── ...              # 其他内容类型
│   └── styles/              # 样式文件
├── public/                  # 静态资源
└── astro.config.mjs         # Astro配置
```

## 🤝 如何贡献

我们欢迎所有形式的贡献！无论你是开发者、设计师、内容编辑还是女性主义研究者，都可以为这个项目贡献力量。

### 贡献方式

1. **内容贡献** - 推荐优质女性主义内容
2. **代码贡献** - 修复bug、添加新功能
3. **设计贡献** - 改进用户界面和用户体验
4. **文档贡献** - 完善项目文档
5. **翻译贡献** - 帮助项目国际化

### 贡献流程

1. Fork 这个项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

详细的贡献指南请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📧 联系我们

- **通用咨询**: info@femres.org
- **内容投稿**: submissions@femres.org
- **合作事宜**: partnership@femres.org
- **志愿者申请**: volunteer@femres.org
- **项目网站**: [femres.org](https://femres.org)

## 📄 开源协议

本项目基于 [MIT 协议](LICENSE) 开源，这意味着你可以自由地使用、修改和分发这个项目。

## 🙏 致谢

感谢所有为性别平等事业做出贡献的人们，特别是：

- 所有贡献内容和代码的志愿者
- 女性主义学者和活动家们
- 开源社区的支持
- 所有使用和推广这个平台的用户

## 🌟 支持项目

如果这个项目对你有帮助，请给我们一个 ⭐️！

你也可以通过以下方式支持我们：

- 🐦 关注我们的 [Twitter](https://twitter.com/femres)
- 📧 订阅我们的邮件列表
- 📢 向朋友推荐这个平台
- 💡 提出改进建议
- 🤝 成为项目贡献者

---

<div align="center">
  <strong>让我们一起为性别平等而努力 💪</strong>
</div>