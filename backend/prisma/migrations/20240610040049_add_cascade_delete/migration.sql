-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ErasedMessages" (
    "erasedById" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,

    PRIMARY KEY ("erasedById", "conversationId", "messageId"),
    CONSTRAINT "ErasedMessages_erasedById_conversationId_fkey" FOREIGN KEY ("erasedById", "conversationId") REFERENCES "UserConversation" ("userId", "conversationId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ErasedMessages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ErasedMessages" ("conversationId", "erasedById", "messageId") SELECT "conversationId", "erasedById", "messageId" FROM "ErasedMessages";
DROP TABLE "ErasedMessages";
ALTER TABLE "new_ErasedMessages" RENAME TO "ErasedMessages";
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    CONSTRAINT "Message_senderId_conversationId_fkey" FOREIGN KEY ("senderId", "conversationId") REFERENCES "UserConversation" ("userId", "conversationId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("content", "conversationId", "createdAt", "id", "senderId") SELECT "content", "conversationId", "createdAt", "id", "senderId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_UserConversation" (
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "owner" BOOLEAN NOT NULL DEFAULT false,
    "leftConversation" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("userId", "conversationId"),
    CONSTRAINT "UserConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserConversation" ("conversationId", "leftConversation", "owner", "userId") SELECT "conversationId", "leftConversation", "owner", "userId" FROM "UserConversation";
DROP TABLE "UserConversation";
ALTER TABLE "new_UserConversation" RENAME TO "UserConversation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
