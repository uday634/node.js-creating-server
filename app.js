const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>My first Page</title><head>');
        res.write('<body><h3>undefine</h3><form action="/message" method="POST"><input type="text"  name = "message"/><button>Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method == 'POST'){
        const body=[];
        req.on('data', (chunk)=>{
            console.log(chunk)
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            res.write('<html>');
            res.write('<head><title>My first Page</title><head>');
            res.write('<body><h3>'+message+'</h3><form action="/message" method="POST"><input type="text"  name = "message"/><button>Send</button></form></body>');
            res.write('</html>');
            return res.end();
        }); 
            fs.writeFile('message.text', message, (err)=>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        return res.write(()=>{
            
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);