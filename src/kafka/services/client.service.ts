import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { Config } from '@kafka/config/config';

@Injectable()
export class ClientService implements OnModuleInit, OnModuleDestroy {
    producer: Producer;
    consumer: Consumer;

    constructor(private config: Config) {
        const kafka = new Kafka(config);
        this.producer = kafka.producer();
        this.consumer = kafka.consumer(config);
    }

    async onModuleInit(): Promise<void> {
        await Promise.all([this.consumer.connect()]);
        await Promise.all(this.config.topics.map(topic => this.consumer.subscribe({ topic })));
    }

    async onModuleDestroy(): Promise<void> {
        await Promise.all([this.producer.disconnect(), this.consumer.disconnect()]);
    }
}