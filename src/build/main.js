/// <reference types="@workadventure/iframe-api-typings" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./roofs", "./door", "@workadventure/scripting-api-extra"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("./roofs");
    require("./door");
    var scripting_api_extra_1 = require("@workadventure/scripting-api-extra");
    var popupPrivateOffice;
    var mapOverviewAction;
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, WA.onInit()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, WA.players.configureTracking({
                            players: true,
                            movement: false,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, WA.player.getPosition()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
    // Waiting for the API to be ready
    WA.onInit().then(function () {
        // If user is admin, name avec dark blue border
        var userTag = WA.player.tags;
        if (userTag.includes("admin")) {
            WA.player.setOutlineColor(27, 42, 65);
        }
        if (!WA.player.state.tutorialDone) {
            openTutorial();
        }
        WA.room.onLeaveLayer("start").subscribe(function () {
            WA.ui.modal.closeModal();
        });
        WA.ui.actionBar.addButton({
            id: 'map-btn',
            // @ts-ignore
            type: 'action',
            imageSrc: 'https://hugoaverty.github.io/map-overview/img/map.svg',
            toolTip: 'Map overview',
            callback: function () {
                openMapOverview();
            }
        });
        // Open & Close popupPrivateOffice
        WA.room.area.onEnter("popupPrivateOffice_area").subscribe(function () {
            if (popupPrivateOffice)
                return;
            popupPrivateOffice = WA.ui.openPopup("popupPrivateOffice", "Our private office serves as a restricted zone, exclusively accessible to our team members.", [{
                    label: "Close",
                    className: "primary",
                    callback: function () {
                        popupPrivateOffice === null || popupPrivateOffice === void 0 ? void 0 : popupPrivateOffice.close();
                        popupPrivateOffice = null;
                    }
                }]);
        });
        WA.room.area.onLeave("popupPrivateOffice_area").subscribe(function () {
            popupPrivateOffice === null || popupPrivateOffice === void 0 ? void 0 : popupPrivateOffice.close();
            popupPrivateOffice = null;
        });
        WA.room.area.onEnter("zone_map_overview").subscribe(function () {
            mapOverviewAction = WA.ui.displayActionMessage({
                message: "Press 'SPACE' to display map overview and move to a specific zone. \n \n You can acces to map overview directly on the bottom nav !",
                callback: function () {
                    openMapOverview();
                }
            });
        });
        WA.room.area.onLeave("zone_map_overview").subscribe(function () {
            mapOverviewAction.remove();
            WA.ui.modal.closeModal();
        });
        /*
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
    
        // EXEMPLE UTC+6
        // IL EST 15H la bas
        
        console.log("CURRENT TIME IS :");
        console.log(time);
        
        const utcDifference = -(new Date().getTimezoneOffset() / 60) - 2; // Difference between User UTC and Workaventure UTC (UTC - UTC+2);
        console.log("CURRENT UTC - UTC+2 = " + utcDifference);
    
        const timeClient = today.getHours() - utcDifference;
        console.log("CURRENT TIME - UCT DIFF = " + timeClient);
    
        // If time hour is between 9h and 18h it's OPEN else it's CLOSED
        if(timeClient >= 9 && timeClient <= 18) {
            console.log(">>> OPEN <<<");
        } else {
            console.log(">>> CLOSED <<<");
        }
        */
        // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
        (0, scripting_api_extra_1.bootstrapExtra)().then(function () {
            console.info('Scripting API Extra ready');
            console.log("Olá, mundo!");
        }).catch(function (e) { return console.error(e); });
    }).catch(function (e) { return console.error(e); });
    var openMapOverview = function () { return __awaiter(void 0, void 0, void 0, function () {
        var pos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    WA.ui.modal.closeModal();
                    return [4 /*yield*/, WA.player.getPosition()];
                case 1:
                    pos = _a.sent();
                    WA.ui.modal.openModal({
                        src: "https://hugoaverty.github.io/map-overview/index.html?x=" + pos.x + "&y=" + pos.y + "",
                        allow: "fullscreen",
                        title: "Map Overview",
                        allowApi: true,
                        position: "center",
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var openTutorial = function () {
        console.info('Open the tutorial');
        // @ts-ignore
        WA.ui.modal.openModal({
            title: "Tutorial",
            src: 'https://workadventure.github.io/scripting-api-extra/tutorialv1.html',
            allow: "fullscreen; clipboard-read; clipboard-write",
            allowApi: true,
            position: "right",
        });
    };
});
