module.exports = {
    redis_host: process.env.REDIS_HOST != null ? process.env.REDIS_HOST : '127.0.0.1',
    redis_port: process.env.REDIS_PORT != null ? process.env.REDIS_PORT : 6379
};
