import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { Category } from './interfaces/categories/category.interface';
import { Player } from './interfaces/players/player.interface';

const ackErrors = ['E11000'];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-categories')
  async index(@Payload() category_id: string) {
    return this.appService.getCategoryById(category_id);
  }

  @EventPattern('create-category')
  async create(@Payload() category: Category, @Ctx() context: RmqContext) {
    // RmqContext get current context from message broker - RabbitMQ

    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      await this.appService.createCategory(category);

      // mark the message that can be delete from the queue because it was successfully processed
      await channel.ack(originalMessage);
    } catch (error) {
      let isHandledError = false;

      await Promise.all(
        ackErrors.map(async (ackError) => {
          if (error.message.includes(ackError)) {
            await channel.ack(originalMessage);
            isHandledError = true;
          }
        }),
      );

      if (!isHandledError) {
        // resend the message to the queue to be process again if some error was happen
        await channel.nack(originalMessage);
      }
    }
  }

  @EventPattern('create-player')
  async createPlayer(@Payload() player: Player, @Ctx() context: RmqContext) {
    // RmqContext get current context from message broker - RabbitMQ

    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      await this.appService.createPlayer(player);

      // mark the message that can be delete from the queue because it was successfully processed
      await channel.ack(originalMessage);
    } catch (error) {
      ackErrors.map(async (ackError) => {
        if (error.message.includes(ackError)) {
          await channel.ack(originalMessage);
        }
      });
    }
  }
}
