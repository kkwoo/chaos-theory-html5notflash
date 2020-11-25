'use strict';

let game = (function() {
  console.log("game object: start");
  const height = 400;
  const width = 500;
  const time = {
    hang: 2.0,
    explosion: 2.0,
    placeholder: false
  };
  const ball = {
    radius: 5
  };
  const explosion = {
    radius: 200,
    placeholder: false
  };
  let explosions = new Set();
  let balls50 = [];
  let t1 = gsap.timeline(); 
  let cu = (function() {
    let count = 0;
    function add() {
      count++;
    }
    function ctdebug() {
      return count;
    }
    function reset() {
      count = 0;
    }
    return Object.freeze({add, count, ctdebug, reset});
  }());


  
  // initial launch floor
  const launch = height + ball.radius;
  const app = new PIXI.Application({
            width: width,
            height: height,
            backgroundColor: 0x000000,
            antialias: true
        });

  function inProgress() {
    return t1.isActive();
  }

  function finished() {
    return t1.isActive();
  }

  // setup game
  function initialise() {
    balls50 = [];
    t1.clear();
    cu.reset(); 

    for (let c = 0; c < 50; c++) {
      let cBall = Bfactory();
      app.stage.addChild(cBall.cBall);
      balls50.push(cBall);
    }
    KFYshuffle(balls50);
    console.log(`balls50.length = ${balls50.length}`);
    console.log(`balls50[0] = ${balls50[0]}`);    
  }

  function launch50() {
    // app.start();
    for (let c = 0; c < 50; c++){
      t1.to(balls50[c].cBall, balls50[c].sendUpVar(), c/4);
    }
  }

  function b50debug() {
    return balls50;
  }

  console.log("game object: end");
  return Object.freeze({app, width, height, inProgress, initialise, launch50, launch, time, explosions, balls50, b50debug, cu});
}());