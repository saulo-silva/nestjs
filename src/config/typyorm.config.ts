import { TypeOrmModuleOptions } from '@nestjs/typeorm';
console.log(__dirname + '/**/*.entity{.ts,.js}')
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '0.0.0.0',
  port: 5432,
  username: 'default',
  password: 'secret',
  database: 'taskmanager',
  entities: [ __dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true
}