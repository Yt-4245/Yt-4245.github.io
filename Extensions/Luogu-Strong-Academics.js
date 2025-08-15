// ==UserScript==
// @name         4245 - 洛谷强力学术
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       Yt_4245
// @icon         https://cdn.luogu.com.cn/upload/usericon/1334245.png
// @description  tuifei breaker
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Yt-4245/Yt-4245.github.io/refs/heads/main/Extensions/Luogu-Strong-Academics.js
// @downloadURL  https://raw.githubusercontent.com/Yt-4245/Yt-4245.github.io/refs/heads/main/Extensions/Luogu-Strong-Academics.js
// @license      MIT
// @run-at       document-start
// ==/UserScript==

(function() {
'use strict';
const ALLOW_RULES = [
    /^https:\/\/(www\.)?luogu\.com\.cn\/?$/i,
    /^https:\/\/(www\.)?luogu\.com\.cn\/problem(\/list)?/i,
    /^https?:\/\/.*\.?deepseek\.com\/.*/i,
    /^https?:\/\/.*\.?doubao\.com\/.*/i,
    /^https:\/\/fanyi\.baidu\.com\/.*/i,
    /^https:\/\/www\.baidu\.com\/s\?.*wd=.*/i,
    /^https:\/\/(ai|chat|knowledge)\.baidu\.com\/.*/i
];

function shouldAllow() {
    const currentURL = window.location.href.toLowerCase();
    return ALLOW_RULES.some(regex => regex.test(currentURL));
}
if (!shouldAllow()) {
    console.warn('[学术模式] 拦截非学习网站:', window.location.href);
    window.location.replace('https://www.luogu.com.cn/problem/list');
}
})();
