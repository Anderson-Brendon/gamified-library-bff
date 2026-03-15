import { NextRequest, NextResponse } from "next/server";

/*essa rota é responsável por usar cookie-http do token para fazer solicitações na API do spring,
retornando um url pré assinada pra fazer upload da imagem do perfil, 
caso o usuário tenha um token válido
*/

async function fetchPresignedUrlForProfilePic(token: string){
    try {
        const response: Response = await fetch("http://localhost:8080/storage/profile-pic/presigned-url", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.ok){
            const data = await response.json()

            console.log("valor do url", data.presignedUrl);

            return data.presignedUrl;
        }

    } catch (error) {
        console.log(error)
    }
}

export async function GET(request: NextRequest){
    
    const token = request.cookies.get("token")?.value;

    if(!token){
        return new NextResponse("", { status: 401 });
    }

    const url = await fetchPresignedUrlForProfilePic(token);

    return NextResponse.json({presignedUrl: url}, {status: 200});
    
}