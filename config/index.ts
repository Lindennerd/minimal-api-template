import dotenv from 'dotenv';
import Logger, { createLogger } from 'bunyan';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

interface IConfig {
    name: string;
    port: number;
    database: string;
    secret: string;
    log: Logger;
}

export default {
    name: process.env.NAME,
    port: parseInt(process.env.PORT ?? "0"),
    database: process.env.DATABASE,
    secret: process.env.SECRET,
    log: createLogger({
        name: process.env.NAME as string,
        level: process.env.NODE_ENV === 'development' ? 'debug'
            : process.env.NODE_ENV === 'production' ? 'info'
            : 'fatal'
    })
} as IConfig;