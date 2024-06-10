import { HttpStatus, HttpException } from '@nestjs/common';
export class ForbiddenException extends HttpException {
    constructor() {
      super('User is not a member of that conversation.', HttpStatus.FORBIDDEN);
    }
  }