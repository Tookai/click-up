-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "duration" INTEGER,
    "position" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "priorityId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Priority" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    CONSTRAINT "Priority_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Priority" ("code", "createdAt", "deletedAt", "id", "name", "projectId", "updatedAt") SELECT "code", "createdAt", "deletedAt", "id", "name", "projectId", "updatedAt" FROM "Priority";
DROP TABLE "Priority";
ALTER TABLE "new_Priority" RENAME TO "Priority";
CREATE UNIQUE INDEX "Priority_name_key" ON "Priority"("name");
CREATE UNIQUE INDEX "Priority_code_key" ON "Priority"("code");
CREATE UNIQUE INDEX "Priority_id_projectId_key" ON "Priority"("id", "projectId");
CREATE TABLE "new_State" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    CONSTRAINT "State_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_State" ("code", "createdAt", "deletedAt", "id", "name", "projectId", "updatedAt") SELECT "code", "createdAt", "deletedAt", "id", "name", "projectId", "updatedAt" FROM "State";
DROP TABLE "State";
ALTER TABLE "new_State" RENAME TO "State";
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");
CREATE UNIQUE INDEX "State_code_key" ON "State"("code");
CREATE UNIQUE INDEX "State_id_projectId_key" ON "State"("id", "projectId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_projectId_key" ON "Task"("id", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_stateId_key" ON "Task"("id", "stateId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_priorityId_key" ON "Task"("id", "priorityId");
