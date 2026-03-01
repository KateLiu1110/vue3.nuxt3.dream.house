# 🏗️ 專案架構與流程圖

## 系統架構概覽

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DreamHouse 購屋規劃系統                        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                            前端層 (Client)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │   首頁   │  │ 登入註冊 │  │ 購屋問卷 │  │ 購屋規劃 │           │
│  │  index   │─→│   auth   │─→│  survey  │─→│ planner  │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                      │             │              │                 │
│                      └─────────────┴──────────────┘                 │
│                                    │                                │
│  ┌─────────────────────────────────▼────────────────────────┐      │
│  │              Vue3 + Nuxt3 渲染層                           │      │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │      │
│  │  │ Components   │  │  Composables  │  │  Middleware  │   │      │
│  │  │ (UI 組件)     │  │  (邏輯復用)   │  │  (路由守衛)   │   │      │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │      │
│  └────────────────────────────────────────────────────────┘      │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                         狀態管理層 (Pinia)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  authStore   │  │ plannerStore  │  │ surveyStore   │             │
│  │  (用戶認證)   │  │  (購屋規劃)   │  │   (問卷)      │             │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
│         │                  │                  │                     │
│         └──────────────────┴──────────────────┘                     │
│                            │                                        │
│              ┌─────────────▼─────────────┐                          │
│              │  persistedState (持久化)   │                          │
│              │  (localStorage)            │                          │
│              └─────────────┬─────────────┘                          │
└────────────────────────────┼──────────────────────────────────────┘
                              │ $fetch (HTTP)
