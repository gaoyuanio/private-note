const PORT = 3333
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const httpProxy = require('http-proxy')

// 接口转发的地址，如果要切换成stage环境就换成 apistage.huilianyi.com
const origin = 'apiuat.huilianyi.com'
// 需要转发的接口名
const proxyTable = ['/oauth', '/jd/api']

const proxy = httpProxy.createProxyServer({
  target: 'http://' + origin
})

const mine = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml",
  "woff": "application/x-woff",
  "woff2": "application/x-woff2",
  "tff": "application/x-font-truetype",
  "otf": "application/x-font-opentype",
  "eot": "application/vnd.ms-fontobject"
}

proxy.on('error', (err, req, res) => {
  res.writeHead(500, {
    'content-type': 'text/plain'
  })
  res.end('Something wrong')
})
proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyReq.setHeader('Host', origin)
})

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  let realPath = path.join('./', pathname)
  let ext = path.extname(realPath)
  ext = ext ? ext.slice(1) : 'unknown'
  if (proxyTable.some(item => pathname.indexOf(item) > -1)) {
    proxy.web(req, res)
    return
  }
  fs.exists(realPath, exists => {
    if (!exists) {
      res.writeHead(400, {'Content-Type': 'text/plain'})
      res.write('404 error')
      res.end()
    } else {
      if (realPath === './') realPath = './index.html'
      fs.readFile(realPath, 'binary', (err, file) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'})
          res.write('500 error')
          res.end()
        } else {
          if (ext === 'unknown') ext = 'html'
          const contentType = mine[ext] || 'text/plain'
          res.writeHead(200, {'Content-Type': contentType})
          res.write(file, 'binary')
          res.end()
        }
      })
    }
  })
})

server.listen(PORT)
console.log('Server running at port: ' + PORT + '.')

