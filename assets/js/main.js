/* =========================================================
 * 渲染与交互
 * 内容全部来自 content.js 的 window.SITE_DATA
 * ========================================================= */
(function () {
  "use strict";

  var D = window.SITE_DATA;
  if (!D) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- 图标 ---------------- */
  var ICONS = {
    target:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
    users:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2"/><path d="M16 5.4a3 3 0 0 1 0 5.6"/><path d="M17.4 14.6c1.9.6 3.2 2.3 3.2 4.4"/></svg>',
    shield:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.5-7 9.4-4.1-1.9-7-5.2-7-9.4V6l7-2.8Z"/><path d="m9 12 2.2 2.2L15.4 10" stroke-linecap="round"/></svg>',
    rocket:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13.4 3.6c3.2-.9 6 .1 6.6.7.6.6 1.6 3.4.7 6.6-1 3.4-5.4 6.2-7.6 7.3l-3-3c1.1-2.2 3.9-6.6 7.3-7.6"/><circle cx="15.2" cy="8.6" r="1.4"/><path d="M9.3 14.7 5.6 13l2-3.1M9.3 14.7l1.7 3.7 3.1-2"/><path d="M6.5 17.5c-1 1-1.4 3-1.4 3s2-.4 3-1.4"/></svg>',
    chart:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 19.5h16"/><rect x="6" y="12" width="3.2" height="5.5" rx="1"/><rect x="11" y="8" width="3.2" height="9.5" rx="1"/><rect x="16" y="4.5" width="3.2" height="13" rx="1"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="m8 12 2.6 2.6L16.2 9"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 8 8 5.4L20 8"/></svg>',
    arrow:
      '<svg class="btn__arrow" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg>',
    badge:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.2 4.2L19 7"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function mount(id) {
    return document.getElementById(id);
  }
  function setHTML(id, html) {
    var el = mount(id);
    if (el) el.innerHTML = html;
  }

  /* ---------------- 导航 ---------------- */
  function renderNav() {
    var links = D.nav
      .map(function (n) {
        return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
      })
      .join("");
    setHTML("navLinks", links);
    setHTML(
      "mobileMenu",
      D.nav
        .map(function (n) {
          return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
        })
        .join("") +
        '<a href="#contact" style="color:var(--accent-deep);font-weight:600">聊聊机会 →</a>'
    );
    var mark = document.getElementById("brandMark");
    if (mark) mark.textContent = D.site.initials;
    var bt = document.getElementById("brandText");
    if (bt) bt.innerHTML = esc(D.site.nick) + "<em>媒介投放</em>";
  }

  /* ---------------- Hero ---------------- */
  function renderHero() {
    var h = D.hero;
    var p = h.panel;

    var ctas = h.ctas
      .map(function (c) {
        return (
          '<a class="btn ' +
          (c.primary ? "btn--primary" : "btn--ghost") +
          '" href="' +
          esc(c.href) +
          '">' +
          esc(c.label) +
          ICONS.arrow +
          "</a>"
        );
      })
      .join("");

    var titleLines = h.titleLines
      .map(function (l) {
        if (l.accent) {
          return (
            '<span class="line">' +
            esc(l.pre || "") +
            '<span class="accent">' +
            esc(l.accent) +
            "</span>" +
            esc(l.post || "") +
            "</span>"
          );
        }
        return '<span class="line">' + esc(l.text) + "</span>";
      })
      .join("");

    var facts = h.facts
      .map(function (f) {
        return '<li><span class="k">' + esc(f.k) + '</span><span class="v">' + esc(f.v) + "</span></li>";
      })
      .join("");

    var kpis = p.kpis
      .map(function (k) {
        return (
          '<div class="kpi"><div class="kpi-top"><span>' +
          esc(k.label) +
          "</span><b>" +
          esc(k.value) +
          '</b></div><div class="kpi-track"><div class="kpi-fill" style="width:' +
          k.bar +
          '%"></div></div></div>'
        );
      })
      .join("");

    var kv = p.kv
      .map(function (i) {
        return (
          '<div class="panel-cell"><div class="k">' +
          esc(i.k) +
          '</div><div class="v">' +
          esc(i.v) +
          "</div></div>"
        );
      })
      .join("");

    setHTML(
      "heroMount",
      '<div class="hero-grid">' +
        '<div class="hero-copy">' +
        '<p class="eyebrow reveal">' +
        esc(h.eyebrow) +
        "</p>" +
        '<h1 class="hero-title reveal" style="transition-delay:.06s">' +
        titleLines +
        "</h1>" +
        '<p class="hero-sub reveal" style="transition-delay:.12s">' +
        esc(h.subtitle) +
        "</p>" +
        '<div class="hero-actions reveal" style="transition-delay:.18s">' +
        ctas +
        "</div>" +
        '<ul class="hero-facts reveal" style="transition-delay:.24s">' +
        facts +
        "</ul>" +
        "</div>" +
        '<aside class="panel reveal" style="transition-delay:.2s" aria-label="项目数据快照">' +
        '<div class="panel-head"><div><p class="panel-title">' +
        esc(p.title) +
        '</p><p class="panel-sub">' +
        esc(p.sub) +
        '</p></div><span class="panel-live">ON TRACK</span></div>' +
        kpis +
        '<div class="panel-grid">' +
        kv +
        "</div>" +
        "</aside>" +
        "</div>"
    );
  }

  /* ---------------- 数据条 ---------------- */
  function renderStats() {
    var html = D.stats
      .map(function (s) {
        var dec = s.decimals || 0;
        return (
          '<div class="stat">' +
          '<div class="stat-num"><span data-count="' +
          s.value +
          '" data-decimals="' +
          dec +
          '">' +
          (0).toFixed(dec) +
          "</span><em>" +
          esc(s.suffix) +
          "</em></div>" +
          '<div class="stat-label">' +
          esc(s.label) +
          '</div><div class="stat-note">' +
          esc(s.note) +
          "</div></div>"
        );
      })
      .join("");
    setHTML("statsMount", '<div class="stats-grid">' + html + "</div>");
  }

  /* ---------------- 区块标题 ---------------- */
  function secHead(t) {
    return (
      '<div class="sec-head reveal">' +
      '<div class="idx">' +
      esc(t.index) +
      " / " +
      esc(t.eyebrow) +
      "</div>" +
      "<h2>" +
      esc(t.title) +
      "</h2>" +
      (t.desc ? "<p>" + esc(t.desc) + "</p>" : "") +
      "</div>"
    );
  }

  /* ---------------- 能力 ---------------- */
  function renderServices() {
    var cards = D.services
      .map(function (s, i) {
        return (
          '<article class="service reveal" style="transition-delay:' +
          i * 0.05 +
          's">' +
          '<div class="service-icon">' +
          (ICONS[s.icon] || ICONS.target) +
          "</div>" +
          "<h3>" +
          esc(s.title) +
          "</h3><p>" +
          esc(s.desc) +
          "</p>" +
          '<ul class="tags">' +
          s.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
          "</ul></article>"
        );
      })
      .join("");
    setHTML("servicesMount", secHead(D.servicesTitle) + '<div class="services-grid">' + cards + "</div>");
  }

  /* ---------------- AI 工作流 ---------------- */
  function renderAI() {
    var cards = D.aiFlow
      .map(function (a, i) {
        return (
          '<article class="ai-card reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="ai-step">STEP ' +
          esc(a.step) +
          "</div>" +
          "<h3>" +
          esc(a.title) +
          "</h3>" +
          '<div class="ai-block ai-block--ai"><b>AI</b>' +
          esc(a.ai) +
          "</div>" +
          '<div class="ai-block ai-block--me"><b>我</b>' +
          esc(a.me) +
          "</div>" +
          '<div class="ai-result">' +
          esc(a.result) +
          "</div></article>"
        );
      })
      .join("");
    setHTML("aiMount", secHead(D.aiTitle) + '<div class="ai-flow">' + cards + "</div>");
  }

  /* ---------------- 案例 ---------------- */
  function renderCases() {
    var real = D.cases
      .map(function (c, i) {
        var cover = c.cover || {};
        var hue = (i * 47) % 360;
        var results = c.results
          .map(function (r) {
            return (
              '<div class="result"><div class="result-v">' +
              esc(r.value) +
              '</div><div class="result-k">' +
              esc(r.label) +
              '</div><div class="result-n">' +
              esc(r.note || "") +
              "</div></div>"
            );
          })
          .join("");
        var actions = c.actions
          .map(function (a) { return "<li>" + esc(a) + "</li>"; })
          .join("");
        var tags = c.tags
          .map(function (t) { return "<li>" + esc(t) + "</li>"; })
          .join("");
        return (
          '<article class="case' +
          (i % 2 ? " case--flip" : "") +
          ' reveal">' +
          '<div class="case-cover" style="--h:' +
          hue +
          ";--c1:" +
          cover.c1 +
          ";--c2:" +
          cover.c2 +
          '" data-pattern="' +
          (cover.pattern || "grid") +
          '">' +
          '<span class="case-cover-label">' +
          esc(cover.label || "") +
          "</span>" +
          '<span class="case-cover-brand">' +
          esc(c.brand) +
          "</span>" +
          '<span class="case-glyph" aria-hidden="true">' +
          esc(cover.glyph || "") +
          "</span>" +
          "</div>" +
          '<div class="case-body">' +
          '<div class="case-meta"><span>' +
          esc(c.category) +
          "</span><span>" +
          esc(c.period) +
          "</span><span>" +
          esc(c.role) +
          "</span></div>" +
          "<h3>" +
          esc(c.title) +
          "</h3>" +
          '<p class="case-challenge"><b>背景：</b>' +
          esc(c.challenge) +
          "</p>" +
          '<p class="case-sub">做了什么</p>' +
          '<ul class="case-actions">' +
          actions +
          "</ul>" +
          '<div class="case-results">' +
          results +
          "</div>" +
          '<div class="case-foot">' +
          ICONS.badge +
          "<span>" +
          esc(c.outcome) +
          "</span></div>" +
          '<ul class="tags">' +
          tags +
          "</ul>" +
          "</div></article>"
        );
      })
      .join("");

    var pending = D.pendingCases
      .map(function (p) {
        return (
          '<article class="case case--pending reveal">' +
          '<div class="case-body">' +
          '<span class="pending-flag">待补充</span>' +
          "<h3>这里还空着一个项目位</h3>" +
          "<p>" +
          esc(p.hint) +
          "</p>" +
          "<p><b>需要的信息：</b>" +
          esc(p.fields) +
          "</p>" +
          "</div></article>"
        );
      })
      .join("");

    setHTML(
      "casesMount",
      secHead(D.casesTitle) +
        '<div class="cases">' +
        real +
        "</div>" +
        (pending ? '<div class="cases-pending">' + pending + "</div>" : "")
    );
  }

  /* ---------------- 品类 ---------------- */
  function renderCategories() {
    function block(title, items) {
      return (
        '<div class="cat-block reveal"><h3>' +
        esc(title) +
        '</h3><ul class="chips">' +
        items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") +
        "</ul></div>"
      );
    }
    setHTML(
      "categoriesMount",
      secHead(D.categoriesTitle) +
        '<div class="cat-grid">' +
        block(D.categories.type, D.categories.items) +
        block(D.scenes.type, D.scenes.items) +
        "</div>"
    );
  }

  /* ---------------- 关于 ---------------- */
  function renderAbout() {
    var a = D.about;

    function tl(items) {
      return items
        .map(function (t) {
          return (
            "<li>" +
            '<div class="tl-period">' +
            esc(t.period) +
            '</div><div class="tl-org">' +
            esc(t.org) +
            "</div>" +
            '<div class="tl-role">' +
            esc(t.role) +
            "</div>" +
            (t.note ? '<div class="tl-note">' + esc(t.note) + "</div>" : "") +
            "</li>"
          );
        })
        .join("");
    }

    var tools = a.tools
      .map(function (t) { return "<li>" + esc(t) + "</li>"; })
      .join("");
    var principles = a.principles
      .map(function (p, i) {
        return (
          "<li><span class=\"n\">0" +
          (i + 1) +
          '</span><div><div class="t">' +
          esc(p.t) +
          '</div><div class="d">' +
          esc(p.d) +
          "</div></div></li>"
        );
      })
      .join("");

    setHTML(
      "aboutMount",
      secHead(D.aboutTitle) +
        '<div class="about-grid">' +
        '<div class="about-copy reveal">' +
        "<p>" +
        esc(a.p1) +
        "</p><p>" +
        esc(a.p2) +
        "</p>" +
        '<ul class="timeline">' +
        tl(a.timeline) +
        tl([a.education]) +
        "</ul></div>" +
        '<div class="about-side">' +
        '<div class="side-card reveal" style="transition-delay:.06s"><h3>常用工具</h3><ul class="chips">' +
        tools +
        "</ul></div>" +
        '<div class="side-card reveal" style="transition-delay:.12s"><h3>我的三条原则</h3><ul class="principles">' +
        principles +
        "</ul></div>" +
        "</div></div>"
    );
  }

  /* ---------------- 联系 ---------------- */
  function renderContact() {
    var c = D.contact;
    var qr = c.wechatQr
      ? '<div class="qr-box"><img src="' + esc(c.wechatQr) + '" alt="微信二维码" /></div>'
      : '<div class="qr-box">' + esc(c.wechatFallback) + "</div>";

    setHTML(
      "contactMount",
      '<div class="contact-card reveal">' +
        "<div>" +
        '<p class="contact-label">CONTACT</p>' +
        "<h2>" +
        esc(c.title) +
        "</h2>" +
        '<p class="lead">' +
        esc(c.desc) +
        "</p>" +
        '<div class="mail-row">' +
        '<a class="mail-btn" href="mailto:' +
        esc(c.email) +
        '">' +
        ICONS.mail +
        esc(c.email) +
        "</a>" +
        '<button class="copy-btn" type="button" id="copyMail" data-mail="' +
        esc(c.email) +
        '">复制邮箱</button>' +
        "</div>" +
        '<div class="contact-meta">' +
        '<span class="pill pill--solid">' +
        esc(c.status) +
        "</span>" +
        '<span class="pill">' +
        esc(c.location) +
        "</span></div>" +
        "</div>" +
        '<div class="qr-card">' +
        qr +
        '<div class="qr-title">微信</div>' +
        '<div class="qr-note">' +
        esc(c.wechatNote) +
        "</div></div>" +
        "</div>"
    );
  }

  function renderFooter() {
    setHTML(
      "footerMount",
      '<div><span class="mono">© ' +
        esc(D.footer.updated) +
        " " +
        esc(D.site.name) +
        "</span> · " +
        esc(D.footer.note) +
        "</div>" +
        '<div class="footer-links"><a href="#top">回到顶部 ↑</a><a href="mailto:' +
        esc(D.contact.email) +
        '">邮箱</a></div>'
    );
  }

  /* ---------------- 交互 ---------------- */
  function initNav() {
    var nav = document.getElementById("nav");
    var burger = document.getElementById("burger");
    var menu = document.getElementById("mobileMenu");

    function onScroll() {
      if (window.scrollY > 8) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = burger.getAttribute("aria-expanded") === "true";
        burger.setAttribute("aria-expanded", String(!open));
        burger.setAttribute("aria-label", open ? "打开菜单" : "关闭菜单");
        menu.hidden = open;
      });
      menu.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          burger.setAttribute("aria-expanded", "false");
          menu.hidden = true;
        }
      });
    }

    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a, .mobile-menu a'));
    var sections = ["services", "ai", "cases", "about", "contact"]
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if ("IntersectionObserver" in window) {
      var navObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            var id = "#" + en.target.id;
            links.forEach(function (a) {
              a.setAttribute("aria-current", a.getAttribute("href") === id ? "true" : "false");
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach(function (s) { navObs.observe(s); });
    }
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add("is-in"); });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    Array.prototype.forEach.call(items, function (el) { obs.observe(el); });
  }

  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
      if (reduceMotion) {
        el.textContent = target.toFixed(dec);
        return;
      }
      var start = performance.now();
      var dur = 1200;
      function tick(now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nums, run);
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            run(en.target);
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    Array.prototype.forEach.call(nums, function (el) {
      obs.observe(el);
      // 首屏已经露出的数字立刻跑，避免部分可见时不触发
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        run(el);
        obs.unobserve(el);
      }
    });
  }

  function initCopy() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("#copyMail") : null;
      if (!btn) return;
      var mail = btn.getAttribute("data-mail");
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "已复制 ✓";
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(mail).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = mail;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (err) { /* 忽略 */ }
        document.body.removeChild(ta);
      }
    });
  }

  /* ---------------- 启动 ---------------- */
  renderNav();
  renderHero();
  renderStats();
  renderServices();
  renderAI();
  renderCases();
  renderCategories();
  renderAbout();
  renderContact();
  renderFooter();

  initNav();
  initReveal();
  initCounters();
  initCopy();

  // 预览辅助：?scroll=1200 可直接定位，便于截图自查
  var sm = location.search.match(/[?&]scroll=(\d+)/);
  if (sm) window.scrollTo({ top: parseInt(sm[1], 10), behavior: "instant" });
})();
