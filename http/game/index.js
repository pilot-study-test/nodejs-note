const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const game = require('./game');

let playerWon = 0;

let playerLastAction = '';
let sameCount = 0;

http
    .createServer(function (request, response) {
        const parsedUrl = url.parse(request.url);
        // console.log('parsedUrl', parsedUrl);
        if (parsedUrl.pathname === '/favicon.ico') {
            response.writeHead(200);
            response.end();
            return;
        }

        if (parsedUrl.pathname == '/game') {
            const query = querystring.parse(parsedUrl.query);
            const playerAction = query.action;

            if (playerWon > 3 || sameCount == 9) {
                response.writeHead(500);
                response.end('我再也不和你玩了！');
                return;
            }

            if (playerLastAction && playerAction == playerLastAction) {
                sameCount++;
            } else {
                sameCount = 0;
            }

            playerLastAction = playerAction;

            if (sameCount >= 3) {
                response.writeHead(400);
                response.end('你作弊！');
                sameCount = 9;
                return;
            }


            const gameResult = game(playerAction);

            response.writeHead(200)
            if (gameResult === 0) {
                response.write('平手');
            } else if (gameResult === 1) {
                response.write('你輸了');
            } else {
                response.write('你贏了');
                playerWon++;
            }
            response.end();
        }
        
        if (parsedUrl.pathname === '/') {
            // response.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname + '/index.html').pipe(response);
        }
        
    })
    .listen(3000)

