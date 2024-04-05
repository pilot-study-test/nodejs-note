

interview(function(err, res) {
    if (err) {
        return console.log('cry')
    }
    console.log('success')
})

function interview(callback) {
    setTimeout(() => {
        if (Math.random() < 0.8) {
            callback(null, 'success')
        } else {
            callback(new Error)
        }
    }, 500)
}