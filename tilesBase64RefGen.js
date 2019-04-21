// Finds and parses tiles to base 64 ready to use in img src or pixi

const path = require('path')
const fs = require('fs')
const md5 = require('md5')
const Datauri = require('datauri')
const pako = require('pako')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

let coreParent = {
    children: [],
    type: 'group',
    name: 'main',
    directoryPath: path.join(__dirname, 'HexTileset'),
    lastUpdated: Date.now()
}

let base64Data = {

}

tilesToBase64()

async function tilesToBase64(){
    process64(coreParent)
    while(Date.now()-coreParent.lastUpdated<100){
        await sleep(5)
    }
    cleanRef(coreParent)
    saveBase64()
}

function process64(parent) {
    fs.readdir(parent.directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            let nFile = {
                children: [],
                name: file
            }
            coreParent.lastUpdated=Date.now()
            nFile.directoryPath=path.join(parent.directoryPath, file)
            let stats = fs.statSync(nFile.directoryPath)
            if(stats.isFile()&&path.extname(nFile.directoryPath)=='.png'){
                delete nFile.children
                const tileMd5 = md5(nFile.directoryPath)
                nFile.type = 'tile'
                nFile.name = tileMd5
                base64Data[`${tileMd5}`] = new Datauri(nFile.directoryPath).content
                parent.children.push(nFile)
            } else if(stats.isDirectory()){
                nFile.type='group'
                let nameArray = file.split(' ')
                nameArray.shift()
                nFile.name=nameArray.join(' ')
                console.log(nFile.name)
                parent.children.push(nFile)
                process64(nFile)
            }
        });
    });
}

function cleanRef(ref) {
    delete ref.directoryPath
    if(typeof(ref.children) != 'undefined'){
        if(ref.children.length>0){
            for(let child of ref.children){
                cleanRef(child)
            }
        }
    }
}

async function saveBase64() {
    await sleep(5)
    if(Date.now()-coreParent.lastUpdated>100){
        // let refGzip = pako.deflate(JSON.stringify(coreParent))
        // let dataGzip = pako.deflate(JSON.stringify(base64Data))
        let refGzip = (JSON.stringify(coreParent))
        let dataGzip = (JSON.stringify(base64Data))
        console.log('saving file..')
        fs.writeFile("dist/assets/tileset/tilesRef64.json", refGzip, function(err) {
            if(err) {
                return console.log(err);
            }
        });
        fs.writeFile("dist/assets/tileset/tilesData64.json", dataGzip, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    } else {
        saveBase64()
    }
}