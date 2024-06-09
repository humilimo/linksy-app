"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserConversationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_conversation_dto_1 = require("./create-user-conversation.dto");
class UpdateUserConversationDto extends (0, mapped_types_1.PartialType)(create_user_conversation_dto_1.CreateUserConversationDto) {
}
exports.UpdateUserConversationDto = UpdateUserConversationDto;
