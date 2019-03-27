const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;

const terrain = {
    DESERT: 'desert',
    GRASSLAND: 'grass',
    OCEAN: 'ocean'
}

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

export class Hex {
    constructor(options) {
        this.options = this.defaults()
        this.options = Object.assign(this.options, options)
    }

    defaults(){
        return {
            terrain: terrain.OCEAN,
            cx: 0,
            cy: 0,
            r: 10
        }
    }

    drawPoly(options){
        this.hexPoly = new PIXI.Graphics
        this.hexPoly.beginFill(options.fill)
        this.hexPoly.x = options.loc.x
        this.hexPoly.y = options.loc.y
        this.hexPoly.drawPolygon(options.points)
        this.hexPoly.endFill()
        return this.hexPoly
    }
    drawSprite(options){
        this.hexSprite = new PIXI.Sprite(loader.resources[this.options.terrain].texture)
        this.hexSprite.anchor.set(0.5)
        this.hexSprite.setTransform(0,0,options.scale,options.scale)
        this.hexSprite.x = options.loc.x + options.xTransform
        this.hexSprite.y = options.loc.y + options.yTransform
        this.hexSprite.buttonMode = true
        this.hexSprite.interactive = true
        this.hexSprite.on('pointerdown', function(){
            this.texture = loader.resources.desert.texture
        })



        return this.hexSprite
    }
}