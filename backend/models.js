var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI)

var Chapter = new Schema({
  chapter: {
    type: String,
  },
  points: {
    type: Number
  }
});


var Chapter = mongoose.model('chapter', Chapter);

module.exports = {
  Chapter: Chapter
};
