const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const Datauri = require('datauri');

const directoryPath = path.join(__dirname, 'HexTileset');

let main = {
    children: [],
    type: 'folder',
    name: 'main',
    directoryPath: directoryPath,
    lastUpdated: Date.now()
}

function process(parent) {
    const uuid = uuidv1()

    fs.readdir(parent.directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            let nFile = {
                children: [],
                name: file
            }
            main.lastUpdated=Date.now()
            nFile.directoryPath=path.join(parent.directoryPath, file)
            let stats = fs.statSync(nFile.directoryPath)
            if(stats.isFile()&&path.extname(nFile.directoryPath)){
                nFile.dataUri = new Datauri(nFile.directoryPath).content
                nFile.type='file'
                parent.children.push(nFile)
            } else if(stats.isDirectory()){
                nFile.type='folder'
                parent.children.push(nFile)
                process(nFile)
            }
        });
    });
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

async function save() {
    await sleep(5)
    if(Date.now()-main.lastUpdated>100){
        console.log('saving file..')
        fs.writeFile("dist/assets/tiles.json", JSON.stringify(main), function(err) {
            if(err) {
                return console.log(err);
            }
        });
    } else {
        save()
    }
}

process(main)
save()