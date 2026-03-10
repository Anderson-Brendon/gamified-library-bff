import * as jose from 'jose';

export async function getPayloadFromJWT(token: string){

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    
    const {payload} = await jose.jwtVerify(token, secretKey, {
        // Specify the expected algorithms, e.g., HS256
        algorithms: ['HS384'], 
      })

    console.log("jwt service called")

    return payload;
    
}