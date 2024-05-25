import { Testing } from "./types";

export function generateMockTesting():Testing {
    const id = Math.floor(Math.random() * 10_000_000 + 1);
    return {
        id,
        patientId: 34,
        createdAt: new Date('2022-12-25T23:00:00.000Z'),
        patient: {
            id: 34,
            externalId: 'cfda2f88',
            birthday: new Date('1949-12-31T23:00:00.000Z'),
            gender: 2,
            ethnicity: 1
        },
        testingItems: [
            {
                id: 1961,
                name: 'creatine',
                value: 0,
                unit: 'mgdl',
                testingId: 293
            },
            {
                id: 1962,
                name: 'chloride',
                value: 99,
                unit: 'mmoll',
                testingId: 293
            },
            {
                id: 1963,
                name: 'fasting_glucose',
                value: 77,
                unit: 'mgdl',
                testingId: 293
            },
            {
                id: 1964,
                name: 'potassium',
                value: 4,
                unit: 'mmoll',
                testingId: 293
            },
            {
                id: 1965,
                name: 'sodium',
                value: 126,
                unit: 'ul',
                testingId: 293
            },
            {
                id: 1966,
                name: 'total_calcium',
                value: 11,
                unit: 'mgdl',
                testingId: 293
            },
            {
                id: 1967,
                name: 'total_protein',
                value: 12,
                unit: 'gdl',
                testingId: 293
            }
        ]
    }
}