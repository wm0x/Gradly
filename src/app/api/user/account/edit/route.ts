import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

// Required for routes with auth/database operations
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' // Explicit runtime (optional)

export async function PATCH(req: NextRequest) {
  // Build-time mock response
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ message: 'Build-time mock response' }, { status: 200 })
  }

  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, username, email, password } = await req.json()

    const updateData: {
      name?: string
      username?: string
      email?: string
      password_hash?: string
    } = { name, username, email }

    if (password) {
      updateData.password_hash = await bcrypt.hash(password, 10)
    }

    await db.user.update({
      where: { email: session.user.email },
      data: updateData,
    })

    return NextResponse.json({ message: 'Profile updated' })
  } catch (err) {
    console.error('Profile update error:', err)
    return NextResponse.json(
      { message: 'Failed to update profile' }, 
      { status: 500 }
    )
  }
}