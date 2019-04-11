export let guiState = {
    brushSize: 1
}
let tools = []

export function initGui() {
    setupToolbox()
    drawToolbox()
    //default mode
    swapMode('paint-brush')
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

function setPaintBrushTools(parent){
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
    //label2.textContent='0'
    label2.className = 'tool-setting-group-label'
    label2.textContent = brushSliderValue()
    container.appendChild(label)
    container.appendChild(input)
    container.appendChild(label2)
    parent.append(container)
}