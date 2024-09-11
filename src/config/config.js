const path = require('path');
const Joi = require('joi');
const dotenv = require('dotenv');
const { env } = require('process');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().description('Mongo DB url'),
        JWT_SECRET: Joi.string().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
        .default(30)
        .description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().
        default(30).
        description('days after which refresh tokens expire'),
    })
    .unknown();

const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    },
};