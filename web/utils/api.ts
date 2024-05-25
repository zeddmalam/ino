import { Testing } from "./types";

const API = process.env.NEXT_PUBLIC_API;

export async function importNextPatient(): Promise<Testing[]>{
    const response = await fetch(`${API}/api/patient/import`, {
        method: 'POST'
    });
    if (!response.ok) {
        throw Error(await response.text());
    }
    const responseData = await response.json();
    return responseData;
}
export async function getTestings(): Promise<Testing[]>{
    const response = await fetch(`${API}/api/testings`);
    if (!response.ok) {
        throw Error(await response.text());
    }
    const responseData = await response.json();
    return responseData;
}
