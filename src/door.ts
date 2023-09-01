/// <reference types="@workadventure/iframe-api-typings" />

console.info('Door Script started successfully');

WA.onInit().then(() => {
    WA.room.area.onEnter('zone_office_meeting').subscribe(() => {
        // hide layer "door_office_meeting_closed"
        WA.room.hideLayer('doors/door_office_meeting_closed');
        WA.room.showLayer('doors/door_office_meeting_opened');
    });

    WA.room.area.onLeave('zone_office_meeting').subscribe(() => {
        // hide layer "door_office_meeting_closed"
        WA.room.hideLayer('doors/door_office_meeting_opened');
        WA.room.showLayer('doors/door_office_meeting_closed');
    });
});

export {};
