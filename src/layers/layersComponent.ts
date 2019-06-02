/**
 * @function createLayerContainer - creates layer container
 */

export const createLayerContainer = (): void => {
  let layerContainer = document.createElement('layers')
  layerContainer.id = 'layer-container'

  let titleBar = document.createElement('titlebar')
  titleBar.innerText = 'Layers'

  layerContainer.appendChild(titleBar)

  document.body.appendChild(layerContainer)
}

`<layers id="layer-container">
<titlebar>Layers</titlebar>
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
</layers>`