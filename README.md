# 作保庇宿｜安心打工換宿智慧媒合平台

打工換宿媒合平台原型，整合評核機制以提升青年求職過程的安全性。

## Overview

打工換宿常見的風險，在於雙方資訊不對等：換宿者難以事前確認店家的實際狀況，
店家也不易掌握換宿者的背景。本專案以媒合流程為主軸，設計一套包含
店家與換宿者雙向評核的介面原型，讓資訊在媒合前就能被檢視。

本專案為前端原型，所有資料為展示用途，無後端服務。

## Features

- 換宿機會瀏覽與篩選介面
- 店家資訊與條件呈現
- 雙向評核機制的介面設計
- 媒合流程原型
- 響應式版面

## Tech Stack

- Vite
- React
- TypeScript
- MUI (Material UI)
- Radix UI
- Tailwind CSS

## Live Demo

https://for995-ai.github.io/work-exchange-platform/

## Local Development

```bash
pnpm install
pnpm dev      # 本機開發，服務於根路徑
pnpm build    # 產生 production build（base 為 /work-exchange-platform/）
```

`vite.config.ts` 只在 `build` 時套用 GitHub Pages 的子路徑，
因此本機開發不受影響。

## Project Context

課程專案，由作者獨立完成平台企劃、需求分析與網路行銷規劃。
介面初稿以 Figma 設計後匯出，再於本專案中調整實作。

## License

未指定授權條款。
