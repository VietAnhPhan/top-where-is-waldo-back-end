/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_email_key";

-- DropIndex
DROP INDEX "public"."User_username_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "email",
DROP COLUMN "isAdmin",
DROP COLUMN "password",
DROP COLUMN "username",
ALTER COLUMN "name" SET DEFAULT 'anonymous';

-- CreateTable
CREATE TABLE "public"."Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Move" (
    "id" SERIAL NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "gameplayId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Gameplay" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "result" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gameplay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Gameresult" (
    "id" SERIAL NOT NULL,
    "gameplayId" INTEGER NOT NULL,
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gameresult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_position_x_position_y_key" ON "public"."Character"("position_x", "position_y");

-- CreateIndex
CREATE UNIQUE INDEX "Gameresult_gameplayId_key" ON "public"."Gameresult"("gameplayId");

-- AddForeignKey
ALTER TABLE "public"."Move" ADD CONSTRAINT "Move_gameplayId_fkey" FOREIGN KEY ("gameplayId") REFERENCES "public"."Gameplay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Gameplay" ADD CONSTRAINT "Gameplay_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Gameplay" ADD CONSTRAINT "Gameplay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Gameresult" ADD CONSTRAINT "Gameresult_gameplayId_fkey" FOREIGN KEY ("gameplayId") REFERENCES "public"."Gameplay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
