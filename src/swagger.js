const swaggerAutoGen = require('swagger-autogen')();
const config = require('../config')

const doc = {
    info: {
        title: 'Sua Mesa 2',
        description: 'Refactor do famoso sistema Sua Mesa'
    },
    host: 'localhost:' + config.port,
    schemes: ['http']
};

const outputFile = './src/swagger-output.json';
const entry = [
    './src/service.js'
]

swaggerAutoGen(outputFile, entry, doc);