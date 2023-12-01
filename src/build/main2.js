/// <reference types="@workadventure/iframe-api-typings" />
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@workadventure/scripting-api-extra"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var scripting_api_extra_1 = require("@workadventure/scripting-api-extra");
    console.log('Script started successfully');
    var currentPopup = undefined;
    // Waiting for the API to be ready
    WA.onInit().then(function () {
        console.log('Scripting API ready');
        console.log('Player tags: ', WA.player.tags);
        WA.room.area.onEnter('clock').subscribe(function () {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes();
            currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
        });
        WA.room.area.onLeave('clock').subscribe(closePopup);
        // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
        (0, scripting_api_extra_1.bootstrapExtra)().then(function () {
            console.log('Scripting API Extra ready');
        }).catch(function (e) { return console.error(e); });
    }).catch(function (e) { return console.error(e); });
    function closePopup() {
        if (currentPopup !== undefined) {
            currentPopup.close();
            currentPopup = undefined;
        }
    }
});
