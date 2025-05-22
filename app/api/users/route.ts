import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users
export async function GET() {
  const users = await prisma.user.findMany({
    include: { role: true },
  })
  return NextResponse.json(users)
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json()
  const { email, name, roleId } = body

  try {
    const user = await prisma.user.create({
      data: { email, name, roleId },
      include: { role: true },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

