/// <reference types="@workadventure/iframe-api-typings" />
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.info('Door Script started successfully');
    WA.onInit().then(function () {
        WA.room.area.onEnter('zone_office_meeting').subscribe(function () {
            // hide layer "door_office_meeting_closed"
            WA.room.hideLayer('doors/door_office_meeting_closed');
            WA.room.showLayer('doors/door_office_meeting_opened');
        });
        WA.room.area.onLeave('zone_office_meeting').subscribe(function () {
            // hide layer "door_office_meeting_closed"
            WA.room.hideLayer('doors/door_office_meeting_opened');
            WA.room.showLayer('doors/door_office_meeting_closed');
        });
    });
});
