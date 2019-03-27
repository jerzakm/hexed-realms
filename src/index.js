import { HexMap } from "./hexMap/hexMap";


const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;
const Viewport = require('pixi-viewport')
const UserPlugin = require('pixi-viewport')
const dat = require('dat.gui')
let app, viewport

let options = {
    worldWidth: 2000,
    worldHeight: 1200,
    hexSize: 40,
    flat: true,
    render: drawWorld
}

app = new PIXI.Application({ transparent: true, width: window.innerWidth, height: window.innerHeight, resolution: window.devicePixelRatio })
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
app.view.setAttribute(oncontextmenu,"return false")
document.body.appendChild(app.view)
app.view.style.position = 'fixed'
app.view.style.width = '100vw'
app.view.style.height = '100vh'

function makeWorldViewport()
{
    viewport = app.stage.addChild(new Viewport({
        interaction: app.renderer.plugins.interaction,
        passiveWheel: false
    }))
    viewport
        .drag({ clampWheel: true })
        .wheel({ smooth: 2 })
        .pinch()
        //.decelerate()
    viewport.userPlugin('test', new UserPlugin(viewport))
}

function resize()
{
    app.renderer.resize(window.innerWidth, window.innerHeight)
    viewport.resize(window.innerWidth, window.innerHeight, options.worldWidth, options.worldHeight)
}

function border()
{
    const line = viewport.addChild(new PIXI.Graphics())
    line.lineStyle(10, 0x000000).drawRect(0, 0, options.worldWidth, options.worldHeight)
}

function createGui() {
    let gui = new dat.GUI();
    gui.add(options, 'worldWidth', 0, 10000);
    gui.add(options, 'worldHeight', 0, 10000);
    gui.add(options, 'hexSize', 10, 200);
    gui.add(options, 'flat', [true,false]);
    gui.add(options, 'render');
}

function drawWorld()
{
    viewport.removeChildren()
    viewport.moveCorner(0, 0)
    viewport.fitWorld()
    border()
    let hexMap = new HexMap()
        .setHexSize(options.hexSize)
        .setFlat(options.flat)
        .setWorldSize(options.worldWidth, options.worldHeight)
        .align()
        .setup()
        .drawPolyMap()
        .drawSpriteMap();
    viewport.addChild(hexMap)

}

function loadAndDraw() {
    loader
  .add("grass", "assets/grass.png")
  .add("desert", "assets/desert.png")
  .add("ocean", "assets/water.png")
  .load(drawWorld);
}


makeWorldViewport()
resize()
window.addEventListener('resize', resize)
loadAndDraw()
createGui()