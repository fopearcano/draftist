import {createReadStream, existsSync} from 'node:fs';
import {createServer} from 'node:http';
import {extname, join, normalize} from 'node:path';

const root=process.cwd(); const port=Number(process.env.PORT||5173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
createServer((req,res)=>{const requestPath=req.url==='/'?'/index.html':decodeURIComponent(req.url.split('?')[0]);const file=normalize(join(root,requestPath));if(!file.startsWith(root)||!existsSync(file)){res.writeHead(404);res.end('Not found');return;}res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');createReadStream(file).pipe(res);}).listen(port,'0.0.0.0',()=>console.log(`Draftist ready at http://localhost:${port}`));
