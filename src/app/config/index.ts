import 'dotenv/config';

const config = {
    server_port: process.env.PORT,
    database_uri: process.env.DATABASE_URI as string,
    env_type: process.env.NODE_ENV,
    bycript_solt: process.env.BCRYPT_SOLT,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_secret: process.env.CLOUD_SECRET
};

export default config;
