console.log("Script started successfully");

let currentPopup = undefined;

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    if (!WA.player.state.tutorialDone) {
      openTutorial();
    }
    // Popups
    WA.room.area.onEnter("intro").subscribe(() => {
      currentPopup = WA.ui.openPopup("intro", "Teste!", []);
    });
    WA.room.area.onLeave("intro").subscribe(closePopup);
    
    //layers
    console.log("Chegou antes!");
    WA.room.area.onEnter("building").subscribe(() => {
        console.log("Chegou batata!");
        WA.room.showLayer("building/inBuilding1");
          
        WA.room.hideLayer("building/outBuilding1");
        WA.room.hideLayer("building/outBuilding2");
        WA.room.hideLayer("outBuilding3");
      });
      WA.room.area.onLeave("building").subscribe(() => {
        WA.room.hideLayer("building/inBuilding1");
          
        WA.room.showLayer("building/outBuilding1");
        WA.room.showLayer("building/outBuilding2");
        WA.room.showLayer("outBuilding3");
      });
  })
  .catch((e) => console.error(e));
function closePopup() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

const openTutorial = () => {
  console.info("Open the tutorial");
  WA.ui.modal.openModal({
    title: "Tutorial",
    src: "https://b42-wa-assets.s3.amazonaws.com/ciaed/tutorial/tutorial.html",
    allow: "fullscreen; clipboard-read; clipboard-write",
    allowApi: true,
    position: "right",
  });
};
