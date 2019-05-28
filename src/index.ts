import { HexMap } from "./hexMap/hexMap"
import {initGui} from './gui/gui'
import {loadTileSetThenDo, tileSetRef} from './tileSet/loader'

import * as PIXI from "pixi.js"
import Viewport from "pixi-viewport"
import "../src/_scss/main.scss"
import * as style from './_scss/style'


let app: PIXI.Application
let viewport: any

let options = {
    worldWidth: 2800,
    worldHeight: 1400,
    hexSize: 60,
    flat: true,
    render: drawWorld
}

app = new PIXI.Application({
    transparent: true,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    antialias: false,
    powerPreference: 'high-performance',
    forceCanvas: true
})

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
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

    let testMap = new HexMap()
        .setHexSize(options.hexSize)
        .setFlat(options.flat)
        .setWorldSize(options.worldWidth, options.worldHeight)
        .drawHexMap()
        .align()

    viewport.addChild(testMap)
}

loadTileSetThenDo(onLoad)

function onLoad(): void {
    makeWorldViewport()
    resize()
    window.addEventListener('resize', resize)
    initGui()
    drawWorld()
}