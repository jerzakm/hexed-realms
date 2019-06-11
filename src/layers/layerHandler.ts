import { viewport } from '..'
import { Layer } from './layer'
import { makeLayerEntry } from './layersComponent'
import { HexMap } from '../hexMap/hexMap';

export const addNewLayer = () => {
  let layer = new Layer('New Layer')

  let options = {
      worldWidth: 2800,
      worldHeight: 1400,
      hexSize: 60,
      flat: true
  }
  let layerMap = new HexMap()
  .setHexSize(options.hexSize)
  .setFlat(options.flat)
  .setWorldSize(options.worldWidth, options.worldHeight)
  .drawHexMap()
  .align()

  layer.addChild(layerMap)

  viewport.addChild(layer)

  return layer
}