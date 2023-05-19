
const express = require('express');
const app = express();
const path = require('path');
const pg = require("pg");

/*
* PG Client connection
*/
pg.defaults.ssl = true;
var dbString = process.env.DATABASE_URL;
var sharedPgClient;
var client = new pg.Client(dbString);
client.connect();
 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/express/index.html'));
});

app.post('/addpg', function(req,res){
  console.log('@@@ data sent by form are: ' + req.Name + ", " + req.Email + ", " + req.Message);
  var query = "INSERT INTO salesforce.Richieste__c (email__c, name__c, message__c) VALUES (" + "'" + req.Email + "'" + ", " + "'" + req.Name + "'" + ", " + "'" + req.Message + "'" + ")";
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
