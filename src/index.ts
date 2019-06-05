import { HexMap } from "./hexMap/hexMap"
import {initGui} from './gui/gui'
import {loadTileSetThenDo, tileSetRef} from './tileSet/loader'

import * as PIXI from "pixi.js"
import Viewport from "pixi-viewport"
import "../src/_scss/main.scss"
import * as style from './_scss/style'
import * as r from './core/renderer'


export let viewport: any

let options = {
    worldWidth: 2800,
    worldHeight: 1400,
    hexSize: 60,
    flat: true,
    render: drawWorld
}

function makeWorldViewport()
{
    viewport = new Viewport({
        interaction: r.renderer.plugins.interaction,
        passiveWheel: false
    })
    viewport
        .drag({ clampWheel: true, mouseButtons:'right'})
        .wheel({ smooth: 2 })
        .pinch()
    r.stage.addChild(viewport)
}

function resize()
{
    r.renderer.resize(r.renderer.screen.width, r.renderer.screen.height-5)
    viewport.resize(r.renderer.screen.width, r.renderer.screen.height-5, options.worldWidth, options.worldHeight)
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

    // let testMap = new HexMap()
    //     .setHexSize(options.hexSize)
    //     .setFlat(options.flat)
    //     .setWorldSize(options.worldWidth, options.worldHeight)
    //     .drawHexMap()
    //     .align()

    // viewport.addChild(testMap)
}

loadTileSetThenDo(onLoad)

function onLoad(): void {
    r.initRenderer()
    makeWorldViewport()
    resize()
    window.addEventListener('resize', resize)
    drawWorld()
    initGui()
}