import {tileSetRef} from '../tileSet/loader'

export const drawHotbar = () => {
    let hotbarContainer = document.createElement('hotbar')
    hotbarContainer.className = 'tool-settings-box'
    hotbarContainer.id = 'terrain-hotbar'
    makeGroups(hotbarContainer)
    document.body.appendChild(hotbarContainer)
}



const makeGroups = (hotbarContainer) => {
    for(let group of tileSetRef.children){
        let hotbarButton = document.createElement('hotbarButton')
        hotbarButton.className='hotbar-element'

        let hotbarNumber = document.createElement('label')
        hotbarNumber.className='hotbar-key'
        hotbarNumber.textContent=`${group.name.split(' ')[0]}`

        let hotbarIcon = document.createElement('img')
        hotbarIcon.className = 'hotbar-icon'
        hotbarIcon.src= `${group.children[0].path}`

        hotbarButton.appendChild(hotbarNumber)
        hotbarButton.appendChild(hotbarIcon)
        hotbarContainer.appendChild(hotbarButton)

        /*let hbGroup = document.getElementById('terrain-group-hotbar')
        for(let tile of group.children) {
            let hotbarButton = document.createElement('hotbarButton')
            hotbarButton.className='hotbar-element'
            let hotbarNumber = document.createElement('label')
            hotbarNumber.className='hotbar-key'
            hotbarNumber.textContent=`${group.name.split(' ')[0]}`
            let hotbarIcon = document.createElement('img')
            hotbarIcon.className = 'hotbar-icon'
            hotbarIcon.src= `${tile.path}`
            hotbarButton.appendChild(hotbarNumber)
            hotbarButton.appendChild(hotbarIcon)
            hbGroup.appendChild(hotbarButton)
        }*/
    }
}


`
<div class="tool-settings-box" id="terrain-hotbar">
        <div class="hotbar-element">
            <div class="hotbar-key">1</div>
            <img class="/assets/desert.png" id="test-img">
        </div>
        <div class="hotbar-element">
            <div class="hotbar-key">2</div>
            <img src="/assets/desert.png" class="hotbar-icon">
        </div>
        <div class="hotbar-element">
            <div class="hotbar-key">3</div>
            <img src="/assets/snow.png" class="hotbar-icon">
        </div>
        <div class="hotbar-element">
            <div class="hotbar-key">4</div>
            <img src="/assets/water.png" class="hotbar-icon">
        </div>
    </div>`