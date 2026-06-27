const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'video/ogg',
    '.mp3': 'audio/mp3',
    '.wav': 'audio/wav'
};

const server = http.createServer((req, res) => {
    // Decode URI to handle spaces and special chars in filenames
    let decodedUrl;
    try {
        decodedUrl = decodeURIComponent(req.url);
    } catch (e) {
        res.statusCode = 400;
        res.end('Bad Request');
        return;
    }

    // Remove query strings / hash parameters
    const urlPath = decodedUrl.split('?')[0].split('#')[0];
    let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
    
    // Prevent directory traversal attacks
    const normalizedDir = path.normalize(__dirname);
    const normalizedFile = path.normalize(filePath);
    if (!normalizedFile.startsWith(normalizedDir)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }

    fs.stat(normalizedFile, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('File Not Found');
            } else {
                res.statusCode = 500;
                res.end(`Server Error: ${err.code}`);
            }
            return;
        }

        // If it's a directory, try serving index.html in that directory
        if (stats.isDirectory()) {
            filePath = path.join(normalizedFile, 'index.html');
            fs.stat(filePath, (err2, stats2) => {
                if (err2 || !stats2.isFile()) {
                    res.statusCode = 404;
                    res.end('Directory listing not allowed or index.html not found');
                    return;
                }
                serveFile(filePath);
            });
        } else {
            serveFile(normalizedFile);
        }
    });

    function serveFile(fileToServe) {
        const ext = path.extname(fileToServe).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(fileToServe, (err, content) => {
            if (err) {
                res.statusCode = 500;
                res.end(`Server Error: ${err.code}`);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop.');
});
