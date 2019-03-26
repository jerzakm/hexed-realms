const PIXI = require('pixi.js')
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
        this.flat=flat
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

    drawPoly(){
        const hexPointsPrecalc = calcHexPoints(this.r,this.h, this.flat)
        for (let i = 0; i < this.wCount; i++) {
            for (let j = 0; j < this.hCount; j++) {
                let loc =  calcHexLocation(i,j,this.r,this.h,this.flat)
                let hex = new HexPoly(i,j)
                hex.beginFill(randomColor())
                hex.setPoints(hexPointsPrecalc)
                hex.draw()
                hex.endFill()
                hex.interactive = true
                hex.buttonMode = true
                hex.x = loc.x
                hex.y = loc.y
                let sprite = new PIXI.Sprite.from('assets/desert.png')
                const scale = ((2*this.r)/sprite.width)
                sprite.setTransform(hex.x-this.r,hex.y-this.r-9*scale,scale,scale)
                this.addChild(hex)
            }
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