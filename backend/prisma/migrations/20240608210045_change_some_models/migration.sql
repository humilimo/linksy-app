-- CreateTable
CREATE TABLE "ErasedMessages" (
    "senderId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "erasedById" INTEGER NOT NULL,

    PRIMARY KEY ("senderId", "conversationId", "messageId", "erasedById"),
    CONSTRAINT "ErasedMessages_senderId_conversationId_fkey" FOREIGN KEY ("senderId", "conversationId") REFERENCES "user_conversations" ("userId", "conversationId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ErasedMessages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
