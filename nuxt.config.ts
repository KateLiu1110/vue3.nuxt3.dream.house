// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process';
import { createRequire } from 'node:module';
import type { ProjectSetting } from './types/interfaces.dto';

const require = createRequire(import.meta.url);

function loadJSON(filename: string) {
  return require(filename);
}

const jsonFile = `./${(process.env.NUXT3_ENV || 'dev').trim()}.json`;
const setting = loadJSON(jsonFile) as ProjectSetting;

console.log('setting:', setting.UsePathBase);

export default defineNuxtConfig({
  // 設置應用的兼容性日期
  compatibilityDate: '2024-04-03',

  // 指定單頁應用（SPA）加載模板的路徑
  // spaLoadingTemplate: 'assets/spa-loading-template.html',
  spaLoadingTemplate: true,

  ssr: false,

  // 定義特定路由的規則，這裡設置為不使用服務端渲染（SSR）
  // routeRules: {
  //   '/test/**': { ssr: false },
  // },

  // 加載應用的插件
  plugins: [
    // '~/plugins/directives/domid-auth.client.ts',
    // '~/plugins/directives/disabled.client.ts',
    // '~/plugins/directives/enabled.client.ts'
  ],

  // 配置運行時的變量，包括私有和公開的配置
  runtimeConfig: {
    // 用於加密的密鑰
    tokenSecret: 'EYei4YfWTf84AkpmQIa2G4eEbgyMya2J',
    app: {
      // 應用的基礎 URL
      baseURL: setting.UsePathBase // (like as .NET Core UsePathBase)
    },
    ssr: true, // 或者設定為 false (SPA 模式)
    nitro: {
      preset: 'github-pages'
    },
    // 其他應用相關的配置
    CathaySecAuth: setting.CathaySecAuth,
    ApiHost: setting.ApiHost,
    AppId: setting.AppId,
    public: {
      // 公共配置，包含 apiBase 和 UsePathBase
      apiBase: setting.UsePathBase,
      NXUT3_ENV: process.env.NXUT3_ENV || ''
    }
  },

  // 定義服務器端處理程序
  // serverHandlers: [
  //   {
  //     // 設置一個 POST 請求的處理器
  //     route: '/api/**:apiPath',
  //     handler: '~/server/api/getway.post.ts',
  //     method: 'post'
  //   }
  // ],

  // 設置 TypeScript 配置，這裡禁用了 shim
  typescript: {
    shim: false
  },

  // 禁用開發工具
  devtools: { enabled: false },

  // 啟用源映射，用於調試
  sourcemap: !!(setting.env === 'dev' || setting.env === 'sit'),

  // 配置 Vite 構建工具
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 設置 SCSS 的預處理選項
          // silenceDeprecations: ['legacy-js-api'],
          api: 'modern-compiler'
        }
      }
    }
  },

  // 配置 Nitro 引擎
  nitro: {
    prerender: {
      // 設置預渲染的併發數量
      concurrency: 12
    }
  },

  // 加載 Nuxt 模塊
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@sidebase/nuxt-auth',
    '@element-plus/nuxt',
    '@unocss/nuxt',
    'nuxt-icon'
  ],

  elementPlus: { /** Options */ },

  // 配置認證設置
  auth: {
    sessionRefresh: {
      enableOnWindowFocus: false
    },
    provider: {
      type: 'local',
      pages: {
        login: '/login'
      },
      session: {
        dataResponsePointer: '',
        dataType: { BranchID: 'string', UserID: 'string' }
      },
      endpoints: {
        getSession: { path: '/session' }
      },
      token: {
        signInResponseTokenPointer: '/token'
      }
    }
  },

  // 加載全局 CSS 文件
  css: ['~/assets/css/global.css'],

  // 配置應用的 HTML 頁面頭部
  app: {
    head: {
      title: 'BPS預算系統',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // { name: 'description', content: '' },
        { 'http-equiv': 'Cache-Control', 'content': 'no-cache, no-store, must-revalidate' },
        { 'http-equiv': 'Pragma', 'content': 'no-cache' },
        { 'http-equiv': 'Expires', 'content': '0' }
      ]
      // link: [ { rel: 'stylesheet', href: `${setting.UsePathBase}css/bootstrap.min.css`, tagPosition: 'head' } ],
      // script: [ { src: `${setting.UsePathBase}js/bootstrap.bundle.min.js`, tagPosition: 'bodyClose', defer: true } ]
      // viewport: 'width=device-width,initial-scale=1',
      // link: [
      //   { rel: 'icon', type: 'image/svg+xml', href: `${process.env.NUXT_APP_BASE_URL || ''}/nuxt.svg` },
      //   { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      // ],
    }
  }
});
