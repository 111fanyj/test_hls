const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,responsetype')

  console.log(req.url);
  res.writeHead(200)
  res.end()
})

const port = 8002
server.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`)
})
