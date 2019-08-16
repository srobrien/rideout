const { forwardTo } = require('prisma-binding');

const Query = {
  event: forwardTo('db'),
  events: forwardTo('db'),
  eventsConnection: forwardTo('db'),
  comments: forwardTo('db'),
  comment: forwardTo('db'),
  user(parent, args, ctx, info) {


    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  },
};

module.exports = Query;
