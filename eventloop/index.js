

const eventloop = {
    queue: [],
    
    loop() {

        while (this.queue.length > 0) {
            const callback = this.queue.shift();
            callback();
        }


        setTimeout(this.loop.bind(this), 50);
    },

    add(callback) {
        this.queue.push(callback);
    }
}

eventloop.loop();

setTimeout(() => {
    eventloop.add(function() {
        console.log('hello');
    })
}, 500)


setTimeout(() => {
    eventloop.add(function() {
        console.log('world');
    })
}, 800)