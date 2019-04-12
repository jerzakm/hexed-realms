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

function onLoad() {
    drawWorld()
    initGui()
}

resourceUriLoader()

async function resourceUriLoader() {
    console.log('uri loader..')
    const response = await fetch('/assets/tiles.json');
    const json = await response.json();
    console.log(json);

    let base = new PIXI.BaseTexture("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAABgklEQVR42u3dsQ3CMBAFULagoKFhEgp6BqBiMCZhE2aBDoFElITYiS/3vuQOAfKT7HPiOJuNiIiIiIiIiIhIoewu+2fkBgAAgNCdfr4fQreQGAAAACgBcLydelvX5wEAAJAKYE3jfkgMAAAA9AFcH9t3q9FBXd9f6ncBAADQFMDYTv8sE2tjpJgPAADIBxCx3Byycp6yip4VAwAAAGtf8QIAAKApAJ2+MAYAAPkAWuj01KtlAAAAZBr3a2ADAABgFEBXp0cfi1u4VzEIAwAAAP+O+2P/dKlr8VHmDwAAAPwEKNXpa9rxMOsKGQAAAFmv9S819wAAAKB4RZThnsGU0rn6OgAAAABrvIgW5mIcAADxAYZg1N7qbZMWAAAA7ActUuYCAACgqZ3SpcrEpQ5vCv98AAAAnhdTbgIAAAAAAAAA8p0dVLtknPN+QJgTswAAyHGI61JzQ3NPuQAAACATgMO7AQAAMBGj5f2dKd4hAwBAbgDjPgAAAGbA8DpbAAAAfOcFP/hUm0aeqwsAAAAASUVORK5CYII=")
    let bt = new PIXI.Texture(base)

    let sprite = new PIXI.Sprite(bt)
    //sprite.texture = loader.resources['desert'].texture
    viewport.addChild(sprite)
}