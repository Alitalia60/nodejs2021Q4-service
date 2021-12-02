const dotenv = require('dotenv');
const { PORT } = require('./common/config');

const envParsed = dotenv.config().parsed;
if (envParsed.error) {
  throw envParsed.error;
}
const HOST = envParsed.HOST || 'localhost';
module.exports = function startServer(app) {
  app.listen(PORT, () => {
    console.log('==============================================');
    console.log(`Srerver is running on http://${HOST}:${PORT}`);
  });
};

// module.exports = startServer
