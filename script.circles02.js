const gheight = 400;
const gwidth = 500;
const app = new PIXI.Application({
    width: gwidth,
    height: gheight,
    // backgroundColor: 0x1099bb,
    backgroundColor: 0x000000,
    antialias: true
});

document.body.appendChild(app.view);
app.stop();

// time animation in seconds
const time = 2.0;

// initial launch floor
const launch = gheight + 5;
const explText = new PIXI.Text('Score: 0');
explText.x = 10;
explText.y = 10;
explText.style.fill = 0x00FF00;
app.stage.addChild(explText);

const clickCtText = new PIXI.Text('Clicks: 0');
clickCtText.x = 10;
clickCtText.y = 50;
clickCtText.style.fill = 0x00FF00;
app.stage.addChild(clickCtText);

const deltaText = new PIXI.Text('Delta: 0');
deltaText.x = 10;
deltaText.y = 90;
// app.stage.addChild(deltaText);

function ClickUpdateFactory () {
  let count = 0;
  function add() {
    count++;
    clickCtText.text = `Clicks: ${count}`;
  }
  return Object.freeze({add});
}
const cu = ClickUpdateFactory();

let explosions = new Set();

app.stage.interactive = true;
app.stage.hitArea = new PIXI.Rectangle(0, 0, gwidth, gheight);
app.stage.on('pointertap', addExplosion);
app.stage.on('pointertap', cu.add);

function addExplosion(xx) 
{
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

  app.stage.addChild(newBall);

  // PIXIPlugin: second parameter is for time of animation in seconds
  // TODO oncomplete make invisible after explosion
  gsap.to(newBall, {pixi:{
    scale:0.2},
    repeat: 1,
    yoyo: true,
    duration: time,
    onStart: function () {
      explosions.add(newBall);
    },
    onComplete: function () {
      explosions.delete(newBall);
    }
  });

}

// code pinched from stackoverflow
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
  // cBall.beginFill(0xDE3250);
  cBall.beginFill(0x1099bb);
  cBall.drawCircle(0, 0, 5);
  cBall.endFill();
  cBall.x = rx;
  // 380 for visibility
  // cBall.y = 380;
  // 520 means we can't see the balls first
  cBall.y = launch;
  
  app.stage.addChild(cBall);

  function sendUp() {
    gsap.to(cBall, sendUpVar())
  }
  function sendUpVar() {
    return({
      y: ry, duration: time, repeat: 1, yoyo: true
    })
  }

  // 
  return(Object.freeze({sendUp, sendUpVar, cBall}));
}
// add 50 balls to the bottom of the screen
let balls50 = [];
for (c = 0; c < 50; c++) {
  cBall = Bfactory();
  app.stage.addChild(cBall.cBall);
  balls50.push(cBall);
}
KFYshuffle(balls50);
app.start();

let t1 = gsap.timeline(); 
for (c = 0; c < 50; c++){
  t1.to(balls50[c].cBall, balls50[c].sendUpVar(), c/2);
}

// code pinched from spicyoghurt
function circleIntersect(spec) {

    // destructure / extract relevant parameters from object literal parameter
    let {x1, y1, r1, x2, y2, r2} = spec;

    // Calculate the distance between the two circles
    let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

    // When the distance is smaller or equal to the sum
    // of the two radius, the circles touch or overlap
    return squareDistance <= ((r1 + r2) * (r1 + r2))
}

app.ticker.add((delta) => {
    for (ex of explosions) {
      // curious about delta on old laptop
      // deltaText.text = `Delta: ${delta}`
      // refresh scoreboard
      explText.text = `Score: ${balls50.filter(x => {return !x.cBall.visible}).length}`
      // check if explosion established
      // contact with any in-flight unlit balls
      for (ball of balls50.filter(x => {return ((x.cBall.visible) && (x.cBall.y !== launch));})) {
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
});