const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer(); // create new server instance.

server.express.use(cookieParser()); // use cookieParser middleware.
if (process.env.NODE_ENV === 'production') {
  server.express.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

server.express.use((req, res, next) => {
  const { token } = req.cookies; // extract the toke JWT from the cookie sent with client request to server.
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET); // authenticate the JWT as genuine and extract the user ID.
    req.userId = userId; // place the user ID into the request chain for use later.
  }
  next();
});

// custom middleware function
server.express.use(async (req, res, next) => {
  if (!req.userId) return next(); // if no user ID in request, skip function.
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{id, firstName, lastName, email}'
  ); // if user ID is present query DB for user information.
  req.user = user; // insert user details into request for use later in chain.
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  () => {
    console.log('Server running!');
  } // Start server and set CORS options.
);
