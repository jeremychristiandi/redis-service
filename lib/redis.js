// lib/redis.js
import IORedis from "ioredis";

export const redisSub = new IORedis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379"
);
