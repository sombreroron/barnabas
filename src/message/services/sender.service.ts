import { Injectable } from '@nestjs/common';
import { ClientService } from '@kafka/services/client.service';

const messages  = {};

@Injectable()
export class SenderService {
    constructor(private kafkaClient: ClientService) {}

    async send(topic: string, message: any): Promise<void> {
        try {
            await this.kafkaClient.producer.send({ topic, messages: [{ value: JSON.stringify(message) }] });
        } catch (error) {
            console.log(error, `Failed sending message to Kafka with error :${error.message}`);
        }
    }
}
