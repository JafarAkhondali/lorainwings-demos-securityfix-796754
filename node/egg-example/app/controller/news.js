const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const dataList = {
      list: [
        { id: 1, title: 'This is news 1', url: '/news/1' },
        { id: 2, title: 'This is news 2', url: '/news/2' }
      ]
    };

    await this.ctx.render('news/index.tpl', dataList);
  }
}

module.exports = NewsController
