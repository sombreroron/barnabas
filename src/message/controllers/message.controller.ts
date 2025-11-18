import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { SenderService } from "@message/services/sender.service";
import { SubscriberService } from "@message/services/subscriber.service";
import { MessageType } from '@message/pubsub-client.enum';
import { MessageDto } from '@message/dtos/message.dto';

@Controller()
export class MessageController {
    constructor(private sender: SenderService, private subscriber: SubscriberService) {}

    @Post(":topic")
    async sendWithType(@Body() body: MessageDto, @Param() params: { topic: string; type?: MessageType }) {
        if (params.type && !Object.values(MessageType).includes(params.type)) {
            throw new Error(`Invalid message type: ${params.type}`);
        }

        return await this.sender.send(params.topic, body);
    }

    @Get(':topic')
    async getEvent(@Body() body, @Param() params) {
        return this.subscriber.getMessages(params.topic, body);
    }
}
