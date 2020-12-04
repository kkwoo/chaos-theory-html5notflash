'use strict';

let mainmenu = (function(){
  const container = new PIXI.Container();

  const title = new PIXI.Text('Chaos Theory');
  title.x = game.width / 2;
  title.y = game.height / 3;
  title.anchor.set(0.5);
  title.style.fill = 0x00FF00;

  const desc = new PIXI.Text('50 balls. 1 click. Take them all down.');
  desc.x = game.width / 2;
  desc.y = 2 * game.height / 3;
  desc.anchor.set(0.5);
  desc.style.fill = 0x00FF00;

  const click2start = new PIXI.Text('PLAY');
  click2start.x = game.width / 2;
  click2start.y = 5 * game.height / 6;
  click2start.anchor.set(0.5);
  click2start.style.fill = 0x00FF00;
  click2start.interactive = true;
  click2start.on('pointertap', () => {
    //click2start.text = ((click2start.text === "CLICKED") ? "PLAY" : "CLICKED");
    // works as expected, useful for later
    container.visible = false;
    gamestage.container.visible = true;
    /* game.initialise();
    game.launch50(); */
    game.startNewGame();
  });

  container.addChild(title);
  container.addChild(title);
  container.addChild(desc);
  container.addChild(click2start);

  return Object.freeze({container});
}());