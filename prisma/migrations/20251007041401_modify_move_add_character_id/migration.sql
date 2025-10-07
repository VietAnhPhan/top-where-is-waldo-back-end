/*
  Warnings:

  - Added the required column `characterId` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Move" ADD COLUMN     "characterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Move" ADD CONSTRAINT "Move_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
