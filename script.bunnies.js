// Note: In this example we have two "requestAnimationFrame", PIXI + gsap.
// gsap coordinate his animations (bunnies).

const app = new PIXI.Application({
    width: 500,
    height: 350,
    backgroundColor: 0x1099bb,
    antialias: true
});

document.body.appendChild(app.view);
app.stop();

const loader = PIXI.Loader.shared;
loader.add('bunny', 'bunny.png');
gsap.registerPlugin(PixiPlugin);
loader.load(loaderCB);

function loaderCB(l01, r01){

  // time animation in seconds
  const time = 2.0;

  const basicText = new PIXI.Text('Basic text in pixi');
  basicText.x = 10;
  basicText.y = 10;

  app.stage.addChild(basicText);

  // const bunny1 = new PIXI.Sprite(texture);
  const bunny1 = new PIXI.Sprite(r01.bunny.texture);
  app.stage.addChild(bunny1);

  const bunny1max = 500 - bunny1.width;

  // vanilla CSSPlugin
  gsap.to(bunny1, {
      x: bunny1max, duration: time, repeat: -1, yoyo: true,
  });

  // PIXIPlugin: second parameter is for time of animation in seconds
  // gsap.to(bunny1, 5, {pixi:{scaleX:2, scaleY:1.5, skewX:30, rotation:60}});
  
  const bunny2 = new PIXI.Sprite(r01.bunny.texture);
  bunny2.y = 50;
  app.stage.addChild(bunny2);

  gsap.to(bunny2, {
      alpha: 0.0, duration: time, repeat: -1, yoyo: true,
  });

  const bunny3 = new PIXI.Sprite(r01.bunny.texture);
  bunny3.y = 100;
  app.stage.addChild(bunny3);
  gsap.to(bunny3.scale, {
      x: 2.0, y: 2.0, duration: time, repeat: -1, yoyo: true,
  });

  const graphics = new PIXI.Graphics();
  // Circle
  graphics.beginFill(0xDE3250);
  graphics.drawCircle(0, 0, 200);
  graphics.endFill();
  // https://pixijs.io/examples/#/graphics/simple.js
  // https://stackoverflow.com/questions/50940737/how-to-convert-a-graphic-to-a-sprite-in-pixijs
  // const shape = new PIXI.Sprite(app.renderer.generateTexture(graphics));
  graphics.scale = 0.01; // doesn't seem to matter what I set the scale
  graphics.x = 100;
  graphics.y = 100;
  app.stage.addChild(graphics);
  
  gsap.to(graphics.scale, {
      x: 0.2, y: 0.2, duration: time+0.7, repeat: -1, yoyo: true,
  });
  
  // make it look like the circle is expanding on the spot
  /* gsap.to(shape, {
      x: 75, y: 75, duration: time, repeat: -1, yoyo: true,
  }); */

  const bunny4 = new PIXI.Sprite(r01.bunny.texture);
  bunny4.y = 175;
  bunny4.x = 100;
  bunny4.anchor.set(0.5, 0.5);
  app.stage.addChild(bunny4);

  gsap.to(bunny4, {
      rotation: 2 * Math.PI, duration: time, repeat: -1, yoyo: true,
  });

  let colorBunny = null;
  createNewBunny();

  function createNewBunny() {
      if (colorBunny) {
          app.stage.removeChild(colorBunny);
      }

      colorBunny = new PIXI.Sprite(r01.bunny.texture);
      colorBunny.y = 250;
      colorBunny.x = 50;
      colorBunny.tint = `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
      app.stage.addChild(colorBunny);
      // NEW
      gsap.to(colorBunny, { x: 100 + (Math.random() * 150), duration: time, onComplete: createNewBunny, repeat: 1, yoyo: true, ease: Power1.easeOut});
      // ORIGINAL BELOW
      // gsap.to(colorBunny, { x: 250, duration: time, onComplete: createNewBunny});    
  }
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
  function addBunny(xx) 
  {
    basicText.text = `${xx.data.global.x} ${xx.data.global.y}`;
    const newBunny = new PIXI.Sprite(r01.bunny.texture);
    newBunny.x = xx.data.global.x;
    newBunny.y = xx.data.global.y;
    app.stage.addChild(newBunny);
  }

  const bunny5 = new PIXI.Sprite(r01.bunny.texture);
  bunny5.y = 275;
  bunny5.x = 100;
  // bunny5.anchor.set(0.5, 0.5);
  app.stage.addChild(bunny5);

  app.start();


}

const graphics = new PIXI.Graphics();
// Circle
graphics.beginFill(0xDE3250);
graphics.drawCircle(0, 0, 200);
graphics.endFill();
// https://pixijs.io/examples/#/graphics/simple.js
// https://stackoverflow.com/questions/50940737/how-to-convert-a-graphic-to-a-sprite-in-pixijs
// const shape = new PIXI.Sprite(app.renderer.generateTexture(graphics));
graphics.scale = 0.01; // doesn't seem to matter what I set the scale
graphics.x = 100;
graphics.y = 100;
app.stage.addChild(graphics);

app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    // container.rotation -= 0.01 * delta;
});