import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//atualiza pagina da leitura
export async function PATCH(request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {

  const {bookId} = await params;

  const clientCookies = await cookies();

  const token = clientCookies.get("token")?.value;

  const body = await request.json();

    const springResponse: Response = await fetch(`http://192.168.1.11:8080/users/reading-list/${bookId}`,{
        method: 'PATCH',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(body)
    })

    return NextResponse.json(await springResponse.json(), {status: springResponse.status})
}

//remove livro da lista de leitura
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