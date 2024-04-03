/*
  Warnings:

  - You are about to drop the column `EndDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `StartDate` on the `Project` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "EndDate",
DROP COLUMN "StartDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
