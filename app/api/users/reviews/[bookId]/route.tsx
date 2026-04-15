import { springApiDomain } from "@/app/domains";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {

  const {bookId} = await params;

  const clientCookies = await cookies();

  const token = clientCookies.get("token")?.value;

    const springResponse: Response = await fetch(`${springApiDomain}/users/reviews/${bookId}`,{
        method: 'PATCH',
        body: await request.text(),
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    return NextResponse.json(await springResponse.json(), {status: springResponse.status})
}

export async function POST(request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {

  const {bookId} = await params;

  const clientCookies = await cookies();

  const token = clientCookies.get("token")?.value;

    const springResponse: Response = await fetch(`${springApiDomain}/users/reviews/${bookId}`,{
        method: 'POST',
        body: await request.text(),
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    return NextResponse.json(await springResponse.json(), {status: springResponse.status})
}