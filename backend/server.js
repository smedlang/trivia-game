var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var socketIO = require('socket.io')
var bodyParser = require('body-parser');
var cors = require('cors');
let app = express();

app.use(cors());


var whitelist = ['http://localhost:3000']

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)


  }
}
app.use(cors(corsOptions));
mongoose.connect(process.env.MONGODB_URI);


let Chapter = require('./models').Chapter;


let connectedCounter = 0;

// app.use(cors());
// const server = http.Server(app)
const server = require('http').Server(app);
const io = socketIO(server)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//to initialize database
// const frats = ['Beta Theta Pi', 'Delta Chi', 'Delta Sigma Phi', 'Delta Tau Delta', 'Delta Upsilon', 'Phi Delta Theta',
// 'Phi Gamma Delta', 'Phi Kappa Psi', 'Phi Kappa Tau', 'Phi Kappa Theta', 'Pi Kappa Phi', 'Sigma Alpha Epsilon', 'Sigma Chi',
// 'Sigma Nu', 'Theta Chi', 'Zeta Beta Tau', 'Zeta Psi'];
//
// const sororities = ['Alpha Chi Omega', 'Alpha Gamma Delta', 'Alpha Phi', 'Delta Gamma', 'Kappa Alpha Theta', 'Phi Mu', 'Phi Sigma Rho', 'Pi Beta Phi',
// 'Sigma Psi', 'Sigma Sigma Sigma'];
//
// sororities.forEach(chapter=> {
//   let newChapter = new Chapter({
//     chapter: chapter,
//     points: 0
//   });
//   newChapter.save()
//   .catch(err => console.log(err));
// })
// 
// Chapter.find({})
// .then(results => {
//   results.forEach(result => {
//     result.points=0;
//     result.save()
//     .catch(err => console.log(err + ' with reseting chapter points to zero'));
//   })
// })



app.get('/getScoreBoard', (req, res) => {
  Chapter.find({})
  .then(results => {
    let myResults = results.sort((a, b) => b.points-a.points);

    myResults = myResults.map(entry => {
      return {
        chapter: entry.chapter,
        points: entry.points
      }
    })
    myResults = myResults.slice(0, 10);
    res.json({results: myResults});
  })
  .catch(err => {
    console.log(err);
    res.json({error: err})});
});

app.post('/addPoints', (req, res) => {
  let points = req.body.points;
  let chapter = req.body.chapter;

  console.log('addPoints ' + chapter + ': ' + points )


  Chapter.findOne({chapter: chapter})
  .then(result => {
    console.log(result.chapter + ' ' + result.points);
    result.points = result.points + points;
    console.log('updated points: ' + result.points);
    result.save(err=> {
      if (!err){
        res.json({status: 200})
      }else{
        res.json({status:400});
      }
    })
  }).catch(err => res.json({status: 400}));
})

server.listen(1337);
