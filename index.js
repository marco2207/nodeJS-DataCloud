
const express = require('express');
const app = express();
const path = require('path');
const pg = require("pg");
var bodyParser = require('body-parser');

/*
* PG Client connection
*/
pg.defaults.ssl = true;
var dbString = process.env.DATABASE_URL;
var sharedPgClient;
var client = new pg.Client(dbString);
client.connect();

app.use(bodyParser.urlencoded({extended: false}));
 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/express/index.html'));
});

app.post('/addpg', function(req,res){
  console.log('@@@ data sent by form are: ' + req.body.Name + ", " + req.body.Email + ", " + req.body.Message);
  var query = "INSERT INTO salesforce.Richieste__c (email__c, Name__c, Messaggio__c) VALUES (" + "'" + req.body.Email + "'" + ", " + "'" + req.body.Name + "'" + ", " + "'" + req.body.Message + "'" + ")";
  client.query(query, function(err){
     console.log("@@@ Wrote on Postgres");
     console.log("@@@" + err);
   });
  console.log("@@@ New message has been added");
  res.redirect('/');
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
