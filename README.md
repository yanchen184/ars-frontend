# ARS 前端應用

這是 ARS（地址解析系統）的前端應用程序，使用 React 和 Ant Design 構建。

![部署狀態](https://github.com/yanchen184/ars-frontend/actions/workflows/deploy.yml/badge.svg)

## 線上演示

訪問 [https://yanchen184.github.io/ars-frontend/](https://yanchen184.github.io/ars-frontend/) 查看在線演示。

## 功能特點

- 地址解析：輸入香港地址進行結構化解析
- 地址記錄查詢：檢視所有已處理的地址記錄
- 儀表板：系統概覽和統計數據
- 與後端 API 集成：自動調用地址解析和查詢服務

## 技術棧

- React 18
- React Router v6 (使用 HashRouter 支持 GitHub Pages)
- Ant Design UI 框架
- Axios 用於 API 請求

## 開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm start

# 構建生產版本
npm run build
```

## 部署

此專案通過 GitHub Actions 自動部署到 GitHub Pages。當主分支有新的提交時，部署工作流將自動運行。

## 版本

當前版本: v0.1.1