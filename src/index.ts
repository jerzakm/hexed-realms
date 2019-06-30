import {initGui} from './gui/gui'
import {loadTileSetThenDo} from './tileSet/loader'

import * as PIXI from "pixi.js"
import Viewport from "pixi-viewport"
import "../src/_scss/main.scss"
import * as style from './_scss/style'
import * as r from './core/renderer'
import { addNewLayer } from './layers/layerHandler'
import { makeLayerEntry } from './layers/layersComponent'
import * as pFilters from 'pixi-filters'


export let viewport: any

let options = {
    worldWidth: 2600,
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


    //animated water test
    let displacementSprite = new PIXI.Sprite.from('3.png')
    let displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    r.stage.addChild(displacementSprite)
    const sOptions = {
        amplitude: 90,
        wavelength: 360.0,
        speed: 500.0,
        brightness: 5,
        radius: -1
    }
    const shockwave = new pFilters.ShockwaveFilter([300,300], sOptions)
    r.stage.filters = [
        // displacementFilter,
        // new pFilters.DotFilter(1,5),
        // new pFilters.GodrayFilter(),
        // shockwave
    ]

    r.stage.addChild(viewport)

    function animate() {
        displacementSprite.x += 3;
        displacementSprite.y += 0;
        requestAnimationFrame(animate);
  }

  animate()
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
    initGui()
    drawWorld()
    testSetup()
}

function testSetup(){
    let layer = addNewLayer()
    makeLayerEntry(layer)
}