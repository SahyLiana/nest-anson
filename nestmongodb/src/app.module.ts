import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://127.0.0.1/anson')],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestmongod'),
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
