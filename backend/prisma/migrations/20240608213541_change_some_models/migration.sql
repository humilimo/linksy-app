/*
  Warnings:

  - The primary key for the `ErasedMessages` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ErasedMessages" (
    "erasedById" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,

    PRIMARY KEY ("erasedById", "conversationId", "messageId"),
    CONSTRAINT "ErasedMessages_erasedById_conversationId_fkey" FOREIGN KEY ("erasedById", "conversationId") REFERENCES "user_conversations" ("userId", "conversationId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ErasedMessages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ErasedMessages" ("conversationId", "erasedById", "messageId") SELECT "conversationId", "erasedById", "messageId" FROM "ErasedMessages";
DROP TABLE "ErasedMessages";
ALTER TABLE "new_ErasedMessages" RENAME TO "ErasedMessages";
CREATE TABLE "new_conversations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "isAGroup" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_conversations" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "conversations";
DROP TABLE "conversations";
ALTER TABLE "new_conversations" RENAME TO "conversations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
