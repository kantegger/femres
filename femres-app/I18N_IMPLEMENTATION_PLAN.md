# FemRes 国际化实施计划

## 📋 项目背景

FemRes是一个基于Astro 5.13 + TypeScript + React 18.3构建的女性主义内容聚合平台，部署在Cloudflare Pages上。当前界面完全为中文，需要添加多语支持（重点支持中文和英文）。

### 技术栈
- **前端**: Astro 5.13 + TypeScript + React 18.3
- **部署**: Cloudflare Pages (SSR模式)
- **内容管理**: Astro Content Collections (Markdown)
- **样式**: Tailwind CSS 4.1
- **状态管理**: Zustand

### 现状分析
- ✅ 内容collections已有language字段（标记内容本身语言，如英文书籍标记为"en"）
- ❌ 界面UI完全硬编码为中文
- ❌ 无i18n配置和翻译基础设施
- ❌ 无语言切换功能

---

## 🎯 实施目标

### 主要目标
1. **界面多语化**: 支持中文(默认)和英文界面
2. **URL本地化**: 支持 `/books` (中文) 和 `/en/books` (英文) 路由结构
3. **用户体验**: 流畅的语言切换，保持用户偏好
4. **SEO优化**: 多语SEO支持，hreflang等

### 非目标
- 内容翻译（内容language字段仅作为普通属性显示）
- 复杂的内容语言筛选逻辑
- 自动内容翻译功能

---

## 📅 分阶段实施计划

### Phase 1: 基础架构搭建 (估时：1-2天)

#### 1.1 Astro i18n配置
**文件**: `astro.config.mjs`
```typescript
export default defineConfig({
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN", "en"],
    routing: {
      prefixDefaultLocale: false,  // 中文无前缀: /books
      fallbackType: "redirect"     // 英文有前缀: /en/books
    }
  }
});
```

#### 1.2 创建i18n基础结构
```
src/i18n/
├── index.ts              # 工具函数和配置
├── locales/
│   ├── zh-CN.json       # 中文翻译
│   └── en.json          # 英文翻译
└── types.ts             # TypeScript类型定义
```

#### 1.3 核心工具函数
**文件**: `src/i18n/index.ts`
```typescript
export function getLocaleFromUrl(url: URL): string
export function t(locale: string, key: string, params?: Record<string, any>): string
export const defaultLocale = 'zh-CN'
export const locales = ['zh-CN', 'en']
export const localeNames = {
  'zh-CN': '中文',
  'en': 'English'
}
```

#### 1.4 翻译文件结构设计
**文件**: `src/i18n/locales/zh-CN.json`
```json
{
  "nav": {
    "home": "首页",
    "content": "内容",
    "books": "书籍",
    "articles": "文章",
    "films": "电影",
    "videos": "视频",
    "podcasts": "播客",
    "papers": "论文",
    "topics": "主题",
    "search": "搜索",
    "contribute": "贡献"
  },
  "common": {
    "readMore": "阅读更多",
    "viewAll": "查看全部",
    "loading": "加载中...",
    "language": "语言",
    "publishDate": "发布时间",
    "author": "作者",
    "director": "导演",
    "duration": "时长",
    "pages": "页码"
  },
  "homepage": {
    "hero": {
      "badge": "汇聚全球优质女性主义内容",
      "title": "发现",
      "titleHighlight": "女性主义",
      "titleEnd": "的力量",
      "subtitle": "探索书籍、文章、视频、播客和学术论文<br/>深入了解性别平等的理论与实践，推动社会进步",
      "startExploring": "开始探索",
      "learnMore": "了解项目"
    },
    "features": {
      "richContent": {
        "title": "丰富内容",
        "description": "涵盖书籍、文章、视频等多种优质内容"
      },
      "smartCategories": {
        "title": "智能分类",
        "description": "按主题和类型精准分类，快速找到所需内容"
      },
      "globalPerspective": {
        "title": "全球视角",
        "description": "汇聚全球女性主义学者和活动家的观点"
      }
    },
    "sections": {
      "featured": "精选内容",
      "latestBooks": "最新收录书籍",
      "latestFilms": "最新收录电影",
      "latestArticles": "最新收录文章",
      "latestVideos": "最新收录视频",
      "latestPodcasts": "最新收录播客",
      "latestPapers": "最新收录论文",
      "popularTopics": "热门主题"
    },
    "cta": {
      "title": "一起推动性别平等事业",
      "description": "加入我们的社区，分享你的见解，发现更多优质内容",
      "contribute": "贡献内容",
      "aboutUs": "了解更多"
    }
  }
}
```

