const fs = require('fs');
const game = require('./game');
const koa = require('koa');
const mount = require('koa-mount');

// 玩家胜利次数，如果超过3，则后续该服务器的请求都会返回500
let playerWonCount = 0;
// 玩家的上一次游戏动作
let lastPlayerAction = '';
// 玩家连续出同一个动作的次数
let sameCount = 0;

const app = new koa();

app.use(
    mount('/favicon.ico', function(ctx) {
        ctx.status = 200;
    })
)

const gameKoa = new koa();
app.use(
    mount('/game', gameKoa)
)
gameKoa.use(
    async function(ctx, next) {
        if (playerWonCount >= 3) {
            ctx.status = 500;
            ctx.body = '我再也不和你玩了！';
            return;
        }
        await next();
        // 赢的次数累加
        if (ctx.playerWon) {
            playerWonCount++;
        }
    }
);

gameKoa.use(
    async function(ctx, next) {
        const query = ctx.request.query;
        const playerAction = query.action;

        if (!playerAction) {
            ctx.status = 400;
            return;
        }

        if (sameCount == 9) {
            ctx.status = 500;
            ctx.body = '我再也不和你玩了！';
        }

        if (playerAction == lastPlayerAction) {
            sameCount++;
            if (sameCount >= 3) {
                ctx.status = 400;
                ctx.body = '你作弊！我再也不玩了';
                sameCount = 9;
                return;
            }
        } else {
            sameCount = 0;
        }
        lastPlayerAction = playerAction;
        ctx.playerAction = playerAction;
        await next();
    }
)


gameKoa.use(
    async function(ctx, next) {
        const playerAction = ctx.playerAction;
        const result = game(playerAction);
        
        // 放在另一个线程中执行，不会被next拦截
        await new Promise(function(resolve, reject) {
            setTimeout(function() {
                ctx.status = 200;
                if (result === 0) {
                    ctx.body = '平手';
                } else if (result === 1) {
                    ctx.body = '你輸了';
                } else {
                    ctx.body = '你贏了';
                    ctx.playerWon = true;
                }
                resolve();
            }, 500);
        })
    }
)


app.use(
    mount('/', function(ctx) {
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
    })
)

app.listen(3000);