'use strict';

gamestage.container.on('pointertap', addExplosion);
gamestage.container.on('pointertap', (delta) => {
  game.cu.add();
  gamestage.clicks.text = `Clicks: ${game.cu.ctdebug()}`;

});
