const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;
import { calcHexPoints, calcHexLocation, oddqToCube } from './hexMath'
import { Hex } from './hex'
import { randomColor } from '../util/random'


export class HexMap extends PIXI.Container {
    constructor(){
        super()
        this.flat = true
        this.hexArray = []
    }
    setHexSize(r){
        this.r = r
        this.h = r * Math.sqrt(3)
        return this
    }
    setWorldSize(worldWidth, worldHeight){
        this.worldWidth = worldWidth
        this.worldHeight = worldHeight
        if(this.flat){
            this.hCount = Math.floor(this.worldHeight/(1.0*this.h))
            this.wCount = Math.floor(this.worldWidth/(1.5*this.r))
        } else {
            this.hCount = Math.floor(this.worldHeight/(1.5*this.r))
            this.wCount = Math.floor(this.worldWidth/(1.0*this.h))
        }
        return this;
    }
    setHexMapSize(wCount, hCount){
        this.wCount = wCount
        this.hCount = hCount
        this.fitToWorld = false
        return this
    }
    setFlat(flat){
        this.flat=JSON.parse(flat)
        return this
    }
    getHexMapSize(){
        let mapSize = {
            wCount: this.wCount,
            hCount: this.hCount
        }
        return mapSize
    }
    generateWorld(){
        //TODO TERRAIN FIX
        //mapGen(this.hexArray, this.wCount, this.hCount)
        return this
    }

    setup(){
        for (let i = 0; i < this.wCount; i++) {
            for (let j = 0; j < this.hCount; j++) {
                let hex = new Hex({
                    oddq: {col:i,row:j},
                    loc: calcHexLocation(i,j,this.r,this.h,this.flat),
                    cube: oddqToCube(i,j)
                })
                this.hexArray.push(hex)
            }
        }
        return this
    }

    drawPolyMap(){
        const hexPointsPrecalc = calcHexPoints(this.r,this.h, this.flat)
        const color = randomColor()
        for(let hex of this.hexArray) {
            hex.drawPoly({
                fill: color,
                points: hexPointsPrecalc
            })
            this.addChild(hex);
        }
        return this
    }
    drawSpriteMap(){
        let texture = PIXI.Texture.from(loader.resources['033b89aa2712dfcd36fe854e4835030c'])
        let sprite = new PIXI.Sprite(texture)
        const scale = ((2*this.r)/sprite.width)
        for(let hex of this.hexArray) {
            hex.drawSprite({
                scale: scale,
                xTransform: 0,
                yTransform: -6*scale
            })
            this.addChild(hex);
        }
        return this
    }

    align(){
        if(this.flat){
            this.x = this.r
            this.y = 0.8*this.r
        }else {
            this.x = this.h
            this.y = this.r
        }
        return this
    }
    getHexOddq(row,col){
        return this.hexArray.find(function(element){
            return element.options.oddq.row==row && element.options.oddq.col==col
        })
    }
    getHexCube(cube){
        return this.children.find(function(element){
            return element.options.cube.x==cube.x && element.options.cube.z==cube.z && element.options.cube.y==cube.y
        })
    }
}