# 琦琦 · 品牌媒介作品集

线上地址：**https://vicky2610.github.io/**

单页作品集，只讲两件事：**做过什么项目** + **用 AI 自己造了什么工具**。纯静态、零构建、零外链依赖。所有文案与数字集中在 `assets/js/content.js`。

## 页面结构（改版后的逻辑）

| 段落 | 回答的问题 | 内容 |
|---|---|---|
| Hero | 你是谁 | 「一个懂技术的品牌媒介」+ 3 个硬数字 + 自建工作台截图 |
| 项目 01–03 | 你做成了什么 | 阿胶 300 万 / 红海冷启 / 两条爆款（36 万赞） |
| AI 工具 | 你怎么做到的 | 媒介工作台（3 张截图）+ 抖音数据采集（表格 · 日志 · 趋势） |
| 关于 | 你的底子 | 履历 2 行 + 服务品类 + 工作方式 |
| 联系 | 怎么找你 | 邮箱 + 微信 |

删掉的：六项能力卡、AI 五步流程、品类矩阵、待补充案例、平台工具清单。能力写进案例动作里，不再单独自述。

## 怎么改内容（最省事的方式）

直接在 GitHub 网页上改，改完自动发布：

1. 打开 https://github.com/vicky2610/vicky2610.github.io/blob/main/assets/js/content.js
2. 点右上角铅笔图标编辑
3. 保持引号、逗号、括号完整，改完点 **Commit changes**
4. 等 1–3 分钟刷新网站

## 本地预览

```bash
cd D:/AIProjects/qiqiWeb
python -m http.server 8000
```

打开 http://localhost:8000 。也可以直接双击 `index.html`。

## 替换清单

| 要改什么 | 位置 | 怎么改 |
|---|---|---|
| 微信二维码 | `content.js` → `contact.wechatQr` | 图片放到 `assets/img/wechat.png`，值改成 `"assets/img/wechat.png"` |
| 首屏截图 | `content.js` → `hero.shot` | 换成新截图时同步改 `w` / `h`，否则会变形 |
| 工具截图 | `content.js` → `tools[0].shots` | 同上；删除某张就从数组里去掉，布局自动适应 |
| 补充案例 | `content.js` → `cases` | 按 `kind:"project"` 的结构加一条；`kind:"hits"` 是爆款双子卡专用 |
| 邮箱 | `content.js` → `contact.email` | 同时改 `index.html` 的 meta description 与 noscript |
| 公司全称 / 时间 | `content.js` → `about.timeline` | 简历解析可能有缺字，务必核对 |

## 图片规范

- 统一放 `assets/img/`，WebP 格式，宽度 1100–1600px，单张控制在 150KB 内
- 当前 4 张：`wb-overview`（Hero）/ `wb-picker`（选人结果）/ `wb-kol`（达人库）/ `wb-cost`（成本反算），合计约 225KB
- 截图统一套浏览器窗口边框，点击可放大查看

## 数据口径

页面数字全部来自简历与项目素材：2.1 亿曝光、327 万互动、超额 367% / 834%、CPM 14.29、CPE 0.92、11.4w + 24.6w 赞（合计 36 万）、60 万预算选出 58.9 万 / 2787 万曝光 / 混合 CPM 21.12。

**不要为了好看改大数字。** 面试被追问细节时很难看。

手机号默认不上页面（公开仓库会被爬）；需要时在 `content.js` 的 `contact` 里自己加。

## 发布

仓库已连好 GitHub Pages，改文件提交即自动发布。需要从本机整包覆盖时：

```bash
python deploy.py --token <新的 PAT>
```

`deploy.py` 走 GitHub REST API（本机 github.com 网页时常不通），会自动跳过 `作品集材料/`、`assets/img/_raw/`、部署脚本与 `.workbuddy/`，并按磁盘内容做整包快照。

## 文件结构

```
index.html                 页面骨架（5 个分区）
assets/css/style.css       全部样式（程序化案例封面、截图窗口、日志、趋势线）
assets/js/content.js       ★唯一内容源
assets/js/main.js          渲染与交互（含点击放大）
assets/img/                4 张 WebP 截图
.nojekyll                  跳过 Jekyll
```
