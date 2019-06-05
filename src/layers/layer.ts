import * as PIXI from 'pixi.js'
import * as uuid from 'uuid'

/**
 * @class Contains Hexmap, z-index, transforms and other graphical layer specific graphical manipulation
 */
export class Layer extends PIXI.Container {
  id: string
  name: string

  constructor(name: string){
    super()
    this.id = uuid.v1()
    this.name = name
  }


}