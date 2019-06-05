import {tileSetRef, tileTextureData} from '../../tileSet/loader'
import {guiState, combokeys} from '../gui'

import * as PIXI from "pixi.js"

const loader = PIXI.Loader.shared;

export function setPaintBrushTools(parent: any){
    drawBrushSizeSlider()
    drawHotbar()
    setHotkeys()
    hotbarKeyPress('1')
    guiState.textureSelectOpen = false
}

const drawHotbar = () => {
    if(!document.getElementById('terrain-hotbar-container')){
        let center = document.createElement('container')
        center.className = 'flex-center-container'
        center.id = 'terrain-hotbar-container'

        let hotbarContainer = document.createElement('hotbar')
        hotbarContainer.className = 'tool-settings-box'
        hotbarContainer.id = 'terrain-hotbar'

        makeGroups(hotbarContainer)

        center.appendChild(hotbarContainer)
        document.body.appendChild(center)
    }
}


const drawBrushSizeSlider = () => {
    const brushSliderValue = (): number => {
        //brush size slider values are non linear
        return Math.round(Math.pow(1.0868, parseInt(input.value,10)))
    }
    let toolGroup = document.createElement('div')
    toolGroup.className='tool-setting-group'
    toolGroup.id='paint-brush-tools'
    let label = document.createElement('label')
    label.className= 'tool-setting-group-label'
    label.textContent='Brush size'
    let input = document.createElement('input')
    input.className='range-slider'
    input.type='range'
    input.id='paint-tool-brush-size'
    input.min = `${1}`
    input.max = `${50}`
    input.value=`${3}`
    input.addEventListener('input', function(){
        label2.textContent = `${brushSliderValue()}`
        guiState.brushSize = brushSliderValue()
    })
    let label2 = document.createElement('label')
    label2.className = 'tool-setting-group-label'
    label2.textContent = `${brushSliderValue()}`
    toolGroup.appendChild(label)
    toolGroup.appendChild(input)
    toolGroup.appendChild(label2)
    let toolContainer = document.getElementById('tool-settings-box');
    if(toolContainer){
        toolContainer.appendChild(toolGroup)
    }
}

const makeGroups = (hotbarContainer: HTMLElement) => {
    let key = 1
    for(let group of tileSetRef.children){
        let groupIcon
        let terrainRef
        if(group.children[0].type=='tile'){
            groupIcon = tileTextureData[`${group.children[0].name}`]
            terrainRef = `${group.children[0].name}`
        } else {
            groupIcon = tileTextureData[`${group.children[0].children[0].name}`]
            terrainRef = `${group.children[0].children[0].name}`
        }

        let hotbarButton = document.createElement('hotbarButton')
        hotbarButton.className='hotbar-element'
        hotbarButton.setAttribute(`data-texture-group`,`${key-1}`)
        hotbarButton.setAttribute(`attx`,`${terrainRef}`)

        let hotbarNumberLabel = document.createElement('label')
        hotbarNumberLabel.className='hotbar-key'
        hotbarNumberLabel.textContent=`0${key}`
        key++
        let hotbarIcon = document.createElement('img')
        hotbarIcon.className = 'hotbar-icon'
        hotbarIcon.src= `${groupIcon}`

        hotbarButton.appendChild(hotbarNumberLabel)
        hotbarButton.appendChild(hotbarIcon)
        hotbarContainer.appendChild(hotbarButton)

        hotbarButton.addEventListener("click", ()=> {
            if(hotbarNumberLabel.textContent){
                hotbarKeyPress(hotbarNumberLabel.textContent)
            }
        });
    }
}

const setHotkeys = () => {
    combokeys.bind('1', function() { hotbarKeyPress('1') });
    combokeys.bind('2', function() { hotbarKeyPress('2') });
    combokeys.bind('3', function() { hotbarKeyPress('3') });
    combokeys.bind('4', function() { hotbarKeyPress('4') });
    combokeys.bind('5', function() { hotbarKeyPress('5') });
    combokeys.bind('6', function() { hotbarKeyPress('6') });
    combokeys.bind('7', function() { hotbarKeyPress('7') });
    combokeys.bind('8', function() { hotbarKeyPress('8') });
    combokeys.bind('9', function() { hotbarKeyPress('9') });
    combokeys.bind('0', function() { hotbarKeyPress('10') });
    combokeys.bind('-', function() { hotbarKeyPress('11') });
    combokeys.bind('esc', function() { destroyTextureSelect() });
}

