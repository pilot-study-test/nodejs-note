
(function() {
    const result = async function () {
        try {
            var content = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('8'))
                }, 500)
            });
        } catch (error) {
            console.log('error', error.message)
        }
        console.log('content', content)
        return 4;
    }()
    
    setTimeout(() => {
        console.log('result', result)
    }, 800)
})();