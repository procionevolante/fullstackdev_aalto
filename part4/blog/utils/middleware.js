const logger = require('../utils/logger');

const unknownEndpoint = (req, res) => {
	res.sendStatus(404);
};

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);

	if (error.name === 'CastError')
		return res.status(400).send({ error: 'malformatted id' });
	else if (error.name === 'ValidationError')
		return res.status(400).json({error: error.message});

	res.sendStatus(500);

	next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
}
