/*
  Warnings:

  - Added the required column `marker` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Move" ADD COLUMN     "marker" BOOLEAN NOT NULL;
