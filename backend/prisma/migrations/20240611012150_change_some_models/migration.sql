/*
  Warnings:

  - You are about to drop the column `Favorited` on the `Conversation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conversation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "picture" TEXT,
    "hasManyUsers" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Conversation" ("createdAt", "hasManyUsers", "id", "name", "picture") SELECT "createdAt", "hasManyUsers", "id", "name", "picture" FROM "Conversation";
DROP TABLE "Conversation";
ALTER TABLE "new_Conversation" RENAME TO "Conversation";
CREATE TABLE "new_UserConversation" (
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "owner" BOOLEAN NOT NULL DEFAULT false,
    "leftConversation" BOOLEAN NOT NULL DEFAULT false,
    "Favorited" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("userId", "conversationId"),
    CONSTRAINT "UserConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserConversation" ("conversationId", "leftConversation", "owner", "userId") SELECT "conversationId", "leftConversation", "owner", "userId" FROM "UserConversation";
DROP TABLE "UserConversation";
ALTER TABLE "new_UserConversation" RENAME TO "UserConversation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
