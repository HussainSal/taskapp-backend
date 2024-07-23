import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    console.log(process.env.DATABASE_USER, 'USER');
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [__dirname + '/../**/*.entity.{js,ts}'], // add this line
      migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
      synchronize: true, // DONT REMOVE NOW, WE WILL RUN MIGRATION LOCALLY AS WELL
    };
  },
};
