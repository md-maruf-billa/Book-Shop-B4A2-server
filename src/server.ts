import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
    try {
        await mongoose.connect(
            `mongodb+srv://${config.db_userName}:${config.db_password}@cluster0.fp7vkua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
        );
        app.listen(config.server_port, () => {
            console.log(`Example app listening on port ${config.server_port}`);
        });
    } catch (err: any) {
        throw new Error(err);
    }
}

// call main function for start server
main();
