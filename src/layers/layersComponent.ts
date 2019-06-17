import { Layer } from './layer'
import * as LayerHandler from './layerHandler'

/**
 * @function createLayerContainer - creates layer container
 */

export const createLayerContainer = (): void => {
  let layerWindow = document.createElement('layers')
  layerWindow.id = 'layer-window'

  let titleBar = document.createElement('titlebar')
  titleBar.innerText = 'Layers'
  layerWindow.appendChild(titleBar)

  let layerContainer = document.createElement('container')
  layerContainer.className = 'layer-container'
  layerContainer.id = 'layer-container'
  layerWindow.appendChild(layerContainer)

  let buttonBar = document.createElement('buttonbar')
  buttonBar.className = 'layer-window-buttonbar'

  let newLayerButton = document.createElement('button')
  newLayerButton.className = 'toolbox-item'
  let newLayerButtonIcon = document.createElement('i')
  newLayerButtonIcon.className = 'fas fa-file'
  newLayerButton.appendChild(newLayerButtonIcon)

  newLayerButton.addEventListener('click', ()=> {
      const layer = LayerHandler.addNewLayer()
      makeLayerEntry(layer)
  })

  let deleteLayerButton = document.createElement('button')
  deleteLayerButton.className = 'toolbox-item'
  let deleteLayerButtonIcon = document.createElement('i')
  deleteLayerButtonIcon.className = 'fas fa-trash'
  deleteLayerButton.appendChild(deleteLayerButtonIcon)

  //delete layer button
  deleteLayerButton.addEventListener('click', () => {
    for(let layer of Array.from(layerContainer.children)){
        if(layer.classList.contains('layer-active')){
            let layerDomValue = layer.getAttribute('layerId')
            let layerId = layerDomValue == null ? '' : layerDomValue
            try {
                LayerHandler.removeLayer(layerId)
                layer.remove()
            } catch(err) {
                console.log('error removing layer?')
                console.log(err)
            }
        }
    }
  })

  let editLayerButton = document.createElement('button')
  editLayerButton.className = 'toolbox-item'
  let editLayerButtonIcon = document.createElement('i')
  editLayerButtonIcon.className = 'fas fa-sliders-h'
  editLayerButton.appendChild(editLayerButtonIcon)

  buttonBar.appendChild(newLayerButton)
  buttonBar.appendChild(deleteLayerButton)
  buttonBar.appendChild(editLayerButton)

  layerWindow.appendChild(buttonBar)

  document.body.appendChild(layerWindow)
}


/**
 * @function makeLayer - creates layer entry
 */
export const makeLayerEntry = (layer: Layer): void => {
    let layerContainer = document.getElementById('layer-container')

    let layerEntry = document.createElement('layer')

    let layerPreview = document.createElement('div')
    layerPreview.className = 'layer-preview'
    layerEntry.appendChild(layerPreview)

    let layerName = document.createElement('label')
    layerName.innerText = `${layer.name}`
    layerEntry.appendChild(layerName)

    let layerIcons = document.createElement('div')
    let layerUp = document.createElement('i')
    layerUp.className = 'fas fa-arrow-up'
    let layerDown = document.createElement('i')
    layerDown.className = 'fas fa-arrow-down'
    layerIcons.appendChild(layerUp)
    layerIcons.appendChild(layerDown)
    layerEntry.appendChild(layerIcons)

    layerEntry.setAttribute('layerId',`${layer.id}`)

    if(layerContainer){
        layerContainer.prepend(layerEntry)
    }

    layerEntry.addEventListener('click', () => {
        // activates the layer (interactive = true)
        let cl = layerEntry.classList
        if(!cl.contains('layer-active')){
            //find a previously active layer
            if(layerContainer){
                for(let layer of Array.from(layerContainer.children)){
                    if(layer.classList.contains('layer-active')){
                        //todo fix ugly null escaping
                        layer.classList.remove('layer-active')
                        let layerDomValue = layer.getAttribute('layerId')
                        let layerId = layerDomValue == null ? '' : layerDomValue
                        LayerHandler.deactivateLayer(layerId)
                    }
                }
            }

            cl.add('layer-active')
            LayerHandler.activateLayer(layer)
        }
    })
}