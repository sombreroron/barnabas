import { Module } from '@nestjs/common';
import { ClientService } from '@kafka/services/client.service';
import { SchemaRegistryService } from '@kafka/services/schema-registry.service';
import { Config } from '@kafka/config/config';

@Module({
    providers: [ClientService, SchemaRegistryService, Config],
    exports: [ClientService, SchemaRegistryService]
})
export class KafkaModule {}
