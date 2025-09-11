# 🚀 部署指南

本项目支持 Cloudflare Pages + D1 数据库的完整后端部署。

## 📋 前置条件

- Node.js 18.0+
- Cloudflare 账户（免费即可）
- Git 仓库

## 🛠️ 部署步骤

### 1. 安装依赖

```bash
npm install
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler auth login
```

### 3. 创建 D1 数据库

```bash
wrangler d1 create your-database-name
```

复制输出中的 `database_id`，更新 `wrangler.toml` 文件中的相应值。

### 4. 配置环境

1. 更新 `wrangler.toml` 中的 `database_id`
2. 在 Cloudflare Dashboard 中设置环境变量：
   - `JWT_SECRET`: 强密码（至少32字符）
   - `NODE_ENV`: `production`

### 5. 初始化数据库

```bash
# 本地开发
wrangler d1 execute your-database-name --local --file=./schema.sql

# 生产环境
wrangler d1 execute your-database-name --remote --file=./schema.sql
```

### 6. 构建和部署

```bash
npm run build
wrangler pages deploy dist/ --project-name=your-project-name
```

## 🔐 安全配置

### 必须修改的配置：

1. **JWT_SECRET**: 在生产环境中必须使用强密钥
2. **数据库 ID**: 使用你自己创建的数据库 ID
3. **项目名称**: 修改为你的项目名称

### 推荐的安全实践：

- 在 Cloudflare Dashboard 中设置环境变量，不要硬编码在配置文件中
- 定期更换 JWT 密钥
- 启用 Cloudflare 的安全功能（WAF、DDoS 保护等）

## 🌍 本地开发

```bash
# 启动开发服务器
npm run dev

# 或使用 Cloudflare Pages 本地开发
wrangler pages dev dist/ --d1=DB=your-database-name
```

## 📊 功能特性

- ✅ 用户认证系统（注册/登录）
- ✅ 实时评论和回复
- ✅ 内容点赞和收藏
- ✅ D1 SQLite 数据库
- ✅ JWT 令牌认证
- ✅ 密码加密存储
- ✅ 自动扩展部署

## 🚨 重要提醒

**不要在公开仓库中提交以下敏感信息：**
- 真实的 JWT 密钥
- 生产数据库的实际 ID
- 任何用户数据

本项目的配置文件已经清理，仅包含示例值。实际部署时请使用你自己的配置。