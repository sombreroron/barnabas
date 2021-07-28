import { Injectable } from '@nestjs/common';
import { ClientService } from '@kafka/services/client.service';

const messages  = {};

@Injectable()
export class SenderService {
    constructor(private kafkaClient: ClientService) {}

    async send(topic, message): Promise<void> {
        try {
            await this.kafkaClient.producer.send({ topic, messages: [message] });
        } catch (error) {
            console.log(error, `Failed sending message to Kafka with error :${error.message}`);
        }
    }
}
