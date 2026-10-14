/* mono-toolbox — six offline tools, zero dependencies. */
(function () {
  "use strict";
  var root = document.documentElement;

  /* theme ------------------------------------------------------------------ */
  var storedTheme = localStorage.getItem("mono-theme");
  if (storedTheme) root.setAttribute("data-theme", storedTheme);

  var themeBtn = document.getElementById("theme-toggle");
  function effectiveTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("mono-theme", next);
    });
  }

  /* i18n ------------------------------------------------------------------- */
  var i18n = {
    en: {
      skip: "Skip to tools", navTools: "Tools", navPrivacy: "Privacy",
      offlineBadge: "100% offline", title: "Developer toolbox",
      subtitle: "Six practical tools that run entirely in your browser. Nothing leaves your device — no network calls, no tracking.",
      shortcuts: "Shortcuts: Alt+1–6 switch tabs · Ctrl+Enter runs the active tool",
      input: "Input", output: "Output", text: "Text", base64: "Base64",
      format: "Format", minify: "Minify", validate: "Validate", copy: "Copy", clear: "Clear", copyAll: "Copy all",
      encode: "Encode", decode: "Decode", swap: "Swap",
      encodeFull: "Encode (full)", encodeComp: "Encode components",
      compute: "Compute", copyHeader: "Copy header", copyPayload: "Copy payload",
      pattern: "Pattern", flags: "Flags", testText: "Test string", test: "Test", matches: "Matches",
      jsonTitle: "JSON formatter & validator",
      jsonNote: "Uses built-in JSON.parse/stringify — runs locally only.",
      b64Title: "Base64 encode/decode (UTF-8)",
      b64Note: "UTF-8 safe via TextEncoder/TextDecoder.",
      urlTitle: "URL encode/decode",
      hashTitle: "Hash generator (WebCrypto)",
      hashNote: "Uses crypto.subtle.digest (browser-native). SHA-1 included for compatibility only.",
      jwtTitle: "JWT decoder (header & payload)", jwtToken: "JWT token",
      jwtWarnTitle: "Important:",
      jwtWarn: "Signature is not verified here (client-side only). This tool does not send your token anywhere.",
      regexTitle: "Regex tester",
      regexNote: "Runs entirely in your browser with JavaScript RegExp.",
      privacyTitle: "Privacy",
      privacyText: "This page works 100% offline. No HTTP requests are made, no cookies, no analytics, no local tracking beyond your own theme/language preference (stored only in localStorage on your device). All processing happens in your browser tab.",
      proof: "Proof:",
      proofText: "Open DevTools → Network, load this page, run any tool — you'll see zero requests.",
      built: "built without frameworks", toTop: "Back to top ↑",
      okValid: "Valid JSON", okFormatted: "Formatted", okMinified: "Minified",
      errParse: "Parse error", errDecode: "Decode error",
      errInvalidJwt: "Invalid JWT (expected header.payload.signature)",
      errRegex: "Invalid regex", noMatches: "No matches", matchesCount: "Matches: ",
      computed: "Computed", copied: "Copied"
    },
    ru: {
      skip: "Перейти к инструментам", navTools: "Инструменты", navPrivacy: "Приватность",
      offlineBadge: "100% офлайн", title: "Инструментарий разработчика",
      subtitle: "Шесть практичных инструментов, которые работают полностью в браузере. Ничего не уходит с устройства — без запросов в сеть и без трекинга.",
      shortcuts: "Сочетания: Alt+1–6 — переключение вкладок · Ctrl+Enter — запуск активного инструмента",
      input: "Ввод", output: "Вывод", text: "Текст", base64: "Base64",
      format: "Форматировать", minify: "Сжать", validate: "Проверить", copy: "Копировать", clear: "Очистить", copyAll: "Копировать всё",
      encode: "Кодировать", decode: "Декодировать", swap: "Поменять местами",
      encodeFull: "Кодировать (полностью)", encodeComp: "Кодировать компоненты",
      compute: "Посчитать", copyHeader: "Копировать заголовок", copyPayload: "Копировать данные",
      pattern: "Шаблон", flags: "Флаги", testText: "Тестовая строка", test: "Проверить", matches: "Совпадения",
      jsonTitle: "Форматирование и проверка JSON",
      jsonNote: "Использует встроенные JSON.parse/stringify — только локально.",
      b64Title: "Base64 кодирование/декодирование (UTF-8)",
      b64Note: "Корректная работа с UTF-8 через TextEncoder/TextDecoder.",
      urlTitle: "URL-кодирование/декодирование",
      hashTitle: "Генератор хешей (WebCrypto)",
      hashNote: "Использует crypto.subtle.digest (нативно в браузере). SHA-1 добавлен только для совместимости.",
      jwtTitle: "Декодер JWT (заголовок и payload)", jwtToken: "Токен JWT",
      jwtWarnTitle: "Важно:",
      jwtWarn: "Подпись здесь не проверяется (только на стороне клиента). Инструмент никуда не отправляет токен.",
      regexTitle: "Тестер регулярных выражений",
      regexNote: "Выполняется полностью в браузере через JavaScript RegExp.",
      privacyTitle: "Приватность",
      privacyText: "Страница работает на 100% офлайн. HTTP-запросы не отправляются, cookies и аналитика отсутствуют. Сохраняется только выбор темы и языка в localStorage на вашем устройстве. Весь расчёт происходит во вкладке браузера.",
      proof: "Доказательство:",
      proofText: "Открой DevTools → Network, загрузи страницу и запусти любой инструмент — запросов не будет.",
      built: "сделано без фреймворков", toTop: "Наверх ↑",
      okValid: "JSON корректен", okFormatted: "Отформатирован", okMinified: "Сжат",
      errParse: "Ошибка разбора", errDecode: "Ошибка декодирования",
      errInvalidJwt: "Некорректный JWT (ожидается header.payload.signature)",
      errRegex: "Некорректное регулярное выражение", noMatches: "Совпадений нет", matchesCount: "Совпадений: ",
      computed: "Посчитано", copied: "Скопировано"
    }
  };

  var lang = localStorage.getItem("mono-lang") || "en";
  function t(key) { return (i18n[lang] && i18n[lang][key]) || key; }

  function applyLang() {
    root.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-selected", String(b.getAttribute("data-lang") === lang));
    });
  }
  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.getAttribute("data-lang");
      localStorage.setItem("mono-lang", lang);
      applyLang();
    });
  });
  applyLang();

  /* tabs ------------------------------------------------------------------- */
  var toolTabs = [];
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    if (list.classList.contains("tool-tabs")) toolTabs = tabs;
    tabs.forEach(function (tab, i) {
      tab.dataset.tabIndex = String(i + 1);
      tab.addEventListener("click", function () {
        tabs.forEach(function (x) {
          x.setAttribute("aria-selected", "false");
          var p = document.getElementById(x.getAttribute("aria-controls"));
          if (p) p.hidden = true;
        });
        tab.setAttribute("aria-selected", "true");
        var panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) panel.hidden = false;
      });
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 6 && toolTabs[n - 1]) { toolTabs[n - 1].click(); toolTabs[n - 1].focus(); e.preventDefault(); }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      var active = toolTabs.filter(function (x) { return x.getAttribute("aria-selected") === "true"; })[0];
      if (active) {
        var panel = document.getElementById(active.getAttribute("aria-controls"));
        var btn = panel && panel.querySelector(".btn--primary");
        if (btn) { btn.click(); e.preventDefault(); }
      }
    }
  });

  /* helpers ---------------------------------------------------------------- */
  function $(id) { return document.getElementById(id); }
  function setOut(el, text, cls) {
    if (!el) return;
    el.textContent = text || "";
    el.classList.remove("output--ok", "output--warn", "output--err");
    if (cls) el.classList.add(cls);
  }
  function copyText(text) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(fallbackCopy);
    } else { fallbackCopy(); }
    function fallbackCopy() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }
  }
  function hex(buf) {
    return Array.prototype.map.call(new Uint8Array(buf), function (b) {
      return b.toString(16).padStart(2, "0");
    }).join("");
  }
  function b64urlToBytes(s) {
    var b = s.replace(/-/g, "+").replace(/_/g, "/");
    while (b.length % 4) b += "=";
    var bin = atob(b);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  var te = new TextEncoder();
  var td = new TextDecoder();

  /* JSON ------------------------------------------------------------------- */
  var jIn = $("json-input"), jOut = $("json-output"), jStatus = $("json-status");
  $("json-format").addEventListener("click", function () {
    try { setOut(jOut, JSON.stringify(JSON.parse(jIn.value), null, 2), "output--ok"); jStatus.textContent = t("okFormatted"); }
    catch (e) { setOut(jOut, t("errParse") + ": " + e.message, "output--err"); jStatus.textContent = ""; }
  });
  $("json-minify").addEventListener("click", function () {
    try { setOut(jOut, JSON.stringify(JSON.parse(jIn.value)), "output--ok"); jStatus.textContent = t("okMinified"); }
    catch (e) { setOut(jOut, t("errParse") + ": " + e.message, "output--err"); jStatus.textContent = ""; }
  });
  $("json-validate").addEventListener("click", function () {
    try { JSON.parse(jIn.value); setOut(jOut, t("okValid"), "output--ok"); jStatus.textContent = t("okValid"); }
    catch (e) { setOut(jOut, t("errParse") + ": " + e.message, "output--err"); jStatus.textContent = ""; }
  });
  $("json-copy").addEventListener("click", function () { copyText(jOut.textContent); });
  $("json-clear").addEventListener("click", function () { jIn.value = ""; setOut(jOut, ""); jStatus.textContent = ""; });

  /* Base64 ----------------------------------------------------------------- */
  var bIn = $("b64-input"), bOut = $("b64-output"), bStatus = $("b64-status");
  $("b64-encode").addEventListener("click", function () {
    try {
      var bytes = te.encode(bIn.value);
      var bin = "";
      for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      bOut.value = btoa(bin);
      bStatus.textContent = "";
    } catch (e) { bStatus.textContent = t("errDecode"); }
  });
  $("b64-decode").addEventListener("click", function () {
    try {
      var bytes = b64urlToBytes(bOut.value.trim());
      bIn.value = td.decode(bytes);
      bStatus.textContent = "";
    } catch (e) { bStatus.textContent = t("errDecode"); }
  });
  $("b64-swap").addEventListener("click", function () { var x = bIn.value; bIn.value = bOut.value; bOut.value = x; });
  $("b64-copy").addEventListener("click", function () { copyText(bOut.value); });
  $("b64-clear").addEventListener("click", function () { bIn.value = ""; bOut.value = ""; bStatus.textContent = ""; });

  /* URL -------------------------------------------------------------------- */
  var uIn = $("url-input"), uOut = $("url-output"), uStatus = $("url-status");
  function urlRun(fn) { try { uOut.textContent = fn(uIn.value); uStatus.textContent = ""; } catch (e) { uStatus.textContent = t("errDecode"); } }
  $("url-encode").addEventListener("click", function () { urlRun(encodeURI); });
  $("url-enccomp").addEventListener("click", function () { urlRun(encodeURIComponent); });
  $("url-decode").addEventListener("click", function () { urlRun(function (s) { return decodeURIComponent(s.replace(/\+/g, "%20")); }); });
  $("url-copy").addEventListener("click", function () { copyText(uOut.textContent); });
  $("url-clear").addEventListener("click", function () { uIn.value = ""; setOut(uOut, ""); uStatus.textContent = ""; });

  /* Hash ------------------------------------------------------------------- */
  var hIn = $("hash-input"), hStatus = $("hash-status");
  var hFields = { "SHA-1": $("hash-sha1"), "SHA-256": $("hash-sha256"), "SHA-384": $("hash-sha384"), "SHA-512": $("hash-sha512") };
  function computeHashes() {
    var value = hIn.value;
    if (!(window.crypto && crypto.subtle)) { hStatus.textContent = "WebCrypto unavailable"; return; }
    var data = te.encode(value);
    var algo = Object.keys(hFields);
    Promise.all(algo.map(function (a) { return crypto.subtle.digest(a, data); }))
      .then(function (results) {
        results.forEach(function (buf, i) { hFields[algo[i]].value = hex(buf); });
        hStatus.textContent = value ? t("computed") : "";
      })
      .catch(function (e) { hStatus.textContent = e.message; });
  }
  $("hash-compute").addEventListener("click", computeHashes);
  hIn.addEventListener("input", computeHashes);
  $("hash-copy-all").addEventListener("click", function () {
    copyText(Object.keys(hFields).map(function (k) { return k + ": " + hFields[k].value; }).filter(function (s) { return !/: $/.test(s); }).join("\n"));
  });
  $("hash-clear").addEventListener("click", function () {
    hIn.value = "";
    Object.keys(hFields).forEach(function (k) { hFields[k].value = ""; });
    hStatus.textContent = "";
  });

  /* JWT -------------------------------------------------------------------- */
  var jwtIn = $("jwt-input"), jwtH = $("jwt-header"), jwtP = $("jwt-payload"), jwtS = $("jwt-status");
  $("jwt-decode").addEventListener("click", function () {
    try {
      var parts = jwtIn.value.trim().split(".");
      if (parts.length < 2) throw new Error(t("errInvalidJwt"));
      var header = JSON.parse(td.decode(b64urlToBytes(parts[0])));
      var payload = JSON.parse(td.decode(b64urlToBytes(parts[1])));
      setOut(jwtH, JSON.stringify(header, null, 2), "output--ok");
      setOut(jwtP, JSON.stringify(payload, null, 2), "output--ok");
      jwtS.textContent = "";
    } catch (e) {
      setOut(jwtH, "");
      setOut(jwtP, e.message, "output--err");
      jwtS.textContent = "";
    }
  });
  $("jwt-copy-header").addEventListener("click", function () { copyText(jwtH.textContent); });
  $("jwt-copy-payload").addEventListener("click", function () { copyText(jwtP.textContent); });
  $("jwt-clear").addEventListener("click", function () { jwtIn.value = ""; setOut(jwtH, ""); setOut(jwtP, ""); jwtS.textContent = ""; });

  /* Regex ------------------------------------------------------------------ */
  var rxPat = $("rx-pattern"), rxFlg = $("rx-flags"), rxTxt = $("rx-text"), rxM = $("rx-matches"), rxS = $("rx-status");
  function rxRow(text, muted) {
    var d = document.createElement("div");
    d.className = "match" + (muted ? " muted" : "");
    d.textContent = text;
    return d;
  }
  function rxTest() {
    rxM.textContent = "";
    if (!rxPat.value) { rxS.textContent = ""; return; }
    try {
      var flags = rxFlg.value || "";
      var re = new RegExp(rxPat.value, flags.indexOf("g") === -1 ? flags + "g" : flags);
      var matches = [], m;
      while ((m = re.exec(rxTxt.value)) !== null) {
        matches.push(m[0]);
        if (m[0] === "") re.lastIndex++;
        if (matches.length > 5000) break;
      }
      if (!matches.length) { rxM.appendChild(rxRow(t("noMatches"), true)); rxS.textContent = t("noMatches"); return; }
      matches.forEach(function (x) { rxM.appendChild(rxRow(x, false)); });
      rxS.textContent = t("matchesCount") + matches.length;
    } catch (e) {
      var err = rxRow(t("errRegex") + ": " + e.message, false);
      err.style.color = "var(--sev-critical)";
      rxM.appendChild(err);
      rxS.textContent = "";
    }
  }
  $("rx-test").addEventListener("click", rxTest);
  [rxPat, rxFlg, rxTxt].forEach(function (el) { el.addEventListener("input", rxTest); });
  $("rx-clear").addEventListener("click", function () { rxPat.value = ""; rxFlg.value = ""; rxTxt.value = ""; rxM.textContent = ""; rxS.textContent = ""; });

  var yearEl = $("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
