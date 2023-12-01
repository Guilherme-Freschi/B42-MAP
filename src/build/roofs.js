/// <reference types="@workadventure/iframe-api-typings/iframe_api" />
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
    console.info('Roofs Script started successfully');
    // Waiting for the API to be ready
    WA.onInit().then(function () {
        WA.room.area.onEnter("roof_conference_area").subscribe(function () {
            hideRoof1();
        });
        WA.room.area.onEnter("roof_coworking_area").subscribe(function () {
            hideRoof1();
        });
        WA.room.area.onEnter("roof_office_area").subscribe(function () {
            hideRoof1();
        });
        WA.room.area.onLeave("roof_conference_area").subscribe(function () {
            showRoof1();
        });
        WA.room.area.onLeave("roof_coworking_area").subscribe(function () {
            showRoof1();
        });
        WA.room.area.onLeave("roof_office_area").subscribe(function () {
            showRoof1();
        });
        WA.room.area.onEnter("roof_meeting_area").subscribe(function () {
            hideRoof2();
        });
        WA.room.area.onEnter("roof_show_area").subscribe(function () {
            hideRoof2();
        });
        WA.room.area.onLeave("roof_meeting_area").subscribe(function () {
            showRoof2();
        });
        WA.room.area.onLeave("roof_show_area").subscribe(function () {
            showRoof2();
        });
        WA.room.area.onEnter("silentOffice_area").subscribe(function () {
            WA.room.showLayer("silentOverlay");
        });
        WA.room.area.onLeave("silentOffice_area").subscribe(function () {
            WA.room.hideLayer("silentOverlay");
        });
        /*
        WA.room.onEnterLayer("doorstep/zone_office").subscribe(() => {
            const players = WA.players.list();
            console.log("players");
            console.log(players);
            let admin: any;
            for (const player of players) {
                console.log(`Player ${player.name} is near you`);
                console.log(player);
                console.log(player.state.outlineColor);
                if(player.state._outlineColor == 1780289) {
                    admin++
                }
            }
            if(admin != 0) {
                console.log("There is no admin");
            }
        });
          */
    }).catch(function (e) { return console.error(e); });
    var hideRoof1 = function () {
        WA.room.hideLayer("roof1");
        WA.room.hideLayer("sign1");
    };
    var showRoof1 = function () {
        WA.room.showLayer("roof1");
        WA.room.showLayer("sign1");
    };
    var showRoof2 = function () {
        WA.room.showLayer("roof2");
        WA.room.showLayer("sign2");
    };
    var hideRoof2 = function () {
        WA.room.hideLayer("roof2");
        WA.room.hideLayer("sign2");
    };
});
