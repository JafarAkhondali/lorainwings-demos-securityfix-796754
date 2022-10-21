# Demos

本库放置平时学习和练习的一些 demo

## 分类

- [示例项目相关](https://github.com/lorainwings/demos/tree/master/projects/)

- [代码片段 HTML](https://github.com/lorainwings/demos/tree/master/code-snippets/)

- [数据库相关](https://github.com/lorainwings/demos/tree/master/database/)

- [Node 相关](https://github.com/lorainwings/demos/tree/master/node/)

- [第三方脚本-油候 & Autojs](https://github.com/lorainwings/demos/tree/master/third-scripts/)

## Monorepo

如何通过 pnpm 管理 monorepo?

- [pnpm 官网](https://www.pnpm.cn/configuring)

### 创建 workspace

在 root 目录新建 pnpm-workspace.yaml，内容如下

```yaml
packages:
  - "projects/**"
  - "node/**"
  - "third-scripts/**"
  - "code-snippets/**"
```

### 常用命令

- 安装全局包

```sh
# -w 也就是workspace root, 表示把包安装在 root 下, <root>/node_modules
pnpm install typescript -w
```

- 安装局部包

```sh
pnpm --filter "./projects/babel" install
```

- 局部运行命令

```sh
pnpm --filter "./projects/babel" babel
pnpm --filter "./projects/vite/vite3-ts" build
```

- 安装内部依赖(项目间相互引用)

```sh
pnpm i @node/node-pdf --filter @node/node-server
```
