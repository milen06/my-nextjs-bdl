import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { role: true },
  })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json(user)
}

// PUT /api/users/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { name, email, roleId } = await request.json()
  try {
    const user = await prisma.user.update({
      where: { id: params.id },
      data: { name, email, roleId },
      include: { role: true },
    })
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// DELETE /api/users/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'User deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

