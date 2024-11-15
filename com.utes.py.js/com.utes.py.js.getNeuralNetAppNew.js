const express = require('express');
const fileUpload = require('../lib/index');
const path = require("path");
const app = express();

const PORT = 3000;
console.log(__dirname);
app.get('/form',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
//app.set('view', __dirname + '/view'); // set express to look in this folder to render our view
// default options
app.use(fileUpload());
app.get('/ping', function(req, res) {
  res.send('index');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.sendFile(uploadPath);
  });
});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});