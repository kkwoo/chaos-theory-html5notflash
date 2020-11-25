'use strict';

let gamestage = (function(){
  const container = new PIXI.Container();
  container.interactive = true;
  container.hitArea = new PIXI.Rectangle(0, 0, game.width, game.height);

  const score = new PIXI.Text('Score: 0');
  score.x = 10;
  score.y = 10;
  score.style.fill = 0x00FF00;

  const clicks = new PIXI.Text('Clicks: 0');
  clicks.x = 10;
  clicks.y = 50;
  clicks.style.fill = 0x00FF00;

  const mmreturn = new PIXI.Text('Main Menu');
  mmreturn.x = 10;
  mmreturn.y = 100;
  mmreturn.style.fill = 0x00FF00;
  mmreturn.interactive = true;
  mmreturn.on('pointertap', () => {
    // works as expected, useful for later
    container.visible = false;
    mainmenu.container.visible = true;
    // initiate game state
  });


  container.addChild(score);
  container.addChild(clicks);
  container.addChild(mmreturn);
  // don't show on load
  container.visible = false;

  return Object.freeze({container, score, clicks});
}());