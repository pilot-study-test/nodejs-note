

var playerAction = process.argv[process.argv.length - 1];
console.log(playerAction)

var game = require('./lib');

// const result = game(playerAction)
// console.log(result);

let count = 0;

process.stdin.on('data', function (data) {
    const playerAction = data.toString().trim();
    const result = game(playerAction);

    if (result == -1) {
        count++;
    }
    if (count == 3) {
        console.log('你太厉害了，我不玩了');
        process.exit();
    }
});
