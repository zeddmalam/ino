import * as fetcherModule from "@/clients/fetcher";
import { POST } from "./route";
import { TestingDto } from "@/clients/fetcher";
import { randomUUID } from "crypto";

jest.mock('../../../../clients/fetcher', () => ({
    getPatientTestings: jest.fn()
}));

function generateTestingDto():TestingDto {
    return {
        client_id: randomUUID(),
        date_testing: '2022-11-26',
        date_birthdate: '1950-01-01',
        gender: 1,
        ethnicity: 2,
        creatine: 0.97,
        chloride: 101.8,
        fasting_glucose: 118.56,
        potassium: 6.93,
        sodium: 61.53,
        total_calcium: 5.1,
        total_protein: 13.26,
        creatine_unit: 'mgdl',
        chloride_unit: 'mmoll',
        fasting_glucose_unit: 'mgdl',
        potassium_unit: 'mmoll',
        sodium_unit: 'ul',
        total_calcium_unit: 'mgdl',
        total_protein_unit: 'gdl'
    }
}

describe('api/patient', () => {
    const getPatientTestingsMock = fetcherModule.getPatientTestings as jest.Mock;
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should import patient timeseries', async () => {
        const testingDto = generateTestingDto();
        getPatientTestingsMock.mockResolvedValueOnce([testingDto]);
        const response = await POST();
        expect(response.ok).toBe(true);
        const body = await response.json();

        expect(Array.isArray(body)).toEqual(true);
        expect(body).toHaveLength(1);
        expect(Array.isArray(body[0].testingItems)).toEqual(true);
        expect(body[0].patient.externalId).toEqual(testingDto.client_id);
        expect(Array.isArray(body[0].testingItems)).toEqual(true);
        expect(body[0].testingItems).toHaveLength(7);
    });

    it('should import patient timeseries with incomplete item', async () => {
        const testingDto = generateTestingDto();
        delete testingDto.sodium_unit;

        getPatientTestingsMock.mockResolvedValueOnce([testingDto]);
        const response = await POST();
        expect(response.ok).toBe(true);
        const body = await response.json();

        expect(Array.isArray(body)).toEqual(true);
        expect(body).toHaveLength(1);
        expect(Array.isArray(body[0].testingItems)).toEqual(true);
        expect(body[0].patient.externalId).toEqual(testingDto.client_id);
        expect(Array.isArray(body[0].testingItems)).toEqual(true);
        expect(body[0].testingItems).toHaveLength(6);
    });

    it('should import patient timeseries with reduced items count', async () => {
        const testingDto = generateTestingDto();
        delete testingDto.sodium;
        delete testingDto.sodium_unit;

        getPatientTestingsMock.mockResolvedValueOnce([testingDto]);
        const response = await POST();
        expect(response.ok).toBe(true);
        const body = await response.json();

        expect(Array.isArray(body)).toEqual(true);
        expect(body).toHaveLength(1);
        expect(Array.isArray(body[0].testingItems)).toEqual(true);
        expect(body[0].patient.externalId).toEqual(testingDto.client_id);
        expect(Array.isArray(body[0].testingItems)).toEqual(true);
        expect(body[0].testingItems).toHaveLength(6);
    });

    it('should accept empty timeseries', async() => {
        const testingDto = generateTestingDto();
        getPatientTestingsMock.mockResolvedValueOnce([]);
        const response = await POST();
        expect(response.ok).toBe(true);
        const body = await response.json();
        expect(body).toEqual([]);
    });
});