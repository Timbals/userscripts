// ==UserScript==
// @name        More YouTube Player Speed Options
// @namespace   Timbals
// @match       *://www.youtube.com/*
// @grant       none
// @version     1.0.0
// @author      Tim Balsfulland
// @description Adds more playback speed options to the YouTube player (up to 8x)
// ==/UserScript==
(function() {
  'use strict';

  function apply() {
    var done = false;

    // recursively search for the function to be replaced
    function replaceFunction(obj, name, f) {
      for (const key in obj) {
        if (key === name) {
          obj[key] = f;
          done = true;
          return;
        } else if (!done && obj[key] !== undefined && obj[key] !== null) {
          replaceFunction(obj[key], name, f);
        }
      }
    };

    replaceFunction(window._yt_player, "getAvailablePlaybackRates", function() { return [0.25, 0.5, .75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5, 6, 7, 8] });
  }

  // apply on the initial page load
  apply();

  // re-apply when a navigation event is fired, because YouTube is a SPA
  window.addEventListener("yt-navigate-finish", (event) => { apply(); });
})();
