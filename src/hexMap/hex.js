const PIXI = require('pixi.js')
import {guiState} from '../gui/gui'
const loader = PIXI.Loader.shared;
import {TERRAIN} from './terrainGen'
import {oddqNeighbours, oddqToCube, cubeNeighbours}  from './hexMath'

export class HexGraphics extends PIXI.Graphics {
    constructor(options) {
        super()
        this.options = options
    }
}
export class HexSprite extends PIXI.Sprite {
    constructor(options) {
        super()
        this.options = options
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
            r: 10
        }
    }

    drawPoly(options){
        const hexPoly = new HexGraphics(this.options)
        hexPoly.beginFill(options.fill)
        hexPoly.drawPolygon(options.points)
        hexPoly.endFill()
        this.addChild(hexPoly)
        this.hexPoly=hexPoly
        let text = new PIXI.Text(`${this.options.oddq.col};${this.options.oddq.row}`,{fontFamily : 'Arial', fontSize: 36, fill : 0x000000, align : 'left'})
        text.setTransform(-18,-10)
        this.addChild(text)
        hexPoly.buttonMode = true
        hexPoly.interactive = true
        hexPoly.on('pointerdown', () => {
            const neighbours = oddqNeighbours(this.options.oddq.col,this.options.oddq.row)
            for (let n of neighbours.array) {
                let hex = this.parent.getHexOddq(n[0],n[1]).children[0]
            }
        })
        return this
    }
    drawSprite(options){
        let hexSprite = new HexSprite
        hexSprite.texture = loader.resources[this.options.terrain].texture
        hexSprite.anchor.set(0.5)
        hexSprite.setTransform(0,0,options.scale,options.scale)
        hexSprite.x = options.xTransform
        hexSprite.y = options.yTransform
        hexSprite.buttonMode = true
        hexSprite.interactive = true
        hexSprite.on('pointerdown', () => { drawMode = true })
        hexSprite.on('pointerup', () => { drawMode = false })

        hexSprite.on('pointerover', () => {
            if(drawMode&&guiState.mode=='paint-brush'){
                let hexArray = this.parent.children
                const a = this.options.cube
                for(let hex of hexArray) {
                    const b = hex.options.cube
                    const distance = (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2
                    if(distance <= guiState.brushSize-1){
                        hex.children[0].texture=loader.resources['dirt'].texture
                    }
                }
            }
        })
        this.addChild(hexSprite)
        //TODO as a method/option -> coord debug
        return this
    }
}

let drawMode = false