// Finds and parses tiles to base 64 ready to use in img src or pixi
// -not used currently-

const path = require('path')
const fs = require('fs')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const assetFolder = 'HexTileset_manual'

let coreParent = {
    children: [],
    type: 'group',
    name: 'main',
    directoryPath: path.join(__dirname, assetFolder),
    lastUpdated: Date.now()
}

tilesToRefGen()

function tilesToRefGen(){
    processRef(coreParent)
    saveRef()
}

function processRef(parent) {
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
            if(stats.isDirectory()){
                nFile.type='group'
                parent.children.push(nFile)
                let nextDir = path.join(parent.directoryPath, file)
                fs.readdir(nextDir, function (err, files) {
                    if (err) {
                        return console.log('Unable to scan directory: ' + err);
                    }
                    files.forEach(function (file) {
                        const filetype = path.extname(path.join(parent.directoryPath, file))
                        if(filetype=='.png') {
                            pathTest= `/assets/${assetFolder}/${nFile.name}/${file}`
                            nFile.children.push({
                                type: 'tile',
                                name: file,
                                path: `/assets/tileset/${file}`
                            })
                            fs.copyFile(`${assetFolder}/${nFile.name}/${file}`, `dist/assets/tileset/${file}`, (err) => {
                                if (err) throw err;
                                //console.log(`${file} was copied to destination.txt`);
                              });
                        }
                    });
                });
            }
        });
    });
}

async function saveRef() {
    await sleep(5)
    if(Date.now()-coreParent.lastUpdated>100){
        coreParent.directoryPath='/assets/'+assetFolder
        console.log('saving file..')
        fs.writeFile("dist/assets/tilesRef.json", JSON.stringify(coreParent), function(err) {
            if(err) {
                return console.log(err);
            }
        });
    } else {
        saveRef()
    }
}