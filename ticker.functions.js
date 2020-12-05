let x01 = (delta) => {
  if (game.inProgress()) {
    gamestage.container.interactive = true;
    for (let ex of game.explosions) {
      // refresh scoreboard
      gamestage.score.text = `Score: ${game.b50debug().filter(x => {return !x.cBall.visible}).length}`
      // check if explosion established
      // contact with any in-flight unlit balls
      for (let ball of game.b50debug().filter(x => {return ((x.cBall.visible) && (x.cBall.y !== game.launch));})) {
        if (circleIntersect({
          x1: ex.position.x,
          y1: ex.position.y,
          r1: ex.width/2,
          x2: ball.cBall.position.x,
          y2: ball.cBall.position.y,
          r2: ball.cBall.width/2 })) {
            ball.cBall.visible = false;
            // KILLS CPU if we don't filter out lit balls
            addExplosion({
              data: {
                global: {
                  x: ball.cBall.position.x,
                  y: ball.cBall.position.y
                }
              }
            });
        }
      }
    }
  }

  if (gamestage.container.interactive && !game.inProgress()) {
    gamestage.container.interactive = false;
    gamestage.enableEndOfGameLinks();
  }
}