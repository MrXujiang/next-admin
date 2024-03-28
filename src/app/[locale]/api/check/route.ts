import {  NextRequest } from 'next/server'
import { cookies } from 'next/headers'

// 模拟用户登录鉴权
export async function GET(req: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    if(!token) return new Response('登录失效', {
        status: 401
    })

    return Response.json({})
    
}