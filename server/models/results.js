const mongoose = require('mongoose');
mongoose.connect('mongodb://bd:QdqwH7xBrvr@localhost:27017/bd-calculator');

const resultSchema = mongoose.Schema({
  external: [
    {id: Number, name: String, references: String, unitCost: Number, quantity: Number}
  ],
  internal: [
    {id: Number, name: String, references: String, unitCost: Number, quantity: Number}
  ],
  totals: {
    external: Number,
    internal: Number,
    difference: Number,
    profit: Number
  },
  hospital: String,
  email: String
});

module.exports = mongoose.model('Result', resultSchema);