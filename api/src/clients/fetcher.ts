const fetcherUrl = process.env.FETCHER_URL;

export type TestingDto = {
    client_id: string;
    date_testing: string;
    date_birthdate: string;
    gender: number;
    ethnicity: number;
} & {
    [key: string]: number | string;
};

export async function getPatientTestings(): Promise<TestingDto[]>{
    const response = await fetch(`${fetcherUrl}/api/patient`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw Error(await response.text());
    }
    const testingDtos = await response.json();
    return testingDtos;
}