let lastKeyPress:any  = {}

const hotbarKeyPress = (hotkey: string) => {
    if(Date.now()-lastKeyPress[`${hotkey}`]<1000){
        if(!guiState.textureSelectOpen) {
            drawTextureSelect(hotkey)
            guiState.textureSelectOpen = true
        }
    } else if(guiState.textureSelectOpen){
        drawTextureSelect(hotkey)
    } else if(Date.now()-lastKeyPress[`${hotkey}`]>1000){
        destroyTextureSelect()
    }
    lastKeyPress[`${hotkey}`] = Date.now()
    let hotbarElements = [].slice.call(document.getElementsByClassName('hotbar-element'))
    for(let hotbarElement of hotbarElements) {
        for(let child of hotbarElement.children){
            if(child.className=='hotbar-key'){
                if(parseInt(child.innerText, 10)==parseInt(hotkey, 10)){
                    const g = hotbarElement.getAttribute('attx')
                    guiState.currentHexTexture = g
                    hotbarElement.classList.add('hotbar-element-selected')

                } else {
                    hotbarElement.classList.remove('hotbar-element-selected')
                }
            }
        }
    }
}

function destroyTextureSelect() {
    let element = document.getElementById('texture-group-expanded-select-container')
    if(element!=null){
        element.remove()
    }
}

function drawTextureSelect(group:any){
    destroyTextureSelect()
    let selected = parseInt(group, 10) -1
    let previous = document.getElementById('texture-group-expanded-select-container')
    if(previous!=null){
        previous.remove()
    }
    const refGroup = tileSetRef.children[`${selected}`]

    let center = document.createElement('container')
    center.className = 'flex-center-container'
    center.id = 'texture-group-expanded-select-container'

    let textureSelectContainer = document.createElement('div')
    textureSelectContainer.id=`texture-group-expanded-select`
    if(refGroup.children[0].type=='group'){
        let subGroup = document.createElement('div')
        subGroup.className=`tool-settings-box`
        for(let subChild of refGroup.children){
            for(let tile of subChild.children){
                let imgElement = document.createElement('div')
                imgElement.className = "texture-select-element"

                let img = document.createElement('img')
                img.className = `texture-select-element-img`
                img.src = `${tileTextureData[`${tile.name}`]}`
                imgElement.appendChild(img)

                imgElement.addEventListener("click", ()=> {
                    selectNewTexture(selected, tile.name)
                })

                subGroup.appendChild(imgElement)
            }
        }
        textureSelectContainer.appendChild(subGroup)
    } else {
        let subGroup = document.createElement('div')
        subGroup.className=`tool-settings-box`

        let h2 = document.createElement('h2')
        h2.innerText=`${refGroup.name}`
        //subGroup.appendChild(h2)
        for(let tile of refGroup.children){
            let imgElement = document.createElement('div')
            imgElement.className = "texture-select-element"

            let img = document.createElement('img')
            img.className = `texture-select-element-img`
            img.src = `${tileTextureData[`${tile.name}`]}`
            imgElement.appendChild(img)
            imgElement.addEventListener("click", ()=> {
                selectNewTexture(selected, tile.name)
            })
            subGroup.appendChild(imgElement)
        }
        textureSelectContainer.appendChild(subGroup)
    }

    center.appendChild(textureSelectContainer)
    document.body.appendChild(center)
}


function selectNewTexture(group:any, texture: string){
    let hotbarElements = [].slice.call(document.getElementsByClassName('hotbar-element'))
    for(let hotbarElement of hotbarElements) {
        for(let child of hotbarElement.children){
            if(child.className=='hotbar-key'){
                if(parseInt(child.innerText, 10) == group+1){
                    hotbarElement.setAttribute('attx', texture)
                    const selectedTexture = hotbarElement.getAttribute('attx')
                    console.log(selectedTexture)
                    guiState.currentHexTexture = selectedTexture
                    hotbarElement.children[1].src=tileTextureData[`${selectedTexture}`]

                } else {
                    hotbarElement.classList.remove('hotbar-element-selected')
                }
            }
        }
    }
    destroyTextureSelect()
}