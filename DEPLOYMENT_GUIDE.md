# GitHub Pages 部署指南

## 📋 已完成的配置

### 1. ✅ 修正了 Nuxt 配置（nuxt.config.ts）
- 将 `nitro.preset` 移到正确位置
- 添加了预渲染配置

### 2. ✅ 创建了 GitHub Actions 工作流
- 文件位置：`.github/workflows/deploy.yml`
- 自动化构建和部署流程

### 3. ✅ 添加了必要文件
- `.nojekyll` - 防止 GitHub Pages 使用 Jekyll 处理
- `prod.json` - 生产环境配置

### 4. ✅ 添加了 ECharts 依赖
- 项目现在包含 `echarts` ^5.5.0

---

## 🚀 部署步骤

### Step 1: 安装新的依赖
```bash
npm install
```

### Step 2: 本地测试构建
```bash
npm run generate
```

### Step 3: 推送到 GitHub
确保你的代码已推送到 GitHub 仓库的主分支（main 或 master）。

### Step 4: 启用 GitHub Pages
1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 "Build and deployment" 部分：
   - **Source**: 选择 "GitHub Actions"
   
### Step 5: 触发部署
- 方式 1: 推送代码到主分支会自动触发部署
- 方式 2: 在 GitHub 仓库的 **Actions** 标签中手动运行工作流

### Step 6: 访问你的网站
部署成功后，网站会在以下地址可用：
```
https://<你的GitHub用户名>.github.io/<仓库名>/
```

例如：`https://kate.github.io/nuxt3.vue3.dream.house/`

---

## ⚙️ 配置说明

### baseURL 配置
如果你的仓库名是 `nuxt3.vue3.dream.house`，你可能需要更新配置：

**选项 1: 使用仓库子路径**
修改 `prod.json`:
```json
{
  "UsePathBase": "/nuxt3.vue3.dream.house/",
  "env": "prod"
}
```

**选项 2: 使用自定义域名**
如果你有自定义域名：
```json
{
  "UsePathBase": "/",
  "env": "prod"
}
```

并在 GitHub Pages 设置中配置你的域名。

---

## 🐛 常见问题

### 问题 1: 页面空白或 404
**解决方案**：
- 检查 `prod.json` 中的 `UsePathBase` 是否正确
- 确保与你的 GitHub Pages 地址匹配

### 问题 2: 构建失败
**解决方案**：
- 检查 Actions 标签中的错误日志
- 确保 `npm install` 和 `npm run generate` 在本地能成功运行

### 问题 3: 资源加载失败（CSS/JS）
**解决方案**：
- 检查浏览器控制台是否有 404 错误
- 确认 baseURL 配置正确

---

## 📊 图表组件说明

项目已包含 ECharts 图表组件：

### 可用组件
1. **LineChart.vue** - 折线图
   - 用途：资产增值追踪
   
2. **PieChart.vue** - 饼图
   - 用途：成本结构、现金流分析

### 使用示例
```vue
<template>
  <LineChart :data="projectionData" />
  <PieChart :data="cashFlowData" />
</template>

<script setup>
import LineChart from '~/components/charts/LineChart.vue'
import PieChart from '~/components/charts/PieChart.vue'

const store = usePlannerStore()
const projectionData = computed(() => store.projectionData)
const cashFlowData = computed(() => store.cashFlowData)
</script>
```

---

## 🎯 下一步

1. ✅ 运行 `npm install` 安装 echarts
2. ✅ 测试本地构建：`npm run generate`
3. ✅ 推送代码到 GitHub
4. ✅ 在 GitHub 设置中启用 Pages（选择 GitHub Actions）
5. ✅ 等待自动部署完成
6. ✅ 访问你的网站！

---

## 📝 重要提醒

### 关于 NUXT3_ENV
在 GitHub Actions 中，我们设置了 `NUXT3_ENV=prod`，这会加载 `prod.json` 配置。

### 关于认证
如果你的应用需要认证，记得在 GitHub Pages 上可能需要：
- 配置 API 端点（如果有后端）
- 或者禁用某些需要服务端的功能

### 关于 SPA 模式
当前项目配置为 SPA（单页应用）模式 (`ssr: false`)，这对于 GitHub Pages 是最佳选择。

---

需要帮助？检查 GitHub Actions 的日志或联系开发团队！
