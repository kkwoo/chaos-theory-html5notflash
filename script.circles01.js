// Note: In this example we have two "requestAnimationFrame", PIXI + gsap.
// gsap coordinate his animations (bunnies).

const app = new PIXI.Application({
    width: 500,
    height: 400,
    backgroundColor: 0x1099bb,
    antialias: true
});

document.body.appendChild(app.view);
app.stop();


// time animation in seconds
const time = 2.0;

const basicText = new PIXI.Text('Basic text in pixi');
basicText.x = 10;
basicText.y = 10;

app.stage.addChild(basicText);

app.stage.interactive = true;
app.stage.hitArea = new PIXI.Rectangle(0, 0, 500, 350);
app.stage.on('click', addCircle01);

function addCircle01(xx) 
{
  basicText.text = `${xx.data.global.x} ${xx.data.global.y}`;
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

  console.log(`newBall.scale = ${newBall.scale}`);
  newBall.x = xx.data.global.x;
  newBall.y = xx.data.global.y;

  app.stage.addChild(newBall);
  // CSSPlugin
  /*
  gsap.to(newBall.scale, {
    x: 0.2, y: 0.2, duration: time+0.7, repeat: -1, yoyo: true,
  });
  */

  // PIXIPlugin: second parameter is for time of animation in seconds
  gsap.to(newBall, {pixi:{
    scale:0.2,
//       scaleY:20,
      // skewX:30,
        rotation:60},
    repeat: -1, yoyo: true,
    duration: time+0.7});

}

function addCircle01b(xx) 
{
  basicText.text = `${xx.data.global.x} ${xx.data.global.y}`;
  const newBall = new PIXI.Graphics();
  // Circle
  newBall.beginFill(0xDE3249);
  newBall.drawCircle(0, 0, 1);
  newBall.endFill();
  // if we start with a circle of 200 radius
  // then this unusual scale step is required
  // we start with a large circle because it looks smoother
  // OR https://www.html5gamedevs.com/topic/43110-circles-are-not-round/
  // PIXI.GRAPHICS_CURVES.adaptive = false
  // doesn't work for us
  PIXI.GRAPHICS_CURVES.adaptive = false
  // newBall.scale = "silly var: small please";

  console.log(`newBall.scale = ${newBall.scale}`);
  newBall.x = xx.data.global.x;
  newBall.y = xx.data.global.y;

  app.stage.addChild(newBall);
  // CSSPlugin
  /*
  gsap.to(newBall.scale, {
    x: 0.2, y: 0.2, duration: time+0.7, repeat: -1, yoyo: true,
  });
  */

  // PIXIPlugin: second parameter is for time of animation in seconds
  gsap.to(newBall, {pixi:{
    scale:200,
//       scaleY:20,
      // skewX:30,
        rotation:60},
    repeat: -1, yoyo: true,
    duration: time+0.7});

}

function addCircle02(xx) 
{
  basicText.text = `${xx.data.global.x} ${xx.data.global.y}`;
  const newBall = new PIXI.Graphics();
  // Circle
  newBall.beginFill(0xDE3249);
  newBall.drawCircle(0, 0, 5);
  newBall.endFill();

  // newBall.scale = 1;
  newBall.x = xx.data.global.x;
  newBall.y = xx.data.global.y;
  console.log(`newBall.x = ${newBall.x}`);
  console.log(`newBall.scale = ${newBall.scale}`);

  app.stage.addChild(newBall);
  /* gsap.to(newBall.scale, {
    x: 0.2, y: 0.2, duration: time+0.7, repeat: -1, yoyo: true,
  }); */
}

const graphics = new PIXI.Graphics();
// Circle
graphics.beginFill(0xDE3250);
graphics.drawCircle(0, 0, 200);
graphics.endFill();
// https://pixijs.io/examples/#/graphics/simple.js
// https://stackoverflow.com/questions/50940737/how-to-convert-a-graphic-to-a-sprite-in-pixijs
// const shape = new PIXI.Sprite(app.renderer.generateTexture(graphics));
graphics.scale = 0.01; // doesn't seem to matter what I set the scale if I'm going to use gsap.to
graphics.x = 100;
graphics.y = 100;
app.stage.addChild(graphics);

function KFYshuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function Bfactory() {
  // position along the horizontal starting line
  // between 50 and 450
  let rx = 50 + 400*Math.random();

  // maximum height between 100 and 200 (top of screen)
  let ry = 100 + 100*Math.random();

  let cBall = new PIXI.Graphics();
  cBall.beginFill(0xDE3250);
  cBall.drawCircle(0, 0, 5);
  cBall.endFill();
  cBall.x = rx;
  cBall.y = 380;
  app.stage.addChild(cBall);

  function sendUp() {
    gsap.to(cBall, {
      y: ry, duration: time+0.7, repeat: 1, yoyo: true
    });
  }
  // 
  return(Object.freeze({sendUp, cBall}));
}
// add 50 balls to the bottom of the screen
let balls50 = [];
for (c = 0; c < 50; c++) {
  rx = 50 + 400*Math.random();
  console.log(`${c}: ${rx}`);
  cBall = new PIXI.Graphics();
  cBall.beginFill(0xDE3250);
  cBall.drawCircle(0, 0, 5);
  cBall.endFill();
  // graphics.scale = 0.01; // doesn't seem to matter what I set the scale if I'm going to use gsap.to
  cBall.x = rx;
  cBall.y = 380;
  app.stage.addChild(cBall);
  balls50.push(cBall);
}
KFYshuffle(balls50);
app.start();

app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    // container.rotation -= 0.01 * delta;
});