import { springApiDomain } from "@/app/domains";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//recebe o parametro [bookId] estruturado na rota por pastas
export async function DELETE(request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {

  const {bookId} = await params;

  const clientCookies = await cookies();

  const token = clientCookies.get("token")?.value;

    const springResponse: Response = await fetch(`http://192.168.1.11:8080/users/favorites/${bookId}`,{
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
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

    const springResponse: Response = await fetch(`${springApiDomain}/users/favorites/${bookId}`,{
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    return NextResponse.json(await springResponse.json(), {status: springResponse.status})
}