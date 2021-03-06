import {setPaintBrushTools} from './modes/paintbrush'
import * as Layers from '../layers/layersComponent'
import { setEraserTools } from './modes/eraser';
import { viewport } from '..';
import { renderer } from '../core/renderer';

const Combokeys = require('combokeys')


export let combokeys = new Combokeys(document.documentElement)

interface IGuiState {
    mode: string
    brushSize: number
    textureSelectOpen: boolean
    drawMode: boolean
    currentHexTexture: string
}

export let guiState: IGuiState = {
    mode: 'paint-brush',
    brushSize: 1,
    drawMode: false,
    textureSelectOpen: false,
    currentHexTexture: 'empty'
}

interface IGuiTool {
    name: string
    icon: string
    alt: string
    mode: string
}

let tools: IGuiTool[] = []

export function initGui() {
    setupToolbox()
    drawToolbox()
    drawGlobalTestBtn()
    Layers.createLayerContainer()

    swapMode('paint-brush')
}

//draws dom toolbox and sets up button listeners- paintbrush, fill etc
function drawToolbox() {
    if(document.getElementById('toolbox-container')){

    } else {
        let toolboxContainer = document.createElement('nav')
        toolboxContainer.className = 'toolbox'
        toolboxContainer.id = 'toolbox-container'
        for (let tool of tools){
            let toolButton = document.createElement('button')
            toolButton.className = 'toolbox-item'
            //toolButton.alt=`${tool.alt}`
            toolButton.id=`${tool.mode}-tool`
            toolButton.addEventListener('click', function(){
                swapMode(tool.mode)
            })
            let toolIcon = document.createElement('i')
            toolIcon.className = `fas fa-${tool.icon}`;
            toolButton.appendChild(toolIcon)
            toolboxContainer.appendChild(toolButton)
        }
        document.body.appendChild(toolboxContainer)
    }
}



//setup toolbox - icons, names
function setupToolbox() {
    //Camera move
    tools.push({
        name: 'Move camera',
        icon: 'expand-arrows-alt',
        alt: 'Move your map around without drawing on it',
        mode: 'move'
    })
    //Paint brush
    tools.push({
        name: 'Paint brush',
        icon: 'paint-brush',
        alt: 'Paint the map with tiles',
        mode: 'paint-brush'
    })
    //eraser
    tools.push({
        name: 'eraser',
        icon: 'eraser',
        alt: 'Erase painted tiles',
        mode: 'eraser'
    })
}

function swapMode(mode: string) {
    //clear 'active tool' class from tags and add it to the activated mode
    const buttons = [].slice.call(document.getElementsByClassName('toolbox-item'))

    for(let button of buttons) {
        button.classList.remove('toolbox-item-selected')
        if(button.id==`${mode}-tool`) {
            button.classList.add('toolbox-item-selected')
        }
    }

    combokeys.detach()
    combokeys = new Combokeys(document.documentElement)
    guiState.mode = mode
    drawSelectedToolSettings(mode)
}

function drawSelectedToolSettings(mode: string){
    let settingsContainer = document.getElementById('tool-settings-box')

    if(settingsContainer){
        while(settingsContainer.firstChild) {
            settingsContainer.removeChild(settingsContainer.firstChild);
        }
    }

    switch(mode){
        case 'paint-brush':
            setPaintBrushTools(settingsContainer)
            break
        case 'move':
            console.log('move')
            break
        case 'eraser':
            setEraserTools()
    }
}

function drawGlobalTestBtn(){
    let testButton = document.createElement('button')
    testButton.className = 'tool-settings-box'
    testButton.id = 'global-test-btn'
    testButton.innerText = 'test'
    testButton.addEventListener('click', function(){
        // const image = renderer.plugins.extract.image(viewport)
        // document.body.appendChild(image);
        renderer.plugins.extract.canvas(viewport).toBlob((b)=> {
            const a = document.createElement('a')
            document.body.appendChild(a)
            a.download = 'hexmap.png'
            a.href = URL.createObjectURL(b)
            a.click
            a.remove()
        }, 'image/png')
        // renderer.extract.canvas(sprite).toBlob(function(b){
        //     var a = document.createElement('a');
        //     document.body.append(a);
        //     a.download = fileName;
        //     a.href = URL.createObjectURL(b);
        //     a.click();
        //     a.remove();
        // }, 'image/png');
    })
    document.body.appendChild(testButton)
}