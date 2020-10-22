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

  gsap.to(bunny1, {
      x: bunny1max, duration: time, repeat: -1, yoyo: true,
  });

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
  graphics.beginFill(0xDE3249);
  graphics.drawCircle(0, 0, 200, 200);
  graphics.endFill();
  // https://pixijs.io/examples/#/graphics/simple.js
  // https://stackoverflow.com/questions/50940737/how-to-convert-a-graphic-to-a-sprite-in-pixijs
  // const shape = new PIXI.Sprite(app.renderer.generateTexture(graphics));
  const shape = graphics;
  shape.scale = 0.01;
  shape.x = 100;
  shape.y = 100;

  app.stage.addChild(shape);
  gsap.to(shape.scale, {
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
  app.stage.on('click', onClick);

  bunny3.interactive = true;
  bunny3.on('click', onClick);
  function onClick(xx) 
  {
    console.log("called");
    basicText.text = `${xx.data.global.x} ${xx.data.global.y}`;

  }
  app.start();

}

