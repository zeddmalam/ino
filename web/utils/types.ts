export type Patient = {
    id: number;
    externalId: string;
    birthday: Date;
    gender: number;
    ethnicity: number;
};

export type Testing = {
    id: number;
    createdAt: Date;
    patient: Patient;
    testingItems: TestingItem[];
    patientId: number
};
  
export type TestingItem = {
    id: number;
    name: string;
    value: number;
    unit: string;
    testingId: number
};

export enum QueryKeys {
    testings = 'testings'
};
  