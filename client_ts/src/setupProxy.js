const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
  const authProxy = createProxyMiddleware('/auth', {
    target: process.env.AUTH_PROXY_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/auth': '',
    },
    logLevel: 'debug',
  })

  const chatProxy = createProxyMiddleware('/chat', {
    target: CHAT_PROXY_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/chat': '',
    },
    logLevel: 'debug',
  })

  const socketProxy= createProxyMiddleware('/socket.io', {
    target: SOCKET_PROXY_URL,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
  })

  app.use(authProxy)
  app.use(chatProxy)
  app.use(socketProxy)
}
