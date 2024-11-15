// code link: https://medium.com/swlh/run-python-script-from-node-js-and-send-data-to-browser-15677fcf199f
const fs = require('fs');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const path = require('path')
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = 30082;

app.use(fileUpload());
app.engine('html', require('ejs').renderFile);
	
app.set('view engine', 'ejs'); // configure template engine	
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.use(ejsLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser. text({type: '/'}));

//const mlview = 'G:\\From_phadnis-dev_170423\\python_apps\\com.utes.py.ml\\view';
const mlview = 'E:\\app2\\python_apps\\com.utes.py.ml\\view';
/* app.get('/form',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
}); */
app.get('/neural1', (req, res) => {
 
 var dataToSend;
 var largeDataSet = [];
 var imageData = "";
 console.log('getNeuralNetApp:001');
 // spawn new child process to call the python script
 //const python = spawn('python', ['com.utes.py.js/com.utes.py.scritp1.py']);
 const python = spawn('python', ['./com.utes.py.ml.neuralnet_FromScratchdatPrint.py','com.utes.py.js/uploads','neural_fromScratch.png']);
 console.log('getNeuralNetApp:002');
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('getNeuralNetApp:003:   ' + data.toString());
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 //res.send(dataToSend)
  console.log("currnentdir:  "+ __dirname);
 res.sendFile('G:/From_phadnis-dev_170423/python_apps/com.utes.py.ml/com.utes.py.js/uploads/neural_fromScratch.png');
 });
    /* spawn new child process to call the python script
    const python = spawn('python', ['com.utes.py.js/com.utes.py.script4.py']);

    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        // largeDataSet.push(data);
        imageData+=data;
    });
    in close event we are sure that stream is from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log('end!')
        var decoded = Buffer.from(imageData, 'base64');
        res.send(decoded);
        //res.send(largeDataSet.join(""))
    });*/
});


app.get('/machineLearn', function (req, res) {
  console.log("currentDir:  " + __dirname);
  res.sendFile(mlview+'/aitools.html');
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

app.listen(port, () => console.log(`Example app listening on port 
${port}!`))