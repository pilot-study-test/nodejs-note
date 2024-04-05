const fs = require('fs');
const querystring = require('querystring');
const game = require('./game');
const express = require('express');
const url = require('url');

// 玩家胜利次数，如果超过3，则后续该服务器的请求都会返回500
let playerWonCount = 0;
// 玩家的上一次游戏动作
let playerLastAction = '';
// 玩家连续出同一个动作的次数
let sameCount = 0;

const app = express();

// app.use(function() {
// })

app.get('/favicon.ico', function(request, response, next) {
    response.send(200);
});

app.get('/game', 
    function(request, response, next) {
        if (playerWonCount >= 3 || sameCount == 9) {
            response.status(500);
            response.send('我再也不和你玩了！');
            return;
        }
        next();

        // 赢的次数累加
        if (response.playerWon) {
            playerWonCount++;
        }
    },
    function(request, response, next) {
        const query = request.query;
        const playerAction = query.action;

        if (playerLastAction && playerAction == playerLastAction) {
            sameCount++;
        } else {
            sameCount = 0;
        }

        playerLastAction = playerAction;

        if (sameCount >= 3) {
            response.status(400);
            response.send('你作弊！我再也不玩了');
            sameCount = 9;
            return;
        }
        response.playerAction = playerAction;
        next();
    },
    function(request, response) {
        const playerAction = response.playerAction;
        const gameResult = game(playerAction);
        
        // 放在另一个线程中执行，不会被next拦截
        // setTimeout(function() {
        //     response.status(200)
        //     if (gameResult === 0) {
        //         response.send('平手');
        //     } else if (gameResult === 1) {
        //         response.send('你輸了');
        //     } else {
        //         response.send('你贏了');
        //         response.playerWon = true;
        //     }
        // })
        response.status(200)
        if (gameResult === 0) {
            response.send('平手');
        } else if (gameResult === 1) {
            response.send('你輸了');
        } else {
            response.send('你贏了');
            response.playerWon = true;
        }
    });

app.get('/', function(request, response, next) {
    response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
});

app.listen(3000);