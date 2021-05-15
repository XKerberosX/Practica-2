const http = require(`http`);
const fs = require(`fs`);

// http => (request, response)
// levanta las peticiones
//const data = fs.readFileSync(`./www/file.txt`); forma syncrona

http
  .createServer((request, response) => {
    console.log(request.url);
    const file = request.url == "/" ? "./www/file.txt" : `./www${request.url}`;
    if (request.url == "/login") {
      let data = [];
      request
        .on("data", (value) => {
          data.push(value);
        })
        .on("end", () => {
          let params = Buffer.concat(data).toString();
          console.log(params);
          response.write(params);
          response.end();
        });
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        response.writeHead(404, { "content-type": "text/plain" }); // se manda el estado el que sea se manipula
        response.write("no encontrado 404");
        response.end();
      } else {
        const extension = file.split(".").pop();
        switch (extension) {
          case "txt":
            response.writeHead(200, { "content-type": "text/plain" }); // se manda el estado el que sea se manipula;
            break;
          case "html":
            response.writeHead(200, { "content-type": "text/html" });
            break;
          case "jpeg":
            response.writeHead(200, { "content-type": "image/jepg" });
            break;
          case "css":
            response.writeHead(200, { "content-type": "text/css" });
            break;
          case "js":
            response.writeHead(200, { "content-type": "text/js" });
            break;
          default:
            response.writeHead(200, { "content-type": "text/plain" });
            break;
        }

        response.write(data); //("QUE ONDAAAAAAAAAAAAAAA");
        response.end();
      }
    });
  })
  .listen(4444);
