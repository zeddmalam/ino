import { createPatient, createTestingItems, createTesting, getPatientByExternalId, getTestingsByPatientId } from "@/services/db";
import { TestingDto, getPatientTestings } from "@/clients/fetcher";
import { parse } from "date-fns";
import { Patient, Prisma, Testing, TestingItem } from "@prisma/client";

export type CreateInputs = {
  testings: Prisma.TestingCreateInput[],
  testingItems: Prisma.TestingItemCreateInput[]
}

export const POST = async () => {

  const testingDtos = await getPatientTestings();
  if(!testingDtos.length){
    return Response.json([]);
  }

  const patient = await getOrCreatePatient(testingDtos[0]);

  await Promise.all(testingDtos.map(async testingDto => await createTestingWithItems(testingDto, patient)));

  const patientTestings = await getTestingsByPatientId(patient.id);

  return Response.json(patientTestings);
};

async function getOrCreatePatient(testingDto: TestingDto): Promise<Patient> {
  let patient = await getPatientByExternalId(testingDto.client_id);

  if(!patient){
    patient = await createPatient({
      externalId: testingDto.client_id, 
      birthday: parse(testingDto.date_birthdate, 'yyyy-MM-dd', new Date()), 
      gender: testingDto.gender, 
      ethnicity: testingDto.ethnicity
    });
  }

  return patient;
}

function getTestingItemsInput(testingDto: TestingDto, testing: Testing): Omit<TestingItem, 'id'>[] {
  const testingItemsInput = Object
  .keys(testingDto)
  .reduce((items: Omit<TestingItem, 'id'>[] , key: string) => {
    if(!key.endsWith('_unit') && testingDto[`${key}_unit`]){
      const item = {
        name: key,
        value: +testingDto[key],
        unit: testingDto[`${key}_unit`].toString(),
        testingId: testing.id
      };
      items.push(item);
    }

    return items;
  }, []);
  return testingItemsInput;
}

async function createTestingWithItems(testingDto: TestingDto, patient: Patient){
  const testing = await createTesting({
    createdAt: parse(testingDto.date_testing, 'yyyy-MM-dd', new Date()),
    patientId: patient.id
  });

  const testingItemsInput = getTestingItemsInput(testingDto, testing);

  await createTestingItems(testingItemsInput);
}
