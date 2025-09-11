# Cloudflare Workers + D1 部署指南

这个项目现在已经升级为使用 Cloudflare Workers 和 D1 数据库的全功能后端。以下是完整的部署设置指南。

## 前置条件

1. **Node.js** - 版本 18.0+ 
2. **Cloudflare 账户** - 免费账户即可
3. **Wrangler CLI** - Cloudflare 的命令行工具

## 安装 Wrangler CLI

```bash
npm install -g wrangler
```

## 1. 登录 Cloudflare

```bash
wrangler auth login
```

这会打开浏览器让你授权 Wrangler 访问你的 Cloudflare 账户。

## 2. 创建 D1 数据库

```bash
# 在项目根目录运行
cd femres-app
wrangler d1 create femres-db
```

这个命令会输出类似以下内容：
```
✅ Successfully created DB 'femres-db' in region APAC
Created your database using D1's new storage backend.
The new storage backend is not yet recommended for production workloads, but backs up your data to R2.

[[d1_databases]]
binding = "DB"
database_name = "femres-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**重要：** 复制输出中的 `database_id`，你需要更新 `wrangler.toml` 文件。

## 3. 更新配置文件

编辑 `wrangler.toml` 文件，将 `database_id` 替换为上一步中获得的实际 ID：

```toml
[[d1_databases]]
binding = "DB"
database_name = "femres-db"
database_id = "你的-database-id-在这里"  # 替换这一行
```

同时更新 JWT 密钥：
```toml
[env.production]
vars = { JWT_SECRET = "your-super-secret-production-jwt-key-change-this" }
```

## 4. 初始化数据库结构

```bash
# 应用数据库结构（生产环境）
wrangler d1 execute femres-db --file=./schema.sql

# 本地开发环境（可选）
wrangler d1 execute femres-db --local --file=./schema.sql
```

## 5. 本地开发

为了在本地开发中使用 D1，你需要：

```bash
# 启动本地开发服务器（支持 D1 本地数据库）
npm run dev

# 或者使用 Wrangler 开发模式
wrangler pages dev dist/ --d1=DB=femres-db
```

## 6. 部署到 Cloudflare

### 第一次部署

```bash
# 构建项目
npm run build

# 部署到 Cloudflare Pages
wrangler pages deploy dist/
```

### 后续部署

```bash
npm run build
wrangler pages deploy dist/
```

## 7. 配置环境变量

在 Cloudflare Dashboard 中：

1. 进入 **Workers & Pages** > 你的项目
2. 点击 **Settings** > **Environment variables**
3. 添加以下变量：
   - `JWT_SECRET`: 你的 JWT 密钥（至少 32 字符）
   - `NODE_ENV`: `production`

## 8. 设置自定义域名（可选）

1. 在 Cloudflare Pages 项目设置中
2. 转到 **Custom domains**
3. 添加你的域名

## 功能说明

升级后的系统包含以下新功能：

### ✅ 完整的用户认证系统
- 用户注册/登录
- JWT 令牌认证
- 密码哈希加密
- 会话管理

### ✅ 真实的评论系统
- 发表评论和回复
- 评论点赞功能
- 实时评论加载
- 用户权限控制

### ✅ 内容交互功能
- 内容点赞/收藏
- 用户交互历史
- 跨设备同步

### ✅ 数据持久化
- SQLite (D1) 数据库
- 自动备份到 R2
- 数据一致性保证

## API 端点

系统提供以下 API 端点：

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录  
- `GET /api/auth/me` - 获取当前用户信息

### 评论相关
- `GET /api/comments/{contentId}` - 获取内容评论
- `POST /api/comments/{contentId}` - 发表评论/回复
- `POST /api/comments/like/{commentId}` - 点赞/取消点赞评论

### 用户交互
- `POST /api/interactions/{contentId}` - 内容点赞/收藏

## 数据库结构

数据库包含以下主要表：
- `users` - 用户信息
- `comments` - 评论和回复
- `comment_likes` - 评论点赞记录
- `user_interactions` - 用户内容交互记录

## 故障排除

### 常见问题

1. **D1 数据库未找到**
   - 确保在 `wrangler.toml` 中正确配置了 `database_id`
   - 运行 `wrangler d1 list` 查看可用数据库

2. **JWT 错误**
   - 检查环境变量中的 `JWT_SECRET` 是否设置
   - 确保密钥足够复杂（建议 32+ 字符）

3. **构建错误**
   - 运行 `npm run build` 查看详细错误信息
   - 确保所有依赖已正确安装

4. **本地开发问题**
   - 使用 `wrangler pages dev` 而不是普通的开发服务器
   - 确保本地 D1 数据库已初始化

### 日志查看

```bash
# 查看部署日志
wrangler pages deployment list

# 查看实时日志
wrangler tail
```

## 成本估算

Cloudflare 的免费套餐包括：
- **Workers**: 每天 100,000 次请求
- **D1**: 每天 25,000 次读取，50,000 次写入
- **Pages**: 无限带宽和构建

对于中小型项目，这些额度通常足够使用。

## 安全建议

1. **更改默认密钥**: 在生产环境中务必更改 JWT_SECRET
2. **启用 HTTPS**: Cloudflare 自动提供 SSL 证书
3. **设置 CORS**: 根据需要配置跨域请求策略
4. **监控使用量**: 定期检查 Cloudflare 仪表板中的使用统计

## 下一步

现在你已经拥有一个完整的、可扩展的女性主义内容平台，具备：
- 用户认证和管理
- 实时评论讨论功能
- 内容交互功能
- 全球 CDN 分发
- 自动扩展能力

享受你的新平台！🎉