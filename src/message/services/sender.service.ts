import { Injectable } from '@nestjs/common';
import { ClientService } from '@kafka/services/client.service';
import * as avro from "avsc";
import { MessageType } from '../message.enum';
import { MessageDto } from '../dtos/message.dto';

const messages = {};

@Injectable()
export class SenderService {
    constructor(private kafkaClient: ClientService) {}

    async send(topic: string, { data, type = MessageType.JSON, schema }: MessageDto): Promise<void> {
        try {
            if (type === MessageType.AVRO) {
                await this.kafkaClient.producer.send({ topic, messages: [{ value: this.createAvroData(data, schema) }] });
            } else {
                await this.kafkaClient.producer.send({ topic, messages: [{ value: JSON.stringify(data) }] });
            }
        } catch (error) {
            console.log(error, `Failed sending message to Kafka with error :${error.message}`);
        }
    }

    private createAvroData(data, schema: string): Buffer {
        if (!schema) {
            throw new Error('Schema is required for Avro message');
        }

        const type = avro.parse(schema);
        return type.toBuffer(data);
    }
}
