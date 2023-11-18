import { env } from 'src/common/config';
import { RelationOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from './naming-strategy.database';

export const dbconfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.DB_SYNC,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['dist/**/entities/*.js'],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  maxQueryExecutionTime: 1000,
};

export const many21config: RelationOptions = { onDelete: 'RESTRICT', onUpdate: 'NO ACTION' };
