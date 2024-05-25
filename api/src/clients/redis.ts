import Redis, { RedisOptions } from 'ioredis';

export const REDIS_TTL = 60 * 60 * 1;

type RedisConfig = {
  port: number;
  host: string;
  password: string;
  db: number;
};

function getRedisConfiguration(): RedisConfig {
  if(
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PASSWORD ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_DB
  ){
    throw new Error('[Redis] .env config is invalid');
  }

  return {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB)
  };
}
 
export function createRedisInstance(
  config = getRedisConfiguration()
) {
  try {
    const options: RedisOptions = {
      host: config.host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }
 
        return Math.min(times * 200, 1000);
      },
    };
 
    if (config.port) {
      options.port = config.port;
    }
 
    if (config.password) {
      options.password = config.password;
    }
 
    const redis = new Redis(options);
 
    redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error connecting', error);
    });
 
    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}