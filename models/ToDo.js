const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  code: {type: String, required: true, unique: true},
  title: {type: String, required: true, unique: true},
  description: {type: String},
  dateCreation: {type: Date, default: Date.now},
  dateExecution: {type: Date, default: Date.now},
  owner: {type: Types.ObjectId, ref: 'User'},
  status: {type: Boolean, default: false},
})


module.exports = model('ToDo', schema)
