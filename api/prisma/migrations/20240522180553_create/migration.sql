-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" INTEGER NOT NULL,
    "ethnicity" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testing" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestingItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "testingId" INTEGER NOT NULL,

    CONSTRAINT "TestingItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_externalId_key" ON "Patient"("externalId");

-- CreateIndex
CREATE INDEX "patientId_index" ON "Testing"("patientId");

-- CreateIndex
CREATE INDEX "createdAt_index" ON "Testing"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "testingId_index" ON "TestingItem"("testingId");

-- AddForeignKey
ALTER TABLE "Testing" ADD CONSTRAINT "Testing_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestingItem" ADD CONSTRAINT "TestingItem_testingId_fkey" FOREIGN KEY ("testingId") REFERENCES "Testing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
