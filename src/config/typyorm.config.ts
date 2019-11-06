import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '0.0.0.0',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
