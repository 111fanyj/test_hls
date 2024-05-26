const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const filePath = path.join(__dirname, 'videos', req.url);
    
    if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Content-Length': stat.size
        });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    } else {
        res.writeHead(404);
        res.end();
    }
});

const port = 8000;
server.listen(port, () => {
    
    console.log(`Server is running on http://localhost:${port}`);
});