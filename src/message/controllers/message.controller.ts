import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { SenderService } from "@message/services/sender.service";
import { SubscriberService } from "@message/services/subscriber.service";

@Controller()
export class MessageController {
    constructor(private sender: SenderService, private subscriber: SubscriberService) {}

    @Post(':topic')
    async send(@Body() body, @Param() params) {
        const result = await this.sender.send(params.topic, body);

        return result;
    }

    @Get(':topic')
    async getEvent(@Body() body, @Param() params) {
        return this.subscriber.getMessages(params.topic, body);
    }
}
