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
        if(i&1!=0){
            loc.y = j*h+0.5*h;
        }
    } else {
        loc.y = j*r+j*r/2;
    }
    return loc;
}

export const hexNeighbours = (row,col) => {
    return {
        core: [row,col],
        array: [[row,col-1],[row-1,col],[row+1,col],[row-1,col+1],[row+1,col+1],[row,col+1]],
        N: [row,col-1],
        NW: [row-1,col],
        NE: [row+1,col],
        S: [row,col+1],
        SW: [row-1,col+1],
        SE: [row+1,col+1]
    }
}

export const oddqToCube = (row,col) => {
    const x = row
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