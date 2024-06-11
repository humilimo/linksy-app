-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserConversation" (
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "owner" BOOLEAN NOT NULL DEFAULT false,
    "leftConversation" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("userId", "conversationId"),
    CONSTRAINT "UserConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserConversation" ("conversationId", "owner", "userId") SELECT "conversationId", "owner", "userId" FROM "UserConversation";
DROP TABLE "UserConversation";
ALTER TABLE "new_UserConversation" RENAME TO "UserConversation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
