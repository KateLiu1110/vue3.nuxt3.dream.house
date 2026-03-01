# Components 資料夾結構

## 📁 資料夾組織

```
components/
├── auth/              # 認證相關組件
│   ├── AuthContainer.vue
│   └── AuthFormHeader.vue
│
├── charts/            # 圖表組件（共用）
│   ├── LineChart.vue  # 折線圖
│   └── PieChart.vue   # 圓餅圖
│
├── common/            # 共用小元件
│   ├── NumberInput.vue    # 數字輸入框
│   └── SectionTitle.vue   # 區塊標題
│
├── form/              # 表單相關組件
│   └── FormActions.vue    # 表單操作按鈕
│
├── layout/            # 佈局組件
│   ├── AppHeader.vue      # 應用程式導航欄
│   └── PageHeader.vue     # 頁面標題
│
├── planner/           # 購屋規劃組件
│   ├── StepBudget.vue
│   ├── StepContract.vue
│   ├── StepEvaluation.vue
│   ├── StepFinance.vue
│   ├── StepSearch.vue
│   ├── TheReportModal.vue
│   └── TheStepper.vue
│
└── ui/                # UI 基礎組件
    ├── BaseButton.vue
    ├── BaseCard.vue
    ├── BaseInput.vue
    └── StatCard.vue
```

## 🎯 組件分類說明

### 📊 Charts (圖表組件)
可重用的圖表組件，使用 ECharts 實現。

**LineChart.vue**
- 用途：顯示折線圖
- Props:
  - `data`: DataItem[] - 數據數組
- 範例：
```vue
<LineChart :data="projectionData" />
```

**PieChart.vue**
- 用途：顯示圓餅圖
- Props:
  - `data`: Array<{ name, value, color }> - 數據數組
  - `innerRadius`: string - 內圈半徑（默認 60%）
  - `outerRadius`: string - 外圈半徑（默認 80%）
- 範例：
```vue
<PieChart :data="costsPieData" inner-radius="50%" outer-radius="80%" />
```

### 🔧 Common (共用小元件)
可在多個地方重用的通用組件。

**NumberInput.vue**
- 用途：帶標籤和圖標的數字輸入框
- Props:
  - `label`: string - 標籤文字
  - `modelValue`: number - v-model 值
  - `icon`: Component (可選) - 圖標組件
  - `prefix`: string (可選) - 前綴字符
  - `min`: number - 最小值
  - `max`: number - 最大值
  - `step`: number - 步進值
- 範例：
```vue
<NumberInput 
  v-model="amount" 
  label="金額" 
  :icon="Money"
  prefix="$"
  :min="0"
  :step="1000"
/>
```

**SectionTitle.vue**
- 用途：區塊標題組件
- Props:
  - `title`: string - 標題
  - `subtitle`: string (可選) - 副標題
  - `description`: string (可選) - 描述
  - `icon`: Component (可選) - 圖標
- 範例：
```vue
<SectionTitle 
  title="財務規劃" 
  subtitle="第一步"
  description="評估您的財務狀況"
  :icon="Calculator"
/>
```

### 🎨 UI (基礎 UI 組件)
通用的 UI 基礎組件。

- **BaseButton.vue**: 按鈕組件
- **BaseCard.vue**: 卡片容器
- **BaseInput.vue**: 輸入框組件
- **StatCard.vue**: 統計卡片

### 📝 Form (表單組件)
表單相關的組件。

- **FormActions.vue**: 表單操作按鈕（上一步/下一步）

### 🔐 Auth (認證組件)
認證頁面相關組件。

- **AuthContainer.vue**: 認證頁面容器
- **AuthFormHeader.vue**: 認證表單標題

### 📐 Layout (佈局組件)
頁面佈局相關組件。

- **AppHeader.vue**: 應用程式導航欄
- **PageHeader.vue**: 頁面標題

### 🏠 Planner (購屋規劃組件)
購屋規劃功能相關的組件。

- **StepFinance.vue**: 財務盤點步驟
- **StepSearch.vue**: 房屋搜尋步驟
- **StepBudget.vue**: 預算精算步驟
- **StepContract.vue**: 合約重點步驟
- **StepEvaluation.vue**: 達成評估步驟
- **TheStepper.vue**: 步驟指示器
- **TheReportModal.vue**: 報告彈窗

## 🚀 使用指南

### 自動導入
Nuxt 3 會自動導入 `components/` 目錄下的所有組件，無需手動 import。

```vue
<template>
  <!-- 直接使用，無需 import -->
  <LineChart :data="chartData" />
  <NumberInput v-model="value" label="金額" />
  <BaseButton type="warning">提交</BaseButton>
</template>
```

### 組件命名規則
- 使用 PascalCase 命名
- 圖表組件以 Chart 結尾
- 基礎組件以 Base 開頭
- 頁面專用組件以 The 開頭（單例）

## 📝 開發建議

### 新增組件時
1. 確定組件類型，放入對應資料夾
2. 添加 TypeScript Props 定義
3. 使用 `<style scoped lang="scss">` 隔離樣式
4. 為可重用組件添加文檔註釋

### 組件設計原則
- **單一職責**: 每個組件只做一件事
- **可組合**: 小組件組合成大組件
- **可配置**: 通過 Props 控制行為
- **類型安全**: 使用 TypeScript 定義清晰的接口

## 🔄 遷移說明

### 舊結構 → 新結構
```
components/components/charts/LineChart.vue  →  components/charts/LineChart.vue
components/components/charts/PieChart.vue   →  components/charts/PieChart.vue
components/components/CleanInput.vue        →  components/common/NumberInput.vue
components/components/SectionHeader.vue     →  components/common/SectionTitle.vue
```

### 更新引用
如果有手動 import 舊組件的地方，需要更新路徑：

```vue
<!-- 舊的 -->
import LineChart from '~/components/components/charts/LineChart.vue'

<!-- 新的 -->
import LineChart from '~/components/charts/LineChart.vue'

<!-- 或直接使用自動導入（推薦） -->
<template>
  <LineChart :data="chartData" />
</template>
```

## 📚 相關文檔

- [Nuxt 3 Components](https://nuxt.com/docs/guide/directory-structure/components)
- [Vue 3 組件基礎](https://vuejs.org/guide/essentials/component-basics.html)
- [TypeScript with Vue](https://vuejs.org/guide/typescript/overview.html)

---

最後更新：2026-03-01
