import {oddqNeighbours} from './hexMath'

export const TERRAIN = {
    desert: 'desert',
    dirt: 'dirt',
    grass: 'grass',
    grass_hills: 'grass_hills',
    grass_trees: 'grass_trees',
    mountains: 'mountains',
    snow_hills: 'snow_hills',
    snow_trees: 'snow_trees',
    snow: 'snow',
    swamp: 'swamp',
    water: 'water'
}

const WORLD = {
    poleTemperature: 0
}

export const mapGen = (hexArray, width, height) => {
    for(let hex of hexArray) {
        //let t1 = Math.floor(Math.random() * Object.entries(TERRAIN).length)
        //hex.options.terrain = Object.entries(TERRAIN)[t1][0]
        //let t = Math.random()
        //make landfall
        //if (t>0.995) {
        //    hex.options.terrain = TERRAIN.grass
        //}
    }
}

function fillNeighbours(hex, hexArray, terrain){
    const nc = oddqNeighbours(hex.options.cx,hex.options.cy)
    for(let n of nc.array){
        let nb = hexArray.find(function(element) {
        return element.options.cx==n[0] && element.options.cy==n[1]
    })
    }
}