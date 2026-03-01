# DreamHouse - 數位購屋規劃系統

一個基於 Nuxt 3 + Vue 3 的現代化購屋規劃應用系統。

## ✨ 主要功能

- 🔐 **完整的認證系統**：註冊、登入、Token 認證
- 👥 **權限管理**：角色基礎訪問控制 (RBAC)
- 📊 **五步驟購屋規劃**：
  1. 財務盤點
  2. 房屋挑選
  3. 預算精算
  4. 合約重點
  5. 達成評估
- ✅ **步驟驗證**：確保按順序完成每個步驟
- 🎨 **現代化 UI**：基於 Element Plus 和 UnoCSS
- 📱 **響應式設計**：完整支援桌面和移動設備

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發環境
```bash
npm run dev
```

訪問 http://localhost:3000

### 測試帳號
- **一般用戶**
  - 帳號：`demo`
  - 密碼：`demo123`

- **管理員**
  - 帳號：`admin`
  - 密碼：任意 6 位以上

## 📁 專案結構

```
nuxt3.vue3.dream.house/
├── assets/              # 靜態資源
│   ├── css/            # 全域 CSS
│   └── scss/           # SCSS 變數和 mixins
├── components/          # Vue 組件
│   ├── ui/             # UI 基礎組件
│   ├── form/           # 表單組件
│   ├── auth/           # 認證組件
│   ├── layout/         # 佈局組件
│   └── planner/        # 購屋規劃組件
├── composables/         # 組合式函數
├── layouts/            # 佈局模板
├── middleware/         # 路由中間件
├── pages/              # 頁面路由
│   ├── auth/          # 認證相關頁面
│   ├── index.vue      # 首頁
│   └── planner.vue    # 購屋規劃頁面
├── plugins/            # Nuxt 插件
├── server/             # 伺服器端 API
│   ├── api/           # API 端點
│   ├── data/          # 模擬數據
│   └── utils/         # 工具函數
├── stores/             # Pinia 狀態管理
└── types/              # TypeScript 類型定義
```

## 🔧 技術棧

- **框架**: [Nuxt 3](https://nuxt.com/)
- **UI 框架**: [Element Plus](https://element-plus.org/)
- **CSS 框架**: [UnoCSS](https://unocss.dev/)
- **狀態管理**: [Pinia](https://pinia.vuejs.org/)
- **認證**: JWT (JSON Web Token)
- **圖表**: Recharts/Chart.js
- **圖標**: Element Plus Icons, Lucide Icons

## 🔐 認證與權限

### Token 機制
- JWT Token 有效期：8 小時
- Refresh Token 有效期：7 天
- 自動從 localStorage 恢復登入狀態

### 角色與權限
- **Admin**: 完整權限（read, write, delete, admin）
- **User**: 讀寫權限（read, write）
- **Guest**: 僅讀取權限（read）

### 使用權限中間件
```vue
<script setup>
definePageMeta({
  middleware: ['auth', 'permission'],
  requiresAdmin: true,
})
</script>
```

## 📊 購屋規劃流程

### 1. 財務盤點
- 評估可動用資金
- 計算月收入與支出
- 確定每月可存金額

### 2. 房屋挑選
- 依區域、類型篩選房屋
- 查看房屋詳細資訊
- 選擇心儀房屋

### 3. 預算精算
- 計算頭期款
- 評估裝潢、家具等額外成本
- 總成本分析

### 4. 合約重點
- 查看購屋合約重點
- 確認並接受條款

### 5. 達成評估
- 預測未來資產成長
- 評估購屋目標達成時間
- 生成購屋報告

## 🎨 設計系統

### 顏色主題
- **Primary**: `#f59e0b` (琥珀色)
- **Secondary**: `#3b82f6` (藍色)
- **Success**: `#10b981` (綠色)
- **Warning**: `#f59e0b` (橙色)
- **Danger**: `#ef4444` (紅色)

### 組件使用範例

```vue
<template>
  <BaseCard title="標題" subtitle="副標題">
    <BaseInput 
      v-model="value"
      label="標籤"
      placeholder="請輸入"
      required
    />
    
    <BaseButton 
      type="warning"
      :loading="loading"
      @click="handleSubmit"
    >
      提交
    </BaseButton>
  </BaseCard>
</template>
```

## 🚀 部署

### 建置生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## 📝 開發指南

### 新增頁面
1. 在 `pages/` 目錄下創建 `.vue` 文件
2. 使用 `definePageMeta` 設定路由元數據
3. 添加必要的中間件

### 新增 API
1. 在 `server/api/` 目錄下創建文件
2. 使用 `defineEventHandler` 處理請求
3. 添加認證驗證（如需要）

### 新增組件
1. 在 `components/` 相應目錄下創建組件
2. 遵循命名規範（PascalCase）
3. 添加 TypeScript 類型定義

## 🐛 常見問題

### Token 過期怎麼辦？
系統會自動檢測 Token 狀態，過期後會引導用戶重新登入。

### 如何自定義主題？
修改 `assets/css/global.css` 中的 CSS 變數。

### 如何添加新的權限？
1. 在 `stores/useAuthStore.ts` 中添加權限
2. 在 API 端點返回相應權限
3. 使用 `hasPermission()` 檢查權限

## 📄 授權

MIT License

## 👥 貢獻

歡迎提交 Issue 和 Pull Request！

## 📞 聯繫方式

- 文檔：查看 `IMPLEMENTATION_SUMMARY.md`
- 架構：查看 `ARCHITECTURE.md`

---

最後更新：2026-03-01
