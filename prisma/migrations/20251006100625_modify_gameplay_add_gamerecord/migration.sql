/*
  Warnings:

  - You are about to drop the column `characterId` on the `Gameplay` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Gameplay` table. All the data in the column will be lost.
  - You are about to drop the `Gameresult` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Gameplay` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Gameplay" DROP CONSTRAINT "Gameplay_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Gameresult" DROP CONSTRAINT "Gameresult_gameplayId_fkey";

-- AlterTable
ALTER TABLE "public"."Gameplay" DROP COLUMN "characterId",
DROP COLUMN "result",
ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Gameresult";

-- CreateTable
CREATE TABLE "public"."Gamerecord" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "result" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameplayId" INTEGER NOT NULL,

    CONSTRAINT "Gamerecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Gamerecord" ADD CONSTRAINT "Gamerecord_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Gamerecord" ADD CONSTRAINT "Gamerecord_gameplayId_fkey" FOREIGN KEY ("gameplayId") REFERENCES "public"."Gameplay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
