const PIXI = require('pixi.js')

const terrain = {
    DESERT: 'desert',
    GRASSLAND: 'grass',
    OCEAN: 'ocean'
}

export class HexPoly extends PIXI.Graphics {
    constructor(cx,cy){
        super()
        this.cx=cx
        this.cy=cy
    }
    setPoints(points){
        this.points=points
        return this
    }
    draw(){
        this.drawPolygon(this.points)
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
            terrain: terrain.GRASSLAND,
            cx: 0,
            cy: 0,
            r: 10
        }
    }

    hexPoly(options){

    }
}