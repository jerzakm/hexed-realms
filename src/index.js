import { createHexMap, HexMap } from "./hexMap/hexMap";


const PIXI = require('pixi.js')
const Viewport = require('pixi-viewport')
const UserPlugin = require('pixi-viewport')

const WIDTH = 4000
const HEIGHT = 2500
const HEX_SIZE = 90

let app, viewport


app = new PIXI.Application({ transparent: true, width: window.innerWidth, height: window.innerHeight, resolution: window.devicePixelRatio })
document.body.appendChild(app.view)
app.view.style.position = 'fixed'
app.view.style.width = '100vw'
app.view.style.height = '100vh'

makeWorldViewport()
resize()
window.addEventListener('resize', resize)

drawWorld()

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
    viewport.resize(window.innerWidth, window.innerHeight, WIDTH, HEIGHT)
}

function border()
{
    const line = viewport.addChild(new PIXI.Graphics())
    line.lineStyle(10, 0x000000).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight)
}

function drawWorld()
{
    viewport.removeChildren()
    border()
    viewport.moveCorner(0, 0)
    viewport.fitWorld();
    let hmap = createHexMap(WIDTH, HEIGHT, HEX_SIZE);
    viewport.addChild(hmap);
    //viewport.addChild(hexmap);

}