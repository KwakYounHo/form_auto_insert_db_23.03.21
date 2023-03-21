const fs   = require('fs');
const http = require('http')
const mysql= require('mysql2');
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port     : 3306,
  database : 'test_youn'
})






const server         = http.createServer((req,rep)=>{
  const headTypeHTML = {'Content-Type':'text/html'};
  if (req.method === 'GET' && req.url === '/') {
    const mainPage   = fs.readFileSync('./index.html','utf-8')
    rep.writeHead(200, headTypeHTML)
    rep.end(mainPage)
  }
  
  if (req.method === 'POST' && req.url.startsWith('/GoDB')) {
    let body = '';
    req.on('data',(chunk)=>{body += chunk;})
    req.on('end',()=>{
      // console.log(body);
      rep.writeHead(200, headTypeHTML);
      const pageTest = fs.readFileSync('./test.html','utf-8')
      const AtID     = body.split('=')[0]
      const AtPW     = body.split('=')[1].split('&')[1]
      const inID     = body.split('=')[1].split('&')[0].toString()
      const inPW     = body.split('=')[2].toString()
      console.log(AtID,inID,AtPW,inPW)
      conn.connect();
      let command = `
      INSERT INTO info (${AtID},${AtPW})
      values ('${inID}','${inPW}');
      `
      conn.query(
        command,
        (err,result,fields)=>{
          if (err) throw err;
          console.log(result);
        }
    );
    conn.end();
    rep.end(pageTest);
    })
  }
})
server.listen(2080,(err)=>{
  if (err) {
    throw err;
  } else {
    console.log('server run')
  }
})