**验收标准**:
- [ ] npm run dev正常启动
- [ ] 无TypeScript错误
- [ ] i18n工具函数可正常调用

---

### Phase 2: 核心组件改造 (估时：2-3天)

#### 2.1 Layout.astro改造
**目标**: 支持多语言布局和meta信息
- [ ] 动态设置 `<html lang={locale}>`
- [ ] meta description多语化
- [ ] 传递locale参数给子组件
- [ ] 添加hreflang链接标签

**关键修改**:
```astro
---
const locale = getLocaleFromUrl(Astro.url);
const t = translations[locale];
---
<html lang={locale}>
  <meta name="description" content={description || t.common.siteDescription} />
```

#### 2.2 Header.astro改造
**目标**: 导航菜单完全国际化
- [ ] 所有导航文本使用翻译函数
- [ ] dropdown菜单内容国际化
- [ ] mobile菜单文本国际化
- [ ] aria-label属性国际化

**关键修改点**:
```astro
<a href="/">{t('nav.home')}</a>
<button aria-label={t('common.toggleTheme')}>
```

#### 2.3 语言切换器组件
**文件**: `src/components/LanguageSwitcher.tsx`

**功能要求**:
- [ ] 显示当前语言
- [ ] 切换到其他语言时保持当前页面路径
- [ ] 优雅的dropdown UI
- [ ] 移动端适配

**路径映射逻辑**:
```typescript
// /books -> /en/books
// /en/books -> /books
// /articles/feminist-theory -> /en/articles/feminist-theory
```

#### 2.4 Footer.astro改造
**目标**: 页脚信息国际化
- [ ] 版权声明
- [ ] 链接文本
- [ ] 联系信息

**验收标准**:
- [ ] 所有页面header/footer正常显示
- [ ] 语言切换器工作正常
- [ ] 移动端菜单正常

---

### Phase 3: 内容组件改造 (估时：2-3天)

#### 3.1 Card组件改造优先级
1. **BookCard.astro** (首页使用，最重要)
2. **ArticleCard.astro** (首页使用)
3. **FilmCard.astro** (首页使用)
4. **VideoCard.astro** (首页使用)
5. **PodcastCard.astro** (首页使用)
6. **PaperCard.astro** (首页使用)

#### 3.2 每个Card组件统一改造内容
**通用翻译点**:
- [ ] "阅读更多" → `{t('common.readMore')}`
- [ ] 日期格式化 → locale感知格式化
- [ ] "语言: {language}" → `{t('common.language')}: {language}`
- [ ] 作者、时长等label → 使用翻译

**日期格式化示例**:
```typescript
const formatDate = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale === 'zh-CN' ? 'zh-CN' : 'en-US').format(date);
}
```

#### 3.3 通用组件改造
**Pagination.astro**:
- [ ] "上一页"、"下一页"
- [ ] "第 X 页，共 Y 页"

**TopicBreadcrumb.astro**:
- [ ] 面包屑分隔符和导航文本

**TopicFilter.astro**:
- [ ] 筛选器标签和操作文本

**验收标准**:
- [ ] 所有内容卡片显示正常
- [ ] 文本全部国际化，无遗漏中文
- [ ] 日期和数字格式符合语言习惯

---

### Phase 4: 页面改造 (估时：3-4天)

#### 4.1 路由结构调整
**目标结构**:
```
中文(默认): /books, /articles, /films 等
英文: /en/books, /en/articles, /en/films 等
```

**需要调整的页面**:
- [ ] `src/pages/index.astro`
- [ ] `src/pages/books/index.astro`
- [ ] `src/pages/articles/index.astro`
- [ ] `src/pages/films/index.astro`
- [ ] `src/pages/videos/index.astro`
- [ ] `src/pages/podcasts/index.astro`
- [ ] `src/pages/papers/index.astro`
- [ ] `src/pages/search.astro`
- [ ] `src/pages/topics/index.astro`
- [ ] `src/pages/about.astro`
- [ ] `src/pages/contribute.astro`
- [ ] `src/pages/contact.astro`

