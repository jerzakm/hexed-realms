import { HexMap } from "./hexMap/hexMap"
import {TERRAIN} from './hexMap/terrainGen'
import {initGui, GUI_BTN} from './gui/gui'
import style from "./_scss/main.scss"


const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;
const Viewport = require('pixi-viewport')
const UserPlugin = require('pixi-viewport')
const dat = require('dat.gui')
let app, viewport

let options = {
    worldWidth: 2000,
    worldHeight: 1200,
    hexSize: 20,
    flat: true,
    render: drawWorld
}

app = new PIXI.Application({
    transparent: true,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    antialias: false,
    powerPreference: 'high-performance'
})

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
        .drag({ clampWheel: true, mouseButtons:'right'})
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
        .generateWorld()
        //.drawPolyMap()
        .drawSpriteMap()
    viewport.addChild(hexMap)
    initGui(app)
}

function loadAndDraw() {
    for(let terrain of Object.entries(TERRAIN)) {
        loader.add(`${terrain[0]}`,`assets/${terrain[1]}.png`)
    }
    loader.load(onLoad)
}


makeWorldViewport()
resize()
window.addEventListener('resize', resize)
loadAndDraw()
//createGui()

function onLoad() {
    drawWorld()
    initGui()
}