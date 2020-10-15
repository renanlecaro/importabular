const fs = require('fs')

const content = fs.readFileSync('./src/index.js').toString()


const transformed = content.replace(/export ([^ ]+)/gi, function (a,b,c) {
  if(b=='default'){
    return a
  }else{
    return b
  }
})

process.stdout.write(transformed)