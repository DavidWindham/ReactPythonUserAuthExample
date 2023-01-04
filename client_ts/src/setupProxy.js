// const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
  // const authProxy = createProxyMiddleware('/auth', {
  //   target: 'http://flaskjwttest-env.eba-wngtss3f.eu-west-2.elasticbeanstalk.com',
  //   changeOrigin: true,
  //   pathRewrite: {
  //     '^/auth': '',
  //   },
  //   logLevel: 'debug',
  // })

  // const chatProxy = createProxyMiddleware('/chat', {
  //   target: 'http://flaskjwttest-env.eba-wngtss3f.eu-west-2.elasticbeanstalk.com',
  //   changeOrigin: true,
  //   pathRewrite: {
  //     '^/chat': '',
  //   },
  //   logLevel: 'debug',
  // })

  // const socketProxy= createProxyMiddleware('/socket.io', {
  //   target: process.env.REACT_APP_SOCKET_PROXY_URL,
  //   changeOrigin: true,
  //   ws: true,
  //   logLevel: 'debug',
  // })
  // app.use(authProxy)
  // app.use(chatProxy)
  // app.use(socketProxy)
}
