// ==UserScript==
// @name         Gute Frage Addblocker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.gutefrage.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gutefrage.net
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  let interval;
  const id = "wl-container";
  interval = setInterval(() => {
    const wlContainer = document.getElementById(id);
    if (wlContainer !== null) {
      console.log(`Tampermonkey: remove pop from container ${id}`);
      wlContainer.remove();
      clearInterval(interval);
    }
  }, 100);
})();
