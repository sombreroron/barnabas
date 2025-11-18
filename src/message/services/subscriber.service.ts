import { Injectable, OnModuleInit } from '@nestjs/common';
import { get } from 'lodash';
import { ClientService } from '@kafka/services/client.service';
import { SchemaRegistryService } from '@kafka/services/schema-registry.service';
import { Message } from 'kafkajs';

const messages  = {};

@Injectable()
export class SubscriberService implements OnModuleInit {
    constructor(
        private kafkaClient: ClientService,
        private schemaRegistry: SchemaRegistryService,
    ) {}

    async onModuleInit() {
        await this.kafkaClient.consumer.run({
            autoCommit: true,
            eachMessage: async ({ topic, message }) => {
                messages[topic] = messages[topic] || [];
                messages[topic].push(await this.getValue(message));
            },
        })
    }

    getMessages(topic: string, query: Record<string, string> = {}): Record<string, any> {
        let result = messages[topic] || [];

        if (Object.keys(query).length) {
            for (const key of Object.keys(query))  {
                result = result.filter(event => {
                    return get(event, key) === query[key];
                });
            }
        }

        return result;
    }

    private async getValue(message: Message): Promise<any> {
        if (message.value && Buffer.isBuffer(message.value) && message.value[0] === 0) {
            try {
                return await this.schemaRegistry.decode(message.value);
            } catch (error) {
                console.error('Failed to decode Avro message:', error);
                return message.value.toString();
            }
        }

        const value = message.value?.toString();

        if (!value) {
            return value;
        }

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }
}
