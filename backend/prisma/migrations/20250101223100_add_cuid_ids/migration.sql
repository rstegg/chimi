/*
  Warnings:

  - The primary key for the `MealPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `mealType` on the `MealPlan` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `items` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MealPlan" DROP CONSTRAINT "MealPlan_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "MealPlan" DROP CONSTRAINT "MealPlan_pkey",
DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "mealType",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "items" JSONB NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MealPlan_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
