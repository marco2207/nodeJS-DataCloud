
const app = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
const http = require('https');

app.use(express.json());
app.use(express.static("express"));

// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
  });
const server = http.createServer(app);

server.listen(PORT);
console.debug('Server listening on port ' + PORT);
