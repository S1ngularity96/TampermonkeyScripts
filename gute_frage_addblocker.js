// ==UserScript==
// @name         PopUp Werbeblocker
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gutefrage.net/*
// @match        https://www.aachener-nachrichten.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.totaladblock.com/
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  let interval;
  let possibleIds = ["wl-container"]
  interval = setInterval(() => {
    possibleIds.forEach((id) => {
        const wlContainer = document.getElementById(id);
        if (wlContainer !== null) {
            console.log(`Tampermonkey: remove popup from container ${id}`);
            wlContainer.remove();
            clearInterval(interval);
        }
    });
  }, 100);
  //clear interval if no container found
  setTimeout(() => {clearInterval(interval);}, 10000)
})();
