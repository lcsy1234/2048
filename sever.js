const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.end('hello world');
});

server.listen(PORT, () => {
    console.log(`服务器已启动，访问 http://localhost:${PORT}`);
});    