#### 4.2 页面改造重点

**4.2.1 首页 (index.astro) - 最关键**
- [ ] Hero section完整文案国际化
- [ ] "精选内容"、"最新收录XX" 等section标题
- [ ] 特性介绍(丰富内容、智能分类、全球视角)
- [ ] 热门主题section
- [ ] CTA区域文案

**4.2.2 列表页模板 (books/index.astro等)**
- [ ] 页面标题和meta
- [ ] 筛选器和排序选项
- [ ] 分页文本
- [ ] 空状态提示文案

**4.2.3 详情页模板 ([...slug].astro)**
- [ ] 面包屑导航
- [ ] 内容meta信息显示
- [ ] 分享和交互按钮
- [ ] 相关推荐section标题

**4.2.4 特殊页面**
- [ ] 搜索页: 搜索提示、筛选器、结果文案
- [ ] 关于页: 项目介绍文案
- [ ] 贡献页: 参与指南文案

#### 4.3 内部链接更新
**重要**: 所有站内链接需要locale感知
```astro
<!-- 错误 -->
<a href="/books">书籍</a>

<!-- 正确 -->
<a href={`${locale === 'zh-CN' ? '' : '/' + locale}/books`}>{t('nav.books')}</a>
```

**验收标准**:
- [ ] 所有页面可通过两种语言访问
- [ ] 页面标题、内容完全国际化
- [ ] 内部链接跳转正确
- [ ] 搜索和筛选功能正常

---

### Phase 5: 测试和优化 (估时：1-2天)

#### 5.1 功能验证清单
- [ ] **语言切换**: 每个页面的语言切换器都正常工作
- [ ] **URL路由**: 中英文路由互相切换正确
- [ ] **浏览器语言检测**: 首次访问根据Accept-Language重定向
- [ ] **链接完整性**: 所有站内链接在两种语言下都可访问
- [ ] **表单功能**: 搜索、登录等表单在两种语言下正常
- [ ] **404处理**: 不存在页面显示正确的404页面

#### 5.2 内容完整性检查
- [ ] **遗漏检查**: 使用工具扫描代码中残留的硬编码中文
- [ ] **翻译质量**: 英文翻译准确性和一致性
- [ ] **格式正确**: 日期、数字格式符合语言习惯
- [ ] **特殊字符**: emoji、标点符号显示正常

#### 5.3 SEO优化
- [ ] **hreflang标签**: 每个页面正确设置语言版本链接
- [ ] **sitemap更新**: 生成包含多语言URL的sitemap
- [ ] **robots.txt**: 确保搜索引擎可以抓取两种语言
- [ ] **meta标签**: title和description针对不同语言优化

#### 5.4 性能检查
- [ ] **构建时间**: 对比添加i18n前后的构建时间变化
- [ ] **包大小**: 检查翻译文件对bundle size的影响
- [ ] **加载速度**: 两种语言页面的加载性能对比
- [ ] **Lighthouse评分**: 确保SEO和性能评分不下降

#### 5.5 用户体验测试
- [ ] **移动端**: 两种语言在移动设备上的显示效果
- [ ] **切换流畅性**: 语言切换的响应速度和视觉效果
- [ ] **状态保持**: 用户操作状态在语言切换后是否保持
- [ ] **无障碍性**: screen reader等辅助工具的支持

---

## ⚠️ 风险控制与应急预案

### 关键风险点

#### **高风险**
1. **构建系统故障**: Astro i18n配置导致构建失败
2. **路由冲突**: 新的locale路由与现有API路由冲突
3. **Cloudflare部署问题**: SSR模式下语言检测失效
4. **用户状态丢失**: 语言切换导致登录状态或购物车清空

#### **中风险**
1. **SEO影响**: URL结构变更影响搜索引擎收录
2. **第三方集成**: 评论系统、分析工具在多语环境下异常
3. **缓存问题**: CDN缓存导致语言版本混乱
4. **字体显示**: 英文字体在某些组件中显示异常

