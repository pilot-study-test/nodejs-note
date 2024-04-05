


(function(){
    var promise = interview(1)
        .then(() => {
            return interview(2);
        })
        .then(() => {
            return interview(3);
        })
        .then(() => {
            console.log('smile');
        })
        .catch((err) => {
            console.log('cry at ' + err.round + ' round');
        })
})();

function interview(round) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve('success');
            } else {
                const error = new Error('fail');
                error.round = round;
                reject(error);
            }
        }, 500)
    })
}


// (function(){

//     var promise = new Promise(function(resolve, reject) { 
//         setTimeout(() => {
//             // resolve('Success!')
//             reject('Error!')
//         }, 500)
//     })
    
    
//     console.log(promise)
    
//     setTimeout(() => {
//         console.log(promise)
//     }, 800)

// })();