/**
 * Module: 
 */

/**
 *  Module: com.utes.protocol.exchange_server
 */
require('dotenv').config();
const https = require('https');
const http = require('http');
const formidable = require("formidable");
var DOMParser = require('xmldom').DOMParser;
const path = require('path');
const fs = require('fs');
const fsPromises = require("fs/promises");
const express = require('express');
const bodyParser = require('body-parser');
var xmlparser = require('express-xml-bodyparser');
const xml2js = require('xml2js');
const Transform = require('stream').Transform;
const util = require('util');
const { spawn } = require('child_process');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const port = process.env.PORT || 30015;
// view engine setup
app.set('views', path.join(__dirname, 'com.utes.py.ml/view'));
app.set('public', path.join(__dirname, 'com.utes.py.ml/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'com.utes.py.ml/public')));
app.use(express.static(path.join(__dirname, '/com.utes.py.ml')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xmlparser());
var qs = require('querystring');
var privateKey =  fs.readFileSync('nodeSrvPrvKey.pem');
var certificate = fs.readFileSync('nodeSrvCert.pem');
var credentials = {key: privateKey, cert: certificate};

app.get('/pyapp1', (req, res) => {
    var dataToSend;
    const pydata = spawn('python', ['com.utes.py.ml/com.utes.py.ml.neuralnetwork001.py']);
    console.log('pydata:   ');
    pydata.stdout.on('data', function (data) {
        console.log('Pipe data from python script ....');
        dataToSend = data.toString();
    });
    // in close event we ensure that stream from child process
   // is closed.
    pydata.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        //send data to browser
        res.send(dataToSend);
    });
});

app.get('/mldl', (req, res) => {
  res.sendFile('com.utes.py.ml/view/aitools.html', { root: __dirname });
});

// app.listen(port, () => console.log(`Your app listening on: ${port}` ));
https.createServer(credentials,app).listen(port);
http.createServer(app).listen(30086);

