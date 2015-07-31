var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    Datastore = require('nedb'),
    path = require('path');

var app = express();

app.use(express.static(path.resolve(__dirname + '/../build')));
app.use(express.static(path.resolve(__dirname + '/../node_modules')));
app.use(bodyParser.json());
app.use(cors());
app.listen(3000);

var db = new Datastore({ filename: __dirname + '/datastore', autoload: true });

/*app.get('/', function(req, res) {
   res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});*/

app.post('/api/pads', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    db.insert({ name: req.body.name });
    res.send();
});

app.get('/api/pads', function(req, res) {
    db.find({}, (err, docs) => res.send(docs));
});