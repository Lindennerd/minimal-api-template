import config from '../../config/index';
import mongoose from 'mongoose';

export default async () => {
    await mongoose.connect(config.database);

    mongoose.connection.on('connected', () => {
        config.log.info('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => { 
        config.log.error(err);
    });

    mongoose.set('debug', (process.env.NODE_ENV || 'development') === 'development');

    return mongoose;
}