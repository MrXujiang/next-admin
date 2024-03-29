import { NextResponse } from 'next/server'

export async function POST(
    request: Request,
    { params: { auth } }: { params: { auth: string } }
  ) {
    const { email, pwd } = await request.json();

    if(auth === 'login') {
      return NextResponse.json({data: { email, pwd }, msg: '登录成功'})
    }

    if(auth === 'register') {
      return NextResponse.json({data: { email, pwd }, msg: '注册成功'})
    }
    
}