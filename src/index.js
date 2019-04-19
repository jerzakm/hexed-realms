import { HexMap } from "./hexMap/hexMap"
import {initGui, GUI_BTN} from './gui/gui'
import style from "./_scss/main.scss"
import {loadTileSetThenDo, tileSetRef} from './tileSet/loader'


const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;
const Viewport = require('pixi-viewport')
const UserPlugin = require('pixi-viewport')
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
}

makeWorldViewport()
resize()
window.addEventListener('resize', resize)
loadTileSetThenDo(onLoad)

function onLoad() {
    initGui()
    drawWorld()
}