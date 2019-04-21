const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared
export let tileSetRef
export let tileTextureData

export async function loadTileSetThenDo(onComplete) {
    let ref = await fetch('/assets/tileset/tilesRef64.json')
    let tile = await fetch('/assets/tileset/tilesData64.json')
    tileTextureData = await tile.json()
    tileSetRef = await ref.json()
    /*for(let tile of Object.keys(tileTextureData)){
        loader.add(tile, tileTextureData[`${tile}`])
    }*/
    loader.load(onComplete)
}