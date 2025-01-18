/*
  Warnings:

  - Added the required column `mealType` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "mealType" "MealType" NOT NULL;
