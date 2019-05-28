import * as PIXI from "pixi.js"


const loader: any = PIXI.Loader.shared;
import * as HexMath from './hexMath'
import { Hex } from './hex'
import { randomColor } from '../util/random'
import * as TestHex from './hexNew'


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
    hexArray: Hex[]
    testHexArray: TestHex.SpriteHex[]
    children!: Hex[]

    constructor(){
        super()
        this.flat = true
        this.hexArray = []
        this.testHexArray = []
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

    drawHexMap(){
        let texture = PIXI.Texture.from(loader.resources['empty'])
        let sprite = new PIXI.Sprite(texture)

        const hexScale = ((2*this.r)/sprite.width)

        for (let i = 0; i < this.wCount; i++) {
            for (let j = 0; j < this.hCount; j++) {
                let hexOptions = {
                    r: this.r,
                    h: this.h,
                    flat: this.flat,
                    hexScale: hexScale,
                    oddq: {col:i,row:j},
                    xTransform: 0,
                    yTransform: -6*hexScale
                }

                let hex = new TestHex.SpriteHex(texture, hexOptions)
                this.addChild(hex)
                this.testHexArray.push(hex)
            }
        }

        console.log(this.children)

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
    getHexOddq(row:number ,col:number){
        return this.hexArray.find(function(element){
            return element.options.oddq.row==row && element.options.oddq.col==col
        })
    }
    getHexCube(cube: HexMath.HexCubeCoordinates){
        return this.children.find(function(element){
            return element.options.cube.x==cube.x && element.options.cube.z==cube.z && element.options.cube.y==cube.y
        })
    }
}