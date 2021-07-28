import { Injectable, OnModuleInit } from '@nestjs/common';
import { get } from 'lodash';
import { ClientService } from '@kafka/services/client.service';
import {Message} from "kafkajs";

const messages  = {};

@Injectable()
export class SubscriberService implements OnModuleInit {
    constructor(private kafkaClient: ClientService) {}

    async onModuleInit() {
        await this.kafkaClient.consumer.run({
            autoCommit: true,
            eachMessage: async ({ topic, message }) => {
                messages[topic] = messages[topic] || [];
                messages[topic].push(this.getValue(message));
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

    private getValue(message: Message): any {
        const value = message.value.toString();

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }
}
