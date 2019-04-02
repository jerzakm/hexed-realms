const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;
import {TERRAIN} from './terrainGen'
import {oddqNeighbours, oddqToCube, cubeNeighbours}  from './hexMath'


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
        const hexPoly = new PIXI.Graphics
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
                let hex = this.parent.getHexOddq(n[0],n[1])
                console.log(hex)
            }
        })
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
        hexSprite.on('pointerdown', () => {
            const neighbours = oddqNeighbours(this.options.oddq.col,this.options.oddq.row)
            for (let n of neighbours.array) {
                let hex = this.parent.getHexOddq(n[0],n[1])
                console.log(n)
                console.log(hex.options.oddq)
                //hex.children[0].texture=null
            }
        })
        this.addChild(hexSprite)

        //TODO as a method/option -> coord debug
        return this
    }
}