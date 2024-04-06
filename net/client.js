const net = require('net');
const socket = new net.Socket({});

const lessonids = [
    "906",
    "907",
    "1015",
    "1040",
    "1070",
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582",
    "151876",
    "151880",
    "151911",
    "151912",
    "151914",
    "152724",
    "155083",
    "155084",
    "155085",
    "155196",
    "155198",
    "158831",
    "158832",
    "158833",
    "158834",
    "158835",
    "159407",
    "162487",
    "162490",
    "162491",
    "162497",
    "162499",
    "165460",
    "165461",
    "165463",
    "165465",
    "165466",
    "168309",
    "168311",
    "168314",
    "168319",
    "168320",
    "171566",
    "171568",
    "171570",
    "171571",
    "171575",
    "171576"
];

socket.connect({
    host: '127.0.0.1',
    port: 4000,
});

let id = Math.floor(Math.random() * lessonids.length);

socket.on('data', (buffer) => {
    const seqBuffer = buffer.slice(0, 2);
    const titleBuffer = buffer.slice(2);
    console.log(seqBuffer.readInt16BE(), titleBuffer.toString());
    
    id = Math.floor(Math.random() * lessonids.length);
    socket.write(encode(id));
});

let seq = 0;
function encode(index) {
    const buffer = Buffer.alloc(6);
    buffer.writeUInt16BE(seq);
    buffer.writeUInt32BE(lessonids[index], 2);
    console.log(seq, lessonids[index]);
    seq++;
    return buffer;
}

// socket.write(encode(id));

setInterval(function(){
    id = Math.floor(Math.random() * lessonids.length);
    socket.write(encode(id));
}, 50)

