-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "duration" INTEGER,
    "position" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "priorityId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("content", "createdAt", "deletedAt", "duration", "id", "name", "position", "priorityId", "projectId", "stateId", "updatedAt") SELECT "content", "createdAt", "deletedAt", "duration", "id", "name", "position", "priorityId", "projectId", "stateId", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_id_projectId_key" ON "Task"("id", "projectId");
CREATE UNIQUE INDEX "Task_id_stateId_key" ON "Task"("id", "stateId");
CREATE UNIQUE INDEX "Task_id_priorityId_key" ON "Task"("id", "priorityId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
