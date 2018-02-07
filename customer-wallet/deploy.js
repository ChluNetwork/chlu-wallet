const path = require('path')
const IPFS = require('ipfs-api')

async function main(){
    console.log('Adding and Pinning last build to IPFS API running at localhost:5001')
    const ipfs = new IPFS('localhost', 5001)
    const options = {
        recursive: true,
        ignore: '*/**/*.map'
    }
    const result = await ipfs.util.addFromFs(path.resolve(__dirname, './build'), options)
    for (const file of result) {
        console.log(file.hash, '\t', file.path)
    }
    const multihash = result[result.length-1].hash
    console.log('\n')
    console.log('Test the build using https://ipfs.io/ipfs/' + multihash)
    console.log('This build has been automatically pinned. You can remove it using ipfs pin rm -r ' + multihash)
    console.log('To publish the build, run ipfs name publish /ipfs/' + multihash)
}

main()
    .catch(error => {
        console.log(error)
        process.exit(1)
    })