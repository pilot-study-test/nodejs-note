# Express
## 要了解一个框架，最好的方法是
- 了解它的关键功能
- 推导出它要解决的问题是什么

## 核心功能
- 路由
- request/reponse 简化
    - request： pathname、query 等
    - response： send()、json()、jsonp() 等

## express 中间件 可以穿行
- express 中间件洋葱模型不完善
- express 中间件对异步函数支持不好

需要用koa