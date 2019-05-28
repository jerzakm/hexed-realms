import * as PIXI from "pixi.js"
import * as HexMath from "./hexMath"

import {guiState} from '../gui/gui'
const loader = PIXI.Loader.shared

interface IHexOptions {
    r: number
    h: number
    flat: boolean
    hexScale: number
    oddq: HexMath.HexGridCoordinates
    cube?: HexMath.HexCubeCoordinates
    xTransform: number
    yTransform: number
}

export class SpriteHex extends PIXI.Sprite {
    /**
     * @param r Hex radius
     * @param h Hex height
     * @param flat Is hex flat?
     */
    r: number
    h: number
    flat: boolean
    loc!: {
        x: number
        y: number
    }
    oddq: HexMath.HexGridCoordinates
    cube!: HexMath.HexCubeCoordinates
    hexScale: number
    xTransform: number
    yTransform: number


    constructor(spriteOptions: any, hexOptions: IHexOptions) {
        super(spriteOptions)

        this.r = hexOptions.r
        this.h = hexOptions.h
        this.flat = hexOptions.flat
        this.hexScale = hexOptions.hexScale
        this.oddq = hexOptions.oddq
        this.xTransform = hexOptions.xTransform
        this.yTransform = hexOptions.yTransform

        this.buttonMode = true
        this.interactive = true

        this.math()
        this.setupInteraction()
    }

    private math(){
        this.setTransform(0,0,this.hexScale,this.hexScale)
        this.loc = HexMath.calcHexLocation(this.oddq.col,this.oddq.row,this.r,this.h,this.flat)
        this.x = this.loc.x
        this.y = this.loc.y
        this.cube = HexMath.oddqToCube(this.oddq.col,this.oddq.row)
    }

    private setupInteraction(){
        this.on('pointerdown', () => {
            guiState.drawMode = true
            this.paint()})
            this.on('pointerup', () => { guiState.drawMode = false })

            this.on('pointerover', () => {
            this.paint()
        })
    }

    private paint() {
        if(guiState.mode=='paint-brush'){
            //TODO ugly hack - fix
            let hexArray = this.parent['testHexArray']

            const originCube = this.cube

            for(let hex of hexArray) {
                const otherCube = hex.cube
                const distance = (Math.abs(originCube.x - otherCube.x) + Math.abs(originCube.y - otherCube.y) + Math.abs(originCube.z - otherCube.z)) / 2
                if(distance <= guiState.brushSize-1){
                    if(guiState.drawMode){
                        hex.texture=PIXI.Texture.from(loader.resources[`${guiState.currentHexTexture}`])
                    }
                    hex.tint = 0xDDAAAA
                }
                else {
                    hex.tint =  0xFFFFFF
                }
            }
        }
    }

}