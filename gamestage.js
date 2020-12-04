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

  const restart = new PIXI.Text('Restart');
  restart.x = 10;
  restart.y = 140;
  restart.style.fill = 0x00FF00;
  restart.interactive = true;
  restart.on('pointertap', () => {
    // doesn't quite work because
    // - cleanup not correct
    // - conflicts with hitarea
    container.removeChildren();
    container.addChild(clicks);
    container.addChild(score);

    clicks.text = 'Clicks: 0';
    score.text = 'Score: 0';
    game.startNewGame();
  });

  container.addChild(score);
  container.addChild(clicks);
  
  
  function enableEndOfGameLinks() {
    container.addChild(mmreturn);
    container.addChild(restart);
  } 

  function notCalled() {
    console.log('notCalled');
  }
  
  // don't show on load
  container.visible = false;

  return Object.freeze({container, score, clicks, restart, enableEndOfGameLinks, notCalled});
}());