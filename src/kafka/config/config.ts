import { Injectable } from '@nestjs/common';
import { ConsumerConfig, KafkaConfig } from 'kafkajs';
import { ConnectionOptions } from 'tls';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class Config implements KafkaConfig, ConsumerConfig {
    clientId = process.env['CLIENT_ID'] || 'barnabas';
    groupId = process.env['GROUP_ID'] || `barnabas-group-${uuidV4()}`;
    brokers = process.env['BROKERS'].split(',');
    topics = process.env['TOPICS'].split(',');
    ssl = Config.generateSSLConfig();

    private static generateSSLConfig(): ConnectionOptions|boolean {
        if (process.env["SSL"]) {
            return {
                rejectUnauthorized: false,
                ca: [process.env['SSL_CA']],
                key: process.env['SSL_KEY'],
                cert: process.env['SSL_CERT']
            }
        }

        return false;
    }
}