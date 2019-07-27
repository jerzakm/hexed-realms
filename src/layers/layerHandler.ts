import { viewport } from '..'
import { Layer } from './layer'
import { HexMap } from '../hexMap/hexMap'
import { ifError } from 'assert'

export const addNewLayer = () => {
  let layer = new Layer('New Layer')

  let options = {
      worldWidth: 4600,
      worldHeight: 3400,
      hexSize: 60,
      flat: true
  }

  let layerMap = new HexMap()
  .setHexSize(options.hexSize)
  .setFlat(options.flat)
  .setWorldSize(options.worldWidth, options.worldHeight)
  .align()
  .drawHexMap()

  layer.addChild(layerMap)

  viewport.addChild(layer)

  return layer
}

export const activateLayer = (layer: Layer) => {
  let hexMap = layer.children[0]
  if(hexMap instanceof HexMap){
    for(let hex of hexMap.children){
      hex.interactive = true
    }
  }
}

export const deactivateLayer = (layerId: string) => {
  for(let layer of viewport.children) {
    if(layer instanceof Layer && layer.id.includes(layerId)){
      let hexMap = layer.children[0]
      if(hexMap instanceof HexMap){
        for(let hex of hexMap.children){
          hex.interactive = false
        }
      }
    }
  }
}

export const removeLayer = (layerId: string) => {
  for(let layer of viewport.children) {
    if(layer instanceof Layer && layer.id.includes(layerId)){
      layer.destroy()
    }
  }
}