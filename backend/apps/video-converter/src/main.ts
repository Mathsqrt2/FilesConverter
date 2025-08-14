import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { VideoConverterModule } from './video-converter.module';
import { RabbitMQQueues } from '@libs/enums';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(VideoConverterModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL as RmqUrl],
      queue: RabbitMQQueues.VIDEO_CONVERTER_QUEUE,
      queueOptions: {
        durable: true,
      },
      noAck: false,
      prefetchCount: 1,
      persistent: true,
      socketOptions: {
        heartbeatIntervalInSeconds: 360,
        reconnectTimeInSeconds: 20,
      }
    }
  });

  await app.listen();
}

bootstrap();
