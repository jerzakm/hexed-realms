// Finds and parses tiles to base 64 ready to use in img src or pixi
// -not used currently-

const path = require('path')
const fs = require('fs')
const Datauri = require('datauri')
const pako = require('pako')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

let coreParent = {
    children: [],
    type: 'folder',
    name: 'main',
    directoryPath: path.join(__dirname, 'tileset'),
    lastUpdated: Date.now()
}

tilesToBase64()

function tilesToBase64(){
    process64(coreParent)
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
            if(stats.isFile()&&path.extname(nFile.directoryPath)){
                nFile.dataUri = new Datauri(nFile.directoryPath).content
                nFile.type='file'
                parent.children.push(nFile)
            } else if(stats.isDirectory()){
                nFile.type='folder'
                parent.children.push(nFile)
                process64(nFile)
            }
        });
    });
}

async function saveBase64() {
    await sleep(5)
    if(Date.now()-coreParent.lastUpdated>100){
        let gzipped = pako.deflate(JSON.stringify(coreParent))
        console.log('saving file..')
        fs.writeFile("dist/assets/tiles.json", gzipped, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    } else {
        saveBase64()
    }
}