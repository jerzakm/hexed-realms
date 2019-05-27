import {setPaintBrushTools} from './modes/paintbrush'
const Combokeys = require('combokeys')


export let combokeys = new Combokeys(document.documentElement)

export let guiState = {
    brushSize: 1
}
let tools = []

export function initGui() {
    setupToolbox()
    drawToolbox()
    swapMode('paint-brush')
    drawGlobalTestBtn()
}

//draws dom toolbox and sets up button listeners- paintbrush, fill etc
function drawToolbox() {
    let toolboxContainer = document.createElement('nav')
    toolboxContainer.className = 'toolbox'
    toolboxContainer.id = 'toolbox-container'
    for (let tool of tools){
        let toolButton = document.createElement('button')
        toolButton.className = 'toolbox-item'
        toolButton.alt=`${tool.alt}`
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
}

function swapMode(mode) {
    //clear 'active tool' class from tags and add it to the activated mode
    const buttons = document.getElementsByClassName('toolbox-item')
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

function drawSelectedToolSettings(mode){
    let settingsContainer = document.getElementById('tool-settings-box')
    while(settingsContainer.firstChild) {
        settingsContainer.removeChild(settingsContainer.firstChild);
    }
    switch(mode){
        case 'paint-brush':
            setPaintBrushTools(settingsContainer)
            break
        case 'move':
            console.log('move')
            break
    }
}

function drawGlobalTestBtn(){
    let testButton = document.createElement('button')
    testButton.className = 'tool-settings-box'
    testButton.id = 'global-test-btn'
    testButton.innerText = 'test'
    testButton.addEventListener('click', function(){
        console.log('test button...')
    })
    document.body.appendChild(testButton)
}