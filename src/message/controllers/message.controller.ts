import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { upperFirst, camelCase } from 'lodash';
import { SenderService } from "@message/services/sender.service";
import { SubscriberService } from "@message/services/subscriber.service";

@Controller()
export class MessageController {
    constructor(private sender: SenderService, private subscriber: SubscriberService) {}

    @Post(':topic')
    async send(@Body() body, @Param() params) {
        const topic = upperFirst(camelCase(params.topic));

        const result = await this.sender.send(topic, body);

        return result;
    }

    @Get(':topic')
    async getEvent(@Body() body, @Param() params) {
        const topic = upperFirst(camelCase(params.topic));

        return this.subscriber.getMessages(topic, body);
    }
}
