import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth.middleware';
import { UserController } from './user/controllers/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule, 
    TodoModule, 
    UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/users',
          method: RequestMethod.POST,
        },
        {
          path: '/users/login',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(UserController);
  }
}

//console.log(process.env.DATABASE_URL, "Connection Carlos")
