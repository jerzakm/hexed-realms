import { Layer } from "./layer";

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

  let deleteLayerButton = document.createElement('button')
  deleteLayerButton.className = 'toolbox-item'
  let deleteLayerButtonIcon = document.createElement('i')
  deleteLayerButtonIcon.className = 'fas fa-trash'
  deleteLayerButton.appendChild(deleteLayerButtonIcon)

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
export const makeLayer = (layer: Layer): void => {
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

    console.log(layerContainer)

    layerContainer.appendChild(layerEntry)
}

`<layers id="layer-window">
<titlebar>Layers</titlebar>
<container class="layer-container">
    <layer>
        <div class="layer-preview"></div>
        <label>Layer name</label>
        <div class="layer-icons">
            <i class="fas fa-arrow-up"></i>
            <i class="fas fa-arrow-down"></i>
        </div>
    </layer>
    <layer>
        <div class="layer-preview"></div>
        <label>Layer name</label>
        <div class="layer-icons">
            <i class="fas fa-arrow-up"></i>
            <i class="fas fa-arrow-down"></i>
        </div>
    </layer>
    <layer>
        <div class="layer-preview"></div>
        <label>Layer name</label>
        <div class="layer-icons">
            <i class="fas fa-arrow-up"></i>
            <i class="fas fa-arrow-down"></i>
        </div>
    </layer>
</container>
<buttonbar class="layer-window-buttonbar">
    <button class="toolbox-item" id="new-layer-button"><i class="fas fa-file"></i></button>
    <button class="toolbox-item" id="delete-layer-button"><i class="fas fa-trash"></i></button>
    <button class="toolbox-item" id="delete-layer-button"><i class="fas fa-sliders-h"></i></button>
</buttonbar>
</layers>`