### 阶段验收标准

#### **Phase 1完成标准**
- [ ] `npm run dev` 无错误启动
- [ ] 翻译函数调用正常，返回正确字符串
- [ ] TypeScript类型检查通过
- [ ] 基础路由 `/` 和 `/en` 可访问

#### **Phase 2完成标准**
- [ ] Header和Footer在两种语言下正常显示
- [ ] 语言切换器基本功能正常
- [ ] 移动端菜单无UI错乱
- [ ] 主题切换等其他功能不受影响

#### **Phase 3完成标准**
- [ ] 所有内容卡片在两种语言下显示正常
- [ ] 日期和数字格式正确
- [ ] 分页和筛选组件功能正常
- [ ] 无硬编码中文文本

#### **Phase 4完成标准**
- [ ] 所有主要页面两种语言版本可访问
- [ ] 页面meta信息正确
- [ ] 站内链接跳转无误
- [ ] 搜索功能在两种语言下都正常

#### **Phase 5完成标准**
- [ ] 全功能测试通过
- [ ] 生产环境构建成功
- [ ] SEO检查工具无警告
- [ ] Lighthouse评分满足要求

### 回滚触发条件

**立即回滚**:
- 生产环境构建失败超过2小时
- 核心用户功能(登录、搜索、内容浏览)损坏
- 页面访问错误率超过15%
- CDN缓存导致严重的内容混乱

**计划回滚**:
- SEO流量下降超过30%持续3天
- 用户投诉语言切换问题超过阈值
- 性能指标显著下降且无法优化

### 分支和部署策略

#### **Git分支结构**
```
main                    # 生产分支
├── i18n-phase1        # Phase 1开发分支
├── i18n-phase2        # Phase 2开发分支
├── i18n-phase3        # Phase 3开发分支
├── i18n-phase4        # Phase 4开发分支
└── i18n-integration   # 最终集成分支
```

#### **部署策略**
1. **每个Phase**在独立分支开发完成
2. **Phase 1-2**合并测试后，再进行Phase 3-4
3. **关键节点**创建备份分支，便于快速回滚
4. **最终集成**通过preview部署验证后再合并到main

#### **监控和告警**
- 构建状态监控
- 错误率和性能监控
- SEO工具定期检查
- 用户反馈收集机制

---

## 📈 成功指标

### 技术指标
- [ ] **构建成功率**: 100%
- [ ] **页面加载时间**: 不超过原来的120%
- [ ] **Lighthouse评分**: SEO >= 90, Performance >= 85
- [ ] **错误率**: 新增错误 < 0.1%

### 用户体验指标
- [ ] **语言切换成功率**: > 98%
- [ ] **翻译准确性**: 人工review通过率 > 95%
- [ ] **移动端适配**: 两种语言在主流设备正常显示
- [ ] **无障碍性**: WCAG 2.1 AA级别合规

### 业务指标
- [ ] **SEO流量**: 英文页面开始获得自然流量
- [ ] **用户留存**: 语言切换功能使用率达到预期
- [ ] **国际化就绪**: 为未来添加更多语言奠定基础

---

## 📚 参考资料

### Astro官方文档
- [Astro i18n Guide](https://docs.astro.build/en/guides/internationalization/)
- [Astro Routing](https://docs.astro.build/en/core-concepts/routing/)

### 最佳实践
- [Web.dev i18n Guide](https://web.dev/i18n/)
- [Google SEO Multi-language](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites)

### 工具和库
- [Astro i18next](https://github.com/yassinedoghri/astro-i18next) (可选参考)
- [Lighthouse i18n](https://web.dev/hreflang/)

---

## 🤝 团队协作

### 角色分工
- **开发**: 负责代码实现和技术架构
- **翻译**: 负责英文翻译质量把控
- **测试**: 负责功能测试和用户体验验证
- **产品**: 负责需求确认和优先级调整

### 沟通机制
- **日常同步**: 每日进展更新
- **阶段评审**: 每个Phase完成后的review
- **问题升级**: 遇到阻塞及时沟通解决方案

---

*本实施计划将根据实际开发进展进行动态调整，确保项目按时高质量交付。*