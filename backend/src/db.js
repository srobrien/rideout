const { Prisma } = require('prisma-binding');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: false,
  secret: process.env.PRISMA_SECRET,
}); // creates a new DB instance linked to the production database.

module.exports = db; // exports the database.
