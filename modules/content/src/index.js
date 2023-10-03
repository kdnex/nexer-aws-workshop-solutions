const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');

// ...

const app = express();
app.use(express.json());
app.use('/', routes);

// ...

const server = app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received, closing API server'); 
   
    server.close(() => {
        console.log('API server closed');

        // other connnections and resources to clean up.
        
        process.exit(0);
    });
});