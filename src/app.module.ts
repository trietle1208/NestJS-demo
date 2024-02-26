import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions } from './db/data-source';
import { CategoryModule } from './modules/category.module';
import { BlogModule } from './modules/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    CategoryModule,
    BlogModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60000000s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
