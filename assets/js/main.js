/* =========================================================
 * 渲染与交互 —— 内容全部来自 content.js 的 window.SITE_DATA
 * 结构：Hero / 项目 / AI 工具 / 关于 / 联系
 * ========================================================= */
(function () {
  "use strict";

  var D = window.SITE_DATA;
  if (!D) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- 图标（只保留实际用到的） ---------------- */
  var ICONS = {
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 8 8 5.4L20 8"/></svg>',
    arrow:
      '<svg class="btn__arrow" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg>',
    badge:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.2 4.2L19 7"/></svg>'
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
  function secHead(t) {
    return (
      '<div class="sec-head reveal">' +
      '<div class="idx">' + esc(t.index) + " / " + esc(t.eyebrow) + "</div>" +
      "<h2>" + esc(t.title) + "</h2>" +
      (t.desc ? "<p>" + esc(t.desc) + "</p>" : "") +
      "</div>"
    );
  }

  /* ---------------- 导航 ---------------- */
  function renderNav() {
    var links = D.nav.map(function (n) {
      return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
    }).join("");
    setHTML("navLinks", links);
    setHTML(
      "mobileMenu",
      D.nav.map(function (n) {
        return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
      }).join("") + '<a href="#contact" style="color:var(--accent-deep);font-weight:600">聊聊机会 →</a>'
    );
    var mark = document.getElementById("brandMark");
    if (mark) mark.textContent = D.site.initials;
    var bt = document.getElementById("brandText");
    if (bt) bt.innerHTML = esc(D.site.nick) + "<em>" + esc(D.site.role) + "</em>";
  }

  /* ---------------- Hero ---------------- */
  function renderHero() {
    var h = D.hero;

    var ctas = h.ctas.map(function (c) {
      return (
        '<a class="btn ' + (c.primary ? "btn--primary" : "btn--ghost") + '" href="' + esc(c.href) + '">' +
        esc(c.label) + ICONS.arrow + "</a>"
      );
    }).join("");

    var numbers = h.numbers.map(function (n) {
      return (
        '<div class="kpi-inline">' +
        '<div class="kpi-v">' + esc(n.v) + "</div>" +
        '<div class="kpi-k">' + esc(n.k) + "</div>" +
        '<div class="kpi-n">' + esc(n.n) + "</div>" +
        "</div>"
      );
    }).join("");

    var facts = h.facts.map(function (f) {
      return '<li><span class="k">' + esc(f.k) + '</span><span class="v">' + esc(f.v) + "</span></li>";
    }).join("");

    var s = h.shot;
    var shotHTML = s ? (
      '<figure class="shot shot--hero reveal" style="transition-delay:.18s">' +
        '<div class="window">' +
          '<div class="window-bar"><i></i><i></i><i></i><span class="window-url">media-workbench.local</span></div>' +
          '<div class="shot-frame" style="aspect-ratio:' + s.w + "/" + s.h + '">' +
            '<img src="' + esc(s.src) + '" width="' + s.w + '" height="' + s.h + '" alt="' + esc(s.alt) + '"' +
            ' fetchpriority="high" decoding="async" />' +
          "</div>" +
        "</div>" +
        '<figcaption class="shot-cap"><b>' + esc(s.cap) + "</b><span>" + esc(s.meta) + "</span></figcaption>" +
      "</figure>"
    ) : "";

    setHTML(
      "heroMount",
      '<div class="hero-grid">' +
        '<div class="hero-copy">' +
          '<p class="eyebrow reveal">' + esc(h.eyebrow) + "</p>" +
          '<h1 class="hero-title reveal" style="transition-delay:.06s">' +
            esc(h.title.pre) + '<span class="accent">' + esc(h.title.accent) + "</span>" + esc(h.title.post) +
          "</h1>" +
          '<p class="hero-sub reveal" style="transition-delay:.1s">' + esc(h.sub) + "</p>" +
          '<div class="kpi-row reveal" style="transition-delay:.14s">' + numbers + "</div>" +
          '<div class="hero-actions reveal" style="transition-delay:.2s">' + ctas + "</div>" +
          '<ul class="hero-facts reveal" style="transition-delay:.24s">' + facts + "</ul>" +
        "</div>" +
        shotHTML +
      "</div>"
    );
  }

  /* ---------------- 项目（普通案例 + 爆款双子卡） ---------------- */
  function renderProjectCard(c, i) {
    var cover = c.cover || {};
    var results = c.results.map(function (r) {
      return (
        '<div class="result">' +
        '<div class="result-v">' + esc(r.value) + "</div>" +
        '<div class="result-k">' + esc(r.label) + "</div>" +
        '<div class="result-n">' + esc(r.note || "") + "</div>" +
        "</div>"
      );
    }).join("");
    var actions = c.actions.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("");
    var tags = c.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    var meta = c.meta.map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");

    return (
      '<article class="case' + (i % 2 ? " case--flip" : "") + ' reveal">' +
        '<div class="case-cover" style="--h:' + (i * 47) % 360 + ";--c1:" + cover.c1 + ";--c2:" + cover.c2 + '"' +
          ' data-pattern="' + (cover.pattern || "grid") + '">' +
          '<span class="case-cover-label">' + esc(cover.label || "") + "</span>" +
          '<span class="case-cover-brand">' + esc(c.meta[0]) + "</span>" +
          '<span class="case-glyph" aria-hidden="true">' + esc(cover.glyph || "") + "</span>" +
        "</div>" +
        '<div class="case-body">' +
          '<div class="case-meta">' + meta + "</div>" +
          "<h3>" + esc(c.title) + "</h3>" +
          '<p class="case-challenge"><b>背景：</b>' + esc(c.background) + "</p>" +
          '<p class="case-sub">做了什么</p>' +
          '<ul class="case-actions">' + actions + "</ul>" +
          '<div class="case-results">' + results + "</div>" +
          '<div class="case-foot">' + ICONS.badge + "<span>" + esc(c.outcome) + "</span></div>" +
          '<ul class="tags">' + tags + "</ul>" +
        "</div>" +
      "</article>"
    );
  }

  function renderHitsCard(c) {
    var items = c.items.map(function (it) {
      return (
        '<div class="hit">' +
          '<div class="hit-left">' +
            '<div class="hit-num">' + esc(it.likes) + '<em>赞</em></div>' +
            '<div class="hit-tag">' + esc(it.category) + " · " + esc(it.platform) + "</div>" +
          "</div>" +
          '<div class="hit-body">' +
            '<p><b>角度</b>' + esc(it.angle) + "</p>" +
            '<p><b>为什么成</b>' + esc(it.why) + "</p>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    return (
      '<article class="case case--hits reveal">' +
        '<div class="case-body">' +
          '<div class="case-meta"><span>' + esc(c.no) + '</span><span>内容爆款</span><span>抖音</span></div>' +
          "<h3>" + esc(c.title) + "</h3>" +
          '<p class="case-subline">' + esc(c.sub) + "</p>" +
          '<div class="hits">' + items + "</div>" +
          '<div class="hits-takeaway">' + esc(c.takeaway) + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderCases() {
    var html = D.cases.map(function (c, i) {
      return c.kind === "hits" ? renderHitsCard(c) : renderProjectCard(c, i);
    }).join("");
    setHTML("casesMount", secHead(D.casesTitle) + '<div class="cases">' + html + "</div>");
  }

  /* ---------------- AI 工具 ---------------- */
  function renderShot(s, i) {
    if (!s || !s.src) return "";
    return (
      '<figure class="shot' + (s.size === "lg" ? " shot--lg" : "") + ' reveal">' +
        '<div class="window">' +
          '<div class="window-bar"><i></i><i></i><i></i><span class="window-url">media-workbench.local</span></div>' +
          '<div class="shot-frame" style="aspect-ratio:' + s.w + "/" + s.h + '">' +
            '<img src="' + esc(s.src) + '" width="' + s.w + '" height="' + s.h + '" alt="' + esc(s.alt) + '"' +
            ' loading="lazy" decoding="async" />' +
          "</div>" +
        "</div>" +
        '<figcaption class="shot-cap"><span class="shot-no">图 ' + (i + 1) + "</span>" + esc(s.cap) +
        ' <span class="shot-hint">点击放大</span></figcaption>' +
      "</figure>"
    );
  }

  function renderSpark(t) {
    var vals = t.values || [];
    if (vals.length < 2) return "";
    var w = 340, hgt = 96, pad = 8;
    var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
    var span = max - min || 1;
    var pts = vals.map(function (v, i) {
      var x = pad + (i * (w - pad * 2)) / (vals.length - 1);
      var y = hgt - pad - ((v - min) / span) * (hgt - pad * 2);
      return [x, y];
    });
    var line = pts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ");
    var area = "M" + pts[0][0].toFixed(1) + "," + (hgt - pad) +
      " L" + pts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" L ") +
      " L" + pts[pts.length - 1][0].toFixed(1) + "," + (hgt - pad) + " Z";

    var dots = pts.map(function (p) {
      return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.4" />';
    }).join("");

    var labels = (t.labels || []).map(function (l, i) {
      var x = pad + (i * (w - pad * 2)) / ((t.labels.length - 1) || 1);
      return '<text x="' + x.toFixed(1) + '" y="' + (hgt + 14) + '" text-anchor="middle">' + esc(l) + "</text>";
    }).join("");

    return (
      '<figure class="spark reveal">' +
        '<svg viewBox="0 0 ' + w + " " + (hgt + 22) + '" role="img" aria-label="4 天点赞趋势">' +
          '<path class="spark-area" d="' + area + '"></path>' +
          '<polyline class="spark-line" points="' + line + '"></polyline>' +
          '<g class="spark-dots">' + dots + "</g>" +
          '<g class="spark-labels">' + labels + "</g>" +
        "</svg>" +
        '<figcaption class="spark-cap">' + esc(t.caption) + "</figcaption>" +
      "</figure>"
    );
  }

  function renderTable(t) {
    var head = t.head.map(function (h, i) {
      return "<th" + (i === 5 ? ' class="col-new"' : "") + ">" + esc(h) + "</th>";
    }).join("");
    var rows = t.rows.map(function (r) {
      var tds = r.map(function (c, i) {
        var cls = [];
        if (i > 0 && i < 5) cls.push("num");
        if (i === 5) cls.push("col-new");
        if (c === "不可见") cls.push("dim");
        return "<td" + (cls.length ? ' class="' + cls.join(" ") + '"' : "") + ">" + esc(c) + "</td>";
      }).join("");
      return "<tr>" + tds + "</tr>";
    }).join("");
    return (
      '<div class="dt-wrap reveal">' +
        '<table class="dt"><thead><tr>' + head + "</tr></thead><tbody>" + rows + "</tbody></table>" +
        '<p class="dt-note">' + esc(t.note) + "</p>" +
      "</div>"
    );
  }

  function renderLogs(logs) {
    var rows = logs.map(function (l) {
      return (
        '<div class="log-row log-row--' + esc(l.state || "ok") + '">' +
          '<span class="log-t">' + esc(l.t) + "</span>" +
          '<span class="log-msg">' + esc(l.msg) + "</span>" +
        "</div>"
      );
    }).join("");
    return '<div class="log reveal"><div class="log-head">RUN LOG · 2026-09-23</div>' + rows + "</div>";
  }

  function renderTool(t, idx) {
    var stats = t.stats.map(function (s) {
      return '<div class="tool-stat"><b>' + esc(s.v) + "</b><span>" + esc(s.k) + "</span></div>";
    }).join("");

    var points = t.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
    var shots = (t.shots || []).map(renderShot).join("");

    var extra = "";
    if (t.table) {
      extra +=
        '<div class="tool-grid">' +
          '<div class="tool-col">' + renderTable(t.table) + "</div>" +
          '<div class="tool-col">' + (t.logs ? renderLogs(t.logs) : "") + (t.trend ? renderSpark(t.trend) : "") + "</div>" +
        "</div>";
    }
    if (t.reuse) {
      extra +=
        '<div class="reuse reveal"><span class="reuse-k">同一套逻辑，换张表就能用</span>' +
        '<ul class="chips">' + t.reuse.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul></div>";
    }

    return (
      '<article class="tool reveal" id="tool-' + esc(t.id) + '">' +
        '<div class="tool-head">' +
          "<div>" +
            '<div class="tool-kicker">TOOL 0' + (idx + 1) + " · 自己做的</div>" +
            "<h3>" + esc(t.name) + "</h3>" +
            '<p class="tool-lead">' + esc(t.lead) + "</p>" +
          "</div>" +
          '<div class="tool-stats" style="--cols:' + Math.min(t.stats.length, 4) + '">' + stats + "</div>" +
        "</div>" +
        '<ul class="tool-points">' + points + "</ul>" +
        '<div class="judgement"><span class="judgement-k">' + esc(t.judgement.label) + "</span>" +
          "<p>" + esc(t.judgement.text) + "</p></div>" +
        (shots ? '<div class="tool-shots">' + shots + "</div>" : "") +
        extra +
        (t.limit ? '<p class="tool-limit">' + esc(t.limit) + "</p>" : "") +
      "</article>"
    );
  }

  function renderTools() {
    var html = D.tools.map(renderTool).join("");
    setHTML("toolsMount", secHead(D.toolsTitle) + '<div class="tools">' + html + "</div>");
  }

  /* ---------------- 关于 ---------------- */
  function renderAbout() {
    var a = D.about;
    var tl = a.timeline.map(function (t) {
      return (
        "<li>" +
          '<div class="tl-period">' + esc(t.period) + "</div>" +
          '<div class="tl-org">' + esc(t.org) + "</div>" +
          '<div class="tl-role">' + esc(t.role) + "</div>" +
        "</li>"
      );
    }).join("");
    var cats = a.categories.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
    var how = a.how.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");

    setHTML(
      "aboutMount",
      secHead(D.aboutTitle) +
        '<div class="about-grid">' +
          '<div class="about-copy reveal"><p class="about-lead">' + esc(a.lead) + "</p>" +
            '<ul class="timeline">' + tl + "</ul></div>" +
          '<div class="about-side">' +
            '<div class="side-line reveal"><span class="side-k">服务品类</span><ul class="chips">' + cats + "</ul></div>" +
            '<div class="side-line reveal"><span class="side-k">工作方式</span><ul class="how">' + how + "</ul></div>" +
          "</div>" +
        "</div>"
    );
  }

  /* ---------------- 联系 ---------------- */
  function renderContact() {
    var c = D.contact;
    var qr = c.wechatQr
      ? '<div class="qr-box qr-box--img"><img src="' + esc(c.wechatQr) + '" alt="微信二维码" /></div>'
      : '<div class="qr-box">' + esc(c.wechatFallback) + "</div>";

    setHTML(
      "contactMount",
      '<div class="contact-card reveal">' +
        "<div>" +
          '<p class="contact-label">CONTACT</p>' +
          "<h2>" + esc(c.title) + "</h2>" +
          '<p class="lead">' + esc(c.desc) + "</p>" +
          '<div class="mail-row">' +
            '<a class="mail-btn" href="mailto:' + esc(c.email) + '">' + ICONS.mail + esc(c.email) + "</a>" +
            '<button class="copy-btn" type="button" id="copyMail" data-mail="' + esc(c.email) + '">复制邮箱</button>' +
          "</div>" +
          '<div class="contact-meta">' +
            '<span class="pill pill--solid">' + esc(c.status) + "</span>" +
            '<span class="pill">' + esc(c.location) + "</span>" +
          "</div>" +
        "</div>" +
        '<div class="qr-card">' + qr +
          '<div class="qr-title">微信</div>' +
          '<div class="qr-note">' + esc(c.wechatNote) + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function renderFooter() {
    setHTML(
      "footerMount",
      '<div><span class="mono">© ' + esc(D.footer.updated) + " " + esc(D.site.name) + "</span> · " + esc(D.footer.note) + "</div>" +
      '<div class="footer-links"><a href="#top">回到顶部 ↑</a><a href="mailto:' + esc(D.contact.email) + '">邮箱</a></div>'
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

    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a, .mobile-menu a"));
    var sections = ["cases", "tools", "about", "contact"].map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = "#" + en.target.id;
          links.forEach(function (a) {
            a.setAttribute("aria-current", a.getAttribute("href") === id ? "true" : "false");
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { obs.observe(s); });
    }
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add("is-in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(items, function (el) { obs.observe(el); });
  }

  function initShots() {
    Array.prototype.forEach.call(document.querySelectorAll(".shot-frame img"), function (img) {
      img.addEventListener("error", function () {
        var frame = img.parentNode;
        frame.classList.add("is-empty");
        frame.innerHTML = '<span class="shot-missing">截图未加载</span>';
      });
    });
  }

  function initLightbox() {
    var overlay = null;

    function close() {
      if (!overlay) return;
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      var node = overlay;
      overlay = null;
      setTimeout(function () { node.remove(); }, 220);
    }

    document.addEventListener("click", function (e) {
      var img = e.target.closest ? e.target.closest(".shot-frame img") : null;
      if (!img || overlay) return;
      var fig = img.closest(".shot");
      var capEl = fig ? fig.querySelector(".shot-cap") : null;
      var cap = capEl ? capEl.textContent.replace(/^图\s*\d+\s*/, "").replace("点击放大", "").trim() : "";

      overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-label", "截图放大");
      overlay.innerHTML =
        '<img src="' + esc(img.getAttribute("src")) + '" alt="' + esc(img.alt) + '">' +
        (cap ? '<div class="lightbox-cap">' + esc(cap) + "</div>" : "");
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(function () { overlay.classList.add("is-open"); });
      overlay.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
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
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(mail).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------------- 启动 ---------------- */
  renderNav();
  renderHero();
  renderCases();
  renderTools();
  renderAbout();
  renderContact();
  renderFooter();

  initNav();
  initReveal();
  initShots();
  initLightbox();
  initCopy();

  // 预览辅助：?scroll=1200 可直接定位，便于截图自查
  var sm = location.search.match(/[?&]scroll=(\d+)/);
  if (sm) window.scrollTo({ top: parseInt(sm[1], 10), behavior: "instant" });
})();
