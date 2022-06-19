// ==UserScript==
// @name         FH Aachen Video Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Creates Button to download lectures from FH-Aachen
// @author       You
// @match        https://video.fh-aachen.de/*/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fh-aachen.de
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let interval = setInterval(() => {
        let videoPlayerElement = document.getElementById("videojsPlayer_html5_api");
        if(videoPlayerElement.src != null){
            let siteContent = document.getElementById("siteContent");
            const srcText = videoPlayerElement.src;
            let aHref = document.createElement("a");
            aHref.setAttribute("href", srcText);
            aHref.innerHTML = "Download Video";
            siteContent.appendChild(aHref);
            clearInterval(interval);
        }
    }, 100);
})();