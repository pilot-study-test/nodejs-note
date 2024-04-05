# KOA
## 强大的中间件 支持异步函数

## ctx 对象
- ctx.request
- ctx.response

## koa没有绑定任何中间件


## 核心功能：
- 比 express 更极致的 request/response 简化
    - ctx.status = 200
    - ctx.body = 'hello world'

- 使用 async function 实现中间件
    - 有 “暂停执行” 的能力 - 能把前面的中间件（暂停掉）
    - 在异步的情况下也符合洋葱模型

- 精简内核，所有额外功能都移到中间件里实现

## Express vs Koa
- express 门槛更低，koa 更强大优雅
- express 封装更多东西，开发更快速，koa可定制型更高
- express 社区更广，koa 社区更小
- express更适合小型项目，koa更适合大型项目

