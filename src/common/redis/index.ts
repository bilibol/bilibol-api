import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { env } from 'src/common/config';

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
});

export const REDIS_TOKEN = Symbol.for('REDIS');

@Global()
@Module({
  providers: [{ provide: REDIS_TOKEN, useValue: redis }],
  exports: [{ provide: REDIS_TOKEN, useValue: redis }],
})
export class RedisModule {}
