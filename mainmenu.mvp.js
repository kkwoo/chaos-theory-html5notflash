'use strict';

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
const titleText = new PIXI.Text('Chaos Theory');
titleText.x = gwidth / 2;
titleText.y = gheight / 3;
titleText.anchor.set(0.5);
titleText.style.fill = 0x00FF00;
app.stage.addChild(titleText);

const descText = new PIXI.Text('50 balls. 1 click. Take them all down.');
descText.x = gwidth / 2;
descText.y = 2 * gheight / 3;
descText.anchor.set(0.5);
descText.style.fill = 0x00FF00;
app.stage.addChild(descText);

const playText = new PIXI.Text('PLAY');
playText.x = gwidth / 2;
playText.y = 5 * gheight / 6;
playText.anchor.set(0.5);
playText.style.fill = 0x00FF00;
playText.interactive = true;
playText.on('pointertap', () => {
  playText.text = ((playText.text === "CLICKED") ? "PLAY" : "CLICKED");});
app.stage.addChild(playText);

app.start();