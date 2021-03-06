module.exports = {
    // obligatory parameters
    rpc_user: process.env.RPC_USER,
    rpc_pass: process.env.RPC_PASS,

    // normal parameters
    redis_host: process.env.REDIS_HOST != null ? process.env.REDIS_HOST : '127.0.0.1',
    redis_port: process.env.REDIS_PORT != null ? process.env.REDIS_PORT : 6379,
    backup_S3_dir: process.env.PHORED_BACKUP_S3_DIR != null ? process.env.PHORED_BACKUP_S3_DIR : 'phored-db-backup',
    backup_S3_region: process.env.PHORED_BACKUP_S3_REGION != null ? process.env.PHORED_BACKUP_S3_REGION : 'us-east-1',
    backup_config_S3_file: process.env.PHORED_BACKUP_S3_INFO != null ? process.env.PHORED_BACKUP_S3_INFO : 'newest_prefix',
    phored_data_dir: process.env.PHORED_DATA_DIR != null ? process.env.PHORED_DATA_DIR : '/root/.phore',
    start_from_beginning: process.env.START_FROM_BEGINNING != null ? process.env.START_FROM_BEGINNING : false,
    phored_host: process.env.PHORED_HOST != null ? process.env.PHORED_HOST : 'http://127.0.0.1',
    phored_con_port: process.env.PHORED_PORT != null ? process.env.PHORED_PORT : 11771,
    phored_rpc_port: process.env.PHORED_RPC_PORT != null ? process.env.PHORED_RPC_PORT : 11772,
    phored_rpc_path: process.env.PHORED_RPC_PATH != null ? process.env.PHORED_RPC_PATH : "",
    phored_web_port: process.env.PHORED_WEB_PORT != null ? process.env.PHORED_WEB_PORT : 80,
};
