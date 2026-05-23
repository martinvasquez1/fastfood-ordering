import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';

export async function createApp(modules: any[], dbURL: string): Promise<INestApplication<any>> {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ...modules,
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: dbURL,
        autoLoadEntities: true,
        synchronize: true,
      }),
      EventEmitterModule.forRoot(),
      MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: { user: 'mock', pass: 'mock' },
        },
      }),
    ],
  }).compile();

  const app = moduleRef.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  return app;
}
