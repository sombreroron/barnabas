import { Injectable, OnModuleInit } from '@nestjs/common';
import { get } from 'lodash';
import { ClientService } from '@kafka/services/client.service';

const messages  = {};

@Injectable()
export class SubscriberService implements OnModuleInit {
    constructor(private kafkaClient: ClientService) {}

    async onModuleInit() {
        await this.kafkaClient.consumer.run({
            autoCommit: true,
            eachMessage: async ({ topic, message }) => {
                messages[topic] = message;
            },
        })
    }

    getMessages(topic, query = {}) {
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
}
