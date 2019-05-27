import * as PIXI from 'pixi.js'

export class SpriteHex extends PIXI.Sprite {
    r: number
    loc: {
        x: number
        y: number
    }

    constructor(spriteOptions: any) {
        super(spriteOptions)
    }
}