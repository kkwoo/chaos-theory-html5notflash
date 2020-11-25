function Bfactory() {
  // position along the horizontal starting line
  // between 50 and 450
  let rx = 50 + 400*Math.random();

  // maximum height between 100 and 200 (top of screen)
  let ry = 100 + 100*Math.random();

  let cBall = new PIXI.Graphics();
  // cBall.beginFill(0xDE3250);
  cBall.beginFill(0x1099bb);
  cBall.drawCircle(0, 0, 5);
  cBall.endFill();
  cBall.x = rx;
  // 380 for visibility
  // cBall.y = 380;
  // 520 means we can't see the balls first
  cBall.y = game.launch;
  
  gamestage.container.addChild(cBall);

  function sendUp() {
    gsap.to(cBall, sendUpVar())
  }
  function sendUpVar() {
    return({
      y: ry, duration: game.time.hang, repeat: 1, yoyo: true
    })
  }

  // 
  return(Object.freeze({sendUp, sendUpVar, cBall}));
}
