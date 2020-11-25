// setup PIXI application
document.body.appendChild(game.app.view);
game.app.stop();
game.app.stage.addChild(mainmenu.container);
game.app.stage.addChild(gamestage.container);
game.app.start();