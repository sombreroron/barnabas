import { MessageType } from '@message/message.enum';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

export class MessageDto {
    @IsObject()
    data: Record<string, unknown>;

    @IsOptional()
    @IsEnum(MessageType)
    type?: MessageType;

    @IsOptional()
    @IsString()
    schema?: string;

    @IsOptional()
    @IsString()
    subject?: string;
}