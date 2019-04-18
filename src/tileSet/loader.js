const PIXI = require('pixi.js')
const loader = PIXI.Loader.shared;
export let tileSetRef;

export async function loadTileSetThenDo(fun) {
    const response = await fetch('/assets/tilesRef.json');
    tileSetRef = await response.json();
    for(let group of tileSetRef.children) {
        for (let i = 0; i < group.children.length; i++) {
            const element = group.children[i]
            let tileRef = `${group.name.split(' ')[1]}_${i}`
            loader.add(tileRef, element.path)
        }
    }
    loader.load(fun)
}