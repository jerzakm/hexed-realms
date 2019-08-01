import * as PIXI from "pixi.js"


const loader: any = PIXI.Loader.shared;
import * as HexMath from './hexMath'
import { randomColor } from '../util/random'
import * as HexTile from './hexTile'
import { sleep } from "../util/sleep";


export class HexMap extends PIXI.Container {
    flat: boolean
    r!: number
    h!: number
    worldWidth!: number
    worldHeight!: number
    x!: number
    y!: number
    hCount!: number
    wCount!: number
    hexArray: HexTile.SpriteHex[]
    children!: HexTile.SpriteHex[]

    constructor(){
        super()
        this.flat = true
        this.hexArray = []
    }

    setHexSize(r: number): HexMap{
        this.r = r
        this.h = r * Math.sqrt(3)
        return this
    }

    setWorldSize(worldWidth: number, worldHeight: number){
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

    setHexMapSize(wCount: number, hCount:number){
        this.wCount = wCount
        this.hCount = hCount
        return this
    }

    setFlat(flat: boolean){
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

    generateWorld(){
        //TODO TERRAIN FIX
        //mapGen(this.hexArray, this.wCount, this.hCount)
        return this
    }

    drawGrid(){
        let hexmap = this

        for (let i = 0; i < hexmap.wCount; i++) {
            for (let j = 0; j < hexmap.hCount; j++) {
                let hexOptions = {
                    r: hexmap.r,
                    h: hexmap.h,
                    flat: hexmap.flat,
                    oddq: {col:i,row:j},
                }
                const g = new PIXI.Graphics()
                const pos = HexMath.calcHexLocation(i,j,hexOptions.r,hexOptions.h, hexOptions.flat)
                g.position.x = pos.x
                g.position.y = pos.y
                g.lineStyle(5, 0x000)

                g.drawPolygon(HexMath.calcHexPoints(hexmap.r, hexmap.h, hexmap.flat))
                g.alpha = 0.3

                hexmap.addChild(g)
                hexmap.hexArray.push(g)
            }
        }


        return this
    }

    drawHexMap(){
        let texture = PIXI.Texture.from(loader.resources['empty'])
        let sprite = new PIXI.Sprite(texture)

        let hexmap = this

        //TODO refactor ugly fix for issues with rendering
        sleep(10).then(function(){
            const hexScale = ((2*hexmap.r)/sprite.width)

            for (let i = 0; i < hexmap.wCount; i++) {
                for (let j = 0; j < hexmap.hCount; j++) {
                    let hexOptions = {
                        r: hexmap.r,
                        h: hexmap.h,
                        flat: hexmap.flat,
                        hexScale: hexScale,
                        oddq: {col:i,row:j},
                        xTransform: 0,
                        yTransform: -6*hexScale
                    }

                    let hex = new HexTile.SpriteHex(texture, hexOptions)
                    hexmap.addChild(hex)
                    hexmap.hexArray.push(hex)
                }
            }
        })


        return this
    }

    align(){
        if(this.flat){
            //this.x = this.r
            this.y = -this.r/3
        }else {
            this.x = this.h
            this.y = this.r
        }
        return this
    }
}