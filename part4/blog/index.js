const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');

// praise the hypnotoad!
// AKA 'small change to make a meaningful commit msg on git without learning how to rename old ones'

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
})
