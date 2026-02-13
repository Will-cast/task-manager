import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TaskModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
