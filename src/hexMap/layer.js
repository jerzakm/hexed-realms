const PIXI = require('pixi.js')

export class Layer extends PIXI.Container {
    constructor(){
        super()
        console.log(this)
    }
}