const PIXI = require('pixi.js')
import {guiState} from '../gui/gui'
const loader = PIXI.Loader.shared;
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
            //TODO FIX
            //terrain: TERRAIN.water,
            r: 10
        }
    }

    drawPoly(options){
        const hexPoly = new HexGraphics(this.options)
        hexPoly.beginFill(options.fill)
        hexPoly.drawPolygon(options.points)
        hexPoly.endFill()
        hexPoly.alpha = 0
        this.addChild(hexPoly)
        this.hexPoly=hexPoly
        // let text = new PIXI.Text(`${this.options.oddq.col};${this.options.oddq.row}`,{fontFamily : 'Arial', fontSize: 36, fill : 0x000000, align : 'left'})
        // text.setTransform(-18,-10)
        // this.addChild(text)
        hexPoly.interactive = true
        hexPoly.on('pointerover', () => {
            if(guiState.mode=='paint-brush'){
                let hexArray = this.parent.children
                console.log(hexArray)
                const a = this.options.cube
                for(let hex of hexArray) {
                    const b = hex.options.cube
                    const distance = (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2
                    if(distance <= guiState.brushSize-1){
                        hex.children[0].alpha=0.6
                    } else {
                        hex.children[0].alpha=0
                    }
                }
            }
        })
        return this
    }
    drawSprite(options){
        let hexSprite = new HexSprite
        //TODO FIX
        let texture = PIXI.Texture.from(loader.resources['033b89aa2712dfcd36fe854e4835030c'])
        hexSprite.texture = texture
        hexSprite.anchor.set(0.5)
        hexSprite.setTransform(0,0,options.scale,options.scale)
        hexSprite.x = options.xTransform
        hexSprite.y = options.yTransform
        hexSprite.buttonMode = true
        hexSprite.interactive = true
        hexSprite.on('pointerdown', () => {
            drawMode = true
            paint()})
        hexSprite.on('pointerup', () => { drawMode = false })

        hexSprite.on('pointerover', () => {
            paint()
        })
        const paint = () => {
            if(guiState.mode=='paint-brush'){
                let hexArray = this.parent.children
                const a = this.options.cube
                for(let hex of hexArray) {
                    const b = hex.options.cube
                    const distance = (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2
                    if(distance <= guiState.brushSize-1){
                        if(drawMode){
                            hex.children[0].texture=PIXI.Texture.from(loader.resources[`${guiState.currentHexTexture}`])
                        }
                        hex.children[0].tint = 0xDDAAAA
                    }
                    else {
                        hex.children[0].tint =  0xFFFFFF;
                    }
                }
            }
        }
        this.addChild(hexSprite)
        //TODO as a method/option -> coord debug
        return this
    }
}

let drawMode = false