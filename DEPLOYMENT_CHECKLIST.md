# 🚀 GitHub Pages 部署检查清单

## ✅ 部署前检查

### 1. 本地测试
- [x] 已运行 `npm install` 安装所有依赖（包括 echarts）
- [x] 已成功运行 `npm run generate` 构建静态文件
- [ ] 检查 `.output/public` 目录是否存在
- [ ] 本地预览：`npm run preview`

### 2. 配置检查

#### `prod.json` 配置
- [ ] 确认 `UsePathBase` 设置正确
  - 选项 A：使用子路径 → `"/你的仓库名/"`
  - 选项 B：根路径（自定义域名）→ `"/"`

#### `nuxt.config.ts` 配置
- [x] `ssr: false` （SPA 模式）
- [x] `nitro.preset: 'github-pages'`
- [x] `app.baseURL` 使用 `setting.UsePathBase`

#### GitHub Actions
- [x] `.github/workflows/deploy.yml` 已创建
- [ ] 工作流中的分支名称正确（main 或 master）

### 3. GitHub 仓库设置
- [ ] 代码已推送到 GitHub
- [ ] 进入 **Settings** → **Pages**
- [ ] **Source** 设置为 "GitHub Actions"
- [ ] （可选）配置自定义域名

---

## 🔧 常见配置场景

### 场景 1: 个人/组织主页
**仓库名：** `<username>.github.io`  
**访问地址：** `https://<username>.github.io/`  
**配置：**
```json
// prod.json
{
  "UsePathBase": "/",
  "env": "prod"
}
```

### 场景 2: 项目页面
**仓库名：** `nuxt3.vue3.dream.house`  
**访问地址：** `https://<username>.github.io/nuxt3.vue3.dream.house/`  
**配置：**
```json
// prod.json
{
  "UsePathBase": "/nuxt3.vue3.dream.house/",
  "env": "prod"
}
```

### 场景 3: 自定义域名
**域名：** `dreamhouse.com`  
**访问地址：** `https://dreamhouse.com/`  
**配置：**
```json
// prod.json
{
  "UsePathBase": "/",
  "env": "prod"
}
```
**额外步骤：**
1. 在 GitHub Pages 设置中添加自定义域名
2. 在域名提供商处设置 DNS 记录（A 或 CNAME）

---

## 📦 部署命令

### 1. 推送代码
```bash
git add .
git commit -m "配置 GitHub Pages 部署"
git push origin main
```

### 2. 查看部署状态
1. 访问 GitHub 仓库的 **Actions** 标签
2. 查看最新的工作流运行
3. 等待绿色勾号（✅）表示成功

### 3. 访问网站
部署成功后，点击工作流详情中的部署 URL

---

## 🐛 问题排查

### 问题：Actions 构建失败

#### 检查 1: Node 版本
```yaml
# .github/workflows/deploy.yml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # ✅ 确保版本正确
```

#### 检查 2: 依赖安装
```yaml
- name: Install dependencies
  run: npm ci  # ✅ 使用 ci 而不是 install
```

#### 检查 3: 构建命令
```yaml
- name: Generate static site
  run: npm run generate  # ✅ 而不是 build
  env:
    NUXT3_ENV: prod  # ✅ 加载 prod.json
```

---

### 问题：页面显示 404

#### 原因 1: baseURL 不匹配
**症状：** 首页能访问，但刷新子页面显示 404

**解决：** 检查 `prod.json` 的 `UsePathBase`

如果仓库名是 `nuxt3.vue3.dream.house`：
```json
{
  "UsePathBase": "/nuxt3.vue3.dream.house/"
}
```
注意：
- ✅ 开头和结尾都要有 `/`
- ❌ 不要忘记结尾的 `/`

#### 原因 2: SPA 路由问题
**症状：** 直接访问 `/planner` 显示 404

**解决：** 确保 `.nojekyll` 文件存在
```bash
# 检查文件是否存在
ls -la public/.nojekyll
```

如果不存在，创建它：
```bash
touch public/.nojekyll
git add public/.nojekyll
git commit -m "添加 .nojekyll"
git push
```

---

### 问题：CSS/JS 加载失败

#### 检查浏览器控制台
按 F12 打开开发者工具，查看是否有类似错误：
```
Failed to load resource: net::ERR_FILE_NOT_FOUND
https://username.github.io/_nuxt/entry.js
```

#### 解决方案
这通常是 `UsePathBase` 配置错误，应该改为：
```json
{
  "UsePathBase": "/nuxt3.vue3.dream.house/"
}
```

---

### 问题：图表不显示

#### 原因：容器没有高度
```vue
<!-- ❌ 错误 -->
<template>
  <div>
    <PieChart :data="data" />
  </div>
</template>

<!-- ✅ 正确 -->
<template>
  <div class="h-64">  <!-- 明确高度 -->
    <PieChart :data="data" />
  </div>
</template>
```

#### 原因：数据格式错误
确保数据格式正确：
```typescript
// ✅ 正确
const data = [
  { name: '项目1', value: 100, color: '#FF0000' },
  { name: '项目2', value: 200, color: '#00FF00' }
]

// ❌ 错误（缺少 color）
const data = [
  { name: '项目1', value: 100 },
  { name: '项目2', value: 200 }
]
```

---

## 📝 部署后验证

### 1. 功能检查
- [ ] 首页正常显示
- [ ] 导航栏可以点击
- [ ] 登录功能正常
- [ ] 步骤切换正常
- [ ] 图表正常显示
- [ ] 表单输入正常
- [ ] PDF 下载功能正常

### 2. 性能检查
- [ ] 页面加载速度 < 3秒
- [ ] 图片懒加载正常
- [ ] 无控制台错误

### 3. 移动端检查
- [ ] 响应式布局正常
- [ ] 触摸交互正常
- [ ] 字体大小适中

---

## 🎯 快速命令参考

```bash
# 本地开发
npm run dev

# 本地构建测试
npm run generate
npm run preview

# 完整部署流程
git add .
git commit -m "部署到 GitHub Pages"
git push origin main

# 查看构建输出
ls -R .output/public
```

---

## 📊 部署时间估算

| 步骤 | 预计时间 |
|------|---------|
| 代码推送 | 10-30秒 |
| Actions 触发 | 10-20秒 |
| 依赖安装 | 1-2分钟 |
| 构建生成 | 30-60秒 |
| 部署发布 | 20-40秒 |
| **总计** | **3-5分钟** |

---

## 🆘 需要帮助？

### GitHub Actions 日志
1. 进入 **Actions** 标签
2. 点击最新的工作流运行
3. 展开失败的步骤
4. 复制错误信息

### 浏览器控制台日志
1. 按 F12 打开开发者工具
2. 切换到 **Console** 标签
3. 刷新页面
4. 查找红色错误信息

### 网络请求检查
1. 按 F12 打开开发者工具
2. 切换到 **Network** 标签
3. 刷新页面
4. 查找状态码为 404 或 500 的请求

---

## ✅ 完成！

部署成功后，你的网站将在几分钟内上线。

**分享你的成果：**
```
https://<username>.github.io/<repo-name>/
```

祝你部署顺利！🎉
