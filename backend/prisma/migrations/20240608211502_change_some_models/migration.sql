/*
  Warnings:

  - The primary key for the `ErasedMessages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `senderId` on the `ErasedMessages` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ErasedMessages" (
    "conversationId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "erasedById" INTEGER NOT NULL,

    PRIMARY KEY ("conversationId", "messageId", "erasedById"),
    CONSTRAINT "ErasedMessages_erasedById_conversationId_fkey" FOREIGN KEY ("erasedById", "conversationId") REFERENCES "user_conversations" ("userId", "conversationId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ErasedMessages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ErasedMessages" ("conversationId", "erasedById", "messageId") SELECT "conversationId", "erasedById", "messageId" FROM "ErasedMessages";
DROP TABLE "ErasedMessages";
ALTER TABLE "new_ErasedMessages" RENAME TO "ErasedMessages";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
