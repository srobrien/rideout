const { forwardTo } = require('prisma-binding');
// forwardTo takes Queries from client and forwards them to DB directly.
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
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info); // only returns user date if the user is currently loggend in.
  },
};

module.exports = Query; // exports Query object.
