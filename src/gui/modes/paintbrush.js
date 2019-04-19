import {tileSetRef} from '../../tileSet/loader'
import {guiState, combokeys} from '../gui'
const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;

export function setPaintBrushTools(parent){
    drawBrushSizeSlider()
    drawHotbar()
    setHotkeys()
    hotbarSetActive('1')
}

const drawHotbar = () => {
    let hotbarContainer = document.createElement('hotbar')
    hotbarContainer.className = 'tool-settings-box'
    hotbarContainer.id = 'terrain-hotbar'
    makeGroups(hotbarContainer)
    document.body.appendChild(hotbarContainer)
}

const drawBrushSizeSlider = () => {
    const brushSliderValue = () => {
        //brush size slider values are non linear
        return Math.round(Math.pow(1.0868, input.value))
    }
    let container = document.createElement('div')
    container.className='tool-setting-group'
    let label = document.createElement('label')
    label.className= 'tool-setting-group-label'
    label.textContent='Brush size'
    let input = document.createElement('input')
    input.className='range-slider'
    input.type='range'
    input.id='paint-tool-brush-size'
    input.min=1
    input.max=50
    input.value=3
    input.addEventListener('input', function(){
        label2.textContent = brushSliderValue()
        guiState.brushSize = brushSliderValue()
    })
    let label2 = document.createElement('label')
    label2.className = 'tool-setting-group-label'
    label2.textContent = brushSliderValue()
    container.appendChild(label)
    container.appendChild(input)
    container.appendChild(label2)
    document.getElementById('tool-settings-box').appendChild(container)
}



const makeGroups = (hotbarContainer) => {
    for(let group of tileSetRef.children){
        let hotbarButton = document.createElement('hotbarButton')
        hotbarButton.className='hotbar-element'

        let hotbarNumberLabel = document.createElement('label')
        hotbarNumberLabel.className='hotbar-key'
        const hotbarNumber = group.name.split(' ')[0]
        hotbarNumberLabel.textContent=`${hotbarNumber}`

        let hotbarIcon = document.createElement('img')
        hotbarIcon.className = 'hotbar-icon'
        hotbarIcon.src= `${group.children[0].path}`

        hotbarButton.appendChild(hotbarNumberLabel)
        hotbarButton.appendChild(hotbarIcon)
        hotbarContainer.appendChild(hotbarButton)

        hotbarButton.addEventListener("click", ()=> {
            hotbarSetActive(hotbarNumber)
        });
    }
}

const setHotkeys = () => {
    combokeys.bind('1', function() { hotbarSetActive('1') });
    combokeys.bind('2', function() { hotbarSetActive('2') });
    combokeys.bind('3', function() { hotbarSetActive('3') });
    combokeys.bind('4', function() { hotbarSetActive('4') });
    combokeys.bind('5', function() { hotbarSetActive('5') });
    combokeys.bind('6', function() { hotbarSetActive('6') });
    combokeys.bind('7', function() { hotbarSetActive('7') });
    combokeys.bind('8', function() { hotbarSetActive('8') });
    combokeys.bind('9', function() { hotbarSetActive('9') });
    combokeys.bind('0', function() { hotbarSetActive('0') });
}

const hotbarSetActive = (hotkey) => {
    let hotbarElements = document.getElementsByClassName('hotbar-element')
    for(let hotbarElement of hotbarElements) {
        for(let child of hotbarElement.children){
            if(child.className=='hotbar-key'){
                if(parseInt(child.innerText, 10)==parseInt(hotkey, 10)){
                    hotbarElement.classList.add('hotbar-element-selected')
                    //TODO make not dependent on array, load ref from Tileref or loader
                    let imgRef = hotbarElement.children[1].src.split('/')
                    imgRef = imgRef[imgRef.length-1]
                    for(let resource of Object.keys(loader.resources)){
                        if(loader.resources[`${resource}`].url.includes(imgRef)){
                            guiState.currentHexTexture=resource
                        }
                    }
                } else {
                    hotbarElement.classList.remove('hotbar-element-selected')
                }
            }
        }
    }
}