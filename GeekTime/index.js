const geektime = require('./lib');

geektime.addListener('newlesson', (data) => {
  console.log('new lesson: ', data);
})