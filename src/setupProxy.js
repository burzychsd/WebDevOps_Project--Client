// Connecting to our api - its for axios basically, to not typing all the time full adress like 'http://localhost:3001/api'
// docs: https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:3001/' }));
};