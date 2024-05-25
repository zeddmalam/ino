import { GET } from "./route";

describe('api/patient', () => {
    it('should fetch patient timeseries', async () => {
        const response = await GET();
        expect(response.ok).toBe(true);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
    });
});