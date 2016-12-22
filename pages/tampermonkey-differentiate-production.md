Use Tampermonkey to Differentiate Production Sites
=============================================================

Ever worry about mistaking the production for the development site (and maybe deleting a bunch of comments or something like that?).

Set up a Tampermonkey script ([Chrome browser extension](https://tampermonkey.net/)) to add css styles to whatever site you want.

Example, turn this

[before](http://calebfavor.github.io/raildocs/images/tampermonkey-differentiate-production/before.gif)

into this

[after](http://calebfavor.github.io/raildocs/images/tampermonkey-differentiate-production/after.gif)

Here's a script to play with.

``` javascript
// ==UserScript==
// @name         pianote production background yellow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.pianote.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle('body, .top-bar{background: lightyellow;}');
    
    // end of your code here.
})();
```