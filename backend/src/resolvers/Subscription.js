const Subscription = {
  newEvent: {
    subscribe: (root, args, { pubsub }) => pubsub.asyncIterator('NEW_EVENT'),
  },
};

module.exports = Subscription;
