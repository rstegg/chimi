/*
  Warnings:

  - Added the required column `date` to the `MealPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealPlan" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "details" TEXT;
