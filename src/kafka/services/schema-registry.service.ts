import { Injectable } from '@nestjs/common';
import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry';

@Injectable()
export class SchemaRegistryService {
    private readonly registry: SchemaRegistry;

    constructor() {
        if (process.env['SCHEMA_REGISTRY_URL']) {
            this.registry = new SchemaRegistry({
                host: process.env['SCHEMA_REGISTRY_URL'],
                auth: {
                    username: process.env['SCHEMA_REGISTRY_USERNAME'],
                    password: process.env['SCHEMA_REGISTRY_PASSWORD'],
                }
            });
        }
    }

    async encode(data: Record<string, unknown>, schema: string): Promise<Buffer> {
        if (!this.registry) {
            throw new Error('Schema Registry not configured');
        }

        const { id } = await this.registry.register({
            type: SchemaType.AVRO,
            schema,
        });

        return this.registry.encode(id, data);
    }

    async decode(buffer: Buffer): Promise<unknown> {
        if (!this.registry) {
            throw new Error('Schema Registry not configured');
        }

        return this.registry.decode(buffer);
    }
}
