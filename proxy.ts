import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPayloadFromJWT } from './app/services/JWTService';

//lista de rotas que precisam de autenticação
const authRoutes = {myProfile: "/my-profile/"};

//lista de rotas apenas para usuários guest
const guestRoutes = {root: '/', login: '/login', createAccount:'/create-account'};

//const adminRoutes = {};


//toda solicitação vai passar por aqui
export async function proxy(request: NextRequest) {

  const nextResponse = NextResponse

  const token = request.cookies.get("token")?.value;

  const modifiedHeaders = new Headers(request.headers);

  console.log(token);

  //se o usuario tiver um token, capture o claim id e configure um cabeçalho com valor dele
  if(token){

    const payload = await getPayloadFromJWT(token);

    modifiedHeaders.set('x-user-id', payload.id as string)

    console.log(payload);
  }

  //redirecionamento usuarios logados
  if(token && (
    request.nextUrl.pathname === guestRoutes.root ||
    request.nextUrl.pathname === guestRoutes.login ||
    request.nextUrl.pathname === guestRoutes.createAccount
  ))
  {
    return nextResponse.redirect(new URL("/books", request.url))
  }

  //redirecionamento usuarios guest
  if(!token && (request.nextUrl.pathname === authRoutes.myProfile))
  {
    return nextResponse.redirect(new URL("/books", request.url))
  }

  return nextResponse.next({
      request:{
        headers: modifiedHeaders
      }
    })
}
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}