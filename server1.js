const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8001;
// const VIDEO_PATH = './videos/fragmented2.mp4'; // 替换为你的视频文件路径
const VIDEO_PATH = './videos/fraBox.mp4'; // 替换为你的视频文件路径

http.createServer((req, res) => {
    console.log(req.headers);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers','Content-Range');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,responsetype,ano_cus');


    const videoStat = fs.statSync(VIDEO_PATH);
    const fileSize = videoStat.size;
    const range = req.headers.range;
    if (req.method === 'OPTIONS') {
        // 对预检请求返回 200 状态码，并添加预检请求所需的头部
        res.writeHead(200);
        res.end();
        return;
      }

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(VIDEO_PATH, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Cus-File-Length':fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);
        file.pipe(res);
    } else {
        console.log('no range');
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(400, headers);
        fs.createReadStream(VIDEO_PATH).pipe(res);
    }
}).listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
