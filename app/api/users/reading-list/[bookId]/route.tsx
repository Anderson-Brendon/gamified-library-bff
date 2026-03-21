import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {

  const {bookId} = await params;

  const clientCookies = await cookies();

  const token = clientCookies.get("token")?.value;

    const springResponse: Response = await fetch(`http://192.168.1.11:8080/users/reading-list/${bookId}`,{
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    return NextResponse.json(await springResponse.json(), {status: springResponse.status})
}