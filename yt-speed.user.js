// ==UserScript==
// @name        More YouTube Player Speed Options
// @namespace   Timbals
// @match       *://www.youtube.com/*
// @grant       none
// @version     1.0.0
// @author      Tim Balsfulland
// @description Adds more playback speed options to the YouTube player (up to 8x)
// ==/UserScript==
(function () {
    'use strict';

    function apply() {
        const getMorePlaybackRates = function () {
            return [0.25, 0.5, .75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5, 6, 7, 8]
        };
        const queue = [window._yt_player];
        while (queue.length > 0) {
            const obj = queue.shift();
            console.log(obj);
            if (obj?.prototype?.getAvailablePlaybackRates !== undefined) {
                obj.prototype.getAvailablePlaybackRates = getMorePlaybackRates;
                return;
            } else if (obj) {
                for (const key in obj) {
                    try {
                        queue.push(obj[key]);
                    } catch {
                        // some keys are not allowed to be accessed
                    }
                }
            }
        }
    }

    // apply on the initial page load
    apply();

    // re-apply when a navigation event is fired, because YouTube is a SPA
    window.addEventListener("yt-navigate-finish", (event) => {
        apply();
    });
})();
