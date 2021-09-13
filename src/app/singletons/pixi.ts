import * as PIXI from 'pixi.js';
import GLOBALS from '../config';
const pixiApp = new PIXI.Application({
    width: GLOBALS.width,
    height: GLOBALS.height
});

const app = document.querySelector<HTMLDivElement>('#app')!;
app.appendChild(pixiApp.view);

export * as PIXI from 'pixi.js';

export default pixiApp;
