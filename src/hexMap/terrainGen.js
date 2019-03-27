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

export const mapGen = (hexArray) => {
    for(let hex of hexArray) {
        let rnd = Math.floor(Math.random() * Object.entries(TERRAIN).length)
        hex.options.terrain = Object.entries(TERRAIN)[rnd][0]
    }
}