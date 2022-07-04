const config = require('../../config');
const mongoose = require('mongoose');

const log = config.log();

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('error', () => log.error(console, 'connection error'));
mongoose.connection.once('open', function () {
    log.info('we\'re connected');
});

mongoose.set('debug', (process.env.NODE_ENV || 'development') === 'development');

module.exports = mongoose;