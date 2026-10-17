# 琦琦 · 媒介投放作品集

纯静态单页作品集，零构建、零外链依赖。内容全部集中在 `assets/js/content.js`。

## 本地预览

```bash
cd D:/AIProjects/qiqiWeb
python -m http.server 8000
```

浏览器打开 http://localhost:8000 。也可以直接双击 `index.html`（`file://` 同样可用）。

## 替换清单

改完保存，刷新页面即生效。改完后建议全文搜一遍「待补充」和「某」，确认没有遗漏。

| 要改什么 | 位置 | 怎么改 |
|---|---|---|
| 微信二维码 | `content.js` → `contact.wechatQr` | 把二维码图片放到 `assets/img/wechat.png`，值改成 `"assets/img/wechat.png"` |
| 补充第三个案例 | `content.js` → `pendingCases` | 按 `cases` 里已有的结构加一条，并把 `pendingCases` 对应那条删掉 |
| 案例配图 | `content.js` → `cases[].cover.image` | 填图片路径，如 `"assets/img/case-01.jpg"`；留空则用程序生成的渐变封面 |
| 标题 / 自我介绍 / 数据 | `content.js` 各字段 | 直接改文字，注意保持引号和逗号完整 |
| 邮箱 | `content.js` → `contact.email` | 同时改 `index.html` 里 `<meta name="description">` 和 `<noscript>` 中的邮箱 |
| 公司全称 / 时间 | `content.js` → `about.timeline` | 简历解析可能有缺字，务必核对一次 |

## 数据口径

页面上的数字全部来自简历中的项目复盘：2.1 亿曝光、327 万互动、超额 367% / 834% 完成 KPI、CPM 14.29 元、CPE 0.92 元。
对外投递前请再核对一遍，**不要为了好看改大数字**——面试时被追问细节会很难看。

页面默认不展示手机号，避免公开仓库爬取；需要展示时在 `contact` 里自己加。

## 发布

站点托管在 GitHub Pages，仓库为公开仓库，部署由 `deploy.py` 通过 GitHub API 完成（本机无法直连 github.com，只能走 api.github.com）。

再次发布时：

```bash
python deploy.py --token <你的 PAT>
```

或只改文案时用 Contents API 单独更新 `assets/js/content.js`，不必整包重传。
