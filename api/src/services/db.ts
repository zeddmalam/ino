import { Patient, Testing, TestingItem } from "@prisma/client";
import prisma from "../clients/prisma";
import { createRedisInstance } from "@/clients/redis";

const redis = createRedisInstance();

export async function getPatientByExternalId(externalId: string){
    const key = `PATIENT:${externalId}`;
    return await retrieveWithCache<Patient | null>(key, async () => await prisma.patient.findFirst({
        where:{ externalId }
    }));
}

export async function createPatient(data: Omit<Patient, 'id'>){
    const patient = await prisma.patient.create({
        data
    });
    return patient;
}

export async function createTesting(data: Omit<Testing, 'id'>){
    const key = `TESTINGS:ALL`;

    const testing = await prisma.testing.create({
        data
    });

    await redis.del(key);

    return testing;
}

export async function createTestingItems(data: Omit<TestingItem, 'id'>[]){
    const key = `TESTINGS:ALL`;

    const testings = await prisma.testingItem.createMany({
        data
    });

    await redis.del(key);

    return testings;
}

export async function getAllTestings(): Promise<Testing[]> {
    const key = `TESTINGS:ALL`;
    return await retrieveWithCache<Testing[]>(key, async () => await prisma.testing.findMany({
        include:{
            patient: true,
            testingItems: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    }));
}

export async function getTestingsByPatientId(id: number): Promise<Testing[]> {
    const key = `TESTINGS:PATIENT:${id}`;
    return await retrieveWithCache<Testing[]>(key, async () => await prisma.testing.findMany({
        where:{
            patient:{
                id
            }
        },
        include:{
            patient: true,
            testingItems: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    }));
}

async function retrieveWithCache<T>(key: string, func:() => Promise<T>):Promise<T> {
    const keyExists = await redis.exists(key);

    if(keyExists){
        const value = await redis.get(key);
        return JSON.parse(value ?? '');
    }
    
    const result = await func();
    await redis.set(key, JSON.stringify(result));
    return result;
};