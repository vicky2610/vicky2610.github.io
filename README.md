# 琦琦 · 媒介投放作品集

线上地址：**https://vicky2610.github.io/**

纯静态单页作品集，零构建、零外链依赖。所有文案、案例、数据都集中在 `assets/js/content.js` 一个文件里。

## 怎么改内容（最省事的方式）

直接在 GitHub 网页上改，改完自动发布，不用装任何工具：

1. 打开 https://github.com/vicky2610/vicky2610.github.io/blob/main/assets/js/content.js
2. 点右上角铅笔图标进入编辑
3. 改文字，注意保持引号、逗号和括号完整
4. 页面往下拉，点 **Commit changes**
5. 等 1–3 分钟，刷新 https://vicky2610.github.io/ 就能看到

## 本地预览

```bash
cd D:/AIProjects/qiqiWeb
python -m http.server 8000
```

浏览器打开 http://localhost:8000 。也可以直接双击 `index.html`。

## 替换清单

改完保存，刷新页面即生效。改完建议全文搜一遍「待补充」和「某」，确认没有遗漏。

| 要改什么 | 位置 | 怎么改 |
|---|---|---|
| 微信二维码 | `content.js` → `contact.wechatQr` | 把图片放到 `assets/img/wechat.png`，值改成 `"assets/img/wechat.png"` |
| 补充第三个案例 | `content.js` → `pendingCases` | 按 `cases` 里已有的结构加一条，并把 `pendingCases` 对应那条删掉 |
| 案例配图 | `content.js` → `cases[].cover.image` | 填图片路径，如 `"assets/img/case-01.jpg"`；留空则用程序生成的渐变封面 |
| 标题 / 自我介绍 / 数据 | `content.js` 各字段 | 直接改文字 |
| 邮箱 | `content.js` → `contact.email` | 同时改 `index.html` 里的 meta description 和 noscript 中的邮箱 |
| 公司全称 / 时间 | `content.js` → `about.timeline` | 简历解析可能有缺字，务必核对一次 |

## 数据口径

页面上的数字全部来自简历中的项目复盘：2.1 亿曝光、327 万互动、超额 367% / 834% 完成 KPI、CPM 14.29 元、CPE 0.92 元。

对外投递前请再核对一遍，**不要为了好看改大数字**——面试时被追问细节会很难看。

页面默认不展示手机号，避免公开仓库被爬取；需要展示时在 `content.js` 的 `contact` 里自己加。

## 重新部署（可选）

仓库已连好 GitHub Pages，直接改文件提交即可，不需要额外部署步骤。如需从本机整包覆盖：

```bash
python deploy.py --token <新的 PAT>
```

`deploy.py` 走 GitHub REST API，会自动跳过部署脚本、`.workbuddy` 等本地文件。

## 文件结构

```
index.html                 页面骨架
assets/css/style.css       全部样式（含纯 CSS 案例封面）
assets/js/content.js       ★唯一内容源
assets/js/main.js          渲染与交互
assets/img/                图片目录（二维码、案例图放这里）
.nojekyll                  跳过 Jekyll 处理
```
