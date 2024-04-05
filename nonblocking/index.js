const glob = require('glob');

// var result = null;

// console.time('glob');
// result = glob.sync(__dirname + '/**/*')
// console.timeEnd('glob');

// console.log(result)

// const getResult = async () => {
//     const res = await glob(__dirname + '/**/*');
//     // console.log(res);
//     return res.toString();
// }
// var result = null;
console.time('glob');
const files = glob.glob(__dirname + '/**/*')
files.then(function(res) {
    result = res;
    console.log('got result');
})


// result = getResult();
// console.log('files', files)
// files.then(function(files) {
//     console.log(err,files)
// })

console.timeEnd('glob');
console.log(1 + 1);

