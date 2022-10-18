import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:hQ8Z5bUw38g4@107.22.1.222:5672/smartranking'], // param to specify the url of the rabbitmq
        queue: 'admin-backend', // param to specify the queue name
        noAck: false, // param to specify if the message will be deleted after the consumer process it
      },
    });

    /**
     * noAck property specif if the message can be automatically deleted after the consumer process it
     * when we set this property to false we need to inform the broker that the message was processed
     * and then the broker can delete the message
     */

    await app.listen();
  } catch (error) {
    console.log('🚀 ~ error', error);
  }
}
bootstrap();
