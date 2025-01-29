-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateEmployed" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);
