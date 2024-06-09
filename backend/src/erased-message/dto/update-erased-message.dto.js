"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateErasedMessageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_erased_message_dto_1 = require("./create-erased-message.dto");
class UpdateErasedMessageDto extends (0, mapped_types_1.PartialType)(create_erased_message_dto_1.CreateErasedMessageDto) {
}
exports.UpdateErasedMessageDto = UpdateErasedMessageDto;
