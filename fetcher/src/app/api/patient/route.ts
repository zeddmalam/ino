import { NextResponse } from "next/server";

const importerUrl = process.env.IMPORTER_URL;

export const GET = async () => {
  if(!importerUrl){
    return NextResponse.json({ description: 'IMPORTER_URL is not set' }, { status: 500 });
  }
  
  const response = await fetch(importerUrl ,{
    cache:"no-cache"
  });
  
  if(!response.ok){
    const description = await response.text();
    return NextResponse.json({ description }, { status: 500 });
  }

  const { body } = response;

  return new NextResponse(body);

};
