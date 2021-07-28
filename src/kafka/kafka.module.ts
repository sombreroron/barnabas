import { Module } from '@nestjs/common';
import { ClientService } from '@kafka/services/client.service';
import { Config } from '@kafka/config/config';

@Module({
    providers: [ClientService, Config],
    exports: [ClientService]
})
export class KafkaModule {}
