const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared

//todo classes/interfaces for tilesetRefs
export let tileSetRef: any
export let tileTextureData: any

export async function loadTileSetThenDo(onComplete: any) {
    const ref = await fetch('/assets/tileset/tilesRef64.json')
    const tile = await fetch('/assets/tileset/tilesData64.json')
    tileTextureData = await tile.json()
    tileSetRef = await ref.json()
    loader.resources = tileTextureData
    loader.resources.empty = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAADzSURBVHhe7cihAQAwEISw33/p6wJoahAxuW35CDMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgw48GMBzMezHgwY9k9PyeaRliie8sAAAAASUVORK5CYII='
    loader.load(onComplete)
}