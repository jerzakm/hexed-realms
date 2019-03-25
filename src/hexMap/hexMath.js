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