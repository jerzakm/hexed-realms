const PIXI = require('pixi.js')
import { calcHexPoints, calcHexLocation } from "./hexMath";
import { randomColor } from "../util/random";

export class Hex extends PIXI.Graphics {
    constructor(cx,cy){
        super();
        this.cx=cx;
        this.cy=cy;
    }
    setFlat(flat){
        this.flat=flat;
        return this;
    }
    setPoints(points){
        this.points=points
        return this;
    }
    draw(){
        this.drawPolygon(this.points);
        return this;
    }
}

export class HexMap extends PIXI.Container {
    constructor(){
        super();
        this.flat = true;
    }
    setHexSize(r){
        this.r = r;
        this.h = r * Math.sqrt(3);
        return this;
    }
    setWorldSize(worldWidth, worldHeight){
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        if(this.flat){
            this.hCount = Math.floor(this.worldHeight/(2.75*this.r));
            this.wCount = Math.floor(this.worldWidth/(0.935*this.r));
        } else {
            this.hCount = Math.floor(this.worldHeight/(2.4*this.r));
            this.wCount = Math.floor(this.worldWidth/(1.08*this.r));
        }
        return this;
    }
    setHexMapSize(wCount, hCount){
        this.wCount = wCount;
        this.hCount = hCount;
        this.fitToWorld = false;
        return this;
    }
    setFlat(flat){
        this.flat=flat;
        return this;
    }
    getHexMapSize(){
        let mapSize = {
            wCount: this.wCount,
            hCount: this.hCount
        }
        return mapSize;
    }

    draw(){
        const hexPointsPrecalc = calcHexPoints(this.r,this.h, this.flat);
        for (let i = 0; i < this.wCount; i++) {
            for (let j = 0; j < this.hCount; j++) {
                let loc =  calcHexLocation(i,j,this.r,this.h,this.flat);
                let hex = new Hex(i,j);
                hex.beginFill(randomColor());
                hex.setPoints(hexPointsPrecalc);
                hex.draw();
                hex.endFill();
                hex.interactive = true;
                hex.buttonMode = true;
                hex.x = loc.x;
                hex.y = loc.y;
                hex.on('pointerdown', onClick);
                function onClick () {
                    console.log(`hexCoord: ${hex.cx};${hex.cy} canvasLoc: ${hex.x};${hex.y}`);
                }
                this.addChild(hex);
            }
        }
        return this;
    }

    align(){
        if(this.flat){
            this.x = this.r;
            this.y = 0.8*this.r;
        }else {
            this.x = this.h;
            this.y = this.r;
        }
        return this;
    }
}

export const createHexMap = (HEIGHT, WIDTH, HEX_SIZE) => {
    const hexMap = new HexMap()
        .setHexSize(HEX_SIZE)
        .setFlat(true)
        .setWorldSize(WIDTH,HEIGHT)
        .align()
        .draw();
    return hexMap;
}