/*
  Warnings:

  - You are about to drop the column `budget` on the `Project` table. All the data in the column will be lost.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientId` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "budget",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "deadline" SET NOT NULL,
ALTER COLUMN "clientId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
