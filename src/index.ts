import { HexMap } from "./hexMap/hexMap"
import {initGui} from './gui/gui'
import {loadTileSetThenDo, tileSetRef} from './tileSet/loader'

const PIXI = require('pixi.js')
const Viewport = require('pixi-viewport')


let app: PIXI.Application
let viewport: Viewport


let options = {
    worldWidth: 2800,
    worldHeight: 1400,
    hexSize: 25,
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
//app.view.setAttribute(oncontextmenu,"return false")
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
}

function resize()
{
    app.renderer.resize(window.innerWidth, window.innerHeight)
    viewport.resize(window.innerWidth, window.innerHeight, options.worldWidth, options.worldHeight)
}

function border()
{
    const line: PIXI.Graphics = new PIXI.Graphics()
    line.lineStyle(10, 0x000000).drawRect(0, 0, options.worldWidth, options.worldHeight)
    viewport.addChild(line)
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
        .drawSpriteMap()

    let hexMap2 = new HexMap()
        .setHexSize(options.hexSize)
        .setFlat(options.flat)
        .setWorldSize(options.worldWidth, options.worldHeight)
        .align()
        .setup()
        .drawSpriteMap()

    viewport.addChild(hexMap)
    viewport.addChild(hexMap2)

    let testButton = document.getElementById('global-test-btn')
    testButton.addEventListener('click', function(){
        viewport.swapChildren (hexMap, hexMap2)
    })
}

loadTileSetThenDo(onLoad)

function onLoad() {
    makeWorldViewport()
    resize()
    window.addEventListener('resize', resize)
    initGui()
    drawWorld()
}