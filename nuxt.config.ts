// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ProjectSetting } from './types/interfaces.dto'

// 讀取環境
const env = (process.env.NUXT3_ENV || 'dev').trim()

// 讀取 json
const jsonPath = resolve(`./${env}.json`)
const setting = JSON.parse(readFileSync(jsonPath, 'utf-8')) as ProjectSetting

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  spaLoadingTemplate: true,

  ssr: false,

  runtimeConfig: {
    tokenSecret: 'EYei4YfWTf84AkpmQIa2G4eEbgyMya2J',
    CathaySecAuth: setting.CathaySecAuth,
    ApiHost: setting.ApiHost,
    AppId: setting.AppId,

    public: {
      apiBase: setting.UsePathBase,
      NUXT3_ENV: env
    }
  },

  typescript: {
    shim: false
  },

  devtools: { enabled: false },

  sourcemap: setting.env === 'dev' || setting.env === 'sit',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },

  nitro: {
    preset: 'github-pages',
    prerender: {
      concurrency: 12,
      crawlLinks: true,
      routes: ['/']
    }
  },

  modules: [
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    '@element-plus/nuxt',
    '@unocss/nuxt',
    'nuxt-icon'
  ],

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
        dataType: {
          BranchID: 'string',
          UserID: 'string'
        }
      },
      endpoints: {
        getSession: { path: '/session' }
      },
      token: {
        signInResponseTokenPointer: '/token'
      }
    }
  },

  css: ['~/assets/css/global.css'],

  app: {
    baseURL: env === 'prod' ? '/vue3.nuxt3.dream.house/' : '/',
    buildAssetsDir: 'static/',
    head: {
      title: '夢幻小屋AI房仲平台',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
        { 'http-equiv': 'Pragma', content: 'no-cache' },
        { 'http-equiv': 'Expires', content: '0' }
      ]
    }
  }
})