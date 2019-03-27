const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;
import {TERRAIN} from './terrainGen'


export class HexPoly extends PIXI.Graphics {
    constructor(options){
        super()
    }
    draw(){
        this.drawPolygon(this.options.points)
        return this
    }
}

export class HexSprite extends PIXI.Sprite {
    constructor() {
        super()
    }
}

export class Hex extends PIXI.Container{
    constructor(options) {
        super()
        this.options = this.defaults()
        this.options = Object.assign(this.options, options)
        this.x = this.options.loc.x
        this.y = this.options.loc.y
    }

    defaults(){
        return {
            terrain: TERRAIN.water,
            cx: 0,
            cy: 0,
            r: 10
        }
    }

    drawPoly(options){
        const hexPoly = new PIXI.Graphics
        hexPoly.beginFill(options.fill)
        hexPoly.drawPolygon(options.points)
        hexPoly.endFill()
        this.addChild(hexPoly)
        this.hexPoly=hexPoly
        return this
    }
    drawSprite(options){
        let hexSprite = new PIXI.Sprite(loader.resources[this.options.terrain].texture)
        hexSprite.anchor.set(0.5)
        hexSprite.setTransform(0,0,options.scale,options.scale)
        hexSprite.x = options.xTransform
        hexSprite.y = options.yTransform
        hexSprite.buttonMode = true
        hexSprite.interactive = true
        //hexSprite.hitArea = new PIXI.Polygon(this.hexPoly.geometry.points)
        hexSprite.on('pointerdown', () => {
            //hexSprite.texture = loader.resources.desert.texture
        })
        this.addChild(hexSprite)
        return this
    }
}