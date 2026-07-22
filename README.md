# 张明霞 · UI 设计师个人作品集

基于 React 18 + Vite 构建的响应式个人作品集网站。首页为长页叙事结构，并预留了 `/projects/:slug` 项目详情路由。

## 本地启动

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址即可预览。

## 构建生产版本

```bash
npm run build
npm run preview
```

## 内容与素材替换

- 全站文字、品牌、项目、能力、FAQ、联系方式：`src/data/content.js`
- 作品集实图：`public/media/portfolio/`（已从作品集 PDF 中筛选并针对网页卡片裁切）
- Hero 视频：将文件放入 `public/media/`，再在 `src/data/content.js` 的 `hero.media.src` 填写 `/media/你的文件名.mp4`
- Hero 封面：修改 `hero.media.poster`
- 主题色、字号、间距和动画：`src/styles/global.css` 顶部 `:root` 变量

项目详情页会根据 `src/data/content.js` 中的 `slug` 自动匹配，例如 `/projects/fatelinked`。

## 目录

```text
src/
  components/    页面区块组件
  data/          全站内容配置
  hooks/         进入视口动画逻辑
  pages/         首页与项目详情页
  styles/        全局样式与设计 token
public/media/    本地图片与视频素材
```
