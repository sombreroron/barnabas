import { Injectable } from '@nestjs/common';
import { ClientService } from '@kafka/services/client.service';
import { MessageType } from '../message.enum';
import { MessageDto } from '../dtos/message.dto';
import { SchemaRegistryService } from '@kafka/services/schema-registry.service';

const messages = {};

@Injectable()
export class SenderService {
    constructor(
        private kafkaClient: ClientService,
        private schemaRegistry: SchemaRegistryService,
    ) {}

    async send(topic: string, { data, type = MessageType.JSON, schema }: MessageDto): Promise<void> {
        try {
            if (type === MessageType.AVRO) {
                if (!schema) {
                    throw new Error('Schema is required for Avro message');
                }

                const buffer = await this.schemaRegistry.encode(data, schema);
                await this.kafkaClient.producer.send({ topic, messages: [{ value: buffer }] });
            } else {
                await this.kafkaClient.producer.send({ topic, messages: [{ value: JSON.stringify(data) }] });
            }
        } catch (error) {
            console.log(error, `Failed sending message to Kafka with error :${error.message}`);
        }
    }

}
