const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;
import { calcHexPoints, calcHexLocation } from "./hexMath";
import { Hex, HexPoly, HexSprite } from "./hex";
import { randomColor } from "../util/random";


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

    setup(){
        for (let i = 0; i < this.wCount; i++) {
            for (let j = 0; j < this.hCount; j++) {
                let hex = new Hex({
                    cx:i,
                    cy:j
                })
                this.hexArray.push(hex)
            }
        }
        console.log(this.hexArray)
        return this
    }

    drawPolyMap(){
        const hexPointsPrecalc = calcHexPoints(this.r,this.h, this.flat)
        for(let hex of this.hexArray) {
            let polyHex = hex.drawPoly({
                fill: randomColor(),
                points: hexPointsPrecalc,
                loc: calcHexLocation(hex.options.cx,hex.options.cy,this.r,this.h,this.flat)

            })
            this.addChild(polyHex);
        }
        return this
    }
    drawSpriteMap(){
        let sprite = new PIXI.Sprite(loader.resources['desert'].texture)
        const scale = ((2*this.r)/sprite.width)
        for(let hex of this.hexArray) {
            let spriteHex = hex.drawSprite({
                loc: calcHexLocation(hex.options.cx,hex.options.cy,this.r,this.h,this.flat),
                scale: scale,
                xTransform: 0,
                yTransform: -6*scale

            })
            this.addChild(spriteHex);
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
}