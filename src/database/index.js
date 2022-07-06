import config from '../../config/index.js';
import mongoose from 'mongoose';

const log = config.log();

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('error', () => log.error(console, 'connection error'));
mongoose.connection.once('open', function () {
    log.info('we\'re connected');
});

mongoose.set('debug', (process.env.NODE_ENV || 'development') === 'development');

export default mongoose;