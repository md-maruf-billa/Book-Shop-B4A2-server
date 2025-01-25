import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
    try {
        await mongoose.connect(config.database_uri);
        app.listen(config.server_port, () => {
            console.log(`Book Server listening on port ${config.server_port}`);
        });
    } catch (err: any) {
        throw new Error(err);
    }
}

// call main function for start server
main();
