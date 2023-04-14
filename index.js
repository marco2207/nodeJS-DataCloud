
const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/express/index.html'));
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
