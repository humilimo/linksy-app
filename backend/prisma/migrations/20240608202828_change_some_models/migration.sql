-- CreateTable
CREATE TABLE "friends" (
    "requesterId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    PRIMARY KEY ("requesterId", "receiverId"),
    CONSTRAINT "friends_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "friends_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
