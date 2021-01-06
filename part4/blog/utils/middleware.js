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
  else if (error.name === 'JsonWebTokenError')
    return response.status(401).json({error:'invalid token'});

  logger.error(error.message);

	next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
}
