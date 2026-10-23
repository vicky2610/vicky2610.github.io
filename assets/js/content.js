/* =========================================================
 * 站点唯一内容源 —— 改文案只改这个文件
 * 结构：Hero（你是谁）→ 亮点项目 → AI 工具 → 联系
 * 原则：只写能被追问的细节；装饰性内容一律不放
 * ========================================================= */

window.SITE_DATA = {
  site: {
    name: "林嘉琦",
    nick: "琦琦",
    initials: "JQ",
    role: "品牌媒介",
    tag: "懂技术的品牌媒介",
    city: "深圳",
    years: "3",
    seoTitle: "琦琦｜懂技术的品牌媒介 · 抖音 / 小红书投放",
    seoDesc:
      "3 年乙方全案投放。300 万预算做出 2.1 亿抖音曝光，CPE 0.92 元；用 AI 做了媒介工作台和抖音数据采集工具。",
    ogTitle: "一个懂技术的品牌媒介",
    ogDesc: "300 万预算投出 2.1 亿抖音曝光；把重复的活儿交给 AI 写成工具。"
  },

  nav: [
    { label: "亮点项目", href: "#cases" },
    { label: "自媒体", href: "#selfmedia" },
    { label: "AI 工具", href: "#tools" }
  ],

  hero: {
    eyebrow: "MEDIA BUYER · 3 YEARS · SHENZHEN",
    title: { pre: "一个", accent: "懂技术", post: "的品牌媒介" },
    sub:
      "3 年乙方全案，抖音 / 小红书。计算机教育背景，以结果为导向，用理工科思维复盘，使用AI工具提高工作效能。",
    ctas: [
      { label: "看项目", href: "#cases", primary: true },
      { label: "看工具", href: "#tools", primary: false }
    ],
    numbers: [
      { v: "2.1 亿", k: "单项目抖音曝光", n: "超额 367% 完成 KPI" },
      { v: "0.92 元", k: "互动成本 CPE", n: "同期 CPM 14.29 元" },
      { v: "24.6w", k: "单条内容最高赞", n: "广东本地场景大爆款" }
    ],
    facts: [
      { k: "背景", v: "计算机本科" },
      { k: "平台", v: "抖音 / 小红书" },
      { k: "经验", v: "3 年乙方全案" }
    ],
    shot: {
      src: "assets/img/wb-overview.webp",
      w: 1600,
      h: 1311,
      alt: "媒介工作台总览（演示数据）",
      cap: "用AI写的媒介工作台·总览",
      meta: "作为演示，图中均为虚假数据"
    }
  },

  casesTitle: {
    index: "01",
    eyebrow: "SELECTED WORK",
    title: "亮点项目",
    desc: ""
  },

  cases: [
    {
      kind: "project",
      no: "01",
      meta: ["滋补食品 · 阿胶", "300 万预算", "3 个月"],
      title: "300 万预算，做出 2.1 亿抖音曝光",
      background:
        "品类认知门槛高、决策链长。目标是用 3 个月把品类声量在抖音做起来，同时带动搜索与转化，而不是只买一波曝光。",
      actions: [
        "分层达人矩阵：头部造势、腰部铺量、尾部做搜索承接",
        "测试—放量两阶段模型：小预算跑通素材与人群，再集中放量",
        "内容风控 + 冷启动投流，控制翻车与空跑成本"
      ],
      results: [
        { label: "总曝光", value: "2.1 亿", note: "超额 367% 完成 KPI" },
        { label: "总互动", value: "327 万", note: "超额 834% 完成 KPI" },
        { label: "CPM / CPE", value: "14.29 / 0.92", note: "显著优于行业大盘" }
      ],
      outcome: "KPI 达标后，品牌方将后续投放继续交由我方执行。",
      tags: ["抖音", "达人矩阵", "测试放量", "滋补食品"],
      cover: {
        brand: "滋补食品",
        c1: "#FF7A1A",
        c2: "#FF3D5A",
        pattern: "rings",
        glyph: "01",
        label: "300W · 2.1亿"
      }
    },
    {
      kind: "project",
      no: "02",
      meta: ["红海品类", "新品冷启动"],
      title: "头部垄断的赛道，用尾部账号 + 热点内容破局",
      background:
        "头部品牌垄断流量，常规达人投放 ROI 起不来，初期数据不达预期。",
      actions: [
        "不与头部正面抢量，转投尾部账号 + 热点内容",
        "低成本高频测试，找出可复制的爆款结构",
        "批量复刻爆款模式，填补前期投放缺口"
      ],
      results: [
        { label: "单条内容", value: "万赞", note: "从日常百赞突破" },
        { label: "内容爆发力", value: "50 倍+", note: "相比原有内容结构" },
        { label: "整体 KPI", value: "达标", note: "前期缺口被填平" }
      ],
      outcome: "沉淀出红海品类新品低成本破圈的可复用方法论。",
      tags: ["红海品类", "低成本破圈", "爆款复刻"],
      cover: {
        brand: "红海品类",
        c1: "#0F766E",
        c2: "#123C38",
        pattern: "grid",
        glyph: "02",
        label: "冷启破圈"
      }
    },
    {
      kind: "hits",
      no: "03",
      title: "两条爆款内容，36 万赞",
      sub: "不是运气，是同一套「人群 × 账号」判断。",
      items: [
        {
          likes: "11.4w",
          category: "滋补品",
          platform: "抖音",
          angle: "从失眠这个痛点场景切入，用科普达人讲清原理，再自然带出产品",
          why: "专业账号做背书，失眠人群基数大——话题天然有人听",
          shot: {
            src: "assets/img/hit-1.webp",
            w: 560,
            h: 998,
            alt: "失眠科普内容截图，11.4 万赞"
          }
        },
        {
          likes: "24.6w",
          category: "药酒",
          platform: "抖音",
          angle: "合作粤文化搞笑账号，从广东人的共鸣场景讲产品的含金量",
          why: "先扒达人往期爆款，复用已被验证的表达结构，而不是从零想创意",
          shot: {
            src: "assets/img/hit-2.webp",
            w: 560,
            h: 996,
            alt: "广东人共鸣内容截图，24.6 万赞"
          }
        }
      ],
      takeaway: "两条的共性：先定人群的最大公约数，再找能把它说透的账号。"
    }
  ],

  selfTitle: {
    index: "02",
    eyebrow: "SELF-MEDIA",
    title: "Gap 期间，自己的号也在跑",
    desc:
      "离职这段时间没停手：自己开抖音和小红书，选题、脚本、拍摄、剪辑、发布全流程自己做。4 条内容合计 3.7 万赞，抖音两条合计 214 万播放。"
  },

  selfmedia: [
    {
      platform: "抖音",
      tag: "数码",
      title: "18 这个功能也太好用了吧",
      likes: "3.2w",
      meta: "179.8w 播放 · 1,133 评论",
      shot: { src: "assets/img/self-2.webp", w: 480, h: 956, alt: "抖音数码内容截图，3.2 万赞" }
    },
    {
      platform: "抖音",
      tag: "探店",
      title: "沉浸式体验深圳湾 800+ 的板前料理",
      likes: "1,326",
      meta: "34.4w 播放 · 559 收藏",
      shot: { src: "assets/img/self-1.webp", w: 480, h: 956, alt: "抖音探店 vlog 截图，1,326 赞" }
    },
    {
      platform: "小红书",
      tag: "便利店",
      title: "薄巧脑袋在便利店看到这个",
      likes: "3,020",
      meta: "19.4w 浏览 · 758 收藏",
      shot: { src: "assets/img/self-3.webp", w: 480, h: 956, alt: "小红书便利店笔记截图，3,020 赞" }
    },
    {
      platform: "小红书",
      tag: "城市打卡",
      title: "免费的！深圳新地标 莫奈花园",
      likes: "669",
      meta: "352 收藏 · 81 评论",
      shot: { src: "assets/img/self-4.webp", w: 480, h: 956, alt: "小红书城市打卡笔记截图，669 赞" }
    }
  ],

  toolsTitle: {
    index: "03",
    eyebrow: "AI × MEDIA",
    title: "用 AI 做的提效工具",
    desc:
      "把个人踩过的坑沉淀成团队能直接用的东西：一张执行表、一个达人库，再把重复机械的活儿交给 AI 写成小工具。目标不是我一个人快，是整个团队少做无用功。"
  },

  tools: [
    {
      id: "workbench",
      name: "媒介工作台",
      lead: "一个品牌媒介的多项目管控台：把「媒介工作流」收进一屏，谁卡在哪、钱花到哪，一眼看得见。",
      features: [
        { t: "项目总览", d: "三环进度，异常自动标红" },
        { t: "达人库", d: "历史 CPM 与履约记录可查" },
        { t: "复盘导出", d: "结论句 + Excel / HTML / PDF" }
      ],
      points: [
        "每张项目卡三道环：时间进度、预算消耗、曝光达成，哪一条单独跑偏就是问题",
        "预警不按时间排，按「会亏多少钱」倒序，第一眼看到的是「这条再不管要亏 11.3 万」",
        "搭一套团队共用的执行表和达人库，选人时由 AI 从历史 CPM、互动率、履约记录里给候选，人只做取舍"
      ],
      shots: [
        {
          src: "assets/img/wb-kol.webp",
          w: 1100,
          h: 688,
          alt: "达人库列表",
          cap: "达人库：报价旁边就是历史 CPM，贵不贵一眼看得出"
        },
        {
          src: "assets/img/wb-cost.webp",
          w: 1100,
          h: 764,
          alt: "预算与 CPM 反算页",
          cap: "CPM 反算：10 万预算、目标 CPM 15 → 667 万曝光，单条报价上限 1.8 万"
        }
      ]
    },
    {
      id: "douyin",
      name: "抖音互动数据采集",
      lead: "在表格里贴入视频链接，自动输出互动数据，并按设定频率持续更新。",
      points: [
        "A 列原样贴抖音分享文案，带表情带话题都不用清洗；右侧自动补点赞、评论、收藏、分享、更新时间",
        "抓不到的写明原因，不留空：视频下架就标「不可见」"
      ],
      table: {
        head: ["视频", "点赞", "评论", "收藏", "分享", "更新时间"],
        rows: [
          ["视频 1", "5,000", "182", "2,409", "815", "10-20 15:40"],
          ["视频 2", "535", "27", "122", "39", "10-20 15:40"],
          ["视频 3", "不可见", "不可见", "不可见", "不可见", "10-20 15:40"]
        ],
        note: "A 列原文一个字没动；视频 3 已下架，所以四个格子写的是「不可见」。"
      }
    }
  ],

  contact: {
    title: "",
    desc: "",
    email: "kikisorang@163.com",
    wechatQr: "assets/img/wechat-qr.jpg",
    wechatFallback: "二维码待补充",
    wechatNote: "",
    status: "可立即到岗",
    location: "深圳 · 可接受出差"
  },

  footer: {
    note: "本页数据来自个人项目复盘，客户名称按合规要求隐去。",
    updated: "2026.10"
  }
};