┌─────────────────────────────▼───────────────────────────────────────┐
│                      後端 API 層 (Nuxt Server)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  /api/auth/* │  │ /api/houses/* │  │ /api/survey/*│             │
│  │  (認證 API)   │  │  (房屋 API)   │  │  (問卷 API)  │             │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
│         │                  │                  │                     │
│         └──────────────────┴──────────────────┘                     │
│                            │                                        │
│              ┌─────────────▼─────────────┐                          │
│              │  JWT 驗證 & 中間件         │                          │
│              └─────────────┬─────────────┘                          │
└────────────────────────────┼──────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                        數據層 (Mock Database)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  users.json  │  │ houses.json   │  │  survey.json │             │
│  │  (用戶數據)   │  │  (房屋數據)   │  │  (問卷數據)  │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
```

## 用戶流程圖

```mermaid
graph TD
    A[訪問首頁] --> B{是否已登入?}
    B -->|否| C[登入/註冊]
    B -->|是| D{是否完成問卷?}
    
    C --> C1[輸入帳號密碼]
    C1 --> C2[JWT Token 驗證]
    C2 --> D
    
    D -->|否| E[購屋問卷]
    D -->|是| F[購屋規劃]
    
    E --> E1[步驟1: 資產盤點]
    E1 --> E2[步驟2: 個人資料]
    E2 --> E3[步驟3: 購屋需求]
    E3 --> E4[提交問卷]
    E4 --> F
    
    F --> F1[步驟1: 資金盤點]
    F1 --> F2[步驟2: 挑選房屋]
    F2 --> F3[步驟3: 預算精算]
    F3 --> F4[步驟4: 合約簽署]
    F4 --> F4A{簽名完成?}
    F4A -->|否| F4
    F4A -->|是| F5[步驟5: 達成評估]
    F5 --> G[下載 PDF 報告]
    
    F5 --> H[查看個人資產]
    H --> I[重新規劃 / 登出]
    
    style C fill:#fbbf24
    style E fill:#3b82f6
    style F fill:#10b981
    style F4 fill:#f59e0b
    style F5 fill:#8b5cf6
```

## 認證流程時序圖

```mermaid
sequenceDiagram
    participant U as 用戶瀏覽器
    participant M as Middleware
    participant S as Pinia Store
    participant API as Server API
    participant JWT as JWT Utils
    participant DB as JSON Database
    
    Note over U,DB: 登入流程
    U->>API: POST /api/auth/login<br/>{username, password}
    API->>DB: 查詢用戶
    DB-->>API: 返回用戶資料
    API->>JWT: generateToken(userId)
    JWT-->>API: JWT Token
    API-->>U: {success, user, token}
    U->>S: setAuth(user, token)
    S->>S: 持久化到 localStorage
    U->>U: 跳轉到 /survey 或 /planner
    
    Note over U,DB: 後續請求認證
    U->>M: 訪問受保護頁面
    M->>S: 檢查 isAuthenticated
    alt 未認證
        M->>U: 重定向到 /auth/login
    else 已認證
        M->>API: GET /api/auth/session<br/>Header: Bearer {token}
        API->>JWT: verifyToken(token)
        alt Token 有效
            JWT-->>API: decoded data
            API->>DB: 查詢用戶
            DB-->>API: 用戶資料
            API-->>M: {success: true, user}
            M-->>U: 允許訪問
        else Token 無效
            JWT-->>API: null
            API-->>M: {success: false}
            M->>S: clearAuth()
            M->>U: 重定向到 /auth/login
        end
    end
```

## 購屋規劃數據流程

```mermaid
flowchart TB
    subgraph Input[用戶輸入]
        A1[財務數據]
        A2[選擇房屋]
        A3[成本調整]
        A4[頭期款比例]
    end
    
    subgraph Store[Pinia Store 計算]
        B1[monthlyFood = dailyFood * 30]
        B2[totalExpenses = 各項支出總和]
        B3[monthlySavings = 薪水 - 支出]
        B4[targetDownPayment = 房價 * 比例]
        B5[targetTotalCash = 頭期 + 裝潢 + 家具 + 稅費]
    end
    
    subgraph Compute[高級計算]
        C1[projectionData]
        C2[10年資產預測]
        C3[每年資產 = 前年 * 1.05 + 年存款]
        C4[房價增值 = 每年 * 1.025]
        C5[yearsToGoal]
    end
    
    subgraph Output[輸出結果]
        D1[現金流圖表]
        D2[成本結構圖]
        D3[增值曲線圖]
        D4[達成時間]
        D5[PDF 報告]
    end
    
    A1 --> B1
    A1 --> B2
    B1 --> B3
    B2 --> B3
    
    A2 --> B4
    A4 --> B4
    A3 --> B5
    B4 --> B5
    
    B3 --> C1
    B5 --> C1
    C1 --> C2
    C2 --> C3
    C2 --> C4
    C3 --> C5
    
    B3 --> D1
    B5 --> D2
    C3 --> D3
    C4 --> D3
    C5 --> D4
    D1 --> D5
    D2 --> D5
    D3 --> D5
    D4 --> D5
    
    style Input fill:#e0f2fe
    style Store fill:#fef3c7
    style Compute fill:#dcfce7
    style Output fill:#fce7f3
```

## 組件層級結構

```
pages/planner.vue (主容器)
├── PlannerStepper.vue (步驟導航)
│   ├── 步驟按鈕 * 5
│   └── 進度條
│
├── StepFinance.vue (步驟1)
│   ├── ElCard (Hero Banner)
│   ├── ElCard (財務表單)
│   │   ├── ElInputNumber * N
│   │   └── ElFormItem * N
│   └── ElCard (統計卡片)
│
├── StepSearch.vue (步驟2)
│   ├── 篩選器 (Region + Type)
│   └── HouseCard * N
│       ├── 圖片
│       ├── 標籤
│       └── 選擇按鈕
│
├── StepBudget.vue (步驟3)
│   ├── ElCard (預算表格)
│   │   └── ElTable
│   │       └── ElInputNumber (可編輯)
│   └── 頭期款比例選擇器
│
├── StepContract.vue (步驟4)
│   ├── 合約內容展示
│   │   ├── 分頁導航
│   │   └── 內容文本
│   └── SignaturePad (簽名區)
│       ├── Canvas 畫布
│       ├── 清除按鈕
│       └── 確認 Checkbox
│
├── StepEvaluation.vue (步驟5)
│   ├── 總結卡片
│   ├── 成本圖表 (Pie Chart)
│   ├── 增值圖表 (Line Chart)
│   └── 建議清單
│
└── ReportModal.vue (PDF 報告)
    ├── ElDialog
    └── 可列印內容區
        ├── 財務現況表
        ├── 購屋目標表
        └── 執行建議
```

## 狀態管理架構

```
Pinia Stores
│
├── useAuthStore
│   ├── state
│   │   ├── user (User | null)
│   │   ├── token (string | null)
│   │   └── isAuthenticated (boolean)
│   ├── getters
│   │   ├── getUser
│   │   ├── getToken
│   │   └── isLoggedIn
│   └── actions
│       ├── login(username, password)
│       ├── register(userData)
│       ├── logout()
│       └── checkSession()
│
├── usePlannerStore
│   ├── state
│   │   ├── currentStep
│   │   ├── financeData (收支數據)
│   │   ├── selectedHouse (選中房屋)
│   │   ├── costsData (各項成本)
│   │   ├── downPaymentRate (頭期款比例)
│   │   └── signature (簽名數據)
│   ├── getters (自動計算)
│   │   ├── monthlyFood
│   │   ├── totalExpenses
│   │   ├── monthlySavings
│   │   ├── targetDownPayment
│   │   ├── targetTotalCash
│   │   ├── projectionData (10年預測)
│   │   └── yearsToGoal (達成時間)
│   └── actions
│       ├── setStep(step)
│       ├── nextStep()
│       ├── prevStep()
│       ├── updateFinanceData(data)
│       ├── selectHouse(house)
│       ├── updateCostsData(data)
│       └── setSignature(signature)
│
└── useSurveyStore
    ├── state
    │   ├── assets (各類資產)
    │   ├── survey (問卷答案)
    │   └── isCompleted
    ├── getters
    │   ├── totalAssets
    │   └── assetDistribution
    └── actions
        ├── updateAssets(assets)
        ├── updateSurvey(survey)
        └── submitSurvey()
```

## API 路由結構

```
/api
├── /auth
│   ├── POST   /login        # 用戶登入
│   ├── POST   /register     # 用戶註冊
│   ├── GET    /session      # 驗證 Session
│   └── POST   /logout       # 用戶登出
│
├── /houses
│   └── GET    /list         # 獲取房屋列表
│       └── query: region, type
│
├── /survey
│   └── POST   /submit       # 提交問卷
│       └── body: {assets, survey}
│
└── /contract
    └── POST   /sign         # 提交合約簽名
        └── body: {signature, houseId, timestamp}
```

## 中間件執行流程

```
用戶請求頁面
     │
     ▼
┌─────────────────┐
│  Nuxt 路由層    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  definePageMeta │ ← 頁面定義 middleware
│  middleware: ... │
└────────┬────────┘
         │
         ▼
    ┌────────┐
    │ auth.ts│ ← 檢查是否登入
    └───┬────┘
        │
        ├─ 未登入 ──→ navigateTo('/auth/login')
        │
        └─ 已登入 ──→ 繼續
                      │
                      ▼
                 ┌──────────┐
                 │ guest.ts │ ← 檢查是否為訪客頁面
                 └─────┬────┘
                       │
                       ├─ 已登入訪問登入頁 ──→ navigateTo('/planner')
                       │
                       └─ 允許訪問 ──→ 渲染頁面
```

## 電子簽名實現流程

```mermaid
sequenceDiagram
    participant U as 用戶
    participant C as Canvas 組件
    participant S as Pinia Store
    participant API as Server API
    
    U->>C: 閱讀完合約內容
    U->>C: 開始在 Canvas 上簽名
    
    alt 滑鼠操作
        U->>C: mousedown (開始)
        C->>C: startDrawing()
        U->>C: mousemove (繪製)
        C->>C: draw() - ctx.lineTo()
        U->>C: mouseup (結束)
        C->>C: stopDrawing()
    else 觸控操作
        U->>C: touchstart
        C->>C: handleTouchStart()
        U->>C: touchmove
        C->>C: handleTouchMove()
        U->>C: touchend
        C->>C: handleTouchEnd()
    end
    
    C->>C: hasSignature = true
    
    U->>C: 勾選「同意合約」
    U->>C: 點擊「完成簽署」
    
    C->>C: canvas.toDataURL()
    C-->>C: Base64 字符串
    
    C->>S: setSignature(signatureData)
    C->>API: POST /api/contract/sign
    Note right of API: body: {<br/>  signature,<br/>  houseId,<br/>  timestamp<br/>}
    
    API-->>C: {success: true, contractId}
    C->>U: 提示「簽署成功」
    C->>C: emit('next') 進入下一步
```

---

**文檔版本：** v1.0  
**最後更新：** 2026-03-01  
**維護者：** Kate
