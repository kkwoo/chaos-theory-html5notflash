'use strict';

// this function needs to be aware of both the game state
// and the game stage and needs to be loaded late
  function addExplosion(xx) {
    const newBall = new PIXI.Graphics();
    // Circle
    newBall.beginFill(0xDE3249);
    newBall.drawCircle(0, 0, 200);
    newBall.endFill();
    // if we start with a circle of 200 radius
    // then this unusual scale step is required
    // we start with a large circle because it looks smoother
    // OR https://www.html5gamedevs.com/topic/43110-circles-are-not-round/
    // PIXI.GRAPHICS_CURVES.adaptive = false
    newBall.scale = "silly var: small please";

    newBall.x = xx.data.global.x;
    newBall.y = xx.data.global.y;

    gamestage.container.addChild(newBall);

    // PIXIPlugin: second parameter is for time of animation in seconds
    // TODO oncomplete make invisible after explosion
    gsap.to(newBall, {pixi:{
      scale:0.2},
      repeat: 1,
      yoyo: true,
      duration: game.time.explosion,
      onStart: function () {
        game.explosions.add(newBall);
      },
      onComplete: function () {
        game.explosions.delete(newBall);
      }
    });

  }
