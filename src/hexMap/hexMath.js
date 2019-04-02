export const calcHexPoints = (r,h, flat) => {
    if(flat) {
        return [-r, 0,-r/2, h/2,r/2, h/2, r, 0, r/2, -h/2, -r/2, -h/2]
    } else {
        return [-h/2,r/2, 0, r, h/2, r/2, h/2, -r/2, 0, -r, -h/2, -r/2]
    }
}

export const calcHexLocation = (i,j,r,h,flat) => {
    let loc = {
        x: 0,
        y: 0
    }
    if(flat){
        loc.x = i*1.5*r;
    } else {
        loc.x = i*h;
        if(j%2==0){
            loc.x-=h/2;
        }
    }
    if (flat){
        loc.y = j*h;
        if(i%2!=0){
            loc.y = j*h+0.5*h;
        }
    } else {
        loc.y = j*r+j*r/2;
    }
    return loc;
}

export const oddqNeighbours = (col,row) => {
    const N = [col,row-1]
    const NW = [row-1,col]
    const NE = [row+1,col]
    const S = [row,col+1]
    const SW = [row+1,col-1]
    const SE =  [row+1,col+1]
    return {
        core: [row,col],
        array: [N,NW,NE,S,SW,SE],
        N:N,
        NW:NW,
        NE:NE,
        S:S,
        SW:SW,
        SE:SE
    }
}

export const cubeNeighbours = (cube) => {
    let N = {x: cube.x, y: cube.y+1, z: cube.z-1}
    let NW = {x: cube.x-1, y: cube.y+1, z: cube.z}
    let NE = {x: cube.x+1, y: cube.y, z: cube.z-1}
    let S = {x: cube.x, y: cube.y-1, z: cube.z+1}
    let SW = {x: cube.x-1, y: cube.y, z: cube.z+1}
    let SE = {x: cube.x+1, y: cube.y-1, z: cube.z}
    return {
        N: N,
        NW: NW,
        NE: NE,
        S: S,
        SE: SE,
        SW: SE,
        array: [N,NW,NE,S,SW,SE]
    }
}

export const oddqToCube = (col,row) => {
    const x = col
    const z = row - (col - (col&1)) / 2
    return {
        x: x,
        z: z,
        y: -x-z
    }
}

export const cubeToOddq = (cube) => {
    return {
        col: cube.x,
        row: cube.z + (cube.x - (cube.x&1)) / 2
    }
}