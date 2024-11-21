import 'dotenv/config';

const config = {
    server_port: process.env.PORT,
    db_userName: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
};

export default config;
