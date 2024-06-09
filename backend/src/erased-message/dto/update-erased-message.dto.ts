import { PartialType } from '@nestjs/mapped-types';
import { CreateErasedMessageDto } from './create-erased-message.dto';

export class UpdateErasedMessageDto extends PartialType(CreateErasedMessageDto) {}
