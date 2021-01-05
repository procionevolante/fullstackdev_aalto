require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {
		logger.info('connected to MongoDB');
	}).catch((error) => {
		logger.info('error connecting to MongoDB:', error.message);
	});


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
