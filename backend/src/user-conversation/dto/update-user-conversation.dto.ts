import { PartialType } from '@nestjs/mapped-types';
import { CreateUserConversationDto } from './create-user-conversation.dto';

export class UpdateUserConversationDto extends PartialType(CreateUserConversationDto) {}
