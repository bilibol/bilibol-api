import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbconfig } from './common/database/config.database';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbconfig), AdminModule],
})
export class AppModule {}
