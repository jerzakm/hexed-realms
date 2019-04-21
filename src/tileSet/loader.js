const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared
export let tileSetRef
export let tileTextureData


export async function loadTileSetThenDo(onComplete) {
    const ref = await fetch('/assets/tileset/tilesRef64.json')
    const tile = await fetch('/assets/tileset/tilesData64.json')
    tileTextureData = await tile.json()
    tileSetRef = await ref.json()
    loader.resources = tileTextureData
    console.log(loader)
    /*for(let tile of Object.keys(tileTextureData)){
        let texture = PIXI.Texture.from(tileTextureData[`${tile}`])
        loader.resources[`${tile}`]=texture
    }*/
    loader.load(onComplete)
}