import type { RequestHandler, Express } from 'express';
import { ViteDevServer } from 'vite';
import path from 'path';
import React from 'react';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite'

const isProd = process.env.NODE_ENV === 'production';
const cwd = process.cwd();

const loadSsrEntryModule = async (vite: ViteDevServer | null) => {
  // 生产模式下直接 require 打包后的产物
  if (isProd) {
    const entryPath = path.join(cwd, 'dist/server/entry-server.js');
    return require(entryPath);
  }
  // 开发环境下通过 no-bundle 方式加载
  else {
    const entryPath = path.join(cwd, 'src/entry-server.tsx');
    return vite!.ssrLoadModule(entryPath);
  }
}


const htmlParse = async (vite: ViteDevServer | null, appHtml: string, url: string, data: Record<keyof any, unknown>) => {
  const templatePath = isProd ? path.join(cwd, 'dist/client/index.html') : path.join(cwd, 'index.html');
  let template = await fs.readFileSync(templatePath, 'utf-8');
  // 开发模式下需要注入 HMR、环境变量相关的代码，因此需要调用 vite.transformIndexHtml
  if (!isProd && vite) {
    template = await vite.transformIndexHtml(url, template);
  }
  const html = template
    .replace('<!-- SSR_APP -->', appHtml)
    // 注入数据标签，用于客户端 hydrate
    .replace(
      '<!-- SSR_DATA -->',
      `<script>window.__SSR_DATA__=${JSON.stringify(data)}</script>`
    );
  return html
}



export default async function createSsrMiddleware(app: Express): Promise<RequestHandler> {
  let vite: ViteDevServer | null = null;
  if (isProd) return async () => { }
  vite = await createServer({
    root: process.cwd(),
    server: {
      middlewareMode: 'ssr',
    }
  })
  // 注册 Vite Middlewares
  // 主要用来处理客户端资源
  // 如果你使用了自己的 express 路由（express.Router()），你应该使用 router.use
  app.use(vite.middlewares);

  return async (req, res, next) => {
    const url = req.originalUrl;
    // SSR 的逻辑
    // 1. 加载服务端入口模块
    const { ServerEntry, fetchData } = await loadSsrEntryModule(vite)
    // 2. 数据预取
    const data = await fetchData();
    // 3. 「核心」渲染组件
    const appHtml = renderToString(React.createElement(ServerEntry, { data }));
    // 4. 拼接 HTML，返回响应
    const html = await htmlParse(vite, appHtml, url, data)
    res.status(200).setHeader('Content-Type', 'text/html').end(html);
  };
}


