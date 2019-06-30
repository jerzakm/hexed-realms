import * as PIXI from "pixi.js"
import * as HexMath from "./hexMath"

import {guiState} from '../gui/gui'
import { HexMap } from "./hexMap";
import { GlowFilter } from "pixi-filters";
const loader: any = PIXI.Loader.shared

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
     * @param loc.x X pixel position within a container
     * @param loc.y Y pixel position within a container
     * @param oddq oddq grid location
     * @param cube cubic location (x,y,z)
     * @param hexScale sprite scale based on hex dimensions
     * @param xTransform hex relative horizontal position to it's original location
     * @param yTransform hex relative vertical position to it's original location
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
    parent!: HexMap


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
        this.interactive = false

        this.math()
        this.setupInteraction()
    }

    /**
     * @description Calculates hex variables from given options
     */
    private math(){
        this.setTransform(0,0,this.hexScale,this.hexScale)
        this.loc = HexMath.calcHexLocation(this.oddq.col,this.oddq.row,this.r,this.h,this.flat)
        this.x = this.loc.x
        this.y = this.loc.y
        this.cube = HexMath.oddqToCube(this.oddq.col,this.oddq.row)
    }

    /**
    * @description Hex interaction listener
    */
    private setupInteraction(){
        this.on('mousedown', () => {
            guiState.drawMode = true
            this.paint()})
            this.on('pointerup', () => { guiState.drawMode = false })

            this.on('pointerover', () => {
            this.paint()
        })
    }

    /**
     * @description hex painting function
     */
    private paint() {
        if(guiState.mode=='paint-brush'||guiState.mode=='eraser'){
            let hexArray = this.parent.hexArray

            const originCube = this.cube

            //todo optimize
            for(let hex of hexArray) {
                const otherCube = hex.cube
                const distance = (Math.abs(originCube.x - otherCube.x) + Math.abs(originCube.y - otherCube.y) + Math.abs(originCube.z - otherCube.z)) / 2
                if(distance <= guiState.brushSize-1){
                    if(guiState.drawMode){
                        if(guiState.mode=='paint-brush'){
                            hex.texture=PIXI.Texture.from(loader.resources[`${guiState.currentHexTexture}`])
                        }else if(guiState.mode=='eraser') {
                            console.log(loader.resources)
                            hex.texture=PIXI.Texture.from(loader.resources[`empty`])
                        }
                    }
                    // hex.tint = 0xDDAAAA
                    hex.filters = [
                        new GlowFilter(20,0,3,0xffffff)
                    ]
                }
                else {
                    // hex.tint =  0xFFFFFF
                    hex.filters = []
                }
            }
        }
    }
}