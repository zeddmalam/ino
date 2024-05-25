import { getAllTestings } from "@/services/db";

export const GET = async () => {
    const testings = await getAllTestings();
    return Response.json(testings);
};

export const dynamic = "force-dynamic";
