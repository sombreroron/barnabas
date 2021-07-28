import { Global, Module } from '@nestjs/common';
import { KafkaModule } from '@kafka/kafka.module';
import { MessageController } from '@message/controllers/message.controller';
import { SenderService } from '@message/services/sender.service';
import { SubscriberService } from '@message/services/subscriber.service';

@Global()
@Module({
    imports: [KafkaModule],
    providers: [SenderService, SubscriberService],
    controllers: [MessageController],
})
export class MessageModule {}
