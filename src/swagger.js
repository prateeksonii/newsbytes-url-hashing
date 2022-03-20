const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['src/app.js', 'src/api/v1/routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles);
