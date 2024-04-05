# Node.js 异步编程 Promise
## Promise
- 当前事件循环得不到的结果，但未来的事件循环会给到你结果
- 是一个状态机
    - pending
    - fulfilled/resolved
    - rejected


## .then 和 .catch
- resolved 状态的 Promise 会回调后面的第一个 .then
- rejected 状态的 Promise 会回调后面的第一个 .catch
- 任何一个 rejected 状态且后面没有 .catch 的 Promise 都会触发 浏览器/node 环境的全局错误

## 执行 then 和 catch 会返回一个新 Promise，该 Promise 最终状态根据 then 和 catch 的回调函数的执行结果决定
- 如果回调函数最终是 throw，该 Promise 是 rejected 状态
- 如果回调函数最终是 return，该 Promise 是 resolved 状态
- 但如果回调函数最终 return 了一个promise，该 Promise 会和回调函数 return 的 Promise 状态保持一致

