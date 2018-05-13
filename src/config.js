import convict from 'convict';
import * as fs from 'fs';

// Define a schema
var config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 8080,
        env: "PORT",
        arg: "port"
    },
    db: {
        host: {
            doc: "Database host name/IP",
            format: '*',
            default: 'db',
            env: 'DB_HOST'
        },
        name: {
            doc: "Database name",
            format: String,
            default: 'database',
            env: 'DB_NAME'
        },
        user: {
            doc: "Database username",
            format: String,
            default: 'root',
            env: 'DB_USER'
        },
        password: {
            doc: "Database password",
            format: String,
            default: 'password',
            env: 'DB_PASSWORD'
        }
    },
    redis: {
        host: {
            doc: "Redis host",
            format: String,
            default: 'redis',
            env: 'REDIS_HOST'
        },
    }
});

// Load environment dependent configuration
var env = config.get('env');
const envFile = './config/' + env + '.json'
if (fs.existsSync(envFile)) {
    config.loadFile(envFile);
}

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;