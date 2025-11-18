import { Injectable } from '@nestjs/common';
import { ConsumerConfig, KafkaConfig, SASLOptions } from 'kafkajs';
import { ConnectionOptions } from 'tls';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class Config implements KafkaConfig, ConsumerConfig {
    clientId = process.env['CLIENT_ID'] || 'barnabas';
    groupId = process.env['GROUP_ID'] || `barnabas-group-${uuidV4()}`;
    brokers = (process.env['BROKERS'] || '').split(',');
    topics = (process.env['TOPICS'] || '').split(',');
    sasl = Config.generateSaslConfig();
    ssl = this.sasl?.mechanism ? false : Config.generateSSLConfig();

    private static generateSaslConfig(): SASLOptions {
        if (process.env["SASL_USERNAME"] && process.env["SASL_PASSWORD"]) {
            return {
                mechanism: "plain",
                username: process.env["SASL_USERNAME"],
                password: process.env["SASL_PASSWORD"],
            };
        }
    }

    private static generateSSLConfig(): ConnectionOptions|boolean {
        if (process.env["SSL"] && process.env["SSL"].toString() === 'true') {
            return {
                rejectUnauthorized: false,
                ca: [JSON.parse(`"${process.env['SSL_CA']}"`)],
                key: JSON.parse(`"${process.env['SSL_KEY']}"`),
                cert: JSON.parse(`"${process.env['SSL_CERT']}"`),
            }
        }

        return false;
    }
}