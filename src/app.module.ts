import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './common/config';

@Module({
  imports: [MongooseModule.forRoot(env.MONGO_URI), AdminModule],
})
export class AppModule {}
