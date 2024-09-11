const config = require('./config/config');
const app = require('./app');
const mongoose = require('mongoose');

let server;
mongoose.connect(config.mongoose.url).then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(config.port, () => {
        console.log(`Listening to port ${config.port}`);
    });
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
}
