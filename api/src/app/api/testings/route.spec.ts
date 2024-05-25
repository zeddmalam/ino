import { GET } from "./route";

describe('api/testings', () => {
    it('should fetch testings', async () => {
        const response = await GET();
        expect(response.ok).toBe(true);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
    });
});