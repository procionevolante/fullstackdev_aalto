const mongoose = require('mongoose');
const config = require('../utils/config.js');
const url = config.MONGODB_URI;

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
});

const User = mongoose.model('User', userSchema);

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
})

module.exports = mongoose.model('User', userSchema);
