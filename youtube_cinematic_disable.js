// ==UserScript==
// @name         [YT] Disable Cinematics Shadow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  disables blurry cinematics shadow in youtube
// @author       you
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let interval = null;
    let tries = 20;
    let tried = 0;
    interval = setInterval(() => {
       tried++;
       console.log("[YT] Disable Cinematics Shadow");
       let el = document.getElementById("cinematics");
       if(null !== el){
         el.remove();
         clearInterval(interval);
       }else if(tried === tries){
          clearInterval(interval);
       }
    }, 500)
})();