const swaggerAutoGen = require('swagger-autogen')();
const config = require('../config')[process.env.NODE_ENV || 'development'];

const doc = {
    info: {
        title: 'Sua Mesa 2',
        description: 'Refactor do famoso sistema Sua Mesa'
    },
    host: 'localhost:' + config.port,
    schemes: ['http']
};

const outputFile = './server/swagger-output.json';
const entry = [
    './server/service.js'
]

swaggerAutoGen(outputFile, entry, doc);